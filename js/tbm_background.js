const TBM_DEBUG = true;

const TBM_DEFAULT_CONFIG = {
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

let tbmRuntimeConfig = { ...TBM_DEFAULT_CONFIG };

const TBM_SESSION_STATE_STORAGE_KEY = "tbmSessionStateV1";
const TBM_SESSION_STATE_SCHEMA_VERSION = 1;
let tbmPersistSessionStateChain = Promise.resolve();

const tbmSessionState = {
  currentByWindow: {},
  previousCurrentByWindow: {},
  windows: {},
  suppressNextActivatedByWindow: {},
  closeTransitionByWindow: {},
  canceledCloseTargetByWindow: {}
};

const TBM_LOG_IMPORTANT = new Set([
  "Close transition marked",
  "Close transition cleared",
  "Activated non-target tab during close transition (force break)",
  "Activated non-target tab during close transition (hold transition)",
  "Activated target tab during close transition",
  "Activated while previous current tab is already missing (defer to close)",
  "Close activation requested",
  "tbmActivateAfterClose error",
  "tbmHandleActivated error",
  "tabs.onRemoved error",

  "Current snapshot updated",
  "New tab placement applied",
  "New tab placement skipped",
  "New tab placement basis resolved",
  "tbmResolveInsertIndexForNewTab basis tab missing",
  "tbmResolveInsertIndexForNewTab opener tab missing",
  "tbmApplyNewTabPlacement error",
  "tabs.onCreated error",
  "Tab moved",
  "Worker state restored",
  "Worker state seeded",
  "Worker state restore error",
  "Worker state persist error"
]);

function tbmLog(message, ...rest) {
  if (!TBM_DEBUG) return;

  // 重要ログのみ出す
  if (typeof message === "string" && !TBM_LOG_IMPORTANT.has(message)) {
    return;
  }

  console.log("[TBM]", message, ...rest);
}

async function tbmLoadRuntimeConfig() {
  try {
    const stored = await chrome.storage.local.get(TBM_DEFAULT_CONFIG);
    tbmRuntimeConfig = {
      ...TBM_DEFAULT_CONFIG,
      ...stored
    };

    tbmLog("Runtime config loaded", { ...tbmRuntimeConfig });
  } catch (error) {
    tbmLog("tbmLoadRuntimeConfig error", error);
    tbmRuntimeConfig = { ...TBM_DEFAULT_CONFIG };
  }
}


function tbmCopyNumericIdArray(value) {
  if (!Array.isArray(value)) return [];
  return value.filter(id => typeof id === "number");
}

function tbmCopySnapshotMap(value) {
  const result = {};
  if (!value || typeof value !== "object") return result;

  for (const [windowId, snapshot] of Object.entries(value)) {
    if (!snapshot || typeof snapshot !== "object") continue;

    result[windowId] = {
      tabId: typeof snapshot.tabId === "number" ? snapshot.tabId : null,
      tabIndex: typeof snapshot.tabIndex === "number" ? snapshot.tabIndex : null
    };
  }

  return result;
}

function tbmBuildPersistedSessionState() {
  const windows = {};

  for (const [windowId, windowState] of Object.entries(tbmSessionState.windows)) {
    windows[windowId] = {
      activationHistoryTabIds: tbmCopyNumericIdArray(windowState?.activationHistoryTabIds),
      tabHistoryForwardTabIds: tbmCopyNumericIdArray(windowState?.tabHistoryForwardTabIds)
    };
  }

  return {
    schemaVersion: TBM_SESSION_STATE_SCHEMA_VERSION,
    currentByWindow: tbmCopySnapshotMap(tbmSessionState.currentByWindow),
    previousCurrentByWindow: tbmCopySnapshotMap(tbmSessionState.previousCurrentByWindow),
    windows
  };
}

function tbmPersistSessionState() {
  const snapshot = tbmBuildPersistedSessionState();

  tbmPersistSessionStateChain = tbmPersistSessionStateChain
    .catch(() => {})
    .then(async () => {
      try {
        await chrome.storage.session.set({
          [TBM_SESSION_STATE_STORAGE_KEY]: snapshot
        });
      } catch (error) {
        tbmLog("Worker state persist error", error);
      }
    });

  return tbmPersistSessionStateChain;
}

function tbmRestorePersistedSessionState(rawState) {
  tbmSessionState.currentByWindow = tbmCopySnapshotMap(rawState?.currentByWindow);
  tbmSessionState.previousCurrentByWindow = tbmCopySnapshotMap(rawState?.previousCurrentByWindow);
  tbmSessionState.windows = {};

  const rawWindows = rawState?.windows;
  if (rawWindows && typeof rawWindows === "object") {
    for (const [windowId, rawWindowState] of Object.entries(rawWindows)) {
      tbmSessionState.windows[windowId] = {
        activationHistoryTabIds: tbmCopyNumericIdArray(rawWindowState?.activationHistoryTabIds),
        tabHistoryForwardTabIds: tbmCopyNumericIdArray(rawWindowState?.tabHistoryForwardTabIds),
        pinnedTabIds: []
      };
    }
  }

  // These are short-lived transition guards. Never restore them across worker lifetimes.
  tbmSessionState.suppressNextActivatedByWindow = {};
  tbmSessionState.closeTransitionByWindow = {};
  tbmSessionState.canceledCloseTargetByWindow = {};
}

async function tbmRestoreSessionState() {
  try {
    const stored = await chrome.storage.session.get(TBM_SESSION_STATE_STORAGE_KEY);
    const rawState = stored?.[TBM_SESSION_STATE_STORAGE_KEY];

    if (
      rawState &&
      rawState.schemaVersion === TBM_SESSION_STATE_SCHEMA_VERSION
    ) {
      tbmRestorePersistedSessionState(rawState);

      tbmLog("Worker state restored", {
        windowIds: Object.keys(tbmSessionState.windows),
        currentWindowIds: Object.keys(tbmSessionState.currentByWindow)
      });

      return true;
    }
  } catch (error) {
    tbmLog("Worker state restore error", error);
  }

  return false;
}

function tbmEnsureWindowState(windowId) {
  if (!tbmSessionState.windows[windowId]) {
    tbmSessionState.windows[windowId] = {
      activationHistoryTabIds: [],
      tabHistoryForwardTabIds: [],
      pinnedTabIds: []
    };
  }

  const windowState = tbmSessionState.windows[windowId];

  if (!Array.isArray(windowState.activationHistoryTabIds)) {
    windowState.activationHistoryTabIds = [];
  }

  if (!Array.isArray(windowState.tabHistoryForwardTabIds)) {
    windowState.tabHistoryForwardTabIds = [];
  }

  if (!Array.isArray(windowState.pinnedTabIds)) {
    windowState.pinnedTabIds = [];
  }

  return windowState;
}

function tbmEnsureCurrentState(windowId) {
  if (!tbmSessionState.currentByWindow[windowId]) {
    tbmSessionState.currentByWindow[windowId] = {
      tabId: null,
      tabIndex: null
    };
  }

  return tbmSessionState.currentByWindow[windowId];
}

function tbmSetCurrentTabSnapshot(windowId, tabId, tabIndex) {
  const currentState = tbmEnsureCurrentState(windowId);

  const previousTabId = currentState.tabId;
  const previousTabIndex = currentState.tabIndex;

  if (
    typeof previousTabId === "number" &&
    previousTabId !== tabId
  ) {
    tbmSessionState.previousCurrentByWindow[windowId] = {
      tabId: previousTabId,
      tabIndex: typeof previousTabIndex === "number" ? previousTabIndex : null
    };
  }

  currentState.tabId = typeof tabId === "number" ? tabId : null;
  currentState.tabIndex = typeof tabIndex === "number" ? tabIndex : null;

  tbmLog("Current snapshot updated", {
    windowId,
    tabId: currentState.tabId,
    tabIndex: currentState.tabIndex
  });
}

function tbmClearCurrentTabSnapshotIfMatches(windowId, tabId) {
  const currentState = tbmSessionState.currentByWindow[windowId];
  if (!currentState) return;

  if (currentState.tabId === tabId) {
    currentState.tabId = null;
    currentState.tabIndex = null;

    tbmLog("Current snapshot cleared", {
      windowId,
      tabId
    });
  }
}

function tbmClearPreviousCurrentSnapshotIfMatches(windowId, tabId) {
  const previousState = tbmSessionState.previousCurrentByWindow[windowId];
  if (!previousState) return;

  if (previousState.tabId === tabId) {
    delete tbmSessionState.previousCurrentByWindow[windowId];
  }
}

function tbmMarkSuppressNextActivated(windowId) {
  tbmSessionState.suppressNextActivatedByWindow[windowId] = true;

  tbmLog("Suppress next activated marked", { windowId });
}

function tbmConsumeSuppressNextActivated(windowId) {
  if (!tbmSessionState.suppressNextActivatedByWindow[windowId]) {
    return false;
  }

  delete tbmSessionState.suppressNextActivatedByWindow[windowId];

  tbmLog("Suppress next activated consumed", { windowId });
  return true;
}

function tbmMarkCloseTransition(windowId, closingTabId, targetTabId) {
  tbmSessionState.closeTransitionByWindow[windowId] = {
    closingTabId: typeof closingTabId === "number" ? closingTabId : null,
    targetTabId: typeof targetTabId === "number" ? targetTabId : null
  };

  tbmLog("Close transition marked", {
    windowId,
    closingTabId,
    targetTabId
  });
}

function tbmGetCloseTransition(windowId) {
  return tbmSessionState.closeTransitionByWindow[windowId] || null;
}

function tbmClearCloseTransition(windowId) {
  if (!tbmSessionState.closeTransitionByWindow[windowId]) {
    return;
  }

  delete tbmSessionState.closeTransitionByWindow[windowId];

  tbmLog("Close transition cleared", { windowId });
}

function tbmShouldIgnoreTabForHistory(tab) {
  const url = String(tab?.url || "");

  if (!url) {
    return false;
  }

  if (url.startsWith("chrome://extensions")) {
    return true;
  }

  if (url.startsWith("edge://extensions")) {
    return true;
  }

  if (url.startsWith(`chrome-extension://${chrome.runtime.id}/`)) {
    return true;
  }

  return false;
}

function tbmMoveTabIdToHistoryEnd(tabIds, tabId) {
  if (typeof tabId !== "number") {
    return [...tabIds];
  }

  const filtered = tabIds.filter(id => id !== tabId);
  filtered.push(tabId);
  return filtered;
}

function tbmMarkCanceledCloseTarget(windowId, targetTabId) {
  if (typeof targetTabId !== "number") {
    return;
  }

  tbmSessionState.canceledCloseTargetByWindow[windowId] = targetTabId;

  tbmLog("Canceled close target marked", {
    windowId,
    targetTabId
  });
}

function tbmConsumeCanceledCloseTarget(windowId, tabId) {
  const targetTabId = tbmSessionState.canceledCloseTargetByWindow[windowId];

  if (typeof targetTabId !== "number") {
    return false;
  }

  if (targetTabId !== tabId) {
    return false;
  }

  delete tbmSessionState.canceledCloseTargetByWindow[windowId];

  tbmLog("Canceled close target consumed", {
    windowId,
    tabId
  });

  return true;
}

async function tbmActivateLastHistoryTab(windowId, closingTabId) {
  const windowState = tbmEnsureWindowState(windowId);
  const history = windowState.activationHistoryTabIds;

  const targetTabId =
    history.length > 0
      ? history[history.length - 1]
      : null;

  if (typeof targetTabId !== "number" || targetTabId === closingTabId) {
    tbmLog("History activation target not found", {
      windowId,
      closingTabId,
      targetTabId
    });
    return;
  }

  tbmMarkSuppressNextActivated(windowId);
  await chrome.tabs.update(targetTabId, { active: true });

  tbmLog("History activation requested", {
    windowId,
    closingTabId,
    targetTabId
  });
}


function tbmClearTabHistoryForward(windowId) {
  const windowState = tbmEnsureWindowState(windowId);
  windowState.tabHistoryForwardTabIds = [];
}

function tbmPushActivationHistory(windowId, tabId, options = {}) {
  if (typeof tabId !== "number") {
    return;
  }

  const { clearForward = true } = options;
  const windowState = tbmEnsureWindowState(windowId);

  windowState.activationHistoryTabIds =
    windowState.activationHistoryTabIds.filter(id => id !== tabId);

  windowState.activationHistoryTabIds.push(tabId);

  if (clearForward) {
    tbmClearTabHistoryForward(windowId);
  }

  tbmLog("Activation history pushed", {
    windowId,
    activationHistoryTabIds: [...windowState.activationHistoryTabIds],
    tabHistoryForwardTabIds: [...windowState.tabHistoryForwardTabIds]
  });
}

function tbmRemoveTrackedTab(windowId, tabId) {
  const windowState = tbmEnsureWindowState(windowId);

  windowState.activationHistoryTabIds =
    windowState.activationHistoryTabIds.filter(id => id !== tabId);

  windowState.tabHistoryForwardTabIds =
    windowState.tabHistoryForwardTabIds.filter(id => id !== tabId);

  windowState.pinnedTabIds =
    windowState.pinnedTabIds.filter(id => id !== tabId);

  tbmClearPreviousCurrentSnapshotIfMatches(windowId, tabId);

  tbmLog("Tracked tab removed", {
    windowId,
    tabId,
    activationHistoryTabIds: [...windowState.activationHistoryTabIds],
    pinnedTabIds: [...windowState.pinnedTabIds]
  });
}

function tbmSetPinnedMembership(windowId, pinnedTabIds) {
  const windowState = tbmEnsureWindowState(windowId);
  windowState.pinnedTabIds = [...pinnedTabIds];

  tbmLog("Pinned membership updated", {
    windowId,
    pinnedTabIds: [...windowState.pinnedTabIds]
  });
}

async function tbmRefreshPinnedMembership(windowId) {
  try {
    const tabs = await chrome.tabs.query({ windowId });

    const pinnedIds = tabs
      .filter(tab => tab.pinned)
      .sort((a, b) => a.index - b.index)
      .map(tab => tab.id)
      .filter(id => typeof id === "number");

    tbmSetPinnedMembership(windowId, pinnedIds);
  } catch (error) {
    tbmLog("tbmRefreshPinnedMembership error", error);
  }
}

async function tbmRebuildWindowState(windowId) {
  try {
    const tabs = await chrome.tabs.query({ windowId });
    const windowState = tbmEnsureWindowState(windowId);

    const historyEligibleTabIds = tabs
      .filter(tab => !tbmShouldIgnoreTabForHistory(tab))
      .map(tab => tab.id)
      .filter(id => typeof id === "number");

    const historyEligibleTabIdSet = new Set(historyEligibleTabIds);

    // Repair membership only. Never infer recency/current from a tabs.query snapshot:
    // that snapshot can be stale relative to a newer tabs.onActivated event.
    windowState.activationHistoryTabIds =
      windowState.activationHistoryTabIds.filter(id => historyEligibleTabIdSet.has(id));

    windowState.tabHistoryForwardTabIds =
      windowState.tabHistoryForwardTabIds.filter(id => historyEligibleTabIdSet.has(id));

    windowState.pinnedTabIds = tabs
      .filter(tab => tab.pinned)
      .sort((a, b) => a.index - b.index)
      .map(tab => tab.id)
      .filter(id => typeof id === "number");

    await tbmPersistSessionState();

    tbmLog("Window state rebuilt (repair-only)", {
      windowId,
      activationHistoryTabIds: [...windowState.activationHistoryTabIds],
      pinnedTabIds: [...windowState.pinnedTabIds]
    });
  } catch (error) {
    tbmLog("tbmRebuildWindowState error", error);
  }
}

async function tbmInitializeAllWindows() {
  try {
    const allWindows = await chrome.windows.getAll({ populate: true });

    for (const win of allWindows) {
      const windowId = win.id;
      const tabs = Array.isArray(win.tabs) ? win.tabs : [];
      const activeTab = tabs.find(tab => tab.active) || null;

      const windowState = tbmEnsureWindowState(windowId);
      windowState.activationHistoryTabIds = [];
      windowState.tabHistoryForwardTabIds = [];

      windowState.pinnedTabIds = tabs
        .filter(tab => tab.pinned)
        .sort((a, b) => a.index - b.index)
        .map(tab => tab.id)
        .filter(id => typeof id === "number");

      if (activeTab && typeof activeTab.id === "number") {
        tbmSetCurrentTabSnapshot(windowId, activeTab.id, activeTab.index);

        if (!tbmShouldIgnoreTabForHistory(activeTab)) {
          windowState.activationHistoryTabIds = [activeTab.id];
        } else if (typeof activeTab.openerTabId === "number") {
          windowState.activationHistoryTabIds = [activeTab.openerTabId];
        }
      }
    }

    await tbmPersistSessionState();

    tbmLog("Worker state seeded", {
      windowIds: Object.keys(tbmSessionState.windows),
      currentWindowIds: Object.keys(tbmSessionState.currentByWindow)
    });
  } catch (error) {
    tbmLog("tbmInitializeAllWindows error", error);
  }
}

async function tbmInitializeWorkerRuntime() {
  const [, restored] = await Promise.all([
    tbmLoadRuntimeConfig(),
    tbmRestoreSessionState()
  ]);

  if (!restored) {
    await tbmInitializeAllWindows();
  }
}

const tbmWorkerReady = tbmInitializeWorkerRuntime();

function tbmClampInsertIndexForPinnedZone(rawIndex, pinnedCount) {
  let resolvedIndex = rawIndex;

  if (typeof resolvedIndex !== "number" || Number.isNaN(resolvedIndex)) {
    resolvedIndex = pinnedCount;
  }

  if (resolvedIndex < pinnedCount) {
    resolvedIndex = pinnedCount;
  }

  if (resolvedIndex < 0) {
    resolvedIndex = 0;
  }

  return resolvedIndex;
}

async function tbmResolveInsertIndexForNewTab(createdTab) {
  const placement = tbmRuntimeConfig.newTabPlacement;

  if (placement === "default") {
    return null;
  }

  const windowId = createdTab.windowId;
  const createdTabId = createdTab.id;
  const tabs = await chrome.tabs.query({ windowId });
  const pinnedCount = tabs.filter(tab => tab.pinned).length;

  if (placement === "first") {
    return pinnedCount;
  }

  if (placement === "last") {
    return tabs.length - 1;
  }

  const excludedTabIdSet = new Set([createdTabId]);

  async function getBasisTab(tabId, source) {
    if (typeof tabId !== "number" || excludedTabIdSet.has(tabId)) {
      return null;
    }

    try {
      const tab = await chrome.tabs.get(tabId);

      if (!tab || tab.windowId !== windowId || typeof tab.index !== "number") {
        return null;
      }

      return { tab, source };
    } catch (error) {
      const logMessage =
        source === "opener"
          ? "tbmResolveInsertIndexForNewTab opener tab missing"
          : "tbmResolveInsertIndexForNewTab basis tab missing";

      tbmLog(logMessage, {
        windowId,
        createdTabId,
        basisTabId: tabId,
        source,
        error
      });

      return null;
    }
  }

  const currentSnapshot = tbmSessionState.currentByWindow[windowId] || null;
  const previousSnapshot = tbmSessionState.previousCurrentByWindow[windowId] || null;
  const windowState = tbmEnsureWindowState(windowId);
  const history = Array.isArray(windowState.activationHistoryTabIds)
    ? windowState.activationHistoryTabIds
    : [];

  let basis = await getBasisTab(currentSnapshot?.tabId, "current");

  if (!basis) {
    basis = await getBasisTab(previousSnapshot?.tabId, "previous");
  }

  if (
    !basis &&
    typeof createdTab.openerTabId === "number" &&
    createdTab.openerTabId !== createdTabId
  ) {
    basis = await getBasisTab(createdTab.openerTabId, "opener");
  }

  if (!basis) {
    for (let i = history.length - 1; i >= 0; i--) {
      basis = await getBasisTab(history[i], "history");
      if (basis) break;
    }
  }

  if (basis?.tab && typeof basis.tab.index === "number") {
    const basisTab = basis.tab;
    const targetIndex =
      placement === "left"
        ? tbmClampInsertIndexForPinnedZone(basisTab.index, pinnedCount)
        : tbmClampInsertIndexForPinnedZone(basisTab.index + 1, pinnedCount);

    tbmLog("New tab placement basis resolved", {
      createdTabId,
      windowId,
      placement,
      basisSource: basis.source,
      basisTabId: basisTab.id,
      basisIndex: basisTab.index,
      targetIndex
    });

    return targetIndex;
  }

  if (typeof createdTab.index !== "number") {
    return null;
  }

  if (placement === "left") {
    return tbmClampInsertIndexForPinnedZone(createdTab.index - 1, pinnedCount);
  }

  if (placement === "right") {
    return tbmClampInsertIndexForPinnedZone(createdTab.index, pinnedCount);
  }

  return null;
}

async function tbmApplyNewTabPlacement(createdTab) {
  try {
    if (!createdTab || typeof createdTab.id !== "number" || typeof createdTab.windowId !== "number") {
      return;
    }

    if (createdTab.pinned) {
      tbmLog("Pinned created tab: placement skipped", {
        tabId: createdTab.id,
        windowId: createdTab.windowId
      });
      return;
    }

    const targetIndex = await tbmResolveInsertIndexForNewTab(createdTab);

    if (targetIndex === null) {
      tbmLog("New tab placement skipped", {
        tabId: createdTab.id,
        windowId: createdTab.windowId,
        placement: tbmRuntimeConfig.newTabPlacement
      });
      return;
    }

    await chrome.tabs.move(createdTab.id, { index: targetIndex });

    tbmLog("New tab placement applied", {
      tabId: createdTab.id,
      windowId: createdTab.windowId,
      targetIndex
    });
  } catch (error) {
    tbmLog("tbmApplyNewTabPlacement error", error);
  }
}

async function tbmApplyNewTabOpenMode(createdTab) {
  try {
    const mode = tbmRuntimeConfig.newTabOpenMode;
    if (mode === "default") return;

    const windowId = createdTab.windowId;

    if (mode === "foreground") {
      await chrome.tabs.update(createdTab.id, { active: true });

      tbmLog("New tab forced foreground", {
        tabId: createdTab.id,
        windowId
      });
      return;
    }

    if (mode === "background") {
      if (typeof createdTab.url === "string" && /^chrome:/.test(createdTab.url)) {
        tbmLog("Background reopen skipped for chrome page", {
          tabId: createdTab.id,
          windowId,
          url: createdTab.url
        });
        return;
      }

      const currentSnapshot = tbmSessionState.currentByWindow[windowId] || null;

      if (typeof currentSnapshot?.tabId === "number") {
        tbmMarkSuppressNextActivated(windowId);
        await chrome.tabs.update(currentSnapshot.tabId, { active: true });

        tbmLog("Focus restored to previous tab for background open", {
          restoredTabId: currentSnapshot.tabId,
          createdTabId: createdTab.id,
          windowId
        });
      }
    }
  } catch (error) {
    tbmLog("tbmApplyNewTabOpenMode error", error);
  }
}


function tbmNormalizeTabHistoryShortcutKey(value) {
  const raw = String(value ?? "");

  if (raw === " ") {
    return " ";
  }

  let key = raw.trim();
  if (!key) return "";

  if (key.length === 1) {
    return key.toLowerCase();
  }

  const lower = key.toLowerCase();
  if (lower === "slash") return "/";
  if (lower === "space" || lower === "spacebar") return " ";
  if (lower === "esc" || lower === "escape") return "Escape";
  if (lower === "left" || lower === "arrowleft") return "ArrowLeft";
  if (lower === "right" || lower === "arrowright") return "ArrowRight";
  if (lower === "pageup") return "PageUp";
  if (lower === "pagedown") return "PageDown";
  if (lower === "home") return "Home";
  if (lower === "end") return "End";
  if (/^f([1-9]|1[0-2])$/i.test(key)) return key.toUpperCase();

  return key;
}

function tbmIsDefaultAltQBackShortcut() {
  return (
    tbmNormalizeTabHistoryShortcutKey(tbmRuntimeConfig.tabHistoryBackKey) === "q" &&
    !tbmRuntimeConfig.tabHistoryBackCtrl &&
    !!tbmRuntimeConfig.tabHistoryBackAlt &&
    !tbmRuntimeConfig.tabHistoryBackShift
  );
}

function tbmFilterValidTabIds(tabIds, tabById) {
  const seen = new Set();
  const result = [];

  for (const tabId of Array.isArray(tabIds) ? tabIds : []) {
    if (typeof tabId !== "number") continue;
    if (seen.has(tabId)) continue;

    const tab = tabById.get(tabId);
    if (!tab || tbmShouldIgnoreTabForHistory(tab)) continue;

    seen.add(tabId);
    result.push(tabId);
  }

  return result;
}

async function tbmGetActiveTabForHistory(windowId = null) {
  const queryInfo =
    typeof windowId === "number"
      ? { active: true, windowId }
      : { active: true, currentWindow: true };

  const [currentTab] = await chrome.tabs.query(queryInfo);
  return currentTab || null;
}

async function tbmNavigateTabHistory(direction, options = {}) {
  const normalizedDirection = direction === "forward" ? "forward" : "back";
  const requestedWindowId =
    typeof options.windowId === "number" ? options.windowId : null;

  const currentTab = await tbmGetActiveTabForHistory(requestedWindowId);

  if (
    !currentTab ||
    typeof currentTab.id !== "number" ||
    typeof currentTab.windowId !== "number"
  ) {
    return { ok: false, error: "no_current_tab" };
  }

  const windowId = currentTab.windowId;
  const tabs = await chrome.tabs.query({ windowId });
  const tabById = new Map();

  for (const tab of tabs) {
    if (typeof tab.id === "number") {
      tabById.set(tab.id, tab);
    }
  }

  const windowState = tbmEnsureWindowState(windowId);
  let history = tbmFilterValidTabIds(windowState.activationHistoryTabIds, tabById);
  let forward = tbmFilterValidTabIds(windowState.tabHistoryForwardTabIds, tabById);

  const currentIsEligible = !tbmShouldIgnoreTabForHistory(currentTab);

  if (normalizedDirection === "back") {
    if (currentIsEligible && !history.includes(currentTab.id)) {
      history.push(currentTab.id);
    }

    const currentIndex = currentIsEligible ? history.lastIndexOf(currentTab.id) : -1;
    const targetIndex = currentIndex > 0 ? currentIndex - 1 : history.length - 1;
    const targetTabId = targetIndex >= 0 ? history[targetIndex] : null;

    if (
      typeof targetTabId !== "number" ||
      targetTabId === currentTab.id ||
      !tabById.has(targetTabId)
    ) {
      windowState.activationHistoryTabIds = history;
      windowState.tabHistoryForwardTabIds = forward;
      await tbmPersistSessionState();
      return { ok: false, error: "no_back_target" };
    }

    if (currentIsEligible) {
      history = history.slice(0, targetIndex + 1);
      forward = forward.filter(id => id !== currentTab.id);
      forward.push(currentTab.id);
    }

    windowState.activationHistoryTabIds = history;
    windowState.tabHistoryForwardTabIds = forward;

    tbmMarkSuppressNextActivated(windowId);
    await tbmPersistSessionState();
    await chrome.tabs.update(targetTabId, { active: true });

    return {
      ok: true,
      direction: normalizedDirection,
      fromTabId: currentTab.id,
      toTabId: targetTabId
    };
  }

  let targetTabId = null;

  while (forward.length) {
    const candidateTabId = forward.pop();
    if (
      typeof candidateTabId === "number" &&
      candidateTabId !== currentTab.id &&
      tabById.has(candidateTabId)
    ) {
      targetTabId = candidateTabId;
      break;
    }
  }

  if (typeof targetTabId !== "number") {
    windowState.activationHistoryTabIds = history;
    windowState.tabHistoryForwardTabIds = forward;
    await tbmPersistSessionState();
    return { ok: false, error: "no_forward_target" };
  }

  if (currentIsEligible) {
    history = history.filter(id => id !== currentTab.id);
    history.push(currentTab.id);
  }

  history = history.filter(id => id !== targetTabId);
  history.push(targetTabId);

  windowState.activationHistoryTabIds = history;
  windowState.tabHistoryForwardTabIds = forward;

  tbmMarkSuppressNextActivated(windowId);
  await tbmPersistSessionState();
  await chrome.tabs.update(targetTabId, { active: true });

  return {
    ok: true,
    direction: normalizedDirection,
    fromTabId: currentTab.id,
    toTabId: targetTabId
  };
}

async function tbmResolveCloseActivationTarget(
  windowId,
  closingTabId,
  closingTabIndex,
  options = {}
) {
  const mode = tbmRuntimeConfig.closeActivation;

  if (mode === "default") {
    return null;
  }

  const preferredTargetTabId =
    typeof options.preferredTargetTabId === "number"
      ? options.preferredTargetTabId
      : null;

  const excludedTabIdSet = new Set(
    Array.isArray(options.excludedTabIds)
      ? options.excludedTabIds.filter(id => typeof id === "number")
      : []
  );

  excludedTabIdSet.add(closingTabId);

  if (mode === "last_used") {
    if (
      typeof preferredTargetTabId === "number" &&
      !excludedTabIdSet.has(preferredTargetTabId)
    ) {
      return preferredTargetTabId;
    }

    const windowState = tbmEnsureWindowState(windowId);
    const history = Array.isArray(windowState.activationHistoryTabIds)
      ? windowState.activationHistoryTabIds
      : [];

    for (let i = history.length - 1; i >= 0; i--) {
      const candidateTabId = history[i];

      if (
        typeof candidateTabId === "number" &&
        !excludedTabIdSet.has(candidateTabId)
      ) {
        return candidateTabId;
      }
    }

    return null;
  }

  const tabs = await chrome.tabs.query({ windowId });

  if (!tabs.length) {
    return null;
  }

  const byIndex = [...tabs].sort((a, b) => a.index - b.index);

  if (mode === "left") {
    let targetIndex = 0;

    if (typeof closingTabIndex === "number") {
      targetIndex = Math.max(0, closingTabIndex - 1);
    }

    return byIndex[targetIndex]?.id ?? null;
  }

  if (mode === "right") {
    let targetIndex = byIndex.length - 1;

    if (typeof closingTabIndex === "number") {
      targetIndex = Math.min(closingTabIndex, byIndex.length - 1);
    }

    return byIndex[targetIndex]?.id ?? null;
  }

  return null;
}

function tbmPrepareCloseContext(windowId, closingTabId) {
  const windowState = tbmEnsureWindowState(windowId);

  const history = Array.isArray(windowState.activationHistoryTabIds)
    ? windowState.activationHistoryTabIds
    : [];

  let preferredTargetTabId = null;

  for (let i = history.length - 1; i >= 0; i--) {
    const candidate = history[i];
    if (typeof candidate === "number" && candidate !== closingTabId) {
      preferredTargetTabId = candidate;
      break;
    }
  }

  const currentSnapshot = tbmSessionState.currentByWindow[windowId] || null;

  const excludedTabIds = [];

  if (
    currentSnapshot &&
    typeof currentSnapshot.tabId === "number" &&
    currentSnapshot.tabId !== closingTabId
  ) {
    excludedTabIds.push(currentSnapshot.tabId);
  }

  return {
    preferredTargetTabId,
    excludedTabIds
  };
}

async function tbmActivateAfterClose(
  windowId,
  closingTabId,
  closingTabIndex,
  options = {}
) {
  try {
    const mode = tbmRuntimeConfig.closeActivation;

    if (mode === "default") {
      tbmLog("Close activation skipped: default", {
        windowId,
        closingTabId
      });
      return;
    }

    const targetTabId = await tbmResolveCloseActivationTarget(
      windowId,
      closingTabId,
      closingTabIndex,
      options
    );

    if (typeof targetTabId !== "number") {
      tbmLog("Close activation target not found", {
        windowId,
        closingTabId,
        closingTabIndex,
        mode,
        preferredTargetTabId:
          typeof options.preferredTargetTabId === "number"
            ? options.preferredTargetTabId
            : null,
        excludedTabIds: Array.isArray(options.excludedTabIds)
          ? options.excludedTabIds
          : []
      });
      return;
    }

    tbmMarkCloseTransition(windowId, closingTabId, targetTabId);
    tbmMarkSuppressNextActivated(windowId);

    await chrome.tabs.update(targetTabId, { active: true });

    tbmLog("Close activation requested", {
      windowId,
      closingTabId,
      closingTabIndex,
      targetTabId,
      mode,
      preferredTargetTabId:
        typeof options.preferredTargetTabId === "number"
          ? options.preferredTargetTabId
          : null,
      excludedTabIds: Array.isArray(options.excludedTabIds)
        ? options.excludedTabIds
        : []
    });
  } catch (error) {
    tbmLog("tbmActivateAfterClose error", error);
  }
}

async function tbmHandleActivated(activeInfo) {
  try {
    await tbmWorkerReady;

    const windowId = activeInfo.windowId;
    const tabId = activeInfo.tabId;

    let selectedTab = null;
    try {
      selectedTab = await chrome.tabs.get(tabId);
    } catch (error) {
      tbmLog("tbmHandleActivated get tab failed", { windowId, tabId, error });
      return;
    }

    const closeTransition = tbmGetCloseTransition(windowId);

    if (closeTransition) {
      if (tabId === closeTransition.targetTabId) {
        tbmSetCurrentTabSnapshot(windowId, tabId, selectedTab.index);

        if (tbmSessionState.suppressNextActivatedByWindow[windowId]) {
          tbmConsumeSuppressNextActivated(windowId);
        }

        tbmClearCloseTransition(windowId);

        tbmLog("Activated target tab during close transition", {
          windowId,
          tabId,
          closingTabId: closeTransition.closingTabId,
          targetTabId: closeTransition.targetTabId
        });

        await tbmRefreshPinnedMembership(windowId);
        return;
      }

      tbmLog("Activated non-target tab during close transition (hold transition)", {
        windowId,
        tabId,
        closingTabId: closeTransition.closingTabId,
        targetTabId: closeTransition.targetTabId
      });

      await tbmRefreshPinnedMembership(windowId);
      return;
    }

    if (tbmConsumeSuppressNextActivated(windowId)) {
      tbmSetCurrentTabSnapshot(windowId, tabId, selectedTab.index);

      tbmLog("Activated suppressed after programmatic switch", {
        windowId,
        tabId
      });

      await tbmRefreshPinnedMembership(windowId);
      return;
    }

    const currentSnapshotBeforeActivation =
      tbmSessionState.currentByWindow[windowId] || null;

    if (
      typeof currentSnapshotBeforeActivation?.tabId === "number" &&
      currentSnapshotBeforeActivation.tabId !== tabId
    ) {
      let previousCurrentStillExists = true;

      try {
        const previousCurrentTab = await chrome.tabs.get(
          currentSnapshotBeforeActivation.tabId
        );

        previousCurrentStillExists =
          !!previousCurrentTab && previousCurrentTab.windowId === windowId;
      } catch (error) {
        previousCurrentStillExists = false;
      }

      if (!previousCurrentStillExists) {
        tbmLog(
          "Activated while previous current tab is already missing (defer to close)",
          {
            windowId,
            tabId,
            previousCurrentTabId: currentSnapshotBeforeActivation.tabId
          }
        );

        await tbmRefreshPinnedMembership(windowId);
        return;
      }
    }

    tbmSetCurrentTabSnapshot(windowId, tabId, selectedTab.index);

    if (tbmShouldIgnoreTabForHistory(selectedTab)) {
      tbmLog("Activation ignored for history", {
        windowId,
        tabId,
        url: selectedTab.url || ""
      });

      await tbmRefreshPinnedMembership(windowId);
      return;
    }

    tbmPushActivationHistory(windowId, tabId);
    await tbmRefreshPinnedMembership(windowId);
  } catch (error) {
    tbmLog("tbmHandleActivated error", error);
  } finally {
    await tbmPersistSessionState();
  }
}

chrome.runtime.onInstalled.addListener(async () => {
  tbmLog("onInstalled");
  await chrome.storage.local.set(
    await chrome.storage.local.get(TBM_DEFAULT_CONFIG)
  );
  await tbmWorkerReady;
});

chrome.runtime.onStartup.addListener(async () => {
  tbmLog("onStartup");
  await tbmWorkerReady;
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== "local") return;

  const targetKeys = [
    "enableTabControl",
    "newTabPlacement",
    "closeActivation",
    "newTabOpenMode",
    "tabHistoryBackKey",
    "tabHistoryBackCtrl",
    "tabHistoryBackAlt",
    "tabHistoryBackShift",
    "tabHistoryForwardKey",
    "tabHistoryForwardCtrl",
    "tabHistoryForwardAlt",
    "tabHistoryForwardShift"
  ];
  const hasRelevantChange = targetKeys.some(key => key in changes);

  if (!hasRelevantChange) return;

  tbmLoadRuntimeConfig().catch(error => {
    tbmLog("storage.onChanged load config error", error);
  });
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  await tbmHandleActivated(activeInfo);
});

chrome.tabs.onCreated.addListener(async (tab) => {
  try {
    await tbmWorkerReady;

    if (typeof tab.windowId !== "number" || typeof tab.id !== "number") {
      return;
    }

    await tbmRefreshPinnedMembership(tab.windowId);
    await tbmApplyNewTabPlacement(tab);
    await tbmApplyNewTabOpenMode(tab);
  } catch (error) {
    tbmLog("tabs.onCreated error", error);
  } finally {
    await tbmPersistSessionState();
  }
});

chrome.tabs.onRemoved.addListener(async (tabId, removeInfo) => {
  try {
    await tbmWorkerReady;

    const windowId = removeInfo.windowId;
    const snapshotBeforeRemoval = tbmSessionState.currentByWindow[windowId] || null;
    const windowStateBeforeRemoval = tbmEnsureWindowState(windowId);

    const historyBeforeRemoval = Array.isArray(windowStateBeforeRemoval.activationHistoryTabIds)
      ? [...windowStateBeforeRemoval.activationHistoryTabIds]
      : [];

    const wasCurrentSnapshotTab = snapshotBeforeRemoval?.tabId === tabId;
    const closingTabIndex =
      wasCurrentSnapshotTab && typeof snapshotBeforeRemoval?.tabIndex === "number"
        ? snapshotBeforeRemoval.tabIndex
        : null;

    const preferredHistoryTargetTabId = (() => {
      for (let i = historyBeforeRemoval.length - 1; i >= 0; i--) {
        const candidateTabId = historyBeforeRemoval[i];
        if (typeof candidateTabId === "number" && candidateTabId !== tabId) {
          return candidateTabId;
        }
      }
      return null;
    })();

    tbmRemoveTrackedTab(windowId, tabId);
    tbmClearCurrentTabSnapshotIfMatches(windowId, tabId);

    if (removeInfo.isWindowClosing) {
      delete tbmSessionState.windows[windowId];
      delete tbmSessionState.currentByWindow[windowId];
      delete tbmSessionState.previousCurrentByWindow[windowId];
      delete tbmSessionState.suppressNextActivatedByWindow[windowId];
      delete tbmSessionState.closeTransitionByWindow[windowId];
      delete tbmSessionState.canceledCloseTargetByWindow[windowId];

      tbmLog("Window removed by close", { windowId });
      return;
    }

    const { preferredTargetTabId, excludedTabIds } =
      tbmPrepareCloseContext(windowId, tabId);

    if (wasCurrentSnapshotTab) {
      await tbmActivateAfterClose(windowId, tabId, closingTabIndex, {
        preferredTargetTabId,
        excludedTabIds
      });
    } else {
      const closeTransition = tbmGetCloseTransition(windowId);
      if (closeTransition && closeTransition.closingTabId === tabId) {
        tbmClearCloseTransition(windowId);
      }
    }

    await tbmRefreshPinnedMembership(windowId);

    tbmLog("Tab removed", {
      tabId,
      windowId,
      wasCurrentSnapshotTab,
      closingTabIndex,
      isWindowClosing: removeInfo.isWindowClosing,
      preferredHistoryTargetTabId,
      excludedTabIds
    });
  } catch (error) {
    tbmLog("tabs.onRemoved error", error);
  } finally {
    await tbmPersistSessionState();
  }
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  try {
    await tbmWorkerReady;

    if (changeInfo.pinned === true || changeInfo.pinned === false) {
      await tbmRefreshPinnedMembership(tab.windowId);
    }
  } catch (error) {
    tbmLog("tabs.onUpdated error", error);
  }
});

chrome.tabs.onMoved.addListener(async (tabId, moveInfo) => {
  try {
    await tbmWorkerReady;
    const windowId = moveInfo.windowId;
    const currentSnapshot = tbmSessionState.currentByWindow[windowId] || null;

    if (currentSnapshot?.tabId === tabId) {
      tbmSetCurrentTabSnapshot(windowId, tabId, moveInfo.toIndex);
    }

    await tbmRefreshPinnedMembership(windowId);

    tbmLog("Tab moved", {
      tabId,
      windowId,
      fromIndex: moveInfo.fromIndex,
      toIndex: moveInfo.toIndex
    });
  } catch (error) {
    tbmLog("tabs.onMoved error", error);
  } finally {
    await tbmPersistSessionState();
  }
});

chrome.tabs.onDetached.addListener(async (tabId, detachInfo) => {
  try {
    await tbmWorkerReady;
    tbmRemoveTrackedTab(detachInfo.oldWindowId, tabId);
    tbmClearCurrentTabSnapshotIfMatches(detachInfo.oldWindowId, tabId);

    await tbmRefreshPinnedMembership(detachInfo.oldWindowId);

    tbmLog("Tab detached", {
      tabId,
      oldWindowId: detachInfo.oldWindowId,
      oldPosition: detachInfo.oldPosition
    });
  } catch (error) {
    tbmLog("tabs.onDetached error", error);
  } finally {
    await tbmPersistSessionState();
  }
});

chrome.tabs.onAttached.addListener(async (tabId, attachInfo) => {
  try {
    await tbmWorkerReady;
    tbmEnsureWindowState(attachInfo.newWindowId);

    await tbmRefreshPinnedMembership(attachInfo.newWindowId);
    await tbmRebuildWindowState(attachInfo.newWindowId);

    tbmLog("Tab attached", {
      tabId,
      newWindowId: attachInfo.newWindowId,
      newPosition: attachInfo.newPosition
    });
  } catch (error) {
    tbmLog("tabs.onAttached error", error);
  } finally {
    await tbmPersistSessionState();
  }
});

chrome.windows.onRemoved.addListener(async (windowId) => {
  await tbmWorkerReady;
  if (tbmSessionState.windows[windowId]) {
    delete tbmSessionState.windows[windowId];
  }

  if (tbmSessionState.currentByWindow[windowId]) {
    delete tbmSessionState.currentByWindow[windowId];
  }

  if (tbmSessionState.previousCurrentByWindow[windowId]) {
    delete tbmSessionState.previousCurrentByWindow[windowId];
  }

  if (tbmSessionState.suppressNextActivatedByWindow[windowId]) {
    delete tbmSessionState.suppressNextActivatedByWindow[windowId];
  }

  if (tbmSessionState.closeTransitionByWindow[windowId]) {
    delete tbmSessionState.closeTransitionByWindow[windowId];
  }

  if (tbmSessionState.canceledCloseTargetByWindow[windowId]) {
    delete tbmSessionState.canceledCloseTargetByWindow[windowId];
  }

  await tbmPersistSessionState();
  tbmLog("windows.onRemoved", { windowId });
});

chrome.commands.onCommand.addListener(async (command) => {
  if (command !== "tbm_switch_to_previous_tab") return;

  try {
    await tbmWorkerReady;

    if (!tbmRuntimeConfig.enableTabControl || !tbmIsDefaultAltQBackShortcut()) {
      return;
    }

    const result = await tbmNavigateTabHistory("back");

    tbmLog("Command switched tab history back", result);
  } catch (error) {
    tbmLog("commands.onCommand error", error);
  }
});

function tbmGetExternalSenderId(sender) {
  return String(sender?.id || "").trim();
}

async function tbmResolveTargetTabIdForExternalCommand(tabId, windowId) {
  if (typeof tabId === "number") {
    return tabId;
  }

  try {
    const queryInfo =
      typeof windowId === "number"
        ? { active: true, windowId }
        : { active: true, currentWindow: true };

    const [activeTab] = await chrome.tabs.query(queryInfo);
    return typeof activeTab?.id === "number" ? activeTab.id : null;
  } catch (error) {
    tbmLog("External command target tab resolve failed", error);
    return null;
  }
}

async function tbmSendCommandToTab(tabId, command, options = {}) {
  const resolvedTabId = await tbmResolveTargetTabIdForExternalCommand(
    tabId,
    typeof options.windowId === "number" ? options.windowId : null
  );

  if (typeof resolvedTabId !== "number") {
    return { ok: false, error: "no_target_tab" };
  }

  return new Promise(resolve => {
    chrome.tabs.sendMessage(
      resolvedTabId,
      {
        type: "TBM_EXTERNAL_COMMAND",
        command
      },
      response => {
        const lastError = chrome.runtime.lastError;
        if (lastError) {
          resolve({ ok: false, error: lastError.message || "content_script_unavailable" });
          return;
        }

        resolve(response || { ok: false, error: "no_response" });
      }
    );
  });
}

async function tbmHandleExternalCommand(message, sender) {
  await tbmWorkerReady;

  const command = String(message?.command || "").trim();
  const senderTab = sender?.tab || null;
  const requestedTabId = typeof message?.tabId === "number" ? message.tabId : null;
  const requestedWindowId = typeof message?.windowId === "number" ? message.windowId : null;
  const tabId = typeof senderTab?.id === "number" ? senderTab.id : requestedTabId;
  const windowId = typeof senderTab?.windowId === "number" ? senderTab.windowId : requestedWindowId;

  tbmLog("External command received", {
    command,
    senderId: tbmGetExternalSenderId(sender),
    tabId,
    windowId
  });

  if (command === "ping") {
    return { ok: true, extension: "Tabmission", id: chrome.runtime.id || "" };
  }

  if (command === "openTabSearch") {
    if (!tbmRuntimeConfig.enableTabSearch) {
      return { ok: false, error: "tab_search_disabled" };
    }

    return tbmSendCommandToTab(tabId, command, { windowId });
  }

  if (command === "openLinkSelector") {
    if (!tbmRuntimeConfig.enableLinkBatchOpen) {
      return { ok: false, error: "link_selector_disabled" };
    }

    return tbmSendCommandToTab(tabId, command, { windowId });
  }

  if (command === "focusSearchBox") {
    if (!tbmRuntimeConfig.enableSlashToSearch) {
      return { ok: false, error: "search_focus_disabled" };
    }

    return tbmSendCommandToTab(tabId, command, { windowId });
  }

  if (command === "tabHistoryBack" || command === "tabHistoryForward") {
    if (!tbmRuntimeConfig.enableTabControl) {
      return { ok: false, error: "tab_control_disabled" };
    }

    return tbmNavigateTabHistory(
      command === "tabHistoryForward" ? "forward" : "back",
      { windowId }
    );
  }

  return { ok: false, error: "unknown_command" };
}

chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
  if (!message || message.type !== "TABMISSION_COMMAND") {
    return false;
  }

  (async () => {
    try {
      const result = await tbmHandleExternalCommand(message, sender || {});
      sendResponse(result);
    } catch (error) {
      console.error("TABMISSION_COMMAND error:", error);
      sendResponse({ ok: false, error: String(error?.message || error) });
    }
  })();

  return true;
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message && message.type === "TBM_NAVIGATE_TAB_HISTORY") {
    (async () => {
      try {
        await tbmWorkerReady;

        if (!tbmRuntimeConfig.enableTabControl) {
          sendResponse({ ok: false, error: "tab_control_disabled" });
          return;
        }

        const direction = message.direction === "forward" ? "forward" : "back";
        const senderWindowId =
          sender && sender.tab && typeof sender.tab.windowId === "number"
            ? sender.tab.windowId
            : null;

        const result = await tbmNavigateTabHistory(direction, {
          windowId: senderWindowId
        });

        sendResponse(result);
      } catch (error) {
        console.error("TBM_NAVIGATE_TAB_HISTORY error:", error);
        sendResponse({ ok: false, error: String(error) });
      }
    })();

    return true;
  }

  if (message && message.type === "TBM_GET_TAB_LIST") {
    (async () => {
      try {
        await tbmWorkerReady;

        const currentTab = sender && sender.tab ? sender.tab : null;

        if (!currentTab || !currentTab.windowId) {
          sendResponse({ ok: false, error: "no_sender_tab" });
          return;
        }

        const windowId = currentTab.windowId;
        const windowState = tbmSessionState.windows[windowId] || {
          activationHistoryTabIds: [],
          pinnedTabIds: []
        };

        const tabs = await chrome.tabs.query({ windowId });

        const tabById = new Map();
        for (const tab of tabs) {
          tabById.set(tab.id, tab);
        }

        const orderedIds = [];
        const seen = new Set();

        const reverseHistoryIds =
          [...(windowState.activationHistoryTabIds || [])].reverse();

        for (const tabId of reverseHistoryIds) {
          if (tabById.has(tabId) && !seen.has(tabId)) {
            orderedIds.push(tabId);
            seen.add(tabId);
          }
        }

        const byIndex = [...tabs].sort((a, b) => a.index - b.index);

        for (const tab of byIndex) {
          if (!seen.has(tab.id)) {
            orderedIds.push(tab.id);
            seen.add(tab.id);
          }
        }

        const result = orderedIds
          .map(tabId => tabById.get(tabId))
          .filter(Boolean)
          .map((tab, index) => ({
            id: tab.id,
            windowId: tab.windowId,
            title: tab.title || "(untitled)",
            url: tab.url || "",
            favIconUrl: tab.favIconUrl || "",
            active: !!tab.active,
            pinned: !!tab.pinned,
            lruIndex: index + 1
          }));

        sendResponse({
          ok: true,
          tabs: result
        });
      } catch (error) {
        console.error("TBM_GET_TAB_LIST error:", error);
        sendResponse({
          ok: false,
          error: String(error)
        });
      }
    })();

    return true;
  }

  if (message && message.type === "TBM_ACTIVATE_TAB") {
    (async () => {
      try {
        await tbmWorkerReady;

        const tabId = Number(message.tabId);

        if (!tabId) {
          sendResponse({ ok: false, error: "invalid_tab_id" });
          return;
        }

        const tab = await chrome.tabs.get(tabId);

        await chrome.windows.update(tab.windowId, { focused: true });
        await chrome.tabs.update(tabId, { active: true });

        sendResponse({ ok: true });
      } catch (error) {
        console.error("TBM_ACTIVATE_TAB error:", error);
        sendResponse({
          ok: false,
          error: String(error)
        });
      }
    })();

    return true;
  }

  if (message && message.type === "TBM_OPEN_LINKS_IN_BACKGROUND") {
    (async () => {
      try {
        await tbmWorkerReady;

        const currentTab = sender && sender.tab ? sender.tab : null;

        if (!currentTab || typeof currentTab.windowId !== "number") {
          sendResponse({ ok: false, error: "no_sender_tab" });
          return;
        }

        const rawUrls = Array.isArray(message.urls) ? message.urls : [];
        const urls = rawUrls
          .map(url => String(url || "").trim())
          .filter(Boolean);

        if (!urls.length) {
          sendResponse({ ok: false, error: "no_urls" });
          return;
        }

        const createdTabIds = [];

        for (const url of urls) {
          try {
            const tab = await chrome.tabs.create({
              windowId: currentTab.windowId,
              url,
              active: false
            });

            if (typeof tab.id === "number") {
              createdTabIds.push(tab.id);
            }
          } catch (error) {
            console.warn("[TBM] background open skipped:", url, error);
          }
        }

        sendResponse({
          ok: true,
          count: createdTabIds.length,
          tabIds: createdTabIds
        });
      } catch (error) {
        console.error("TBM_OPEN_LINKS_IN_BACKGROUND error:", error);
        sendResponse({
          ok: false,
          error: String(error)
        });
      }
    })();

    return true;
  }
});