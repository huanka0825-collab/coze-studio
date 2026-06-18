/*
 * Copyright 2025 coze-dev Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const path = require('path');
const fs = require('fs');

const rootNodeModules = path.resolve(
  process.cwd(),
  '../../../common/temp/default/node_modules',
);

const findVirtualStoreNodeModules = pluginName => {
  const modulesYaml = path.join(rootNodeModules, '.modules.yaml');
  if (!fs.existsSync(modulesYaml)) {
    return [];
  }

  const yaml = fs.readFileSync(modulesYaml, 'utf8');
  const virtualStoreDirMatch = yaml.match(/^virtualStoreDir:\s*(.+)$/m);
  if (!virtualStoreDirMatch) {
    return [];
  }

  const virtualStoreDir = path.resolve(
    rootNodeModules,
    virtualStoreDirMatch[1].trim(),
  );
  const prefix = pluginName.startsWith('@')
    ? `${pluginName.replace('/', '+')}@`
    : `${pluginName}@`;

  return fs
    .readdirSync(virtualStoreDir, { withFileTypes: true })
    .filter(item => item.isDirectory() && item.name.startsWith(prefix))
    .map(item => path.join(virtualStoreDir, item.name, 'node_modules'));
};

const modulePaths = [
  __dirname,
  path.resolve(process.cwd(), 'node_modules'),
  rootNodeModules,
  path.dirname(require.resolve('@coze-arch/postcss-config/package.json')),
];

const loadPlugin = pluginName =>
  require(
    require.resolve(pluginName, {
      paths: [...modulePaths, ...findVirtualStoreNodeModules(pluginName)],
    }),
  );

module.exports = {
  plugins: [
    loadPlugin('postcss-import')(),
    loadPlugin('@tailwindcss/nesting')(loadPlugin('postcss-nesting')),
    loadPlugin('tailwindcss')(),
    loadPlugin('autoprefixer')(),
    loadPlugin('@csstools/postcss-is-pseudo-class')(),
  ],
};
