(() => {
  if (window.__tbmContentLoaded) return;
  window.__tbmContentLoaded = true;

const TBM_RUNTIME_DEFAULTS = {
  "enableTabControl": true,
  "enableTabSearch": true,
  "enableSlashToSearch": true,
  "enablePageJump": true,
  "newTabPlacement": "right",
  "closeActivation": "last_used",
  "newTabOpenMode": "default",
  "tabHistoryBackKey": "q",
  "tabHistoryBackCtrl": false,
  "tabHistoryBackAlt": true,
  "tabHistoryBackShift": false,
  "tabHistoryForwardKey": "w",
  "tabHistoryForwardCtrl": false,
  "tabHistoryForwardAlt": true,
  "tabHistoryForwardShift": false,
  "launcherKey": "/",
  "launcherCtrl": false,
  "launcherAlt": true,
  "launcherShift": false,
  "stsKey": "/",
  "stsCtrl": true,
  "stsAlt": false,
  "stsShift": false,
  "stsSiteBoxOrderMap": {},
  "pageJumpRules": [
    {
      "siteName": "",
      "host": "",
      "pathPrefix": "/",
      "mode": "query",
      "pageParam": "",
      "pageStep": "1",
      "firstPageValue": "1",
      "firstPageOmit": false,
      "keepParams": [],
      "pathTemplate": "",
      "firstPagePath": "/",
      "pageNumberPadding": "0",
      "offsetParam": "",
      "offsetStep": "20",
      "offsetFirstValue": "0",
      "offsetKeepParams": [],
      "sampleUrl1": "",
      "sampleUrl2": "",
      "sampleUrl3": "",
      "forwardKey": "",
      "forwardCtrl": false,
      "forwardAlt": false,
      "forwardShift": false,
      "forwardMouse": false,
      "backKey": "",
      "backCtrl": false,
      "backAlt": false,
      "backShift": false,
      "backMouse": false,
      "enabled": true
    }
  ],
  "enableGooglePageJump": true,
  "googlePageJumpForwardKey": "ArrowRight",
  "googlePageJumpForwardCtrl": false,
  "googlePageJumpForwardAlt": false,
  "googlePageJumpForwardShift": false,
  "googlePageJumpBackKey": "ArrowLeft",
  "googlePageJumpBackCtrl": false,
  "googlePageJumpBackAlt": false,
  "googlePageJumpBackShift": false,
  "googlePageJumpMouseBack": true,
  "googlePageJumpMouseForward": true,
  "pageJumpMode": "auto",
  "enableLinkBatchOpen": true,
  "linkBatchOpenKey": "b",
  "linkBatchOpenCtrl": false,
  "linkBatchOpenAlt": true,
  "linkBatchOpenShift": false,
  "linkBatchOverlayColor": "#000000",
  "linkBatchOverlayOpacity": 0.55,
  "linkBatchBorderColor": "#ff4db8",
  "linkBatchCheckedColor": "#00e676",
  "linkBatchCheckboxPosition": "top_right",
  "linkBatchMinWidth": 24,
  "linkBatchMinHeight": 16
};

const TBM_STATE = {
  isOpen: false,
  allTabs: [],
  filteredTabs: [],
  activeIndex: 0,
  searchMode: 'title',
  elements: null,

  stsCycle: {
    key: "",
    index: -1
  },

  runtimeOptions: { ...TBM_RUNTIME_DEFAULTS },
  stsSiteBoxOrderMap: {},

  linkBatch: {
    isOpen: false,
    root: null,
    style: null,
    summary: null,
    selectedUrls: new Set(),
    candidates: [],
    windowKeydownHandler: null,
    documentKeydownHandler: null,
    windowKeyupHandler: null,
    documentKeyupHandler: null,
    wheelHandler: null,
    touchMoveHandler: null,
    htmlOverflow: "",
    bodyOverflow: ""
  }
};

  function tbmIsEditableTarget(target) {
    if (!target) return false;
    if (target.closest('input, textarea, select')) return true;
    if (target.isContentEditable) return true;
    const editableRoot = target.closest('[contenteditable=""], [contenteditable="true"]');
    return !!editableRoot;
  }

  function tbmIsExtensionContextInvalidatedError(error) {
    const message = String(error?.message || error || '');
    return message.includes('Extension context invalidated');
  }

function tbmPrepareForAsciiInput(input) {
  if (!input) return;

  try {
    // 既存値を一度退避して再セット（IME状態リセットを誘発）
    const val = input.value;
    input.value = '';
    input.value = val;

    // カーソルを末尾へ
    if (typeof input.setSelectionRange === 'function') {
      const len = input.value.length;
      input.setSelectionRange(len, len);
    }

  } catch (e) {
    // 何もしない（安全側）
  }
}

function tbmEscapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function tbmHighlightMatch(text, query) {
  const raw = String(text || '');
  const escaped = tbmEscapeHtml(raw);

  if (!query) return escaped;

  const lowerText = raw.toLowerCase();
  const lowerQuery = String(query).toLowerCase();

  let qi = 0;
  let result = '';

  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];
    const esc = tbmEscapeHtml(ch);

    if (qi < lowerQuery.length && lowerText[i] === lowerQuery[qi]) {
      result += `<span style="color:#ff9800;">${esc}</span>`;
      qi++;
    } else {
      result += esc;
    }
  }

  return result;
}

  function tbmNormalizeText(value) {
    return String(value || '').toLowerCase();
  }

  function tbmNormalizeLauncherKey(value) {
    let key = String(value || '').trim();

    if (!key) return '/';

    if (key.length === 1) {
      return key;
    }

    const lower = key.toLowerCase();

    if (lower === 'slash') return '/';
    if (lower === 'space' || lower === 'spacebar') return ' ';
    if (lower === 'esc' || lower === 'escape') return 'Escape';

    if (lower === 'left' || lower === 'arrowleft') return 'ArrowLeft';
    if (lower === 'right' || lower === 'arrowright') return 'ArrowRight';

    if (lower === 'pageup') return 'PageUp';
    if (lower === 'pagedown') return 'PageDown';
    if (lower === 'home') return 'Home';
    if (lower === 'end') return 'End';

    if (/^f([1-9]|1[0-2])$/i.test(key)) {
      return key.toUpperCase();
    }

    return key;
  }

  function tbmEventMatchesLauncherKey(event, launcherConfig) {
    if (!launcherConfig) return false;
    if (event.metaKey) return false;

    const rawConfigKey = String(launcherConfig.launcherKey ?? "");
    if (rawConfigKey !== " " && !rawConfigKey.trim()) return false;

    if (!!event.ctrlKey !== !!launcherConfig.launcherCtrl) return false;
    if (!!event.altKey !== !!launcherConfig.launcherAlt) return false;
    if (!!event.shiftKey !== !!launcherConfig.launcherShift) return false;

    const configKey = tbmNormalizeLauncherKey(launcherConfig.launcherKey);
    const eventKey = String(event.key || '');
    const eventCode = String(event.code || '');

    if (configKey === '/') {
      return eventKey === '/' || eventCode === 'Slash';
    }

    if (configKey === ' ') {
      return eventKey === ' ' || eventCode === 'Space';
    }

    if (configKey === 'Escape') {
      return eventKey === 'Escape' || eventCode === 'Escape';
    }

    if (configKey === 'ArrowLeft') {
      return eventKey === 'ArrowLeft' || eventKey === 'Left' || eventCode === 'ArrowLeft';
    }

    if (configKey === 'ArrowRight') {
      return eventKey === 'ArrowRight' || eventKey === 'Right' || eventCode === 'ArrowRight';
    }

    if (configKey === 'PageUp') {
      return eventKey === 'PageUp' || eventCode === 'PageUp';
    }

    if (configKey === 'PageDown') {
      return eventKey === 'PageDown' || eventCode === 'PageDown';
    }

    if (configKey === 'Home') {
      return eventKey === 'Home' || eventCode === 'Home';
    }

    if (configKey === 'End') {
      return eventKey === 'End' || eventCode === 'End';
    }

    return eventKey.toLowerCase() === String(configKey).toLowerCase();
  }

  
function tbmIsDefaultAltQBackShortcut(stored) {
  return (
    tbmNormalizeLauncherKey(stored?.tabHistoryBackKey ?? "") === "q" &&
    !stored?.tabHistoryBackCtrl &&
    !!stored?.tabHistoryBackAlt &&
    !stored?.tabHistoryBackShift
  );
}

async function tbmSendTabHistoryNavigation(direction) {
  try {
    await chrome.runtime.sendMessage({
      type: "TBM_NAVIGATE_TAB_HISTORY",
      direction: direction === "forward" ? "forward" : "back"
    });
  } catch (error) {
    if (!tbmIsExtensionContextInvalidatedError(error)) {
      console.warn("[TBM] tab history navigation failed:", error);
    }
  }
}

async function tbmHandleTabHistoryKeydown(event, stored) {
  if (!stored?.enableTabControl) return false;

  const backConfig = {
    launcherKey: stored.tabHistoryBackKey ?? "",
    launcherCtrl: !!stored.tabHistoryBackCtrl,
    launcherAlt: !!stored.tabHistoryBackAlt,
    launcherShift: !!stored.tabHistoryBackShift
  };

  if (
    stored.tabHistoryBackKey &&
    tbmEventMatchesLauncherKey(event, backConfig)
  ) {
    // Alt+Q is already handled by the Chrome command declared in manifest.json.
    // Do not also handle it here, or one physical key press can move back twice.
    if (tbmIsDefaultAltQBackShortcut(stored)) {
      return false;
    }

    await tbmSendTabHistoryNavigation("back");
    return true;
  }

  const forwardConfig = {
    launcherKey: stored.tabHistoryForwardKey ?? "",
    launcherCtrl: !!stored.tabHistoryForwardCtrl,
    launcherAlt: !!stored.tabHistoryForwardAlt,
    launcherShift: !!stored.tabHistoryForwardShift
  };

  if (
    stored.tabHistoryForwardKey &&
    tbmEventMatchesLauncherKey(event, forwardConfig)
  ) {
    await tbmSendTabHistoryNavigation("forward");
    return true;
  }

  return false;
}

function tbmFindInitialActiveIndex(tabs) {
    if (!Array.isArray(tabs) || !tabs.length) {
      return 0;
    }

    const currentTabIndex = tabs.findIndex((tab) => !!tab.active);

    if (currentTabIndex === -1) {
      return 0;
    }

    if (tabs.length === 1) {
      return 0;
    }

    for (let i = 0; i < tabs.length; i++) {
      if (!tabs[i].active) {
        return i;
      }
    }

    return 0;
  }
function tbmMatchesSubsequence(text, query) {
  const normalizedText = tbmNormalizeText(text);
  const normalizedQuery = tbmNormalizeText(query).trim();

  if (!normalizedQuery) return true;

  let qi = 0;
  for (let ti = 0; ti < normalizedText.length; ti++) {
    if (normalizedText[ti] === normalizedQuery[qi]) {
      qi++;
      if (qi >= normalizedQuery.length) {
        return true;
      }
    }
  }
  return false;
}

const TBM_STS_GENERIC_SELECTORS = [
  "input[type='search']",
  "form[role='search'] input:not([type='hidden'])",
  "[role='search'] input:not([type='hidden'])",
  "input[name='q']",
  "input[name='query']",
  "input[name='search']",
  "input[name='keyword']",
  "input[name='keywords']",
  "input[name='p']",
  "input[placeholder*='検索']",
  "input[placeholder*='Search']",
  "input[aria-label*='検索']",
  "input[aria-label*='Search']",
  "input[type='text']",
  "textarea",
  "[contenteditable='true']",
  "[contenteditable='']"
];

function tbmGetStsSiteSelectors() {
  if (
    typeof window.TBM_STS_SITE_SELECTORS === "object" &&
    window.TBM_STS_SITE_SELECTORS
  ) {
    return window.TBM_STS_SITE_SELECTORS;
  }

  return {};
}

function tbmGetStsHostKeys(hostname) {
  const host = String(hostname || "").toLowerCase();
  if (!host) return [];

  const keys = [host];

  if (host.startsWith("www.")) {
    keys.push(host.slice(4));
  }

  return [...new Set(keys)];
}

function tbmIsVisibleForSts(element) {
  if (!element || !document.contains(element)) return false;

  if (
    element.matches(
      "input[type='hidden'], [disabled], [readonly], [aria-hidden='true']"
    )
  ) {
    return false;
  }

  const style = window.getComputedStyle(element);
  if (style.display === "none" || style.visibility === "hidden") {
    return false;
  }

  const rect = element.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) {
    return false;
  }

  return true;
}

function tbmScoreStsCandidate(element) {
  if (!tbmIsVisibleForSts(element)) {
    return -1;
  }

  let score = 0;

  const tagName = String(element.tagName || "").toLowerCase();
  const type = String(element.type || "").toLowerCase();
  const name = String(element.getAttribute("name") || "").toLowerCase();
  const id = String(element.id || "").toLowerCase();
  const placeholder = String(element.getAttribute("placeholder") || "").toLowerCase();
  const ariaLabel = String(element.getAttribute("aria-label") || "").toLowerCase();
  const title = String(element.getAttribute("title") || "").toLowerCase();
  const className = String(element.className || "").toLowerCase();

  const textHints = [name, id, placeholder, ariaLabel, title, className].join(" ");

  if (tagName === "input") score += 20;
  if (tagName === "textarea") score += 5;
  if (element.isContentEditable) score += 5;

  if (type === "search") score += 140;
  else if (type === "text" || type === "") score += 80;
  else if (type) score -= 40;

  if (/^(q|query|search|keyword|keywords|p|s)$/.test(name)) {
    score += 90;
  }

  if (/search|query|keyword|keywords|検索/.test(textHints)) {
    score += 70;
  }

  if (element.closest("form[role='search'], [role='search']")) {
    score += 50;
  }

  const rect = element.getBoundingClientRect();

  if (rect.top >= 0 && rect.top < Math.max(window.innerHeight * 0.45, 260)) {
    score += 25;
  }

  if (rect.width >= 180) {
    score += 15;
  }

  if (rect.width >= 260) {
    score += 10;
  }

  return score;
}

function tbmCollectStsCandidates(selectors) {
  const results = [];
  const seen = new Set();

  for (const selector of selectors) {
    let elements = [];

    try {
      elements = Array.from(document.querySelectorAll(selector));
    } catch (error) {
      console.warn("[TBM] invalid STS selector skipped:", selector, error);
      continue;
    }

    for (const element of elements) {
      if (seen.has(element)) continue;
      seen.add(element);
      results.push(element);
    }
  }

  return results;
}

function tbmGetSortedStsCandidates(candidates) {
  return candidates
    .map((element) => ({
      element,
      score: tbmScoreStsCandidate(element)
    }))
    .filter((item) => item.score >= 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.element);
}

function tbmFindSiteSpecificStsTargets() {
  const siteSelectorsMap = tbmGetStsSiteSelectors();
  const hostKeys = tbmGetStsHostKeys(location.hostname);
  const selectors = [];

  for (const hostKey of hostKeys) {
    const hostSelectors = siteSelectorsMap[hostKey];
    if (Array.isArray(hostSelectors) && hostSelectors.length) {
      selectors.push(...hostSelectors);
    }
  }

  if (!selectors.length) {
    return [];
  }

  const candidates = tbmCollectStsCandidates(selectors);
  return tbmGetSortedStsCandidates(candidates);
}

function tbmFindGenericStsTargets() {
  const candidates = tbmCollectStsCandidates(TBM_STS_GENERIC_SELECTORS);
  return tbmGetSortedStsCandidates(candidates);
}

function tbmBuildStsCycleKey(targets, source) {
  const host = String(location.hostname || "").toLowerCase();
  const path = String(location.pathname || "");
  const targetKeys = targets.map((target) => {
    const tagName = String(target.tagName || "").toLowerCase();
    const type = String(target.getAttribute?.("type") || "").toLowerCase();
    const name = String(target.getAttribute?.("name") || "").toLowerCase();
    const id = String(target.id || "").toLowerCase();
    const className = String(target.className || "").toLowerCase();
    const placeholder = String(target.getAttribute?.("placeholder") || "").toLowerCase();

    return [tagName, type, name, id, className, placeholder].join("|");
  });

  return [source, host, path, targetKeys.join("||")].join("###");
}

function tbmNormalizeStsBoxOrderValue(value) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return 1;
  return Math.max(1, parsed);
}

function tbmGetCurrentSiteStsBoxOrder() {
  const hostname = String(location.hostname || "").toLowerCase();
  if (!hostname) return 1;

  const map = TBM_STATE.stsSiteBoxOrderMap;
  if (!map || typeof map !== "object") {
    return 1;
  }

  const entry = map[hostname];

  if (entry && typeof entry === "object") {
    return tbmNormalizeStsBoxOrderValue(entry.order);
  }

  return tbmNormalizeStsBoxOrderValue(entry);
}

function tbmGetInitialStsTargetIndex(targetsLength) {
  if (!targetsLength || targetsLength <= 0) {
    return 0;
  }

  const boxOrder = tbmGetCurrentSiteStsBoxOrder();
  const zeroBasedIndex = Math.max(0, boxOrder - 1);

  return zeroBasedIndex % targetsLength;
}

function tbmGetNextStsTarget(targets, source) {
  if (!Array.isArray(targets) || !targets.length) {
    TBM_STATE.stsCycle.key = "";
    TBM_STATE.stsCycle.index = -1;
    return null;
  }

  const cycleKey = tbmBuildStsCycleKey(targets, source);

  if (TBM_STATE.stsCycle.key !== cycleKey) {
    const initialIndex = tbmGetInitialStsTargetIndex(targets.length);
    TBM_STATE.stsCycle.key = cycleKey;
    TBM_STATE.stsCycle.index = initialIndex;
    return targets[initialIndex];
  }

  const nextIndex = (TBM_STATE.stsCycle.index + 1) % targets.length;
  TBM_STATE.stsCycle.index = nextIndex;
  return targets[nextIndex];
}

let tbmStsFocusStyleInjected = false;
let tbmStsFocusEffectSeq = 0;

function tbmEnsureStsFocusEffectStyle() {
  if (tbmStsFocusStyleInjected) return;

  const style = document.createElement("style");
  style.id = "tbm-sts-focus-effect-style";
  style.textContent = `
    .tbm-sts-focus-effect {
      transition:
        border-color 120ms ease,
        box-shadow 120ms ease;
      border-color: #ea67d8 !important;
      box-shadow: 0 0 0 2px rgba(234, 103, 216, 0.32) !important;
    }
  `;

  document.documentElement.appendChild(style);
  tbmStsFocusStyleInjected = true;
}

function tbmApplyStsFocusEffect(target) {
  if (!target || !(target instanceof HTMLElement)) return;

  tbmEnsureStsFocusEffectStyle();

  tbmStsFocusEffectSeq += 1;
  const token = String(tbmStsFocusEffectSeq);

  target.dataset.tbmStsFocusEffectToken = token;
  target.classList.add("tbm-sts-focus-effect");

  window.setTimeout(() => {
    if (target.dataset.tbmStsFocusEffectToken !== token) return;
    target.classList.remove("tbm-sts-focus-effect");
    delete target.dataset.tbmStsFocusEffectToken;
  }, 300);
}

function tbmFocusStsTarget(target) {
  if (!target || typeof target.focus !== "function") {
    return false;
  }

  try {
    target.focus();
    tbmPrepareForAsciiInput(target);
  } catch (error) {
    console.warn("[TBM] STS focus failed:", error);
    return false;
  }

  const isContentEditable =
    !!target.isContentEditable ||
    !!target.closest?.("[contenteditable='true'], [contenteditable='']");

  if (!isContentEditable && typeof target.select === "function") {
    try {
      target.select();
    } catch (error) {}
  }

  const focused =
    document.activeElement === target ||
    target.contains?.(document.activeElement);

  if (focused) {
    tbmApplyStsFocusEffect(target);
  }

  return focused;
}

function tbmFocusPageSearchBox() {
  const siteSpecificTargets = tbmFindSiteSpecificStsTargets();

  if (siteSpecificTargets.length) {
    const nextSiteTarget = tbmGetNextStsTarget(siteSpecificTargets, "site");

    if (tbmFocusStsTarget(nextSiteTarget)) {
      console.log("[TBM] STS focused by site rule", {
        host: location.hostname,
        index: TBM_STATE.stsCycle.index,
        total: siteSpecificTargets.length,
        target: nextSiteTarget
      });
      return true;
    }

    console.info("[TBM] STS site targets found but focus failed", {
      host: location.hostname,
      total: siteSpecificTargets.length,
      target: nextSiteTarget
    });
  }

  const genericTargets = tbmFindGenericStsTargets();

  if (genericTargets.length) {
    const nextGenericTarget = tbmGetNextStsTarget(genericTargets, "generic");

    if (tbmFocusStsTarget(nextGenericTarget)) {
      console.log("[TBM] STS focused by generic rule", {
        host: location.hostname,
        index: TBM_STATE.stsCycle.index,
        total: genericTargets.length,
        target: nextGenericTarget
      });
      return true;
    }

    console.info("[TBM] STS generic targets found but focus failed", {
      host: location.hostname,
      total: genericTargets.length,
      target: nextGenericTarget
    });
  }

  TBM_STATE.stsCycle.key = "";
  TBM_STATE.stsCycle.index = -1;

  console.info("[TBM] STS no visible target on this page", {
    host: location.hostname,
    siteSpecificCount: siteSpecificTargets.length,
    genericCount: genericTargets.length
  });
  return false;
}

async function tbmLoadRuntimeOptions() {
  try {
    const stored = await chrome.storage.local.get(TBM_RUNTIME_DEFAULTS);

    TBM_STATE.runtimeOptions = {
      ...TBM_RUNTIME_DEFAULTS,
      ...stored
    };

    const map = TBM_STATE.runtimeOptions.stsSiteBoxOrderMap;
    TBM_STATE.stsSiteBoxOrderMap =
      map && typeof map === "object" ? map : {};
  } catch (error) {
    console.warn("[TBM] runtime options load failed:", error);
    TBM_STATE.runtimeOptions = { ...TBM_RUNTIME_DEFAULTS };
    TBM_STATE.stsSiteBoxOrderMap = {};
  }
}

function tbmClamp01(value, fallback = 0.55) {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(1, Math.max(0, n));
}

function tbmNormalizeHexColor(value, fallback) {
  const raw = String(value || "").trim();
  if (/^#[0-9a-fA-F]{6}$/.test(raw)) return raw;
  if (/^#[0-9a-fA-F]{3}$/.test(raw)) {
    return "#" + raw.slice(1).split("").map(ch => ch + ch).join("");
  }
  return fallback;
}

function tbmHexToRgba(hex, alpha) {
  const safeHex = tbmNormalizeHexColor(hex, "#000000");
  const raw = safeHex.slice(1);
  const r = Number.parseInt(raw.slice(0, 2), 16);
  const g = Number.parseInt(raw.slice(2, 4), 16);
  const b = Number.parseInt(raw.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${tbmClamp01(alpha, 0.55)})`;
}

function tbmGetLinkBatchPositionClass() {
  const position = String(
    TBM_STATE.runtimeOptions.linkBatchCheckboxPosition || "top_right"
  ).trim().toLowerCase();

  if (position === "top_left") return "tbm-link-batch-pos-top-left";
  if (position === "bottom_right") return "tbm-link-batch-pos-bottom-right";
  if (position === "bottom_left") return "tbm-link-batch-pos-bottom-left";
  return "tbm-link-batch-pos-top-right";
}

function tbmEnsureLinkBatchStyle() {
  if (TBM_STATE.linkBatch.style) return;

  const style = document.createElement("style");
  style.id = "tbm-link-batch-style";
  style.textContent = `
    :root {
      --tbm-link-batch-overlay: rgba(0, 0, 0, 0.55);
      --tbm-link-batch-border: #ff4db8;
      --tbm-link-batch-checked: #00e676;
    }

    #tbm-link-batch-root {
      position: fixed;
      inset: 0;
      z-index: 2147483646;
      pointer-events: none;
    }

    .tbm-link-batch-overlay {
      position: fixed;
      inset: 0;
      background: var(--tbm-link-batch-overlay);
      pointer-events: auto;
    }

    .tbm-link-batch-summary {
      position: fixed;
      top: 16px;
      right: 16px;
      min-width: 220px;
      padding: 12px 14px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.96);
      color: #222;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
      font-size: 13px;
      line-height: 1.5;
      pointer-events: auto;
      z-index: 2147483647;
    }

    .tbm-link-batch-summary strong {
      display: block;
      margin-bottom: 4px;
      font-size: 14px;
    }

    .tbm-link-batch-hitbox {
      position: fixed;
      box-sizing: border-box;
      border: 2px solid var(--tbm-link-batch-border);
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.01);
      pointer-events: auto;
      z-index: 2147483647;
      cursor: pointer;
    }

    .tbm-link-batch-hitbox.tbm-selected {
      border-color: var(--tbm-link-batch-checked);
      box-shadow: 0 0 0 2px color-mix(in srgb, var(--tbm-link-batch-checked) 35%, transparent);
    }

    .tbm-link-batch-box {
      position: absolute;
      width: 16px;
      height: 16px;
      box-sizing: border-box;
      border: 2px solid var(--tbm-link-batch-border);
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 700;
      color: #111;
    }

    .tbm-link-batch-hitbox.tbm-selected .tbm-link-batch-box {
      border-color: var(--tbm-link-batch-checked);
      background: var(--tbm-link-batch-checked);
      color: #111;
    }

    .tbm-link-batch-pos-top-right .tbm-link-batch-box {
      top: -10px;
      right: -10px;
    }

    .tbm-link-batch-pos-top-left .tbm-link-batch-box {
      top: -10px;
      left: -10px;
    }

    .tbm-link-batch-pos-bottom-right .tbm-link-batch-box {
      bottom: -10px;
      right: -10px;
    }

    .tbm-link-batch-pos-bottom-left .tbm-link-batch-box {
      bottom: -10px;
      left: -10px;
    }
  `;

  document.documentElement.appendChild(style);
  TBM_STATE.linkBatch.style = style;
}

function tbmApplyLinkBatchTheme() {
  tbmEnsureLinkBatchStyle();

  const overlayColor = tbmNormalizeHexColor(
    TBM_STATE.runtimeOptions.linkBatchOverlayColor,
    "#000000"
  );
  const overlayOpacity = tbmClamp01(
    TBM_STATE.runtimeOptions.linkBatchOverlayOpacity,
    0.55
  );
  const borderColor = tbmNormalizeHexColor(
    TBM_STATE.runtimeOptions.linkBatchBorderColor,
    "#ff4db8"
  );
  const checkedColor = tbmNormalizeHexColor(
    TBM_STATE.runtimeOptions.linkBatchCheckedColor,
    "#00e676"
  );

  document.documentElement.style.setProperty(
    "--tbm-link-batch-overlay",
    tbmHexToRgba(overlayColor, overlayOpacity)
  );
  document.documentElement.style.setProperty(
    "--tbm-link-batch-border",
    borderColor
  );
  document.documentElement.style.setProperty(
    "--tbm-link-batch-checked",
    checkedColor
  );
}

function tbmGetVisibleLinkCandidates() {
  const anchors = Array.from(document.querySelectorAll("a[href]"));
  const seen = new Set();
  const results = [];

  const minWidth = Math.max(
    0,
    Number.parseInt(String(TBM_STATE.runtimeOptions.linkBatchMinWidth ?? 24), 10) || 24
  );
  const minHeight = Math.max(
    0,
    Number.parseInt(String(TBM_STATE.runtimeOptions.linkBatchMinHeight ?? 16), 10) || 16
  );

  for (const anchor of anchors) {
    if (!(anchor instanceof HTMLElement)) continue;
    if (!document.contains(anchor)) continue;

    const href = String(anchor.href || "").trim();
    if (!href) continue;
    if (href.startsWith("javascript:")) continue;

    const style = window.getComputedStyle(anchor);
    if (style.display === "none" || style.visibility === "hidden") continue;

    const rect = anchor.getBoundingClientRect();
    if (rect.width < minWidth || rect.height < minHeight) continue;
    if (rect.bottom < 0 || rect.right < 0) continue;
    if (rect.top > window.innerHeight || rect.left > window.innerWidth) continue;

    const key = [
      href,
      Math.round(rect.left),
      Math.round(rect.top),
      Math.round(rect.width),
      Math.round(rect.height)
    ].join("|");

    if (seen.has(key)) continue;
    seen.add(key);

    results.push({
      element: anchor,
      href,
      rect
    });
  }

  return results;
}

function tbmUpdateLinkBatchSummary() {
  if (!TBM_STATE.linkBatch.summary) return;

  const count = TBM_STATE.linkBatch.selectedUrls.size;
  TBM_STATE.linkBatch.summary.innerHTML = `
    <strong>リンク選択モード</strong>
    <div>${count}件選択中</div>
    <div>Enter: バックグラウンドで開く</div>
    <div>Esc: キャンセル</div>
  `;
}

function tbmToggleLinkBatchCandidate(candidate) {
  if (!candidate) return;

  const href = candidate.href;
  if (TBM_STATE.linkBatch.selectedUrls.has(href)) {
    TBM_STATE.linkBatch.selectedUrls.delete(href);
    candidate.hitbox?.classList.remove("tbm-selected");
    candidate.checkbox?.setAttribute("aria-checked", "false");
    candidate.checkboxMark.textContent = "";
  } else {
    TBM_STATE.linkBatch.selectedUrls.add(href);
    candidate.hitbox?.classList.add("tbm-selected");
    candidate.checkbox?.setAttribute("aria-checked", "true");
    candidate.checkboxMark.textContent = "✓";
  }

  tbmUpdateLinkBatchSummary();
}

function tbmCloseLinkBatchMode() {
  if (!TBM_STATE.linkBatch.isOpen) return;

  TBM_STATE.linkBatch.isOpen = false;
  TBM_STATE.linkBatch.selectedUrls.clear();
  TBM_STATE.linkBatch.candidates = [];

  if (TBM_STATE.linkBatch.windowKeydownHandler) {
    window.removeEventListener(
      "keydown",
      TBM_STATE.linkBatch.windowKeydownHandler,
      true
    );
    TBM_STATE.linkBatch.windowKeydownHandler = null;
  }

  if (TBM_STATE.linkBatch.documentKeydownHandler) {
    document.removeEventListener(
      "keydown",
      TBM_STATE.linkBatch.documentKeydownHandler,
      true
    );
    TBM_STATE.linkBatch.documentKeydownHandler = null;
  }

  if (TBM_STATE.linkBatch.windowKeyupHandler) {
    window.removeEventListener(
      "keyup",
      TBM_STATE.linkBatch.windowKeyupHandler,
      true
    );
    TBM_STATE.linkBatch.windowKeyupHandler = null;
  }

  if (TBM_STATE.linkBatch.documentKeyupHandler) {
    document.removeEventListener(
      "keyup",
      TBM_STATE.linkBatch.documentKeyupHandler,
      true
    );
    TBM_STATE.linkBatch.documentKeyupHandler = null;
  }

  if (TBM_STATE.linkBatch.wheelHandler) {
    window.removeEventListener(
      "wheel",
      TBM_STATE.linkBatch.wheelHandler,
      true
    );
    TBM_STATE.linkBatch.wheelHandler = null;
  }

  if (TBM_STATE.linkBatch.touchMoveHandler) {
    window.removeEventListener(
      "touchmove",
      TBM_STATE.linkBatch.touchMoveHandler,
      true
    );
    TBM_STATE.linkBatch.touchMoveHandler = null;
  }

  document.documentElement.style.overflow = TBM_STATE.linkBatch.htmlOverflow || "";
  document.body.style.overflow = TBM_STATE.linkBatch.bodyOverflow || "";

  TBM_STATE.linkBatch.root?.remove();
  TBM_STATE.linkBatch.root = null;
  TBM_STATE.linkBatch.summary = null;
}

async function tbmCommitLinkBatchOpen() {
  const urls = Array.from(TBM_STATE.linkBatch.selectedUrls);

  if (!urls.length) {
    tbmCloseLinkBatchMode();
    return;
  }

  try {
    await chrome.runtime.sendMessage({
      type: "TBM_OPEN_LINKS_IN_BACKGROUND",
      urls
    });
  } catch (error) {
    if (!tbmIsExtensionContextInvalidatedError(error)) {
      console.warn("[TBM] link batch open failed:", error);
    }
  }

  tbmCloseLinkBatchMode();
}

function tbmOpenLinkBatchMode() {
  if (TBM_STATE.linkBatch.isOpen) return;
  if (TBM_STATE.isOpen) return;

  tbmApplyLinkBatchTheme();

  const candidates = tbmGetVisibleLinkCandidates();
  if (!candidates.length) return;

  const root = document.createElement("div");
  root.id = "tbm-link-batch-root";
  root.tabIndex = -1;

  const overlay = document.createElement("div");
  overlay.className = "tbm-link-batch-overlay";
  overlay.addEventListener("mousedown", event => {
    event.preventDefault();
    event.stopPropagation();
  });

  const summary = document.createElement("div");
  summary.className = "tbm-link-batch-summary";

  root.appendChild(overlay);
  root.appendChild(summary);

  const positionClass = tbmGetLinkBatchPositionClass();

  for (const candidate of candidates) {
    const hitbox = document.createElement("button");
    hitbox.type = "button";
    hitbox.className = `tbm-link-batch-hitbox ${positionClass}`;
    hitbox.style.left = `${candidate.rect.left}px`;
    hitbox.style.top = `${candidate.rect.top}px`;
    hitbox.style.width = `${candidate.rect.width}px`;
    hitbox.style.height = `${candidate.rect.height}px`;
    hitbox.title = candidate.href;

    const checkbox = document.createElement("span");
    checkbox.className = "tbm-link-batch-box";
    checkbox.setAttribute("role", "checkbox");
    checkbox.setAttribute("aria-checked", "false");

    const checkboxMark = document.createElement("span");
    checkboxMark.textContent = "";
    checkbox.appendChild(checkboxMark);

    hitbox.appendChild(checkbox);

    hitbox.addEventListener("mousedown", event => {
      event.preventDefault();
      event.stopPropagation();
    });

    hitbox.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      tbmToggleLinkBatchCandidate(candidate);
    });

    candidate.hitbox = hitbox;
    candidate.checkbox = checkbox;
    candidate.checkboxMark = checkboxMark;

    root.appendChild(hitbox);
  }

  document.documentElement.appendChild(root);

  TBM_STATE.linkBatch.isOpen = true;
  TBM_STATE.linkBatch.root = root;
  TBM_STATE.linkBatch.summary = summary;
  TBM_STATE.linkBatch.candidates = candidates;

  TBM_STATE.linkBatch.htmlOverflow = document.documentElement.style.overflow || "";
  TBM_STATE.linkBatch.bodyOverflow = document.body.style.overflow || "";

  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";

  const handleLinkBatchHotkey = async event => {
    if (!TBM_STATE.linkBatch.isOpen) return;

    if (event.key === "Escape" || event.code === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation?.();
      tbmCloseLinkBatchMode();
      return;
    }

    if (event.type === "keydown") {
      const stored = TBM_STATE.runtimeOptions || TBM_RUNTIME_DEFAULTS;
      if (
        stored.enableLinkBatchOpen &&
        stored.linkBatchOpenKey &&
        tbmEventMatchesLauncherKey(event, {
          launcherKey: stored.linkBatchOpenKey,
          launcherCtrl: !!stored.linkBatchOpenCtrl,
          launcherAlt: !!stored.linkBatchOpenAlt,
          launcherShift: !!stored.linkBatchOpenShift
        })
      ) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation?.();
        tbmCloseLinkBatchMode();
        return;
      }
    }

    if (event.type === "keydown" && (event.key === "Enter" || event.code === "Enter")) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation?.();
      await tbmCommitLinkBatchOpen();
      return;
    }
  };

  TBM_STATE.linkBatch.windowKeydownHandler = handleLinkBatchHotkey;
  TBM_STATE.linkBatch.documentKeydownHandler = handleLinkBatchHotkey;
  TBM_STATE.linkBatch.windowKeyupHandler = handleLinkBatchHotkey;
  TBM_STATE.linkBatch.documentKeyupHandler = handleLinkBatchHotkey;

  TBM_STATE.linkBatch.wheelHandler = event => {
    if (!TBM_STATE.linkBatch.isOpen) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation?.();
  };

  TBM_STATE.linkBatch.touchMoveHandler = event => {
    if (!TBM_STATE.linkBatch.isOpen) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation?.();
  };

  window.addEventListener(
    "keydown",
    TBM_STATE.linkBatch.windowKeydownHandler,
    true
  );
  document.addEventListener(
    "keydown",
    TBM_STATE.linkBatch.documentKeydownHandler,
    true
  );
  window.addEventListener(
    "keyup",
    TBM_STATE.linkBatch.windowKeyupHandler,
    true
  );
  document.addEventListener(
    "keyup",
    TBM_STATE.linkBatch.documentKeyupHandler,
    true
  );
  window.addEventListener(
    "wheel",
    TBM_STATE.linkBatch.wheelHandler,
    { capture: true, passive: false }
  );
  window.addEventListener(
    "touchmove",
    TBM_STATE.linkBatch.touchMoveHandler,
    { capture: true, passive: false }
  );

  tbmUpdateLinkBatchSummary();

  try {
    root.focus();
  } catch (error) {}
}

  function tbmCreateOverlayIfNeeded() {
    if (TBM_STATE.elements) return;

    const style = document.createElement('style');
    style.id = 'tbm-overlay-style';
    style.textContent = `
      #tbm-overlay-root {
        position: fixed;
        inset: 0;
        z-index: 2147483647;
        display: none;
        align-items: flex-start;
        justify-content: center;
        background: rgba(0, 0, 0, 0.22);
        padding-top: 72px;
        box-sizing: border-box;
      }

      #tbm-overlay-root.tbm-open {
        display: flex;
      }

      .tbm-overlay-panel {
        width: min(920px, calc(100vw - 48px));
        max-height: min(78vh, 900px);
        background: #ffffff;
        border: 1px solid rgba(0, 0, 0, 0.12);
        border-radius: 16px;
        box-shadow: 0 16px 48px rgba(0, 0, 0, 0.22);
        overflow: hidden;
        color: #222222 !important;
        opacity: 1 !important;
        filter: none !important;
        font-weight: 400 !important;
        -webkit-text-fill-color: currentColor;
      }

      .tbm-search-box-wrap {
        padding: 14px 16px 10px 16px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        background: #ffffff;
      }

      .tbm-search-box {
        width: 100%;
        height: 44px;
        box-sizing: border-box;
        border: 1px solid #cfcfcf;
        border-radius: 10px;
        padding: 0 14px;
        font-size: 16px;
        outline: none;
      }

      .tbm-search-box::placeholder {
        color: #B9B9B9;
      }
      .tbm-search-box::-webkit-input-placeholder {
        color: #B9B9B9;
      }

      .tbm-search-box:focus {
        border-color: #f7a823;
        box-shadow: 0 0 0 3px rgba(255, 180, 0, 0.23);
      }

      .tbm-search-mode-row {
        display: flex;
        align-items: center;
        gap: 14px;
        margin-top: 10px;
        padding-left: 2px;
        font-size: 12px;
        user-select: none;
      }

      .tbm-search-mode-option {
        color: #969696;
      }

      .tbm-search-mode-option input:checked + span {
        color: #4F4F4F;
        font-weight: 500;
        text-decoration: underline;
      }

      .tbm-search-mode-option {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        cursor: pointer;
      }

      .tbm-search-mode-option input {
        margin: 0;
      }

      .tbm-list-wrap {
        overflow: auto;
        max-height: calc(min(78vh, 900px) - 103px);
        background: #ffffff;
      }

      .tbm-tab-item {
        display: flex;
        align-items: center;
        height: 38px;
        padding: 0 12px;
        box-sizing: border-box;
        overflow: hidden;
        white-space: nowrap;
        cursor: pointer;
        user-select: none;
        opacity: 1 !important;
        filter: none !important;
        font-weight: 400 !important;
      }

      .tbm-tab-item:nth-child(even) {
        background: #fafafa;
      }

      .tbm-tab-item:hover {
        background: #eef4ff;
      }

      .tbm-tab-item.tbm-current {
        box-shadow: inset 5px 0 0 #64F77A;
      }

      .tbm-tab-item.tbm-active {
        background: #dbe8ff;
      }

      .tbm-tab-item.tbm-active.tbm-current {
        box-shadow: inset 5px 0 0 #64F77A;
      }

      .tbm-tab-index {
        width: 36px;
        flex-shrink: 0;
        text-align: right;
        margin-right: 10px;
        color: #999999;
        font-size: 12px;
      }
      .tbm-tab-index.top {
        color: #000000;
        font-weight: 600;
      }

      .tbm-tab-favicon {
        width: 16px;
        height: 16px;
        flex-shrink: 0;
        margin-right: 10px;
        object-fit: contain;
        opacity: 0.8;
      }

      .tbm-tab-favicon.tbm-noicon {
        border-radius: 4px;
        background: #d8d8d8;
      }

      .tbm-tab-title {
        min-width: 0;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        color: #222222 !important;
        opacity: 1 !important;
        filter: none !important;
        font-weight: 500 !important;
      }

      .tbm-tab-url {
        min-width: 0;
        max-width: 26%;
        margin-left: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #777777 !important;
        font-size: 12px;
        opacity: 1 !important;
        filter: none !important;
        font-weight: 400 !important;
      }

      .tbm-empty {
        padding: 18px 16px;
        color: #777777;
        font-size: 14px;
      }
    `;

    const root = document.createElement('div');
    root.id = 'tbm-overlay-root';

    root.innerHTML = `
      <div class="tbm-overlay-panel" role="dialog" aria-modal="true" aria-label="Tabmission">
        <div class="tbm-search-box-wrap">
          <input
            id="tbm-search-box"
            class="tbm-search-box"
            type="text"
            autocomplete="off"
            spellcheck="false"
            placeholder="Search tabs..."
          >
          <div class="tbm-search-mode-row">
            <label class="tbm-search-mode-option">
              <input type="radio" name="tbm-search-mode" value="title" checked>
              <span>Title</span>
            </label>
            <label class="tbm-search-mode-option">
              <input type="radio" name="tbm-search-mode" value="url">
              <span>URL</span>
            </label>
            <label class="tbm-search-mode-option">
              <input type="radio" name="tbm-search-mode" value="both">
              <span>Both</span>
            </label>
          </div>
        </div>
        <div id="tbm-list-wrap" class="tbm-list-wrap"></div>
      </div>
    `;

    document.documentElement.appendChild(style);
    document.documentElement.appendChild(root);

    const input = root.querySelector('#tbm-search-box');
    const listWrap = root.querySelector('#tbm-list-wrap');
    const modeInputs = root.querySelectorAll('input[name="tbm-search-mode"]');

    root.addEventListener('mousedown', (e) => {
      if (e.target === root) {
        tbmCloseOverlay();
      }
    });

    input.addEventListener('input', () => {
      tbmApplyFilter();
      tbmRenderList();
    });

    for (const modeInput of modeInputs) {
      modeInput.addEventListener('change', () => {
        if (!modeInput.checked) return;
        TBM_STATE.searchMode = modeInput.value || 'title';
        TBM_STATE.activeIndex = 0;
        tbmApplyFilter();
        tbmRenderList();
        tbmScrollActiveIntoView();
        input.focus();
      });
    }

    input.addEventListener('keydown', async (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (!TBM_STATE.filteredTabs.length) return;
        TBM_STATE.activeIndex = Math.min(
          TBM_STATE.activeIndex + 1,
          TBM_STATE.filteredTabs.length - 1
        );
        tbmRenderList();
        tbmScrollActiveIntoView();
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (!TBM_STATE.filteredTabs.length) return;
        TBM_STATE.activeIndex = Math.max(TBM_STATE.activeIndex - 1, 0);
        tbmRenderList();
        tbmScrollActiveIntoView();
        return;
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        const tab = TBM_STATE.filteredTabs[TBM_STATE.activeIndex];
        if (!tab) return;
        await tbmActivateTab(tab.id);
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        tbmCloseOverlay();
      }
    });

    TBM_STATE.elements = {
      root,
      input,
      listWrap,
      modeInputs
    };  }

  function tbmApplyFilter() {
    const query = TBM_STATE.elements.input.value || '';
    const mode = TBM_STATE.searchMode || 'title';

    TBM_STATE.filteredTabs = TBM_STATE.allTabs.filter((tab) => {
      const title = tab.title || '';
      const url = tab.url || '';

      if (mode === 'url') {
        return tbmMatchesSubsequence(url, query);
      }

      if (mode === 'both') {
        return tbmMatchesSubsequence(title, query) || tbmMatchesSubsequence(url, query);
      }

      return tbmMatchesSubsequence(title, query);
    });

    if (TBM_STATE.activeIndex >= TBM_STATE.filteredTabs.length) {
      TBM_STATE.activeIndex = Math.max(TBM_STATE.filteredTabs.length - 1, 0);
    }
  }

  function tbmRenderList() {
    const listWrap = TBM_STATE.elements.listWrap;

    if (!TBM_STATE.filteredTabs.length) {
      listWrap.innerHTML = '<div class="tbm-empty">No matching tabs</div>';
      return;
    }

    listWrap.innerHTML = TBM_STATE.filteredTabs.map((tab, index) => {
      const activeClass = index === TBM_STATE.activeIndex ? ' tbm-active' : '';
      const currentClass = tab.active ? ' tbm-current' : '';
      const favicon = tab.favIconUrl
        ? `<img class="tbm-tab-favicon" src="${tbmEscapeHtml(tab.favIconUrl)}" alt="">`
        : `<span class="tbm-tab-favicon tbm-noicon"></span>`;

      return `
        <div class="tbm-tab-item${activeClass}${currentClass}" data-tab-id="${tab.id}" data-index="${index}">
          <span class="tbm-tab-index ${tab.lruIndex <= 3 ? 'top' : ''}">${tab.lruIndex}</span>
          ${favicon}
          <span class="tbm-tab-title">${(TBM_STATE.searchMode === 'title' || TBM_STATE.searchMode === 'both')
            ? tbmHighlightMatch(tab.title || '(untitled)', TBM_STATE.elements.input.value)
            : tbmEscapeHtml(tab.title || '(untitled)')}</span>
          <span class="tbm-tab-url">${(TBM_STATE.searchMode === 'url' || TBM_STATE.searchMode === 'both')
            ? tbmHighlightMatch(tab.url || '', TBM_STATE.elements.input.value)
            : tbmEscapeHtml(tab.url || '')}</span>
        </div>
      `;
    }).join('');

    const items = listWrap.querySelectorAll('.tbm-tab-item');
    for (const item of items) {
      item.addEventListener('mousemove', () => {
        const index = Number(item.dataset.index);
        if (Number.isNaN(index)) return;
        if (TBM_STATE.activeIndex !== index) {
          TBM_STATE.activeIndex = index;
          tbmRenderList();
        }
      });

      item.addEventListener('click', async () => {
        const tabId = Number(item.dataset.tabId);
        if (!tabId) return;
        await tbmActivateTab(tabId);
      });
    }
  }

  function tbmScrollActiveIntoView() {
    const listWrap = TBM_STATE.elements.listWrap;
    const activeEl = listWrap.querySelector('.tbm-tab-item.tbm-active');
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }

  async function tbmFetchTabList() {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ type: 'TBM_GET_TAB_LIST' }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('TBM_GET_TAB_LIST lastError:', chrome.runtime.lastError);
          resolve([]);
          return;
        }

        if (!response || !response.ok || !Array.isArray(response.tabs)) {
          resolve([]);
          return;
        }

        resolve(response.tabs);
      });
    });
  }

  async function tbmActivateTab(tabId) {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        { type: 'TBM_ACTIVATE_TAB', tabId: tabId },
        () => {
          tbmCloseOverlay();
          resolve();
        }
      );
    });
  }

  async function tbmOpenOverlay() {
    console.log("[TBM] tbmOpenOverlay called");
    tbmCreateOverlayIfNeeded();

    TBM_STATE.searchMode = 'title';
    for (const modeInput of TBM_STATE.elements.modeInputs) {
      modeInput.checked = modeInput.value === 'title';
    }

    TBM_STATE.allTabs = await tbmFetchTabList();
    TBM_STATE.activeIndex = tbmFindInitialActiveIndex(TBM_STATE.allTabs);
    TBM_STATE.elements.input.value = '';
    tbmApplyFilter();
    tbmRenderList();

    TBM_STATE.isOpen = true;
    TBM_STATE.elements.root.classList.add('tbm-open');

    requestAnimationFrame(() => {
      TBM_STATE.elements.input.focus();
      TBM_STATE.elements.input.select();
      tbmScrollActiveIntoView();
    });
  }

  function tbmCloseOverlay() {
    if (!TBM_STATE.elements) return;

    TBM_STATE.isOpen = false;
    TBM_STATE.elements.root.classList.remove('tbm-open');
  }

function tbmNormalizePageJumpHost(hostname) {
  let host = String(hostname || "").trim().toLowerCase();

  if (!host) return "";

  host = host.replace(/^https?:\/\//, "");
  host = host.replace(/^www\./, "");
  host = host.replace(/\/.*$/, "");

  return host;
}

function tbmNormalizePageJumpPathPrefix(pathname) {
  let path = String(pathname || "").trim();

  if (!path) return "/";

  if (!path.startsWith("/")) {
    path = "/" + path;
  }

  if (path.length > 1 && path.endsWith("/")) {
    path = path.slice(0, -1);
  }

  return path;
}

function tbmNormalizePageJumpRule(rule) {
  const source = rule && typeof rule === "object" ? rule : {};
  const rawPadding = String(source.pageNumberPadding ?? "0").trim();
  const normalizedPadding =
    /^\d+$/.test(rawPadding) ? String(Number.parseInt(rawPadding, 10)) : "0";

  let normalizedMode = "query";
  if (source.mode === "path") {
    normalizedMode = "path";
  } else if (source.mode === "offset") {
    normalizedMode = "offset";
  }

  return {
    host: tbmNormalizePageJumpHost(source.host),
    pathPrefix: tbmNormalizePageJumpPathPrefix(source.pathPrefix || "/"),
    mode: normalizedMode,

    pageParam: String(source.pageParam || "").trim(),
    pageStep: String(source.pageStep || "1").trim() || "1",
    firstPageValue: String(source.firstPageValue ?? "1").trim() || "1",
    firstPageOmit: !!source.firstPageOmit,
    keepParams: Array.isArray(source.keepParams)
      ? source.keepParams.map(v => String(v || "").trim()).filter(Boolean)
      : [],

    pathTemplate: String(source.pathTemplate || "").trim(),
    firstPagePath: tbmNormalizePageJumpPathPrefix(source.firstPagePath || "/"),
    pageNumberPadding: normalizedPadding,

    offsetParam: String(source.offsetParam || "").trim(),
    offsetStep: String(source.offsetStep || "20").trim() || "20",
    offsetFirstValue: String(source.offsetFirstValue ?? "0").trim() || "0",
    offsetKeepParams: Array.isArray(source.offsetKeepParams)
      ? source.offsetKeepParams.map(v => String(v || "").trim()).filter(Boolean)
      : [],

    forwardKey: String(source.forwardKey || "").trim(),
    forwardCtrl: !!source.forwardCtrl,
    forwardAlt: !!source.forwardAlt,
    forwardShift: !!source.forwardShift,
    forwardMouse: !!source.forwardMouse,

    backKey: String(source.backKey || "").trim(),
    backCtrl: !!source.backCtrl,
    backAlt: !!source.backAlt,
    backShift: !!source.backShift,
    backMouse: !!source.backMouse,

    enabled: source.enabled !== false
  };
}

function tbmPageJumpHostMatches(ruleHost, currentHost) {
  const normalizedRuleHost = tbmNormalizePageJumpHost(ruleHost);
  const normalizedCurrentHost = tbmNormalizePageJumpHost(currentHost);

  if (!normalizedRuleHost || !normalizedCurrentHost) {
    return false;
  }

  return (
    normalizedCurrentHost === normalizedRuleHost ||
    normalizedCurrentHost.endsWith("." + normalizedRuleHost)
  );
}

function tbmPageJumpPathMatches(rulePathPrefix, currentPathname) {
  const normalizedRulePath = tbmNormalizePageJumpPathPrefix(rulePathPrefix || "/");
  const normalizedCurrentPath = tbmNormalizePageJumpPathPrefix(currentPathname || "/");

  if (normalizedRulePath === "/") {
    return true;
  }

  if (normalizedCurrentPath === normalizedRulePath) {
    return true;
  }

  return normalizedCurrentPath.startsWith(normalizedRulePath + "/");
}

function tbmParsePositiveInteger(value, fallbackValue = NaN) {
  const parsed = Number.parseInt(String(value || "").trim(), 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallbackValue;
  }
  return parsed;
}

function tbmEscapeRegExp(value) {
  return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function tbmFindMatchedPageJumpRule(rules, currentUrl = location.href) {
  const ruleList = Array.isArray(rules) ? rules : [];

  let url;
  try {
    url = new URL(currentUrl);
  } catch (error) {
    return null;
  }

  const matched = ruleList
    .map(rule => tbmNormalizePageJumpRule(rule))
    .filter(rule => {
      if (!rule.enabled) return false;
      if (!tbmPageJumpHostMatches(rule.host, url.hostname)) return false;
      if (!tbmPageJumpPathMatches(rule.pathPrefix, url.pathname)) return false;
      return true;
    })
    .sort((a, b) => b.pathPrefix.length - a.pathPrefix.length);

  return matched[0] || null;
}

function tbmBuildQueryPageJumpUrl(rule, direction) {
  const normalizedRule = tbmNormalizePageJumpRule(rule);

  if (normalizedRule.mode !== "query") {
    return "";
  }

  if (!normalizedRule.pageParam) {
    return "";
  }

  const step = tbmParsePositiveInteger(normalizedRule.pageStep);
  if (!Number.isFinite(step)) {
    return "";
  }

  const firstPageValue = Number.parseInt(normalizedRule.firstPageValue, 10);
  if (!Number.isFinite(firstPageValue)) {
    return "";
  }

  const url = new URL(location.href);
  const currentRaw = url.searchParams.get(normalizedRule.pageParam);

  let currentValue = firstPageValue;

  if (currentRaw !== null && String(currentRaw).trim() !== "") {
    const parsedCurrent = Number.parseInt(currentRaw, 10);
    if (!Number.isFinite(parsedCurrent)) {
      return "";
    }
    currentValue = parsedCurrent;
  }

  let nextValue = currentValue + (step * direction);

  if (direction < 0 && nextValue < firstPageValue) {
    nextValue = firstPageValue;
  }

  if (nextValue === firstPageValue && normalizedRule.firstPageOmit) {
    url.searchParams.delete(normalizedRule.pageParam);
  } else {
    url.searchParams.set(normalizedRule.pageParam, String(nextValue));
  }

  return url.toString();
}

function tbmBuildPathPageJumpUrl(rule, direction) {
  const normalizedRule = tbmNormalizePageJumpRule(rule);

  if (normalizedRule.mode !== "path") {
    return "";
  }

  const template = String(normalizedRule.pathTemplate || "").trim();
  if (!template) {
    return "";
  }

  const tokenCount = (template.match(/\{n\}/g) || []).length;
  if (tokenCount !== 1) {
    return "";
  }

  const step = tbmParsePositiveInteger(normalizedRule.pageStep);
  if (!Number.isFinite(step)) {
    return "";
  }

  const firstPageValue = Number.parseInt(normalizedRule.firstPageValue, 10);
  if (!Number.isFinite(firstPageValue)) {
    return "";
  }

  const padding = tbmParsePositiveInteger(normalizedRule.pageNumberPadding, 0);

  const formatPageNumber = (value) => {
    const raw = String(value);
    if (!Number.isFinite(padding) || padding <= 0) {
      return raw;
    }
    return raw.padStart(padding, "0");
  };

  const firstPagePath = tbmNormalizePageJumpPathPrefix(
    normalizedRule.firstPagePath || normalizedRule.pathPrefix || "/"
  );

  const escapedPattern = tbmEscapeRegExp(template).replace("\\{n\\}", "(\\d+)");
  const matcher = new RegExp("^" + escapedPattern + "$");

  const currentPath = tbmNormalizePageJumpPathPrefix(location.pathname || "/");
  const url = new URL(location.href);

  if (currentPath === firstPagePath) {
    if (direction < 0) {
      return "";
    }

    const nextNumber = firstPageValue + step;
    url.pathname = template.replace("{n}", formatPageNumber(nextNumber));
    return url.toString();
  }

  const currentMatch = currentPath.match(matcher);
  if (!currentMatch) {
    return "";
  }

  const currentNumber = Number.parseInt(currentMatch[1], 10);
  if (!Number.isFinite(currentNumber)) {
    return "";
  }

  if (direction < 0) {
    if (currentNumber === firstPageValue + step) {
      url.pathname = firstPagePath;
      return url.toString();
    }

    const nextNumber = currentNumber - step;
    if (nextNumber < firstPageValue + step) {
      return "";
    }

    url.pathname = template.replace("{n}", formatPageNumber(nextNumber));
    return url.toString();
  }

  const nextNumber = currentNumber + step;
  url.pathname = template.replace("{n}", formatPageNumber(nextNumber));
  return url.toString();
}

function tbmBuildOffsetPageJumpUrl(rule, direction) {
  const normalizedRule = tbmNormalizePageJumpRule(rule);

  if (normalizedRule.mode !== "offset") {
    return "";
  }

  if (!normalizedRule.offsetParam) {
    return "";
  }

  const step = tbmParsePositiveInteger(normalizedRule.offsetStep);
  if (!Number.isFinite(step)) {
    return "";
  }

  const firstValue = Number.parseInt(normalizedRule.offsetFirstValue, 10);
  if (!Number.isFinite(firstValue)) {
    return "";
  }

  const url = new URL(location.href);
  const currentRaw = url.searchParams.get(normalizedRule.offsetParam);

  let currentValue = firstValue;

  if (currentRaw !== null && String(currentRaw).trim() !== "") {
    const parsedCurrent = Number.parseInt(currentRaw, 10);
    if (!Number.isFinite(parsedCurrent)) {
      return "";
    }
    currentValue = parsedCurrent;
  }

  const nextValue = currentValue + (step * direction);

  if (direction < 0 && nextValue < firstValue) {
    return "";
  }

  url.searchParams.set(normalizedRule.offsetParam, String(nextValue));

  if (Array.isArray(normalizedRule.offsetKeepParams)) {
    for (const paramName of normalizedRule.offsetKeepParams) {
      if (!url.searchParams.has(paramName)) {
        continue;
      }
    }
  }

  return url.toString();
}

function tbmFindFallbackNextPageUrl() {
  function tbmIsUsableFallbackHref(href) {
    const normalizedHref = String(href || "").trim();

    if (!normalizedHref) return false;
    if (normalizedHref.startsWith("#")) return false;
    if (/^javascript:/i.test(normalizedHref)) return false;

    return true;
  }

  function tbmGetFallbackScore(anchor) {
    if (!anchor) return -1;

    const text = String(anchor.textContent || "").trim().toLowerCase();
    const ariaLabel = String(anchor.getAttribute("aria-label") || "").trim().toLowerCase();
    const rel = String(anchor.getAttribute("rel") || "").trim().toLowerCase();
    const className = String(anchor.className || "").toLowerCase();
    const id = String(anchor.id || "").toLowerCase();

    const joined = [text, ariaLabel, rel, className, id].join(" ");

    let score = 0;

    if (rel.includes("next")) score += 100;
    if (text === "次へ" || text === "next" || text === "›" || text === ">") score += 60;
    if (joined.includes("next")) score += 30;
    if (joined.includes("pager")) score += 20;
    if (joined.includes("pagination")) score += 20;
    if (joined.includes("page-numbers")) score += 20;
    if (joined.includes("nav-links")) score += 20;

    if (
      anchor.closest(".pagination, .pager, .nav-links, .page-numbers, nav, [role='navigation']")
    ) {
      score += 25;
    }

    return score;
  }

  const relNextLink = document.querySelector('a[rel="next"][href]');

  if (relNextLink) {
    try {
      const href = String(relNextLink.getAttribute("href") || "").trim();

      if (tbmIsUsableFallbackHref(href)) {
        const nextUrl = new URL(href, location.href).toString();

        if (nextUrl && nextUrl !== location.href) {
          return nextUrl;
        }
      }
    } catch (error) {}
  }

  const anchors = Array.from(document.querySelectorAll("a[href]"));
  const candidates = [];

  for (const anchor of anchors) {
    const href = String(anchor.getAttribute("href") || "").trim();

    if (!tbmIsUsableFallbackHref(href)) {
      continue;
    }

    const text = String(anchor.textContent || "").trim().toLowerCase();
    const ariaLabel = String(anchor.getAttribute("aria-label") || "").trim().toLowerCase();
    const combinedText = `${text} ${ariaLabel}`;

    if (
      !combinedText.includes("次へ") &&
      !combinedText.includes("next") &&
      text !== "›" &&
      text !== ">"
    ) {
      continue;
    }

    const score = tbmGetFallbackScore(anchor);
    if (score < 0) {
      continue;
    }

    candidates.push({ anchor, score });
  }

  candidates.sort((a, b) => b.score - a.score);

  for (const candidate of candidates) {
    try {
      const href = String(candidate.anchor.getAttribute("href") || "").trim();
      const nextUrl = new URL(href, location.href).toString();

      if (nextUrl && nextUrl !== location.href) {
        return nextUrl;
      }
    } catch (error) {}
  }

  return "";
}

function tbmGetPageJumpShortcutRule(rules, direction) {
  const matchedRule = tbmFindMatchedPageJumpRule(rules, location.href);

  if (!matchedRule) {
    return null;
  }

  if (direction > 0) {
    if (!matchedRule.forwardKey) return null;
  } else {
    if (!matchedRule.backKey) return null;
  }

  return matchedRule;
}

function tbmBuildPageJumpLauncherConfig(rule, direction) {
  const normalizedRule = tbmNormalizePageJumpRule(rule);

  if (direction > 0) {
    return {
      launcherKey: normalizedRule.forwardKey,
      launcherCtrl: !!normalizedRule.forwardCtrl,
      launcherAlt: !!normalizedRule.forwardAlt,
      launcherShift: !!normalizedRule.forwardShift
    };
  }

  return {
    launcherKey: normalizedRule.backKey,
    launcherCtrl: !!normalizedRule.backCtrl,
    launcherAlt: !!normalizedRule.backAlt,
    launcherShift: !!normalizedRule.backShift
  };
}

function tbmHandleGooglePageJumpKeydown(event, stored) {
  if (!stored?.enableGooglePageJump) return false;
  if (!tbmIsGoogleSearchPage()) return false;

  const forwardConfig = {
    launcherKey: stored.googlePageJumpForwardKey,
    launcherCtrl: !!stored.googlePageJumpForwardCtrl,
    launcherAlt: !!stored.googlePageJumpForwardAlt,
    launcherShift: !!stored.googlePageJumpForwardShift
  };

  if (
    stored.googlePageJumpForwardKey &&
    tbmEventMatchesLauncherKey(event, forwardConfig)
  ) {
    return tbmRunGooglePageJump(1);
  }

  const backConfig = {
    launcherKey: stored.googlePageJumpBackKey,
    launcherCtrl: !!stored.googlePageJumpBackCtrl,
    launcherAlt: !!stored.googlePageJumpBackAlt,
    launcherShift: !!stored.googlePageJumpBackShift
  };

  if (
    stored.googlePageJumpBackKey &&
    tbmEventMatchesLauncherKey(event, backConfig)
  ) {
    return tbmRunGooglePageJump(-1);
  }

  return false;
}

function tbmHandleRulePageJumpKeydown(event, stored) {
  if (!stored?.enablePageJump) return false;

  const currentForwardRule = tbmGetPageJumpShortcutRule(stored.pageJumpRules, 1);

  if (
    currentForwardRule &&
    tbmEventMatchesLauncherKey(
      event,
      tbmBuildPageJumpLauncherConfig(currentForwardRule, 1)
    )
  ) {
    return tbmRunPageJumpByRule(currentForwardRule, 1);
  }

  const currentBackRule = tbmGetPageJumpShortcutRule(stored.pageJumpRules, -1);

  if (
    currentBackRule &&
    tbmEventMatchesLauncherKey(
      event,
      tbmBuildPageJumpLauncherConfig(currentBackRule, -1)
    )
  ) {
    return tbmRunPageJumpByRule(currentBackRule, -1);
  }

  return false;
}

function tbmRunPageJumpByRule(rule, direction) {
  const normalizedRule = tbmNormalizePageJumpRule(rule);

  let nextUrl = "";

  if (normalizedRule.mode === "query") {
    nextUrl = tbmBuildQueryPageJumpUrl(normalizedRule, direction);
  } else if (normalizedRule.mode === "path") {
    nextUrl = tbmBuildPathPageJumpUrl(normalizedRule, direction);
  } else if (normalizedRule.mode === "offset") {
    nextUrl = tbmBuildOffsetPageJumpUrl(normalizedRule, direction);
  } else {
    return false;
  }

  if (direction > 0 && (!nextUrl || nextUrl === location.href)) {
    let currentUrl;

    try {
      currentUrl = new URL(location.href);
    } catch (error) {
      currentUrl = null;
    }

    const canUseFallback =
      !!currentUrl &&
      !!normalizedRule.enabled &&
      tbmPageJumpHostMatches(normalizedRule.host, currentUrl.hostname) &&
      tbmPageJumpPathMatches(normalizedRule.pathPrefix, currentUrl.pathname);

    if (canUseFallback) {
      nextUrl = tbmFindFallbackNextPageUrl();
    }
  }

  if (!nextUrl || nextUrl === location.href) {
    return false;
  }

  location.href = nextUrl;
  return true;
}

function tbmIsGoogleSearchPage() {
  const host = String(location.hostname || "").toLowerCase();
  const path = String(location.pathname || "");

  if (!host || !/(\.|^)google\./.test(host)) {
    return false;
  }

  if (path !== "/search") {
    return false;
  }

  const url = new URL(location.href);
  const tbm = String(url.searchParams.get("tbm") || "").trim();
  const udm = String(url.searchParams.get("udm") || "").trim();

  if (tbm) {
    return false;
  }

  if (udm && udm !== "14") {
    return false;
  }

  return true;
}

function tbmRunGooglePageJump(direction) {
  if (!tbmIsGoogleSearchPage()) {
    return false;
  }

  const url = new URL(location.href);
  const rawStart = url.searchParams.get("start");
  const currentStart = Number.parseInt(rawStart || "0", 10);

  if (!Number.isFinite(currentStart) || currentStart < 0) {
    return false;
  }

  const nextStart = currentStart + (10 * direction);

  if (direction < 0 && nextStart < 0) {
    return false;
  }

  if (nextStart <= 0) {
    url.searchParams.delete("start");
  } else {
    url.searchParams.set("start", String(nextStart));
  }

  const nextUrl = url.toString();

  if (!nextUrl || nextUrl === location.href) {
    return false;
  }

  location.href = nextUrl;
  return true;
}

function tbmGetPageJumpDirectionFromMouseButton(button) {
  if (button === 3) return -1;
  if (button === 4) return 1;
  return 0;
}

function tbmShouldUseGooglePageJumpMouse(stored, direction) {
  if (!stored?.enableGooglePageJump) return false;
  if (!tbmIsGoogleSearchPage()) return false;

  if (direction > 0) {
    return !!stored.googlePageJumpMouseForward;
  }

  if (direction < 0) {
    return !!stored.googlePageJumpMouseBack;
  }

  return false;
}

function tbmGetMousePageJumpRule(rules, direction) {
  const matchedRule = tbmFindMatchedPageJumpRule(rules, location.href);

  if (!matchedRule) return null;

  if (direction > 0 && matchedRule.forwardMouse) {
    return matchedRule;
  }

  if (direction < 0 && matchedRule.backMouse) {
    return matchedRule;
  }

  return null;
}

async function tbmHandlePageJumpMouseDown(e) {
  const direction = tbmGetPageJumpDirectionFromMouseButton(e.button);
  if (!direction) return;

  if (tbmIsEditableTarget(e.target)) return;
  if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;

  if (TBM_STATE.isOpen) {
    e.preventDefault();
    e.stopPropagation();
    if (typeof e.stopImmediatePropagation === "function") {
      e.stopImmediatePropagation();
    }
    return;
  }

  const stored = await chrome.storage.local.get({
    enablePageJump: true,
    pageJumpRules: [],

    enableGooglePageJump: false,
    googlePageJumpMouseBack: false,
    googlePageJumpMouseForward: false
  });

  if (!stored.enablePageJump) {
    return;
  }

  const mouseRule = tbmGetMousePageJumpRule(stored.pageJumpRules, direction);
  const googleMouseEnabled = tbmShouldUseGooglePageJumpMouse(stored, direction);

  if (!mouseRule && !googleMouseEnabled) {
    return;
  }

  e.preventDefault();
  e.stopPropagation();
  if (typeof e.stopImmediatePropagation === "function") {
    e.stopImmediatePropagation();
  }
}

async function tbmHandlePageJumpMouseUp(e) {
  const direction = tbmGetPageJumpDirectionFromMouseButton(e.button);
  if (!direction) return;

  if (tbmIsEditableTarget(e.target)) return;
  if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;

  if (TBM_STATE.isOpen) {
    e.preventDefault();
    e.stopPropagation();
    if (typeof e.stopImmediatePropagation === "function") {
      e.stopImmediatePropagation();
    }
    return;
  }

  const stored = await chrome.storage.local.get({
    enablePageJump: true,
    pageJumpRules: [],

    enableGooglePageJump: false,
    googlePageJumpMouseBack: false,
    googlePageJumpMouseForward: false
  });

  if (!stored.enablePageJump) {
    return;
  }

  const mouseRule = tbmGetMousePageJumpRule(stored.pageJumpRules, direction);
  const googleMouseEnabled = tbmShouldUseGooglePageJumpMouse(stored, direction);

  if (!mouseRule && !googleMouseEnabled) {
    return;
  }

  let jumped = false;

  if (googleMouseEnabled) {
    jumped = tbmRunGooglePageJump(direction);
  }

  if (!jumped && mouseRule) {
    jumped = tbmRunPageJumpByRule(mouseRule, direction);
  }

  if (jumped) {
    e.preventDefault();
    e.stopPropagation();
    if (typeof e.stopImmediatePropagation === "function") {
      e.stopImmediatePropagation();
    }
  }
}

tbmLoadRuntimeOptions().catch(error => {
  console.warn("[TBM] initial runtime options load failed:", error);
});

document.addEventListener('mousedown', async (e) => {
  try {
    await tbmHandlePageJumpMouseDown(e);
  } catch (error) {
    console.warn('[TBM] PageJump mouse down error:', error);
  }
}, true);

document.addEventListener('mouseup', async (e) => {
  try {
    await tbmHandlePageJumpMouseUp(e);
  } catch (error) {
    console.warn('[TBM] PageJump mouse up error:', error);
  }
}, true);

document.addEventListener('keydown', async (e) => {
  try {
    if (e.isComposing || e.keyCode === 229) return;
    if (e.metaKey) return;

    const stored = TBM_STATE.runtimeOptions || TBM_RUNTIME_DEFAULTS;

    if (TBM_STATE.linkBatch.isOpen) {
      if (e.key === "Escape" || e.code === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        tbmCloseLinkBatchMode();
        return;
      }

      if (
        stored.enableLinkBatchOpen &&
        stored.linkBatchOpenKey &&
        tbmEventMatchesLauncherKey(e, {
          launcherKey: stored.linkBatchOpenKey,
          launcherCtrl: !!stored.linkBatchOpenCtrl,
          launcherAlt: !!stored.linkBatchOpenAlt,
          launcherShift: !!stored.linkBatchOpenShift
        })
      ) {
        e.preventDefault();
        e.stopPropagation();
        tbmCloseLinkBatchMode();
        return;
      }

      if (e.key === "Enter" || e.code === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        await tbmCommitLinkBatchOpen();
        return;
      }

      return;
    }

    if (TBM_STATE.isOpen) {
      if (e.key === 'Escape' || e.code === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        tbmCloseOverlay();
        return;
      }
      return;
    }

    const isEditableTarget = tbmIsEditableTarget(e.target);

    if (
      stored.enableSlashToSearch &&
      stored.stsKey &&
      tbmEventMatchesLauncherKey(e, {
        launcherKey: stored.stsKey,
        launcherCtrl: !!stored.stsCtrl,
        launcherAlt: !!stored.stsAlt,
        launcherShift: !!stored.stsShift
      })
    ) {
      const focused = tbmFocusPageSearchBox();

      if (focused) {
        e.preventDefault();
        e.stopPropagation();
      }

      return;
    }

    if (isEditableTarget) return;

    const tabHistoryHandled = await tbmHandleTabHistoryKeydown(e, stored);

    if (tabHistoryHandled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (
      stored.enableLinkBatchOpen &&
      stored.linkBatchOpenKey &&
      tbmEventMatchesLauncherKey(e, {
        launcherKey: stored.linkBatchOpenKey,
        launcherCtrl: !!stored.linkBatchOpenCtrl,
        launcherAlt: !!stored.linkBatchOpenAlt,
        launcherShift: !!stored.linkBatchOpenShift
      })
    ) {
      e.preventDefault();
      e.stopPropagation();
      tbmOpenLinkBatchMode();
      return;
    }

    const googlePageJumped = tbmHandleGooglePageJumpKeydown(e, stored);

    if (googlePageJumped) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    const rulePageJumped = tbmHandleRulePageJumpKeydown(e, stored);

    if (rulePageJumped) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (
      stored.enableTabSearch &&
      stored.launcherKey &&
      tbmEventMatchesLauncherKey(e, {
        launcherKey: stored.launcherKey,
        launcherCtrl: !!stored.launcherCtrl,
        launcherAlt: !!stored.launcherAlt,
        launcherShift: !!stored.launcherShift
      })
    ) {
      e.preventDefault();
      e.stopPropagation();
      await tbmOpenOverlay();
      return;
    }
  } catch (error) {
    if (tbmIsExtensionContextInvalidatedError(error)) {
      return;
    }

    console.warn('[TBM] keydown handler skipped:', error);
  }
}, true);

  document.addEventListener('keyup', (e) => {
    if (!TBM_STATE.isOpen) return;

    if (e.key === 'Escape' || e.code === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      tbmCloseOverlay();
    }
  }, true);
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message || message.type !== "TBM_EXTERNAL_COMMAND") {
    return false;
  }

  (async () => {
    try {
      const command = String(message.command || "").trim();
      const stored = TBM_STATE.runtimeOptions || TBM_RUNTIME_DEFAULTS;

      if (command === "openTabSearch") {
        if (!stored.enableTabSearch) {
          sendResponse({ ok: false, error: "tab_search_disabled" });
          return;
        }

        await tbmOpenOverlay();
        sendResponse({ ok: true });
        return;
      }

      if (command === "openLinkSelector") {
        if (!stored.enableLinkBatchOpen) {
          sendResponse({ ok: false, error: "link_selector_disabled" });
          return;
        }

        if (TBM_STATE.linkBatch.isOpen) {
          tbmCloseLinkBatchMode();
          sendResponse({ ok: true, closed: true });
          return;
        }

        tbmOpenLinkBatchMode();
        sendResponse({ ok: !!TBM_STATE.linkBatch.isOpen, error: TBM_STATE.linkBatch.isOpen ? undefined : "no_link_candidates" });
        return;
      }

      if (command === "focusSearchBox") {
        if (!stored.enableSlashToSearch) {
          sendResponse({ ok: false, error: "search_focus_disabled" });
          return;
        }

        const focused = tbmFocusPageSearchBox();
        sendResponse({ ok: !!focused, error: focused ? undefined : "no_search_box" });
        return;
      }

      sendResponse({ ok: false, error: "unknown_command" });
    } catch (error) {
      if (tbmIsExtensionContextInvalidatedError(error)) {
        sendResponse({ ok: false, error: "extension_context_invalidated" });
        return;
      }

      console.warn("[TBM] external content command failed:", error);
      sendResponse({ ok: false, error: String(error?.message || error) });
    }
  })();

  return true;
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== "local") return;

  let runtimeChanged = false;

  for (const key of Object.keys(TBM_RUNTIME_DEFAULTS)) {
    if (!(key in changes)) continue;
    TBM_STATE.runtimeOptions[key] = changes[key].newValue;
    runtimeChanged = true;
  }

  if (!runtimeChanged) return;

  const nextMap = TBM_STATE.runtimeOptions.stsSiteBoxOrderMap;
  TBM_STATE.stsSiteBoxOrderMap =
    nextMap && typeof nextMap === "object" ? nextMap : {};
});

})();