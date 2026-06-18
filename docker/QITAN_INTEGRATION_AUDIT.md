# 启探智能体工坊融合验收矩阵

更新时间：2026-06-04

## 当前结论

当前版本已达到“可用融合版”：启探 AI 工坊有明确入口，智能体工坊可登录、可进入工作区，并保留智能体、应用、工作流、知识库、插件、模板等核心能力。主要页面已完成启探化与中文化，容器使用源码构建后的前端产物运行。

它还不是最终的“完美融合版”：仍需继续把运行时品牌脚本中的样式兜底逐步沉到源码组件与设计系统中，并继续覆盖更深层的弹窗、授权流程、创建流程和发布流程。

## 已验收页面

| 页面 | 地址 | 状态 | 结果 |
| --- | --- | --- | --- |
| 启探平台入口 | `http://127.0.0.1:8000/#!/qitan-ai` | 通过 | 入口清晰，文案已改为启探模型、生图、多模态、语音、3D 等能力表达 |
| 工作区开发页 | `http://127.0.0.1:8888/space/7647360047604826112/develop` | 通过 | 显示启探个人工作区、项目开发、智能体和应用条目 |
| 资源库 | `http://127.0.0.1:8888/space/7647360047604826112/library` | 通过 | 工作流资源可见，启探品牌壳层正常 |
| 工作流画布 | `http://127.0.0.1:8888/work_flow?space_id=7647360047604826112&workflow_id=7647380382274289664` | 通过 | 画布可打开，输入/输出已中文化，操作提示正常 |
| 插件探索页 | `http://127.0.0.1:8888/explore/plugin` | 通过 | 插件能力保留，飞书等可见品牌已替换为启探协作 |
| 模板探索页 | `http://127.0.0.1:8888/explore/template` | 通过 | 模板入口可用，英文模板说明已做启探化中文替换 |

## 本轮修复

- 平台入口去掉具体供应商名：`DeepSeek`、`豆包`、`image2` 改为能力类别表达。
- 平台入口“模型供应商”改为“模型服务”，“供应商名称”改为“底层服务名称”。
- 模板页英文说明 `Passionate and open-minded English foreign teacher` 改为课堂英语对话助手说明。
- 模板页 `SalesGenius` 改为“启探销售练习助手”。
- 保持源码构建产物直连 Docker 运行容器。
- 将工作室顶层品牌壳从纯运行时注入推进到 React 源码：`src/layout.tsx` 现在固定输出启探顶栏、返回平台、工作台标识和感谢标识。
- 将启探背景、顶栏、返回入口、感谢标识和核心组件风格补进 `src/global.less`，并把 `playground_prompt`、`build_bot`、`discover` 三个业务主区域的硬白底改为透明画布。
- 精简 `qitan-branding.js` 的静态壳层注入，保留动态中文替换、链接改写、能力地图和视觉兜底，避免源码壳层与脚本壳层重复显示。
- 复验 `http://127.0.0.1:8888/`、`/space/7647360047604826112/develop`、`/space/7647360047604826112/library`、`/explore/template`：启探顶栏、返回平台和感谢标识均只出现一次。

## 后续验收清单

- 创建智能体流程：新建、编辑人设、调试、保存。
- 创建应用流程：模板复制、新应用保存、预览。
- 知识库流程：上传文件、分段、检索测试。
- 插件详情与授权流程：未授权、授权弹窗、OAuth schema。
- 发布流程：智能体发布、应用发布、API/Web SDK 入口。
- 错误和空状态：无权限、404、接口失败、登录过期。
- 视觉源码化：把 `qitan-branding.js` 里的壳层、背景、按钮、卡片样式逐步迁移到源码组件和主题变量。

## 2026-06-04 深度融合追加记录

本轮从“运行时遮盖”继续推进到“配置源头 + locale 源头 + 真实页面验证”：

- 插件筛选弹窗源码改为“启探能力库插件”，并用启探体系图标替换原渠道图标。
- 发布页标题源码改为中文“发布”，聊天背景预览名称改为“启探助手 / 课程同学”。
- 发布渠道默认头像替换为启探 SVG 资产，避免继续使用上游头像素材。
- `backend/conf/model/model_meta.json` 的可见模型名和说明已启探化，移除 `豆包 / Doubao / coze.cn open docs / Coze tools` 等显示残留；保留底层 model id，方便后续替换为自有 AI 接口。
- `backend/conf/model/template/*.yaml` 的模型模板显示名与简介已从 Doubao 系列改为 Qitan/启探表达；文件名和底层 key 未改。
- `backend/conf/plugin/pluginproduct/*.yaml` 的插件产品配置源头已从“飞书 / 豆柴文库 / Coze/1.0”统一为“启探协作 / 启探文库 / Qitan/1.0”；插件 URL 和 path 保持不动，避免破坏调用。
- `studio-i18n-resource` 的中英文 locale value 已大范围统一，发布、卡片、知识库授权、模型管理等深层页面不再直接露出飞书、豆包、扣子等旧品牌词；i18n key 名保持不动。
- Open Chat / Web SDK 公开聊天页 header 的默认 logo 和默认标题已改为启探助手，新增 `qitan-chat-logo.svg`，清掉 `coze-logo.png` 与 `Coze Bot` 默认引用。
- 已重新构建前端并刷新 `qitan-agent-studio-web:local`；已重启 `coze-server` 让挂载的后端配置生效。

验证结果：

- `http://127.0.0.1:8000/#!/qitan-ai` 返回 200。
- `http://127.0.0.1:8888/` 返回 200，`qitan-branding.js` 返回 200。
- 登录后真实浏览器验证通过：
  - `/space/7647360047604826112/develop`
  - `/space/7647360047604826112/library`
  - `/explore/plugin`
  - `/explore/template`
- 插件页已从数据源显示“启探协作任务 / 启探协作云文档 / 启探文库”等文案。
- 工作台、资源库、插件页、模板页均能渲染真实内容，没有复现加载卡死。
- 最终复验时 `qitan-agent-studio-web`、`coze-server`、MySQL、Redis、MinIO、ES、Milvus、Etcd 均处于运行或 healthy 状态。

仍建议下一轮继续做：

- 用浏览器逐步点击创建智能体、创建应用、知识库上传、插件授权和发布/API/Web SDK 详情页。
- 对这些深层页面做截图级检查，把仍依赖运行时替换的零散文案继续沉到源码或配置源头。
- 清理构建产物里仍被打包但不显示的旧图片文件名，例如 `coze-logo.*.png`，评估是否来自未覆盖的资产引用。

## 2026-06-05 深层点击流补充验收

本轮继续从真实浏览器点击流推进，重点覆盖创建资源、发布、知识库上传和插件探索：

- 已重新构建前端并刷新 `qitan-agent-studio-web:local`，`http://127.0.0.1:8000/#!/qitan-ai` 与 `http://127.0.0.1:8888/` 均返回 200。
- 资源库右上按钮已从单独的“资源”改为“创建资源”，避免用户不知道这里可以新建插件、工作流、对话流、知识库、提示词和数据库。
- 创建资源菜单逐项验证通过：插件、工作流、对话流、知识库、提示词、数据库均可打开对应弹窗或流程。
- 知识库创建弹窗已把“输入数据集名称 / 输入数据集内容的描述”改为“输入知识库名称 / 输入知识库内容的描述”，并重新构建进容器。
- 插件创建弹窗已把 `Plugin创建指引` 改为“插件创建指引”。
- 工作流、对话流、提示词、数据库创建弹窗均已通过真实浏览器检查，未命中 Coze、扣子、飞书、豆包、Doubao、Feishu、Lark 等可见旧品牌词。
- 已进入已有智能体详情页和应用 IDE，并验证发布页：
  - 智能体发布页保留 API 与聊天 SDK 发布能力。
  - 应用发布页保留 API 或 SDK 发布能力。
  - `Chat SDK` 与 `Chatflow` 已通过前端 locale 和 `qitan-branding.js` 运行态兜底替换为“聊天 SDK”和“对话流”。
- 已进入知识库创建后的上传步骤，上传、创建设置、分段预览、数据处理等步骤可见，未出现“数据集”或旧品牌残留。
- 本轮创建的临时知识库已通过 `/api/knowledge/delete` 删除，避免污染资源库。
- 插件探索页已验证：本地插件、未授权状态、启探协作类插件说明均可见，未命中旧品牌词；开源版插件列表当前主要停留在卡片列表入口，未观察到独立详情路由跳转。

仍需后续继续收口：

- 若要让后端返回的“聊天 SDK / 启探开放渠道”完全脱离运行时替换，需要重建或替换 `coze-server` 后端镜像；本轮已先把后端源码中的可见字符串改好。
- 插件授权弹窗仍建议用具体未授权插件在可交互环境中继续点开确认，因为当前卡片列表未触发详情路由。
- 继续把 `qitan-branding.js` 中剩余大面积视觉兜底迁移到源码组件和设计变量，降低运行时覆盖比例。

## 2026-06-05 启探外壳深度融合与减浮层记录

本轮继续处理“看起来仍像原项目”和“背景/浮层过重”的问题，重点把启探壳层从讲解式悬浮装饰改成轻量平台外壳：

- `frontend/apps/coze-studio/src/layout.tsx` 删除大块固定浮层：能力地图、课堂生产线、课程能力台、底部能力条不再占用主工作区。
- 顶部源码外壳改为启探工作台结构：左侧品牌与课程生产台说明，中间保留“观察 / 设计 / 生成 / 调试”流程标签和“智能体 / 应用 / 工作流 / 知识库”等短能力标签。
- `frontend/apps/coze-studio/src/global.less` 调整背景透明度、顶栏阴影、工作区边框和右上安全间距，让主工作区更干净，不再被说明卡片包围。
- `frontend/apps/coze-studio/public/qitan-branding.js` 同步运行时兜底样式，避免旧脚本把页面覆盖回原来的大浮层布局。
- 保留“返回启探平台”和“感谢开源社区提供底层技术支持”两个必要标识；感谢标识降为右下角低存在感角标。
- 重新构建前端并刷新 `qitan-agent-studio-web:local` 容器。

验证结果：

- `http://127.0.0.1:8888/` 返回 200，`qitan-branding.js` 返回 200。
- 真实浏览器登录后检查通过：
  - `data-qitan-shell/stage/capabilities/credit/bridge/viewtag` 均只出现 1 次。
  - `data-qitan-map/routecard/labrail/workbench-strip` 均为 0，旧大浮层已移除。
  - 可见文本未命中 `Coze / 扣子 / 飞书 / 豆包`。
  - 截图保存为 `C:\Users\huank\.codex\tmp\qitan-integrated-shell-v3.png`。
- 已恢复本地启探平台预览服务：
  - `http://127.0.0.1:8000/#!/qitan-ai` 返回 200。
  - `http://127.0.0.1:8000/api/qitan-ai/config` 返回 `studioUrl: http://localhost:8888`。
  - 从智能体工坊点击“返回启探平台”可跳转到 `http://localhost:8000/#!/qitan-ai`，页面标题为“启探 AI 工坊”。

仍建议下一轮继续收口：

- 继续检查工作流画布、插件授权弹窗和发布 API/SDK 深层页的截图级视觉一致性。
- 逐步把 `qitan-branding.js` 中剩余的按钮、卡片、弹窗等通用样式兜底沉到源码主题或局部组件，保留脚本只做动态旧文案兜底。
- 若要长期运行主平台，建议把 `local-preview-server.js` 纳入一个明确的本地启动脚本或 Docker 编排，避免重启机器后 8000 入口消失。

## 2026-06-05 深层编辑器与工作流画布收口记录

本轮继续处理深层页面仍像原项目、工作流画布加载后视觉空白、次级按钮过度蓝色化的问题：

- 已重新构建前端并刷新 `qitan-agent-studio-web:local` 容器。
- `frontend/apps/coze-studio/src/global.less` 和 `frontend/apps/coze-studio/public/qitan-branding.js` 同步补充启探外壳高度链路：
  - `.qitan-studio-frame` 明确 `height: 100%`。
  - `.qitan-studio-frame__surface` 改为纵向 flex 容器，并设置 `height: 100%`、`box-sizing: border-box`、`min-height: 0` 传递。
  - 修复工作流页面中 `workflow-container / workflow-content / workflow-playground-content` 高度被压成 0 的问题。
- 工作流画布追加启探轻网格底色，节点容器追加浅色边框和启探式低阴影，避免开始/结束节点在白底里看起来像未加载。
- 次级、浅色、边框、无边框按钮继续保持白底/浅底，主发布、添加节点、试运行等明确行动按钮保留启探蓝。
- 运行时文案兜底继续把 `split_messages` 示例改为“课堂消息分段示例”。

验证结果：

- `http://127.0.0.1:8000/#!/qitan-ai` 返回 200。
- `http://127.0.0.1:8888/` 返回 200。
- `http://127.0.0.1:8888/qitan-branding.js` 返回 200。
- Docker 状态正常：`qitan-agent-studio-web` 映射 `127.0.0.1:8888->80`，`coze-server` 运行中，MySQL、Redis、MinIO、ES、Milvus、Etcd 均为 running/healthy。
- 真实浏览器登录后抽检页面：
  - 智能体编辑器 `/space/7647360047604826112/bot/7647373209326583808`
  - 工作流画布 `/work_flow?workflow_id=7647380382274289664&space_id=7647360047604826112`
  - 插件探索 `/explore/plugin`
- 三个页面可见文本均未命中 `Coze / 扣子 / 飞书 / 豆包 / Doubao / Feishu / Lark`。
- 三个页面均显示启探标题和感谢开源社区标识。
- 工作流画布最终尺寸为 `1440 x 834`，开始节点尺寸约 `360 x 92`，结束节点尺寸约 `360 x 118`，不再被压成 0。
- 工作流画布命中“课堂消息分段示例”，节点可命中、可交互。
- 最终截图：
  - `C:\Users\huank\.codex\tmp\qitan-final-agent.png`
  - `C:\Users\huank\.codex\tmp\qitan-final-workflow.png`
  - `C:\Users\huank\.codex\tmp\qitan-final-plugin.png`

后续仍可继续做的细化：

- 对发布 API/SDK 弹窗、插件授权弹窗、知识库分段预览和应用 IDE 继续做截图级审计。
- 把 `qitan-branding.js` 中剩余运行时兜底样式继续沉到源码组件或主题变量，降低运行时覆盖比例。

## 2026-06-05 工作流搭建界面紧急修复记录

用户反馈工作流搭建界面无法添加节点、看不到开始/结束节点、UI 混乱。本轮按真实浏览器复现后确认：

- “添加节点”功能本身未坏，首次进入工作流时的画布交互引导浮层挡在工具栏上，导致用户点击添加节点无反应。
- 开始节点和结束节点在 DOM 中存在，但浅色节点和白色画布对比不足，容易被误认为未加载。
- 主要 UI 混乱来自此前启探全局样式误伤：`[class*=card] / [class*=panel] / [class*=list]` 这类泛选择器会命中工作流内部画布、节点面板和节点卡片，造成多层边框、阴影和面板套娃。

已修复：

- 在 `qitan-branding.js` 中增加工作流首次引导自动确认逻辑，命中“支持两种画布交互模式”浮层后自动点击“知道了”。
- 在 `src/global.less` 和 `qitan-branding.js` 中移除大范围 `card/panel/list` 泛选择器兜底，不再把工作流内部结构当成全站卡片处理。
- 移除运行时脚本中残留的泛 `card/panel` hover 和标题装饰规则，避免节点面板重复边框和阴影。
- 保留 Semi 组件级弹窗、卡片、下拉等启探样式；工作流内部节点面板回归清爽结构。
- 增强开始/结束节点可见度：节点主体改为白底、较明显边框和轻阴影。

验证结果：

- 重新构建前端成功，并刷新 `qitan-agent-studio-web:local` 容器。
- `http://127.0.0.1:8000/#!/qitan-ai` 返回 200。
- `http://127.0.0.1:8888/` 返回 200。
- `http://127.0.0.1:8888/qitan-branding.js` 返回 200。
- Docker 状态正常：`qitan-agent-studio-web` 映射 `127.0.0.1:8888->80`，`coze-server` 运行中，MySQL、Redis、MinIO、ES、Milvus、Etcd 均为 running/healthy。
- 真实浏览器登录进入工作流后：
  - 首次引导浮层已自动消失。
  - 开始节点、结束节点均可见。
  - 点击“添加节点”成功打开节点面板。
  - 节点面板显示插件、大模型、工作流、注释、业务逻辑、输入输出、数据库、知识库等节点类型。
  - 页面未命中 `Coze / 扣子 / 飞书 / 豆包 / Doubao / Feishu / Lark` 可见旧品牌词。
- 验证截图：
  - `C:\Users\huank\.codex\tmp\qitan-workflow-fixed-before-add.png`
  - `C:\Users\huank\.codex\tmp\qitan-workflow-fixed-after-add.png`

## 2026-06-05 启探入口免二次登录桥接记录

用户反馈从启探平台进入智能体工坊后仍保留独立登录页，没有和原项目形成一体化体验。本轮已把本地预览入口改为主项目服务端桥接登录：

- 在 `mlforkids-api/local-preview-server.js` 新增 `/api/qitan-ai/studio-sso`。
- 主项目服务端使用本地桥接账号调用工作台登录接口，取得 `session_key` 后由 `8000` 端写入同主机 cookie，再 302 跳转到 `8888` 工作区。
- `/api/qitan-ai/config` 和 `/api/qitan-ai/health` 增加 `studioEntryUrl`，同时保留 `studioUrl` 作为真实工作台地址。
- `public/components/qitan_ai/qitan_ai.js` 改为优先使用 `studioEntryUrl`，不再从入口按钮拼接 `/sign?redirect=/space`。
- 已重新运行 `npm.cmd run js:minify`，构建产物 `web/static/mlapp.min.js` 已包含 `studio-sso`。
- 已重启本地预览服务，当前 `8000` 端口由新进程提供。

验证结果：

- `GET http://127.0.0.1:8000/api/qitan-ai/config` 返回 `studioEntryUrl: /api/qitan-ai/studio-sso?next=%2Fspace`。
- `GET http://127.0.0.1:8000/api/qitan-ai/studio-sso?next=%2Fspace` 返回 302，并写入 `session_key`。
- 真实 Chrome 会话从 SSO 入口进入后最终落点为 `http://127.0.0.1:8888/space/7647360047604826112/develop`。
- 浏览器页面文本显示“启探智能体工坊 / 工作空间 / 创建 / 智能体 / 应用 / 工作流 / 知识库”等内容，没有停留在登录页。

说明：

- 这是本地开发预览的一体化登录桥接，避免用户在启探入口后再次看到工作台独立登录页。
- 后续生产环境建议把该桥接替换为正式 OIDC/Casdoor SSO 或后端统一身份适配，桥接账号继续只保留在服务端环境变量中。

## 2026-06-05 平台入口意图桥接与双壳层清理记录

本轮把“从启探平台进入某一项生产能力”的体验继续向业务级融合推进，重点解决入口跳转后缺少上下文、以及 Studio 内出现两套启探壳层的问题：

- `mlforkids-api/local-preview-server.js` 的 `/api/qitan-ai/studio-sso` 增加 `qitan_intent` 提取与短时 cookie 写入。
- `/api/qitan-ai/config` 中的课程助手、知识库、工作流入口继续通过 SSO 进入，但会分别携带 `course-assistant`、`knowledge-base`、`workflow` 意图。
- `frontend/apps/coze-studio/public/qitan-branding.js` 增加入口意图恢复逻辑，按 URL、`sessionStorage`、cookie 顺序读取上下文。
- Studio 工作台新增非阻塞中文引导卡：创建课程助手、准备课程知识库、编排一键生成流程。
- 统一旧“返回启探平台”文案为“返回启探入口”。
- `frontend/apps/coze-studio/src/layout.tsx` 删除此前内置的旧启探顶栏、返回按钮、能力标签和感谢标识，避免和新版运行时壳层重复显示。
- 重新构建前端并刷新 `qitan-agent-studio-web:local` 容器。
- 重启 `mlforkids-api/local-preview-server.js`，当前主平台入口继续监听 `8000`。

验证结果：

- `GET http://127.0.0.1:8000/api/qitan-ai/config` 返回 200，入口包含进入生产台、课程助手、知识库、工作流。
- `GET http://127.0.0.1:8000/api/qitan-ai/studio-sso?next=%2Fspace%3Fqitan_intent%3Dworkflow` 返回 302，目标为 `http://127.0.0.1:8888/space?qitan_intent=workflow`，并写入 `session_key` 与短时 `qitan_intent=workflow`。
- `GET http://127.0.0.1:8888/qitan-branding.js` 返回 200，脚本包含 `qitan-intentcard` 与 `qitan_intent`，未再包含字面量“返回启探平台”。
- 真实 Chrome 会话从主平台 SSO 进入后最终落点为 `http://127.0.0.1:8888/space/7647360047604826112/develop`。
- 工作流入口显示“编排一键生成流程”引导。
- 课程助手入口显示“创建课程助手”引导。
- 知识库入口显示“准备课程知识库”引导。
- 页面不再出现旧内置壳层中的“发布/API”和“返回启探平台”，只保留新版“返回启探入口”、平台快捷导航、能力地图、课堂生产线和感谢开源社区标识。
## 2026-06-05 真实模型接入与运行时桥接记录

本轮开始把“后续替换为启探自有模型接口”的要求落实为统一配置层：

- 主平台 `local-preview-server.js` 和 `src/lib/restapi/qitanai.ts` 已支持 OpenAI-compatible 聊天接口代理，优先读取 `QITAN_AI_*`，并兼容 `QITAN_LLM_*`。
- Studio 后端源码已补充 `QITAN_LLM_*` 与 `QITAN_EMBEDDING_*` 原生读取逻辑，覆盖智能体、应用、工作流大模型节点、内置知识助手和知识库向量化配置。
- 新增 `docker/docker-compose.qitan-server.yml`，用于在 Docker Hub 基础镜像可拉取时把 `coze-server` 构建为 `qitan-agent-studio-server:local`。
- 由于当前 Docker Hub 拉取 `golang:1.24-alpine` / `alpine:3.22.0` 认证请求失败，本地后端镜像暂未构建成功。
- 已在 `docker/docker-compose.qitan.yml` 增加运行时桥接：即使继续使用官方后端镜像，填入 `docker/.env` 的 `QITAN_LLM_*` / `QITAN_EMBEDDING_*` 也会映射到官方镜像已支持的 `MODEL_*`、`BUILTIN_CM_OPENAI_*`、`OPENAI_EMBEDDING_*`。
- 已执行 `docker compose -f docker-compose.yml -f docker-compose.qitan.yml up -d --no-build coze-server`，当前 `coze-server` 已重建并带有桥接后的环境变量；因为 `.env` 仍为空占位，容器未连接任何真实模型。

验证结果：

- `docker compose ... config --format json` 验证临时 `QITAN_LLM_*` 会注入 `MODEL_PROTOCOL_0`、`MODEL_ID_0`、`MODEL_BASE_URL_0`、`BUILTIN_CM_OPENAI_MODEL`。
- 临时 `QITAN_EMBEDDING_*` 会注入 `EMBEDDING_TYPE=openai`、`OPENAI_EMBEDDING_BASE_URL`、`OPENAI_EMBEDDING_MODEL`、`OPENAI_EMBEDDING_DIMS`。
- `http://127.0.0.1:8888/` 返回 200，且页面包含启探品牌脚本。
- `http://127.0.0.1:8000/api/qitan-ai/config` 返回 200，当前 `chatEnabled=false`，符合未配置真实模型地址的状态。
- `POST http://127.0.0.1:8000/api/qitan-ai/chat` 返回 503 中文提示“模型服务地址尚未配置”，说明路由可用，等待真实网关配置。

## 2026-06-05 小米 MiMo 与启探生图网关复验记录

本轮已把真实模型配置从“待接入”推进到可调用状态，并保持“一个启探模型网关入口，按能力分发不同模型服务”的结构：

- 主平台 `.env.local` 已配置统一文本/智能体网关，当前文本模型为 `mimo-v2.5-pro`，供应商标识为 `xiaomi-mimo`。
- Studio active `docker/.env` 已配置同一套统一网关变量，`docker-compose.qitan.yml` 会把它派生到官方后端镜像可识别的 `MODEL_*` 与 `BUILTIN_CM_OPENAI_*`。
- 生图能力使用独立图片生成服务，用户侧能力名称仍保留为 `image2`，实际可调用模型 id 为 `gpt-image-2`。
- embedding 尚未配置；当前没有把小米聊天模型误接到知识库向量化，避免知识库/RAG 产生错误行为。

复验结果：

- 主平台 `npm.cmd run compile` 通过。
- `node --check local-preview-server.js` 通过。
- `GET http://127.0.0.1:8000/api/qitan-ai/config` 返回 `chatEnabled=true`、`imageConfigured=true`、`model=mimo-v2.5-pro`、`provider=xiaomi-mimo`。
- `POST http://127.0.0.1:8000/api/qitan-ai/chat` 经启探代理返回中文回复。
- `POST http://127.0.0.1:8000/api/qitan-ai/invoke` 使用 `abilityId=image` 返回 1 张 base64 图片。
- `http://127.0.0.1:8888/` 返回 200，页面仍包含启探品牌脚本。
- `coze-server`、`qitan-agent-studio-web`、MySQL、Redis、MinIO、Elasticsearch、Milvus、Etcd 均处于 running/healthy 状态。
- 示例、文档、源码和 Docker 覆盖文件未命中真实 key 前缀；真实 key 仅保留在本机 ignored env 文件中。

## 2026-06-05 Agnes AI 网关切换记录

本轮按用户提供的新网关把启探统一文本/智能体入口切换为 Agnes AI：

- 用户提供的完整聊天地址为 `https://apihub.agnes-ai.com/v1/chat/completions`；实际 env 使用 base URL `https://apihub.agnes-ai.com/v1`，继续由默认 chat path 拼接。
- 主平台 `.env.local` 已更新为 `QITAN_MODEL_GATEWAY_PROVIDER=agnes-ai`、`QITAN_MODEL_CHAT=agnes-2.0-flash`、`QITAN_MODEL_AGENT=agnes-2.0-flash`。
- Studio active `docker/.env` 已同步更新 `QITAN_MODEL_GATEWAY_NAME=Agnes AI`、`QITAN_MODEL_CHAT=agnes-2.0-flash`、`QITAN_MODEL_AGENT=agnes-2.0-flash`。
- 生图能力暂不改动，仍保留此前已验证的启探生图服务配置。
- embedding 仍未配置，继续避免把聊天模型误接到知识库向量化。

复验结果：

- 主平台 `npm.cmd run compile` 与 `node --check local-preview-server.js` 均通过。
- 已重启主平台 8000 预览服务，`GET /api/qitan-ai/config` 返回 `provider=agnes-ai`、`model=agnes-2.0-flash`、`chatEnabled=true`。
- `POST /api/qitan-ai/chat` 已通过启探代理调用 Agnes AI，并返回中文确认回复。
- 已修复 Studio active `docker/.env` 的 UTF-8 BOM 编码问题，避免后端 env parser 因 BOM 启动失败。
- 已强制重建并启动 `coze-server` 容器，最近日志未命中 panic/error。
- `docker compose ... config --format json` 显示 `MODEL_NAME_0=Agnes AI`、`MODEL_ID_0=agnes-2.0-flash`、`MODEL_BASE_URL_0=https://apihub.agnes-ai.com/v1`、`BUILTIN_CM_OPENAI_MODEL=agnes-2.0-flash`。
- `http://127.0.0.1:8888/` 返回 200，启探品牌脚本仍存在。
- secret scan 确认示例、文档、源码和 Docker 覆盖文件未写入真实 key；真实 key 仅保留在 ignored env 文件中。

## 2026-06-05 千问 Embedding 预接入记录

本轮按用户要求先预接入千问 embedding，但不写入 API key：

- 主平台 `.env.local.example` 已把默认 embedding 模型改为 `text-embedding-v4`。
- Studio `docker/.env.example` 与 active `docker/.env` 已预置 `QITAN_EMBEDDING_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1`、`QITAN_EMBEDDING_MODEL=text-embedding-v4`、`QITAN_EMBEDDING_DIMS=1024`。
- `QITAN_EMBEDDING_PROTOCOL` 和 `QITAN_EMBEDDING_API_KEY` 继续留空，避免在没有 key 的情况下启用知识库向量化服务。
- 后续拿到 key 后，将 `QITAN_EMBEDDING_PROTOCOL=openai` 并填入 key，再重启 `coze-server` 做知识库上传、分段、向量化和召回复验。

## 2026-06-05 最终收口审计与清理记录

本轮按最终交付前检查做了四类审计：运行健康、用户可见旧品牌、临时产物、部署配置。

发现并修复：

- 主平台 `AI 能力中心` 仍有可见供应商文案 `DeepSeek / 豆包 / 通义`，已改为“启探模型网关、开放兼容模型服务和多模态服务”。
- 主平台能力配置里视觉服务默认 provider 仍有“豆包视觉”，已改为“启探视觉服务 / OpenAI-compatible vision”。
- 主项目临时浏览器截图目录 `tmp/`、OIDC 验证截图 `tmp-oidc-shots/`、本地预览日志 `local-api.*.log`、运行日志 `logs/*.log*` 已清理。
- `.codex/tmp` 下本轮生成的 `qitan-*.png` 截图和 `qitan-*` 临时浏览器 profile 已清理；保留 `coze-studio-qitan` 源码目录。

有意保留：

- `logs/README.md` 是主项目 Git 跟踪的占位文件，未删除。
- `dist/` 是主平台 TypeScript 编译输出，`npm start` 和测试脚本依赖，未删除。
- Studio 源码中 `coze` 包名、目录名、copyright、接口路径、插件底层 OAuth URL、模型底层 id 仍保留；这些属于开源底座和兼容调用标识，不作为用户可见品牌处理。
- `docker-compose.qitan-server.yml` 保留为后续本地构建启探后端镜像的入口；当前 Docker Hub 基础镜像拉取失败时，继续通过 `docker-compose.qitan.yml` 的运行时桥接接入真实模型。

复验结果：

- 主平台 `npm.cmd run compile`、`npm.cmd run html`、`npm.cmd run js:minify`、`npm.cmd run css` 均通过。
- `http://127.0.0.1:8000/#!/qitan-ai` 返回 200。
- `http://127.0.0.1:8000/api/qitan-ai/config` 返回 200，`chatEnabled=false` 符合未填真实模型网关的状态。
- `http://127.0.0.1:8888/` 返回 200，`qitan-branding.js` 返回 200 且仍包含入口意图桥接逻辑。
