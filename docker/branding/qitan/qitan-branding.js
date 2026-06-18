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

(function () {
  var title = '\u542f\u63a2\u667a\u80fd\u4f53\u5de5\u574a';
  var qitan = '\u542f\u63a2';
  var credit = '\u611f\u8c22\u5f00\u6e90\u793e\u533a\u63d0\u4f9b\u5e95\u5c42\u6280\u672f\u652f\u6301';
  var platformUrl = window.QITAN_PLATFORM_URL || inferPlatformUrl() || 'http://127.0.0.1:18000/#!/qitan-ai';
  var platformOrigin = inferPlatformOrigin();
  var embedded = isEmbedded();
  var legacyName = String.fromCharCode(67, 111, 122, 101);
  var legacyLowerName = legacyName.toLowerCase();
  var legacyCn = String.fromCharCode(25187, 23376);
  var titleObserverInstalled = false;
  var replacements = [
    [/\u6b22\u8fce\u4f7f\u7528\u542f\u63a2-\u5f00\u6e90\u7248/g, '\u6b22\u8fce\u4f7f\u7528' + title],
    [/\u6b22\u8fce\u4f7f\u7528\u542f\u63a2-\u542f\u63a2\u667a\u80fd\u4f53\u5de5\u574a/g, '\u6b22\u8fce\u8fdb\u5165' + title],
    [/\u6b22\u8fce\u4f7f\u7528\u542f\u63a2\u542f\u63a2\u667a\u80fd\u4f53\u5de5\u574a/g, '\u6b22\u8fce\u8fdb\u5165' + title],
    [/\u542f\u63a2-\u5f00\u6e90\u7248/g, title],
    [/\u5f00\u6e90\u7248/g, title],
    [/\u5f00\u6e90\u534f\u8bae/g, '\u6280\u672f\u652f\u6301\u8bf4\u660e'],
    [/Open source protocol/gi, '\u6280\u672f\u652f\u6301\u8bf4\u660e'],
    [/Open source license/gi, '\u6280\u672f\u652f\u6301\u8bf4\u660e'],
    [new RegExp('\u8fd4\u56de\\s*' + legacyName, 'g'), '\u8fd4\u56de\u542f\u63a2\u5e73\u53f0'],
    [new RegExp('Back to\\s*' + legacyName, 'gi'), '\u8fd4\u56de\u542f\u63a2\u5e73\u53f0'],
    [new RegExp(legacyName + ' Studio', 'g'), title],
    [new RegExp(legacyName + ' Official', 'g'), qitan + '\u5b98\u65b9'],
    [new RegExp('\\b' + legacyName + '\\b', 'g'), qitan],
    [new RegExp('@' + legacyLowerName + '-studio\\/app', 'g'), title],
    [new RegExp('\u8fd4\u56de\\s*' + legacyCn, 'g'), '\u8fd4\u56de\u542f\u63a2\u5e73\u53f0'],
    [new RegExp(legacyCn, 'g'), qitan],
    [/\u8fd4\u56de\s*\u542f\u63a2(?!\u5e73\u53f0)/g, '\u8fd4\u56de\u542f\u63a2\u5e73\u53f0'],
    [/\u667a\u80fd\u4f53\u3001\u5e94\u7528\u548c\u5de5\u4f5c\u6d41\u751f\u4ea7\u53f0/g, '\u8bfe\u5802\u667a\u80fd\u4f53\u642d\u5efa\u5de5\u4f5c\u53f0'],
    [/\u667a\u80fd\u4f53\u751f\u4ea7\u53f0/g, '\u667a\u80fd\u4f53\u642d\u5efa\u52a9\u624b'],
    [/\u751f\u4ea7\u53f0/g, '\u642d\u5efa\u5de5\u4f5c\u53f0'],
    [/\u9879\u76ee\u5f00\u53d1/g, '\u667a\u80fd\u4f53\u9879\u76ee'],
    [/\u8bfe\u7a0b(?:\u8bfe\u7a0b)+\u8d44\u6e90\u5e93/g, '\u8bfe\u7a0b\u8d44\u6e90\u5e93'],
    [/(^|[^\u7a0b])\u8d44\u6e90\u5e93/g, '$1\u8bfe\u7a0b\u8d44\u6e90\u5e93'],
    [/\u65e0\u6cd5\u67e5\u770b\u7a7a\u95f4/g, '\u8bf7\u5148\u767b\u5f55\u542f\u63a2\u667a\u80fd\u4f53\u5de5\u574a'],
    [/Request failed with status code 401/gi, '\u767b\u5f55\u72b6\u6001\u5df2\u8fc7\u671f\uff0c\u8bf7\u91cd\u65b0\u8fdb\u5165\u542f\u63a2\u667a\u80fd\u4f53\u5de5\u574a'],
    [/Personal Space/g, '\u542f\u63a2\u4e2a\u4eba\u5de5\u4f5c\u533a'],
    [/This is your personal space/g, '\u8fd9\u91cc\u662f\u4f60\u7684\u542f\u63a2\u667a\u80fd\u4f53\u5de5\u4f5c\u533a'],
    [/\u5de5\u4f5c\u6d41\u540d\u79f0\u53ea\u5141\u8bb8\u5b57\u6bcd\u3001\u6570\u5b57\u548c\u4e0b\u5212\u7ebf\uff0c\u5e76\u4ee5\u5b57\u6bcd\u5f00\u5934/g, '\u5de5\u4f5c\u6d41\u540d\u79f0\u53ef\u4f7f\u7528\u4e2d\u6587\u3001\u5b57\u6bcd\u3001\u6570\u5b57\u548c\u4e0b\u5212\u7ebf\uff0c\u4e14\u4e0d\u80fd\u4ee5\u6570\u5b57\u5f00\u5934'],
    [/\bBot\b/g, '\u667a\u80fd\u4f53'],
    [/\bBots\b/g, '\u667a\u80fd\u4f53'],
    [/\bAgent\b/g, '\u667a\u80fd\u4f53'],
    [/\bAgents\b/g, '\u667a\u80fd\u4f53'],
    [/\bProject\b/g, '\u9879\u76ee'],
    [/\bProjects\b/g, '\u9879\u76ee'],
    [/\bWorkflow\b/g, '\u5de5\u4f5c\u6d41'],
    [/\bWorkflows\b/g, '\u5de5\u4f5c\u6d41'],
    [/\bKnowledge\b/g, '\u77e5\u8bc6\u5e93'],
    [/\bDataset\b/g, '\u77e5\u8bc6\u5e93'],
    [/\bDatasets\b/g, '\u77e5\u8bc6\u5e93'],
    [/\bPlugin\b/g, '\u63d2\u4ef6'],
    [/\bPlugins\b/g, '\u63d2\u4ef6'],
    [/\bStore\b/g, '\u80fd\u529b\u5e93'],
    [/\bExplore\b/g, '\u63a2\u7d22'],
    [/\bCreate\b/g, '\u521b\u5efa'],
    [/\bDraft\b/g, '\u8349\u7a3f'],
    [/\bPublished\b/g, '\u5df2\u53d1\u5e03'],
    [/\bRecently opened\b/gi, '\u6700\u8fd1\u6253\u5f00'],
    [/\bFavorite\b/g, '\u6536\u85cf'],
    [/\bFavorites\b/g, '\u6536\u85cf'],
    [/\bSettings\b/g, '\u8bbe\u7f6e'],
    [/\bSearch\b/g, '\u641c\u7d22'],
    [/\bCancel\b/g, '\u53d6\u6d88'],
    [/\bConfirm\b/g, '\u786e\u8ba4'],
    [/\bDelete\b/g, '\u5220\u9664'],
    [/\bDescription\b/g, '\u8bf4\u660e'],
    [/\bName\b/g, '\u540d\u79f0'],
    [/\bType\b/g, '\u7c7b\u578b'],
    [/\bStatus\b/g, '\u72b6\u6001'],
    [/\bInput\b/g, '\u8f93\u5165'],
    [/\bOutput\b/g, '\u8f93\u51fa'],
    [/\bParameter\b/g, '\u53c2\u6570'],
    [/\bParameters\b/g, '\u53c2\u6570'],
    [/\bRequired\b/g, '\u5fc5\u586b'],
    [/\bOptional\b/g, '\u53ef\u9009'],
    [/\bSave\b/g, '\u4fdd\u5b58'],
    [/\bEdit\b/g, '\u7f16\u8f91'],
    [/\bPublish\b/g, '\u53d1\u5e03'],
    [/\bDuplicate\b/g, '\u590d\u5236'],
    [/\bCopy\b/g, '\u590d\u5236'],
    [/\bPreview\b/g, '\u9884\u89c8'],
    [/\bDebug\b/g, '\u8c03\u8bd5'],
    [/\bRun\b/g, '\u8fd0\u884c'],
    [/\bTest\b/g, '\u6d4b\u8bd5'],
    [/\bTemplate\b/g, '\u6a21\u677f'],
    [/\bTemplates\b/g, '\u6a21\u677f'],
    [/\bTools\b/g, '\u5de5\u5177'],
    [/\bTool\b/g, '\u5de5\u5177'],
    [/\bsplit_messages\b/g, '\u957f\u6d88\u606f\u62c6\u5206\u793a\u4f8b'],
    [/Authorization Code/g, '\u6388\u6743\u7801\u6a21\u5f0f'],
    [/\bclient_id\b/g, '\u5ba2\u6237\u7aef ID'],
    [/\bclient_secret\b/g, '\u5ba2\u6237\u7aef\u5bc6\u94a5'],
    [/\bclient_url\b/g, '\u63a5\u53e3\u5730\u5740'],
    [/\bscope\b/g, '\u6388\u6743\u8303\u56f4'],
    [/\bauthorization_url\b/g, '\u6388\u6743\u5730\u5740'],
    [/\bauthorization_content_type\b/g, '\u6388\u6743\u5185\u5bb9\u7c7b\u578b']
  ];
  var attrs = ['title', 'alt', 'aria-label', 'placeholder', 'data-tooltip', 'data-title'];

  function isTrustedPlatformReferrer(referrer) {
    var host = referrer.hostname.toLowerCase();
    var currentHost = window.location.hostname.toLowerCase();
    return host === currentHost || host === '127.0.0.1' || host === 'localhost' || host === '::1' || host.indexOf('qitan') >= 0;
  }

  function inferPlatformUrl() {
    try {
      if (!document.referrer) {
        return '';
      }
      var referrer = new URL(document.referrer);
      if (referrer.origin && referrer.origin !== window.location.origin && isTrustedPlatformReferrer(referrer)) {
        return referrer.origin + '/#!/qitan-ai';
      }
    } catch (error) {
      return '';
    }
    return '';
  }

  function inferPlatformOrigin() {
    var fallback = 'http://127.0.0.1:18000';
    try {
      if (window.QITAN_PLATFORM_ORIGIN) {
        return new URL(window.QITAN_PLATFORM_ORIGIN, window.location.href).origin;
      }
    } catch (error) {
      // fall through to the configured platform url
    }
    try {
      if (platformUrl) {
        return new URL(platformUrl, window.location.href).origin;
      }
    } catch (error) {
      // fall through to referrer inference
    }
    try {
      if (document.referrer) {
        var referrer = new URL(document.referrer);
        if (referrer.origin && referrer.origin !== window.location.origin && isTrustedPlatformReferrer(referrer)) {
          return referrer.origin;
        }
      }
    } catch (error) {
      return fallback;
    }
    return fallback;
  }

  function normalizeStudioNext(nextPath) {
    var fallback = '/space';
    if (!nextPath) {
      return fallback;
    }
    try {
      var parsed = new URL(nextPath, window.location.origin);
      if (parsed.origin !== window.location.origin) {
        return fallback;
      }
      var normalized = parsed.pathname + parsed.search + parsed.hash;
      if (!normalized || normalized.indexOf('//') === 0 || isAuthEntryPath(normalized)) {
        return fallback;
      }
      return normalized.charAt(0) === '/' ? normalized : '/' + normalized;
    } catch (error) {
      return fallback;
    }
  }

  function getStudioSsoUrl(nextPath) {
    return platformOrigin.replace(/\/$/, '') + '/api/qitan-ai/studio-sso?next=' + encodeURIComponent(normalizeStudioNext(nextPath));
  }

  function isAuthEntryPath(value) {
    var path = String(value || (location.pathname + location.hash)).toLowerCase();
    return path.indexOf('/sign') >= 0 || path.indexOf('/login') >= 0 || path.indexOf('/register') >= 0;
  }

  function getAuthReturnPath() {
    try {
      var params = new URLSearchParams(location.search);
      var hinted = params.get('next') || params.get('redirect') || params.get('redirect_uri');
      if (hinted) {
        return normalizeStudioNext(hinted);
      }
    } catch (error) {
      // ignore malformed query strings
    }
    try {
      if (document.referrer) {
        var referrer = new URL(document.referrer);
        if (referrer.origin === window.location.origin) {
          return normalizeStudioNext(referrer.pathname + referrer.search + referrer.hash);
        }
      }
    } catch (error) {
      // ignore referrer parse errors
    }
    return '/space';
  }

  function isEmbedded() {
    try {
      return window.self !== window.top;
    } catch (error) {
      return true;
    }
  }

  var themeCss = [
    ':root{--qitan-ink:#17233f;--qitan-muted:#4d5d7d;--qitan-line:#17233f;--qitan-blue:#2f80ed;--qitan-sky:#76c7ff;--qitan-teal:#18a999;--qitan-coral:#ff6b6b;--qitan-yellow:#ffd166;--qitan-cream:#fff7d6;--qitan-paper:#ffffff;--qitan-soft:#f4fbff;--light-color-brand-brand-5:#2f80ed!important;--coz-fg-hglt:#2f80ed!important;--coz-fg-hglt-plus:#ffffff!important;--coz-mg-hglt:#eef8ff!important;--coz-mg-hglt-hovered:#dff1ff!important;--coz-mg-hglt-pressed:#cce8ff!important;--coz-mg-hglt-plus:#2f80ed!important;--coz-mg-hglt-plus-hovered:#126fd7!important;--coz-mg-hglt-plus-pressed:#0f5fb8!important;--coz-stroke-hglt:#2f80ed!important;--coz-bg-plus:rgba(255,255,255,.86)!important;}',
    'html,body,#root{min-height:100%!important;}',
    'html{background:#f4fbff!important;}',
    'body{margin:0!important;color:var(--qitan-ink)!important;letter-spacing:0!important;font-family:"Microsoft YaHei UI","Microsoft YaHei","PingFang SC","Noto Sans SC","Arial Rounded MT Bold",Arial,sans-serif!important;background:linear-gradient(90deg,rgba(246,252,255,.96) 0%,rgba(246,252,255,.86) 48%,rgba(255,255,255,.60) 100%),url("/qitan-workbench-texture.png") center top/cover no-repeat fixed!important;}',
    'body[data-qitan-surface="entry"]{background:linear-gradient(90deg,rgba(246,252,255,.98) 0%,rgba(246,252,255,.92) 36%,rgba(255,255,255,.44) 62%,rgba(255,247,220,.26) 100%),url("/qitan-studio-bg-v2.png") center top/cover no-repeat fixed!important;}',
    'body[data-qitan-surface="workbench"]{background:linear-gradient(90deg,rgba(246,252,255,.92) 0%,rgba(246,252,255,.72) 42%,rgba(255,255,255,.36) 68%,rgba(255,247,220,.24) 100%),url("/qitan-workbench-bg-v3.png") center top/cover no-repeat fixed!important;}',
    'body[data-qitan-surface="workflow"]{background:linear-gradient(90deg,rgba(246,252,255,.94) 0%,rgba(246,252,255,.78) 44%,rgba(255,255,255,.44) 72%,rgba(239,251,247,.30) 100%),url("/qitan-workflow-bg.png") center center/cover no-repeat fixed!important;}',
    'body:before{content:"";position:fixed;inset:0;z-index:-2;pointer-events:none;background:linear-gradient(90deg,rgba(23,35,63,.06) 1px,transparent 1px) 0 0/32px 32px,linear-gradient(180deg,rgba(23,35,63,.04) 1px,transparent 1px) 0 0/32px 32px,linear-gradient(180deg,transparent 0 54px,rgba(35,136,255,.055) 55px,transparent 56px) 0 0/100% 112px;}',
    'body:after{content:"";position:fixed;inset:14px;z-index:2147483000;pointer-events:none;border:2px solid rgba(23,35,63,.08);border-radius:8px;box-shadow:inset 0 0 0 1px rgba(255,255,255,.66);}',
    '#root{position:relative!important;isolation:isolate!important;min-height:100vh!important;background:linear-gradient(180deg,rgba(255,255,255,.66),rgba(244,251,255,.34) 44%,rgba(255,255,255,.18))!important;}',
    'body[data-qitan-ready="1"] #root{padding-top:72px!important;box-sizing:border-box!important;}',
    'body[data-qitan-ready="1"] #root:before{content:"";position:fixed;left:12px;right:12px;top:72px;bottom:12px;z-index:-1;border:2px solid rgba(23,35,63,.12);border-radius:8px;background:linear-gradient(135deg,rgba(255,255,255,.48),rgba(238,248,255,.34) 52%,rgba(255,247,220,.24));box-shadow:8px 8px 0 rgba(23,35,63,.045);pointer-events:none;}',
    'body[data-qitan-embedded="1"][data-qitan-ready="1"] #root{padding-top:0!important;}',
    'body[data-qitan-embedded="1"][data-qitan-ready="1"] #root:before{top:8px!important;}',
    'body[data-qitan-embedded="1"] .qitan-studio-frame__surface{padding-top:0!important;}',
    'body[data-qitan-embedded="1"] .qitan-studio-frame:before{top:8px!important;}',
    'body[data-qitan-embedded="1"] [data-qitan-shell],body[data-qitan-embedded="1"] [data-qitan-bridge]{display:none!important;}',
    '#root:empty:before{content:"\\542f\\63a2\\667a\\80fd\\4f53\\5de5\\574a"!important;position:fixed;left:50%;top:44%;transform:translate(-50%,-50%);padding:22px 30px;border:3px solid var(--qitan-line);border-radius:8px;background:rgba(255,255,255,.96);box-shadow:10px 10px 0 rgba(23,35,63,.14);color:var(--qitan-ink);font-size:24px;font-weight:900;}',
    '#root:empty:after{content:"\\6b63\\5728\\52a0\\8f7d\\667a\\80fd\\4f53\\751f\\4ea7\\53f0"!important;position:fixed;left:50%;top:calc(44% + 64px);transform:translateX(-50%);color:var(--qitan-muted);font-size:14px;font-weight:800;}',
    '[data-qitan-shell]{position:fixed;left:0;right:0;top:0;z-index:2147483600;display:flex;align-items:center;gap:10px;height:58px;padding:0 18px;border:0;border-bottom:2px solid rgba(23,35,63,.14);border-radius:0;background:linear-gradient(90deg,rgba(255,255,255,.94),rgba(238,248,255,.90) 58%,rgba(255,247,220,.86));box-shadow:0 8px 0 rgba(23,35,63,.055);backdrop-filter:blur(14px);pointer-events:none;color:var(--qitan-ink);box-sizing:border-box;}',
    '[data-qitan-mark]{display:grid;place-items:center;width:34px;height:34px;border:2px solid var(--qitan-line);border-radius:8px;background:var(--qitan-yellow);font-weight:900;font-size:18px;}',
    '[data-qitan-side-logo]{display:grid;place-items:center;width:40px;height:40px;border:2px solid var(--qitan-line);border-radius:8px;background:linear-gradient(135deg,var(--qitan-yellow),#fff7dc);box-shadow:4px 4px 0 rgba(23,35,63,.12);color:var(--qitan-ink);font-size:20px;font-weight:900;font-family:"Microsoft YaHei","PingFang SC","Noto Sans SC",Arial,sans-serif;}',
    '[data-qitan-shell-title]{display:flex;flex-direction:column;gap:1px;line-height:1.2;}',
    '[data-qitan-shell-title] strong{font-size:14px;font-weight:900;}',
    '[data-qitan-shell-title] span{font-size:11px;font-weight:800;color:var(--qitan-muted);}',
    '[data-qitan-pill]{display:inline-flex;align-items:center;height:24px;padding:0 8px;border:1px solid rgba(23,35,63,.14);border-radius:8px;background:#eef8ff;color:var(--qitan-blue);font-size:11px;font-weight:900;}',
    '[data-qitan-stage]{position:fixed;right:18px;top:10px;z-index:2147483590;display:flex;gap:6px;padding:6px;border:1px solid rgba(23,35,63,.12);border-radius:8px;background:rgba(255,255,255,.74);box-shadow:none;backdrop-filter:blur(12px);pointer-events:none;}',
    '[data-qitan-stage] span{display:inline-flex;align-items:center;height:24px;padding:0 8px;border-radius:8px;border:1px solid rgba(23,35,63,.12);font-size:11px;font-weight:900;color:var(--qitan-ink);background:#fff7dc;}',
    '[data-qitan-stage] span:nth-child(2){background:#eef8ff;}',
    '[data-qitan-stage] span:nth-child(3){background:#effbf7;}',
    '[data-qitan-stage] span:nth-child(4){background:#fff1ed;}',
    '[data-qitan-labrail]{position:fixed;left:18px;bottom:16px;z-index:2147483200;display:grid;gap:7px;width:184px;padding:10px;border:2px solid rgba(23,35,63,.14);border-radius:8px;background:rgba(255,255,255,.86);box-shadow:6px 6px 0 rgba(23,35,63,.08);backdrop-filter:blur(12px);pointer-events:none;color:var(--qitan-ink);}',
    '[data-qitan-labrail] strong{font-size:12px;font-weight:900;}',
    '[data-qitan-labrail] span{display:flex;align-items:center;gap:6px;font-size:11px;font-weight:850;color:var(--qitan-muted);}',
    '[data-qitan-labrail] i{display:inline-block;width:9px;height:9px;border:1px solid rgba(23,35,63,.28);border-radius:8px;background:var(--qitan-yellow);}',
    '[data-qitan-labrail] span:nth-child(3) i{background:var(--qitan-blue);}',
    '[data-qitan-labrail] span:nth-child(4) i{background:var(--qitan-teal);}',
    '[data-qitan-labrail] span:nth-child(5) i{background:var(--qitan-coral);}',
    '[data-qitan-viewtag]{position:fixed;right:438px;top:13px;z-index:2147483610;display:flex;align-items:center;gap:7px;min-height:32px;padding:0 10px;border:1px solid rgba(23,35,63,.12);border-radius:8px;background:rgba(255,255,255,.72);box-shadow:none;backdrop-filter:blur(12px);pointer-events:none;color:var(--qitan-muted);font-size:12px;font-weight:900;}',
    '[data-qitan-viewtag]:before{content:"";width:8px;height:8px;border-radius:8px;background:var(--qitan-teal);box-shadow:0 0 0 3px rgba(24,169,153,.14);}',
    '[data-qitan-bridge]{position:fixed;right:292px;top:13px;z-index:2147483610;display:inline-flex;align-items:center;gap:7px;min-height:32px;padding:0 12px;border:2px solid rgba(23,35,63,.16);border-radius:8px;background:rgba(255,255,255,.86);box-shadow:none;backdrop-filter:blur(12px);color:var(--qitan-ink)!important;text-decoration:none!important;font-size:12px;font-weight:900;pointer-events:auto;}',
    '[data-qitan-bridge]:before{content:"";width:8px;height:8px;border-radius:8px;background:var(--qitan-blue);box-shadow:0 0 0 3px rgba(35,136,255,.12);}',
    '[data-qitan-bridge]:hover{transform:translate(-1px,-1px);box-shadow:7px 7px 0 rgba(35,136,255,.10);background:#fff7dc;}',
    '[data-qitan-map]{position:fixed;left:18px;top:88px;z-index:2147483190;display:grid;gap:8px;width:196px;padding:12px;border:2px solid rgba(23,35,63,.16);border-radius:8px;background:rgba(255,255,255,.88);box-shadow:6px 6px 0 rgba(23,35,63,.07);backdrop-filter:blur(14px);pointer-events:none;color:var(--qitan-ink);}',
    '[data-qitan-map] strong{font-size:12px;font-weight:900;}',
    '[data-qitan-map] span{display:grid;grid-template-columns:20px 1fr;align-items:center;gap:7px;min-height:24px;font-size:11px;font-weight:850;color:var(--qitan-muted);}',
    '[data-qitan-map] span:before{content:attr(data-step);display:grid;place-items:center;width:20px;height:20px;border:1px solid rgba(23,35,63,.22);border-radius:8px;background:#eef8ff;color:var(--qitan-blue);font-size:10px;font-weight:900;}',
    '[data-qitan-map] span:nth-child(3):before{background:#effbf7;color:#087d70;}',
    '[data-qitan-map] span:nth-child(4):before{background:#fff7dc;color:#8a6500;}',
    '[data-qitan-map] span:nth-child(5):before{background:#fff1ed;color:#c84d37;}',
    '[data-qitan-routecard]{position:fixed;right:18px;top:88px;z-index:2147483180;width:218px;padding:12px;border:2px solid rgba(23,35,63,.14);border-radius:8px;background:linear-gradient(180deg,rgba(255,255,255,.90),rgba(244,251,255,.84));box-shadow:6px 6px 0 rgba(35,136,255,.08);backdrop-filter:blur(14px);pointer-events:none;color:var(--qitan-ink);}',
    '[data-qitan-routecard] strong{display:block;margin-bottom:6px;font-size:12px;font-weight:900;}',
    '[data-qitan-routecard] p{margin:0;color:var(--qitan-muted);font-size:11px;font-weight:800;line-height:1.55;}',
    '[data-qitan-workbench-strip]{position:fixed;left:50%;bottom:16px;z-index:2147483190;display:flex;gap:8px;transform:translateX(-50%);padding:7px;border:2px solid rgba(23,35,63,.12);border-radius:8px;background:rgba(255,255,255,.80);box-shadow:6px 6px 0 rgba(23,35,63,.06);backdrop-filter:blur(12px);pointer-events:none;color:var(--qitan-ink);}',
    '[data-qitan-workbench-strip] span{display:inline-flex;align-items:center;height:24px;padding:0 9px;border-radius:8px;border:1px solid rgba(23,35,63,.12);font-size:11px;font-weight:900;background:#eef8ff;}',
    '[data-qitan-workbench-strip] span:nth-child(2){background:#effbf7;}',
    '[data-qitan-workbench-strip] span:nth-child(3){background:#fff7dc;}',
    '[data-qitan-workbench-strip] span:nth-child(4){background:#fff1ed;}',
    '[data-qitan-workbench-strip] span:nth-child(5){background:#f4fbff;}',
    '[data-qitan-support-modal]{position:fixed;inset:0;z-index:2147483646;display:grid;place-items:center;padding:24px;background:rgba(23,35,63,.24);backdrop-filter:blur(4px);}',
    '[data-qitan-support-card]{width:min(520px,calc(100vw - 36px));border:3px solid var(--qitan-line);border-radius:8px;background:#fff;box-shadow:12px 12px 0 rgba(23,35,63,.16);color:var(--qitan-ink);}',
    '[data-qitan-support-head]{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 18px;border-bottom:2px solid rgba(23,35,63,.12);background:#eef8ff;font-weight:900;}',
    '[data-qitan-support-body]{padding:18px;color:var(--qitan-muted);font-size:14px;font-weight:750;line-height:1.72;}',
    '[data-qitan-support-body] strong{display:block;margin-bottom:8px;color:var(--qitan-ink);font-size:18px;font-weight:900;}',
    '[data-qitan-support-close]{display:grid;place-items:center;width:30px;height:30px;border:2px solid rgba(23,35,63,.18);border-radius:8px;background:#fff;color:var(--qitan-ink);font-weight:900;cursor:pointer;}',
    '[data-qitan-credit]{font-family:inherit!important;}',
    'button,[role="button"],.semi-button{border-radius:8px!important;letter-spacing:0!important;font-weight:900!important;}',
    '.semi-button,.semi-button-light,.semi-button-borderless{border:2px solid rgba(23,35,63,.16)!important;box-shadow:none!important;background:#fff!important;color:var(--qitan-ink)!important;}',
    '.semi-button-primary,.semi-button.semi-button-primary{background:var(--qitan-blue)!important;color:#fff!important;border:2px solid var(--qitan-line)!important;box-shadow:4px 4px 0 rgba(23,35,63,.16)!important;}',
    '.semi-button-primary:hover,.semi-button.semi-button-primary:hover{background:#126fd7!important;border-color:var(--qitan-line)!important;transform:translate(-1px,-1px)!important;}',
    '.semi-input,.semi-input-wrapper,.semi-select,.semi-textarea-wrapper,.semi-search,.semi-cascader-selection{border-radius:8px!important;border:2px solid rgba(23,35,63,.18)!important;background:#fff!important;box-shadow:0 2px 0 rgba(23,35,63,.04)!important;}',
    '.semi-input-wrapper-focus,.semi-select-focus,.semi-textarea-wrapper-focus{border-color:var(--qitan-blue)!important;box-shadow:0 0 0 3px rgba(35,136,255,.12)!important;}',
    '.semi-card,.semi-modal-content,.semi-popover-content,.semi-dropdown,.semi-table-container,.semi-toast-wrapper,.semi-collapse,.semi-tabs-content,.semi-drawer-content{border-radius:8px!important;border:2px solid rgba(23,35,63,.16)!important;box-shadow:8px 8px 0 rgba(23,35,63,.09)!important;background:rgba(255,255,255,.94)!important;}',
    '.semi-card:hover{box-shadow:10px 10px 0 rgba(35,136,255,.12)!important;}',
    '.semi-card:before,[class*="card"]:before,[class*="Card"]:before{border-radius:8px!important;}',
    '.semi-modal-content{border:3px solid rgba(23,35,63,.22)!important;}',
    '.semi-modal-header,.semi-drawer-header{border-bottom:2px solid rgba(23,35,63,.12)!important;background:#f4fbff!important;}',
    '.semi-modal-footer,.semi-drawer-footer{border-top:2px solid rgba(23,35,63,.10)!important;background:#fff!important;}',
    '.semi-modal-content img,.semi-drawer-content img{border-radius:8px!important;filter:saturate(.86) contrast(.96) opacity(.82)!important;}',
    '.semi-modal-content [class*="image"],.semi-modal-content [class*="Image"],.semi-drawer-content [class*="image"],.semi-drawer-content [class*="Image"]{border-radius:8px!important;background:linear-gradient(135deg,#eef8ff,#effbf7 58%,#fff7dc)!important;}',
    '.semi-navigation{border-radius:0!important;border:0!important;border-bottom:2px solid rgba(23,35,63,.12)!important;background:rgba(255,255,255,.88)!important;box-shadow:0 6px 0 rgba(23,35,63,.045)!important;backdrop-filter:blur(14px)!important;}',
    '.semi-navigation-item{border-radius:8px!important;margin:2px 6px!important;font-weight:850!important;}',
    '.semi-navigation-item-selected,.semi-tabs-tab-active{background:#eef8ff!important;color:var(--qitan-blue)!important;border:1px solid rgba(35,136,255,.22)!important;}',
    '.coz-bg-primary,.coz-mg-primary{background:#eef8ff!important;color:var(--qitan-blue)!important;}',
    '.coz-bg-plus,.coz-bg-max,.coz-mg-card{background:rgba(255,255,255,.90)!important;}',
    '.coz-mg-hglt-plus,.coz-btn-brand,.coz-btn-highlight{background:var(--qitan-blue)!important;color:#fff!important;}',
    '.coz-fg-hglt,.coz-fg-primary svg,.coz-fg-secondary svg{color:var(--qitan-blue)!important;}',
    '.coz-stroke-primary,.coz-stroke-plus{border-color:rgba(23,35,63,.14)!important;}',
    'body[data-qitan-embedded="1"] .coz-fg-primary,body[data-qitan-embedded="1"] .coz-typography-primary{color:rgba(15,21,40,.92)!important;}',
    'body[data-qitan-embedded="1"] .coz-fg-secondary{color:rgba(23,35,63,.78)!important;}',
    'body[data-qitan-embedded="1"] .coz-fg-dim{color:rgba(23,35,63,.64)!important;}',
    'body[data-qitan-embedded="1"] .coz-bg-max,body[data-qitan-embedded="1"] [class*="coz-bg-max"]{background-color:rgba(255,255,255,.96)!important;}',
    'body[data-qitan-embedded="1"] [data-qitan-rail-logo-hidden="1"],body[data-qitan-embedded="1"] [data-qitan-third-party-entry="1"]{display:none!important;}',
    'body[data-qitan-embedded="1"] .coz-icon-button-secondary>.semi-button.coz-btn-secondary{background:#fff!important;color:var(--qitan-blue)!important;border:2px solid rgba(35,136,255,.42)!important;box-shadow:0 4px 0 rgba(23,35,63,.08)!important;}',
    'body[data-qitan-embedded="1"] .coz-icon-button-secondary>.semi-button.coz-btn-secondary:hover{background:#eef8ff!important;color:var(--qitan-blue)!important;border-color:rgba(35,136,255,.58)!important;transform:none!important;}',
    'body[data-qitan-embedded="1"] .coz-icon-button-secondary>.semi-button.coz-btn-secondary svg{color:var(--qitan-blue)!important;}',
    'body[data-qitan-embedded="1"] [data-qitan-sidebar-profile="1"]{display:grid!important;place-items:center!important;width:42px!important;height:42px!important;padding:4px!important;border:2px solid rgba(35,136,255,.72)!important;border-radius:10px!important;background:linear-gradient(180deg,#fff,#eef8ff)!important;box-shadow:0 4px 0 rgba(35,136,255,.16)!important;}',
    'body[data-qitan-embedded="1"] [data-qitan-sidebar-profile="1"] .semi-avatar{border:1px solid rgba(35,136,255,.32)!important;background:#fff!important;}',
    '.semi-layout,.semi-layout-content,.semi-layout-sider,main,section,article,[class*="Layout"],[class*="layout"]{background-color:transparent!important;}',
    '[class*="sider"],[class*="Sider"],[class*="sidebar"],[class*="Sidebar"],[class*="aside"],[class*="Aside"]{background:linear-gradient(180deg,rgba(255,255,255,.94),rgba(244,251,255,.88))!important;border-right:2px solid rgba(23,35,63,.12)!important;box-shadow:8px 0 0 rgba(23,35,63,.035)!important;}',
    '[class*="side"] [class*="active"],[class*="Side"] [class*="active"],[class*="nav"] [class*="active"],[class*="Nav"] [class*="active"]{background:#eef8ff!important;color:var(--qitan-blue)!important;border-radius:8px!important;font-weight:900!important;}',
    '[class*="side"] svg,[class*="Side"] svg,[class*="nav"] svg,[class*="Nav"] svg{color:var(--qitan-blue)!important;}',
    '[class*="header"],[class*="Header"],[class*="navbar"],[class*="Navbar"]{background:rgba(255,255,255,.88)!important;backdrop-filter:blur(14px)!important;}',
    '[class*="page"],[class*="Page"],[class*="container"],[class*="Container"],[class*="workspace"],[class*="Workspace"],[class*="project"],[class*="Project"],[class*="flow"],[class*="Flow"],[class*="knowledge"],[class*="Knowledge"],[class*="dataset"],[class*="Dataset"],[class*="agent"],[class*="Agent"],[class*="bot"],[class*="Bot"]{letter-spacing:0!important;}',
    '[class*="page"],[class*="Page"],[class*="workspace"],[class*="Workspace"]{background:transparent!important;}',
    '[class*="card"],[class*="Card"],[class*="panel"],[class*="Panel"],[class*="item"],[class*="Item"]{border-radius:8px!important;}',
    '[class*="card"],[class*="Card"],[class*="panel"],[class*="Panel"],[class*="list"],[class*="List"]{background-color:rgba(255,255,255,.94)!important;}',
    '[class*="card"],[class*="Card"],[class*="panel"],[class*="Panel"]{border:2px solid rgba(23,35,63,.12)!important;box-shadow:6px 6px 0 rgba(23,35,63,.06)!important;}',
    '[class*="plugin"],[class*="Plugin"],[class*="template"],[class*="Template"],[class*="workflow"],[class*="Workflow"],[class*="knowledge"],[class*="Knowledge"],[class*="dataset"],[class*="Dataset"],[class*="agent"],[class*="Agent"],[class*="bot"],[class*="Bot"]{border-radius:8px!important;}',
    '[class*="plugin"] [class*="card"],[class*="Plugin"] [class*="Card"],[class*="template"] [class*="card"],[class*="Template"] [class*="Card"],[class*="workflow"] [class*="card"],[class*="Workflow"] [class*="Card"],[class*="knowledge"] [class*="card"],[class*="Knowledge"] [class*="Card"]{background:linear-gradient(180deg,#fff,#f7fbff)!important;}',
    '[class*="card"]:hover,[class*="Card"]:hover,[class*="panel"]:hover,[class*="Panel"]:hover{box-shadow:8px 8px 0 rgba(35,136,255,.10)!important;}',
    '[class*="card"] h1,[class*="Card"] h1,[class*="card"] h2,[class*="Card"] h2,[class*="card"] h3,[class*="Card"] h3{display:flex!important;align-items:center!important;gap:8px!important;}',
    '[class*="card"] h1:before,[class*="Card"] h1:before,[class*="card"] h2:before,[class*="Card"] h2:before,[class*="card"] h3:before,[class*="Card"] h3:before{content:"";display:inline-block;width:10px;height:10px;min-width:10px;border:1px solid rgba(23,35,63,.26);border-radius:8px;background:var(--qitan-yellow);}',
    'body[data-qitan-surface="workflow"] #workflow-playground-content{background:linear-gradient(180deg,rgba(255,255,255,.16),rgba(244,251,255,.26)),url("/qitan-workflow-bg.png") center center/cover no-repeat!important;border:2px solid rgba(23,35,63,.10)!important;border-radius:8px!important;overflow:hidden!important;}',
    'body[data-qitan-surface="workflow"] #workflow-playground-content .gedit-playground,body[data-qitan-surface="workflow"] #workflow-playground-content .gedit-playground-container,body[data-qitan-surface="workflow"] #workflow-playground-content [class*="workflow-playground-render"]{background:transparent!important;}',
    'body[data-qitan-surface="workflow"] #workflow-playground-content [class*="float-layout"],body[data-qitan-surface="workflow"] #workflow-playground-content [class*="left-panel"],body[data-qitan-surface="workflow"] #workflow-playground-content [class*="left-main-panel"],body[data-qitan-surface="workflow"] #workflow-playground-content [class*="left-bottom-panel"],body[data-qitan-surface="workflow"] #workflow-playground-content [class*="panel-wrap"],body[data-qitan-surface="workflow"] #workflow-playground-content [class*="list-container"]{background:transparent!important;border:0!important;box-shadow:none!important;}',
    'body[data-qitan-surface="workflow"] #workflow-playground-content .gedit-flow-background-layer{opacity:.48!important;}',
    'body[data-qitan-surface="workflow"] #workflow-playground-content .gedit-grid-svg svg rect{fill-opacity:.42!important;}',
    'body[data-qitan-surface="workflow"] .gedit-flow-activity-node>div:first-child{background:rgba(255,255,255,.96)!important;border:2px solid rgba(23,35,63,.28)!important;border-radius:8px!important;box-shadow:8px 8px 0 rgba(35,136,255,.12)!important;}',
    'body[data-qitan-surface="workflow"] .gedit-flow-activity-node .node-header{background:linear-gradient(180deg,rgba(255,255,255,.96),rgba(238,248,255,.84))!important;border:0!important;border-bottom:1px solid rgba(23,35,63,.14)!important;border-radius:6px 6px 0 0!important;box-shadow:none!important;}',
    'body[data-qitan-surface="workflow"] .gedit-flow-activity-node:hover>div:first-child{border-color:rgba(35,136,255,.48)!important;box-shadow:8px 8px 0 rgba(35,136,255,.18)!important;}',
    'body[data-qitan-surface="workflow"] #workflow-playground-content [class*="template-card"]{background:linear-gradient(180deg,rgba(255,255,255,.96),rgba(247,251,255,.92))!important;border:2px solid rgba(23,35,63,.14)!important;box-shadow:6px 6px 0 rgba(23,35,63,.08)!important;}',
    'h1,h2,h3,h4{letter-spacing:0!important;color:var(--qitan-ink)!important;font-weight:900!important;}',
    'p,span,div,label{letter-spacing:0!important;}',
    'a{color:var(--qitan-blue)!important;}',
    '.semi-tag,.semi-badge,.semi-avatar,.semi-tooltip{border-radius:8px!important;}',
    '.semi-progress-line-track,.semi-progress-line,.semi-switch{border-radius:8px!important;}',
    '.semi-tabs-tab{font-weight:900!important;border-radius:8px!important;}',
    '.semi-tabs-bar{border-bottom:2px solid rgba(23,35,63,.10)!important;}',
    '.semi-table-row:hover td{background:#f4fbff!important;}',
    '.semi-table-thead>.semi-table-row>.semi-table-row-head{background:#eef8ff!important;color:var(--qitan-ink)!important;font-weight:900!important;}',
    '.semi-tree-option-selected,.semi-list-item:hover,.semi-dropdown-item:hover{background:#eef8ff!important;color:var(--qitan-ink)!important;}',
    '.semi-form-field-label,.semi-form-field-label-text{font-weight:900!important;color:var(--qitan-ink)!important;}',
    '.semi-steps-item-title,.semi-breadcrumb-item,.semi-radio,.semi-checkbox{font-weight:850!important;}',
    '.semi-upload,.semi-spin-children,.semi-skeleton{border-radius:8px!important;}',
    '[class*="empty"],[class*="Empty"]{background:rgba(255,255,255,.86)!important;border:2px dashed rgba(23,35,63,.18)!important;border-radius:8px!important;padding:18px!important;box-shadow:6px 6px 0 rgba(23,35,63,.045)!important;}',
    '[class*="sign"],[class*="Sign"],[class*="login"],[class*="Login"]{letter-spacing:0!important;background:transparent!important;}',
    '[class*="sign"] h1,[class*="Sign"] h1,[class*="login"] h1,[class*="Login"] h1{font-size:clamp(26px,4vw,44px)!important;line-height:1.18!important;font-weight:900!important;max-width:680px!important;}',
    '[class*="sign"] form,[class*="Sign"] form,[class*="login"] form,[class*="Login"] form{border:3px solid rgba(23,35,63,.22)!important;border-radius:8px!important;background:rgba(255,255,255,.95)!important;box-shadow:10px 10px 0 rgba(23,35,63,.12)!important;padding:24px!important;}',
    '[class*="sign"] [class*="card"],[class*="Sign"] [class*="card"],[class*="login"] [class*="card"],[class*="Login"] [class*="card"]{border-radius:8px!important;border:3px solid rgba(23,35,63,.20)!important;box-shadow:10px 10px 0 rgba(23,35,63,.12)!important;background:rgba(255,255,255,.95)!important;}',
    'body[data-qitan-auth-redirect="1"] #root{opacity:0!important;pointer-events:none!important;}',
    '[data-qitan-auth-loading]{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:2147483646;width:min(420px,calc(100vw - 40px));box-sizing:border-box;border:3px solid rgba(23,35,63,.18);border-radius:8px;background:linear-gradient(180deg,rgba(255,255,255,.98),rgba(244,251,255,.96));box-shadow:12px 12px 0 rgba(35,136,255,.12);padding:28px;color:var(--qitan-ink);font-family:"Microsoft YaHei UI","Microsoft YaHei","PingFang SC",Arial,sans-serif!important;}',
    '[data-qitan-auth-loading] strong{display:block;font-size:24px;line-height:1.2;font-weight:900;margin:0 0 12px;}',
    '[data-qitan-auth-loading] span{display:block;font-size:15px;line-height:1.65;color:var(--qitan-muted);font-weight:800;margin:0 0 18px;}',
    '[data-qitan-auth-loading] a{display:inline-flex;align-items:center;justify-content:center;height:38px;padding:0 18px;border:2px solid rgba(23,35,63,.16);border-radius:8px;background:var(--qitan-blue);color:#fff!important;font-size:15px;font-weight:900;text-decoration:none!important;box-shadow:4px 4px 0 rgba(23,35,63,.10);}',
    '[class*="logo"],[class*="Logo"]{letter-spacing:0!important;font-weight:900!important;}',
    '@media(max-width:1260px){[data-qitan-map],[data-qitan-routecard]{display:none;}}',
    '@media(max-width:1180px){[data-qitan-labrail],[data-qitan-workbench-strip]{display:none;}}',
    '@media(max-width:1180px){[data-qitan-bridge]{right:18px;top:66px;}[data-qitan-viewtag]{display:none;}}',
    '@media(max-width:980px){[data-qitan-stage]{display:none;}[data-qitan-bridge]{left:auto;right:10px;top:64px;}body[data-qitan-ready="1"] #root{padding-top:74px!important;}}',
    '@media(max-width:720px){[data-qitan-shell]{height:58px;padding:0 10px;}[data-qitan-bridge]{display:none;}[data-qitan-pill]{display:none;}body:after{inset:8px;}body[data-qitan-ready="1"] #root:before{left:8px;right:8px;top:70px;bottom:8px;}}'
  ].join('');

  try {
    localStorage.setItem('i18nextLng', 'zh-CN');
    localStorage.setItem('locale', 'zh-CN');
    localStorage.setItem('language', 'zh-CN');
    document.cookie = 'locale=zh-CN; path=/; max-age=31536000';
    document.cookie = 'language=zh-CN; path=/; max-age=31536000';
    document.documentElement.lang = 'zh-CN';
  } catch (error) {
    // Ignore private browsing or locked-down storage.
  }

  function installTheme() {
    if (document.querySelector('[data-qitan-theme]')) {
      return;
    }
    var style = document.createElement('style');
    style.dataset.qitanTheme = '1';
    style.textContent = themeCss;
    document.head.appendChild(style);
  }

  function brandText(value) {
    if (!value) {
      return value;
    }
    return replacements.reduce(function (text, pair) {
      return text.replace(pair[0], pair[1]);
    }, value);
  }

  function brandNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.parentElement && /^(SCRIPT|STYLE|TEXTAREA)$/i.test(node.parentElement.tagName)) {
        return;
      }
      var next = brandText(node.nodeValue);
      if (next !== node.nodeValue) {
        node.nodeValue = next;
      }
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE || node.dataset.qitanBrandLocked === '1') {
      return;
    }
    attrs.forEach(function (attr) {
      if (node.hasAttribute(attr)) {
        node.setAttribute(attr, brandText(node.getAttribute(attr)));
      }
    });
    if (node.tagName === 'IMG') {
      brandImage(node);
    }
    Array.prototype.forEach.call(node.childNodes || [], brandNode);
  }

  function brandImage(img) {
    var src = img.getAttribute('src') || '';
    if (src.indexOf(legacyLowerName) >= 0 || src.indexOf(legacyName) >= 0 || src.indexOf('favicon-base') >= 0 || src.indexOf('favicon-addon') >= 0) {
      img.setAttribute('src', '/favicon.png');
    }
  }

  function replaceInlineLogo() {
    if (!document.body) {
      return;
    }
    var svgs = document.querySelectorAll('span[role="img"].semi-icon svg[viewBox="0 0 40 40"], span[role="img"].semi-icon svg[viewbox="0 0 40 40"]');
    Array.prototype.forEach.call(svgs, function (svg) {
      var host = svg.closest('span[role="img"]');
      if (!host || host.dataset.qitanLogoReplaced === '1') {
        return;
      }
      var hasLegacyRect = svg.querySelector('rect[fill="#4D53E8"], rect[fill="#4d53e8"]');
      if (!hasLegacyRect) {
        return;
      }
      host.dataset.qitanLogoReplaced = '1';
      host.dataset.qitanBrandLocked = '1';
      host.setAttribute('title', title);
      host.innerHTML = '<span data-qitan-side-logo>\u542f</span>';
    });
  }

  function addCredit() {
    if (document.querySelector('[data-qitan-credit]') || !document.body) {
      return;
    }
    var badge = document.createElement('div');
    badge.dataset.qitanCredit = '1';
    badge.dataset.qitanBrandLocked = '1';
    badge.textContent = credit;
    badge.style.cssText = [
      'position:fixed',
      'right:14px',
      'bottom:12px',
      'z-index:2147483647',
      'padding:6px 10px',
      'border-radius:8px',
      'background:rgba(255,255,255,.94)',
      'border:2px solid rgba(23,35,63,.16)',
      'box-shadow:4px 4px 0 rgba(23,35,63,.10)',
      'color:rgba(23,35,63,.66)',
      'font-size:12px',
      'line-height:16px',
      'pointer-events:none',
      'backdrop-filter:blur(8px)'
    ].join(';');
    document.body.appendChild(badge);
  }

  function addShell() {
    if (embedded || document.querySelector('[data-qitan-shell]') || !document.body) {
      return;
    }
    var shell = document.createElement('div');
    shell.dataset.qitanShell = '1';
    shell.dataset.qitanBrandLocked = '1';
    shell.innerHTML = [
      '<div data-qitan-mark>\u542f</div>',
      '<div data-qitan-shell-title><strong>' + title + '</strong><span>\u8bfe\u5802\u667a\u80fd\u4f53\u642d\u5efa\u5de5\u4f5c\u53f0</span></div>',
      '<div data-qitan-pill>\u8bfe\u7a0b\u52a9\u624b</div>',
      '<div data-qitan-pill>\u4e00\u952e\u751f\u6210</div>',
      '<div data-qitan-pill>\u77e5\u8bc6\u5e93</div>'
    ].join('');
    document.body.appendChild(shell);
  }

  function addBridge() {
    if (embedded || document.querySelector('[data-qitan-bridge]') || !document.body) {
      return;
    }
    var bridge = document.createElement('a');
    bridge.dataset.qitanBridge = '1';
    bridge.dataset.qitanBrandLocked = '1';
    bridge.href = platformUrl;
    bridge.target = '_top';
    bridge.textContent = '\u8fd4\u56de\u542f\u63a2\u5e73\u53f0';
    bridge.title = '\u56de\u5230\u542f\u63a2 AI \u5de5\u574a\u5165\u53e3';
    document.body.appendChild(bridge);
  }

  function addStage() {
    if (document.querySelector('[data-qitan-stage]') || !document.body) {
      return;
    }
    var stage = document.createElement('div');
    stage.dataset.qitanStage = '1';
    stage.dataset.qitanBrandLocked = '1';
    stage.innerHTML = [
      '<span>\u89c2\u5bdf</span>',
      '<span>\u8bbe\u8ba1</span>',
      '<span>\u751f\u6210</span>',
      '<span>\u8c03\u8bd5</span>'
    ].join('');
    document.body.appendChild(stage);
  }

  function addLabRail() {
    if (document.querySelector('[data-qitan-labrail]') || !document.body) {
      return;
    }
    var rail = document.createElement('div');
    rail.dataset.qitanLabrail = '1';
    rail.dataset.qitanBrandLocked = '1';
    rail.innerHTML = [
      '<strong>\u8bfe\u7a0b\u80fd\u529b\u53f0</strong>',
      '<span><i></i>\u667a\u80fd\u4f53\u8f85\u5bfc</span>',
      '<span><i></i>\u5e94\u7528\u751f\u6210</span>',
      '<span><i></i>\u77e5\u8bc6\u68c0\u7d22</span>',
      '<span><i></i>\u5de5\u4f5c\u6d41\u7f16\u6392</span>'
    ].join('');
    document.body.appendChild(rail);
  }

  function addViewTag() {
    if (document.querySelector('[data-qitan-viewtag]') || !document.body) {
      return;
    }
    var tag = document.createElement('div');
    tag.dataset.qitanViewtag = '1';
    tag.dataset.qitanBrandLocked = '1';
    tag.textContent = '\u542f\u63a2\u5de5\u4f5c\u53f0';
    document.body.appendChild(tag);
  }

  function addCapabilityMap() {
    if (document.querySelector('[data-qitan-map]') || !document.body) {
      return;
    }
    var map = document.createElement('div');
    map.dataset.qitanMap = '1';
    map.dataset.qitanBrandLocked = '1';
    map.innerHTML = [
      '<strong>\u542f\u63a2\u80fd\u529b\u5730\u56fe</strong>',
      '<span data-step="1">\u8bbe\u8ba1\u52a9\u624b\u4eba\u8bbe</span>',
      '<span data-step="2">\u63a5\u5165\u77e5\u8bc6\u4e0e\u5de5\u5177</span>',
      '<span data-step="3">\u7f16\u6392\u4e00\u952e\u751f\u6210</span>',
      '<span data-step="4">\u53d1\u5e03\u5230\u8bfe\u5802\u4efb\u52a1</span>'
    ].join('');
    document.body.appendChild(map);
  }

  function addRouteCard() {
    if (document.querySelector('[data-qitan-routecard]') || !document.body) {
      return;
    }
    var card = document.createElement('div');
    card.dataset.qitanRoutecard = '1';
    card.dataset.qitanBrandLocked = '1';
    card.innerHTML = [
      '<strong>\u8bfe\u5802\u751f\u4ea7\u7ebf</strong>',
      '<p>\u4ece\u667a\u80fd\u4f53\u5230\u5e94\u7528\u3001\u5de5\u4f5c\u6d41\u3001\u77e5\u8bc6\u5e93\u548c\u63d2\u4ef6\uff0c\u90fd\u4ee5\u542f\u63a2\u8bfe\u7a0b\u573a\u666f\u4e3a\u4e2d\u5fc3\u7ec4\u7ec7\u3002</p>'
    ].join('');
    document.body.appendChild(card);
  }

  function addWorkbenchStrip() {
    if (document.querySelector('[data-qitan-workbench-strip]') || !document.body) {
      return;
    }
    var strip = document.createElement('div');
    strip.dataset.qitanWorkbenchStrip = '1';
    strip.dataset.qitanBrandLocked = '1';
    strip.innerHTML = [
      '<span>\u667a\u80fd\u4f53</span>',
      '<span>\u5e94\u7528</span>',
      '<span>\u5de5\u4f5c\u6d41</span>',
      '<span>\u77e5\u8bc6\u5e93</span>',
      '<span>\u63d2\u4ef6</span>'
    ].join('');
    document.body.appendChild(strip);
  }

  function showSupportModal() {
    if (document.querySelector('[data-qitan-support-modal]') || !document.body) {
      return;
    }
    var modal = document.createElement('div');
    modal.dataset.qitanSupportModal = '1';
    modal.dataset.qitanBrandLocked = '1';
    modal.innerHTML = [
      '<div data-qitan-support-card>',
      '<div data-qitan-support-head><span>\u6280\u672f\u652f\u6301\u8bf4\u660e</span><button data-qitan-support-close type="button">\u00d7</button></div>',
      '<div data-qitan-support-body>',
      '<strong>\u542f\u63a2\u667a\u80fd\u4f53\u5de5\u574a</strong>',
      '<p>\u5f53\u524d\u5de5\u574a\u5df2\u7eb3\u5165\u542f\u63a2 AI \u5de5\u574a\u5e73\u53f0\uff0c\u4fdd\u7559\u667a\u80fd\u4f53\u3001\u5e94\u7528\u3001\u5de5\u4f5c\u6d41\u3001\u77e5\u8bc6\u5e93\u548c\u63d2\u4ef6\u7b49\u5e95\u5c42\u80fd\u529b\u3002</p>',
      '<p>\u611f\u8c22\u5f00\u6e90\u793e\u533a\u63d0\u4f9b\u5e95\u5c42\u6280\u672f\u652f\u6301\uff0c\u524d\u53f0\u4f53\u9a8c\u548c\u8bfe\u7a0b\u63a5\u5165\u7531\u542f\u63a2\u7edf\u4e00\u627f\u8f7d\u3002</p>',
      '</div>',
      '</div>'
    ].join('');
    modal.addEventListener('click', function (event) {
      if (event.target === modal || event.target.hasAttribute('data-qitan-support-close')) {
        modal.remove();
      }
    });
    document.body.appendChild(modal);
  }

  function interceptSupportLinks() {
    if (!document.body || document.body.dataset.qitanSupportIntercepted === '1') {
      return;
    }
    document.body.dataset.qitanSupportIntercepted = '1';
    document.body.addEventListener('click', function (event) {
      var target = event.target && event.target.closest ? event.target.closest('a,button,[role="button"]') : null;
      if (!target || target.dataset.qitanBrandLocked === '1') {
        return;
      }
      var label = (target.innerText || target.textContent || target.getAttribute('aria-label') || '').trim();
      var href = target.getAttribute && (target.getAttribute('href') || '');
      if (label.indexOf('\u8fd4\u56de\u542f\u63a2\u5e73\u53f0') >= 0 || /^\u8fd4\u56de\s*\u542f\u63a2$/.test(label)) {
        event.preventDefault();
        event.stopPropagation();
        window.top.location.href = platformUrl;
        return;
      }
      if (label.indexOf('\u6280\u672f\u652f\u6301\u8bf4\u660e') >= 0 || label.indexOf('\u5f00\u6e90\u534f\u8bae') >= 0 || href.toLowerCase().indexOf('license') >= 0) {
        event.preventDefault();
        event.stopPropagation();
        showSupportModal();
      }
    }, true);
  }

  function addAuthRedirectPanel(nextPath) {
    if (!document.body) {
      return;
    }
    var href = getStudioSsoUrl(nextPath);
    var panel = document.querySelector('[data-qitan-auth-loading]');
    if (!panel) {
      panel = document.createElement('div');
      panel.dataset.qitanAuthLoading = '1';
      panel.dataset.qitanBrandLocked = '1';
      panel.innerHTML = [
        '<strong>\u6b63\u5728\u8fdb\u5165\u542f\u63a2\u667a\u80fd\u4f53\u5de5\u4f5c\u53f0</strong>',
        '<span>\u767b\u5f55\u72b6\u6001\u5df2\u8fc7\u671f\uff0c\u6b63\u5728\u81ea\u52a8\u6062\u590d\u8bfe\u5802\u5de5\u4f5c\u533a\u3002</span>',
        '<a data-qitan-auth-retry="1" data-qitan-brand-locked="1" href="' + href + '">\u91cd\u65b0\u8fdb\u5165</a>'
      ].join('');
      document.body.appendChild(panel);
      return;
    }
    var retry = panel.querySelector('[data-qitan-auth-retry]');
    if (retry) {
      retry.href = href;
    }
  }

  function removeAuthRedirectPanel() {
    var panel = document.querySelector('[data-qitan-auth-loading]');
    if (panel) {
      panel.remove();
    }
  }

  function redirectAuthEntry() {
    if (!document.body) {
      return false;
    }
    if (!isAuthEntryPath()) {
      delete document.body.dataset.qitanAuthRedirect;
      removeAuthRedirectPanel();
      try {
        sessionStorage.removeItem('qitanAuthRedirectAt');
        sessionStorage.removeItem('qitanAuthRedirectCount');
      } catch (error) {
        // sessionStorage can be unavailable in some embedded contexts
      }
      return false;
    }
    var nextPath = getAuthReturnPath();
    document.body.dataset.qitanAuthRedirect = '1';
    addAuthRedirectPanel(nextPath);

    var now = Date.now();
    var lastRedirectAt = 0;
    var redirectCount = 0;
    try {
      lastRedirectAt = Number(sessionStorage.getItem('qitanAuthRedirectAt') || 0);
      redirectCount = Number(sessionStorage.getItem('qitanAuthRedirectCount') || 0);
    } catch (error) {
      lastRedirectAt = 0;
      redirectCount = 0;
    }
    if (redirectCount >= 2 && now - lastRedirectAt < 30000) {
      return true;
    }
    if (now - lastRedirectAt < 3500) {
      return true;
    }
    try {
      sessionStorage.setItem('qitanAuthRedirectAt', String(now));
      sessionStorage.setItem('qitanAuthRedirectCount', String(redirectCount + 1));
    } catch (error) {
      // ignore storage failures and continue with a one-shot redirect
    }
    setTimeout(function () {
      if (isAuthEntryPath()) {
        window.location.href = getStudioSsoUrl(nextPath);
      }
    }, 180);
    return true;
  }

  function getViewName() {
    var path = (location.pathname + location.hash).toLowerCase();
    if (path.indexOf('knowledge') >= 0 || path.indexOf('dataset') >= 0) {
      return '\u77e5\u8bc6\u5e93\u5de5\u4f5c\u53f0';
    }
    if (path.indexOf('workflow') >= 0 || path.indexOf('flow') >= 0) {
      return '\u5de5\u4f5c\u6d41\u7f16\u6392\u53f0';
    }
    if (path.indexOf('plugin') >= 0 || path.indexOf('tool') >= 0) {
      return '\u5de5\u5177\u63a5\u5165\u53f0';
    }
    if (path.indexOf('bot') >= 0 || path.indexOf('agent') >= 0 || path.indexOf('space') >= 0) {
      return '\u667a\u80fd\u4f53\u751f\u4ea7\u53f0';
    }
    return '\u542f\u63a2\u5de5\u4f5c\u53f0';
  }

  function updateSurface() {
    if (!document.body) {
      return;
    }
    var path = (location.pathname + location.hash).toLowerCase();
    var isEntry = isAuthEntryPath(path);
    var isWorkflow = path.indexOf('work_flow') >= 0 || path.indexOf('workflow') >= 0 || path.indexOf('flow') >= 0;
    document.body.dataset.qitanSurface = isEntry ? 'entry' : (isWorkflow ? 'workflow' : 'workbench');
    var tag = document.querySelector('[data-qitan-viewtag]');
    if (tag) {
      tag.textContent = getViewName();
    }
  }

  function refreshRouteState() {
    updateSurface();
    redirectAuthEntry();
  }

  function removeGuideOverlays() {
    if (!document.body) {
      return;
    }
    [
      '[data-qitan-stage]',
      '[data-qitan-labrail]',
      '[data-qitan-viewtag]',
      '[data-qitan-map]',
      '[data-qitan-routecard]',
      '[data-qitan-workbench-strip]',
      '[data-qitan-credit]'
    ].forEach(function (selector) {
      Array.prototype.forEach.call(document.querySelectorAll(selector), function (node) {
        node.remove();
      });
    });
  }

  function tuneSidebar() {
    if (!document.body) {
      return;
    }
    var rails = Array.prototype.filter.call(document.querySelectorAll('div'), function (node) {
      var className = String(node.className || '');
      var rect = node.getBoundingClientRect();
      return rect.left < 20 && rect.width >= 60 && rect.width <= 90 && rect.height > 360 &&
        className.indexOf('flex-col') >= 0 && (node.textContent || '').indexOf('\u5de5\u4f5c\u7a7a\u95f4') >= 0;
    });
    var rail = rails[0];
    if (!rail) {
      return;
    }

    var topLogo = rail.querySelector('span[role="img"].cursor-pointer');
    if (topLogo) {
      topLogo.dataset.qitanRailLogoHidden = '1';
    }

    var bottomGroups = Array.prototype.filter.call(rail.querySelectorAll('div'), function (node) {
      var className = String(node.className || '');
      return className.indexOf('semi-space') >= 0 && className.indexOf('mt-[12px]') >= 0;
    });
    var bottomGroup = bottomGroups[bottomGroups.length - 1];
    if (!bottomGroup) {
      return;
    }

    var thirdPartyButton = bottomGroup.querySelector('button');
    if (thirdPartyButton) {
      thirdPartyButton.dataset.qitanThirdPartyEntry = '1';
    }

    var avatar = bottomGroup.querySelector('.semi-avatar');
    var avatarHost = avatar && avatar.closest('div');
    if (avatarHost) {
      avatarHost.dataset.qitanSidebarProfile = '1';
      avatarHost.title = '\u4e2a\u4eba\u4fe1\u606f';
    }
  }

  function sweepBranding() {
    if (!document.body) {
      return;
    }
    brandNode(document.body);
    keepDocumentTitle();
  }

  function keepDocumentTitle() {
    if (document.title !== title) {
      document.title = title;
    }
    if (titleObserverInstalled || !document.head || typeof MutationObserver === 'undefined') {
      return;
    }
    titleObserverInstalled = true;
    new MutationObserver(function () {
      if (document.title !== title) {
        document.title = title;
      }
    }).observe(document.head, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }

  function run() {
    installTheme();
    keepDocumentTitle();
    if (document.body) {
      document.body.dataset.qitanReady = '1';
      document.body.dataset.qitanEmbedded = embedded ? '1' : '0';
      addShell();
      addBridge();
      removeGuideOverlays();
      tuneSidebar();
      replaceInlineLogo();
      refreshRouteState();
      interceptSupportLinks();
      setTimeout(sweepBranding, 500);
      setTimeout(sweepBranding, 1600);
      setTimeout(sweepBranding, 4200);
      if (window.requestIdleCallback) {
        requestIdleCallback(function () {
          sweepBranding();
        }, { timeout: 2500 });
      } else {
        setTimeout(function () {
          sweepBranding();
        }, 800);
      }
    }
  }

  if (document.readyState === 'loading') {
    installTheme();
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

  window.addEventListener('load', function () {
    var queued = false;
    new MutationObserver(function (records) {
      if (queued) {
        return;
      }
      queued = true;
      setTimeout(function () {
        queued = false;
        records.forEach(function (record) {
          Array.prototype.forEach.call(record.addedNodes || [], brandNode);
          if (record.type === 'characterData') {
            brandNode(record.target);
          }
        });
        keepDocumentTitle();
        addShell();
        addBridge();
        removeGuideOverlays();
        tuneSidebar();
        replaceInlineLogo();
        refreshRouteState();
        interceptSupportLinks();
        sweepBranding();
      }, 180);
    }).observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });
  });

  window.addEventListener('hashchange', refreshRouteState);
  window.addEventListener('popstate', refreshRouteState);
  setInterval(function () {
    refreshRouteState();
    tuneSidebar();
    replaceInlineLogo();
    sweepBranding();
  }, 1500);
})();
