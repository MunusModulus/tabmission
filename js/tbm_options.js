const TBM_DEFAULT_OPTIONS = {
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

const tbmOptionElements = {
  title: document.getElementById("tbm_options_title"),
  aboutVersion: document.getElementById("tbm_about_version"),
  backupTextarea: document.getElementById("tbm_backup_textarea"),
  backupExportButton: document.getElementById("tbm_backup_export_button"),
  backupImportButton: document.getElementById("tbm_backup_import_button"),
  backupStatus: document.getElementById("tbm_backup_status"),

  tabButtons: Array.from(document.querySelectorAll(".tbm_side_tab")),
  panels: Array.from(document.querySelectorAll(".tbm_settings_panel")),

  tabButtonControl: document.getElementById("tbm_tab_button_control"),
  tabButtonSearch: document.getElementById("tbm_tab_button_search"),
  tabButtonLinkSelector: document.getElementById("tbm_tab_button_link_selector"),
  tabButtonSts: document.getElementById("tbm_tab_button_sts"),
  tabButtonPagejump: document.getElementById("tbm_tab_button_pagejump"),

  panelControl: document.getElementById("tbm_panel_control"),
  panelSearch: document.getElementById("tbm_panel_search"),
  panelLinkSelector: document.getElementById("tbm_panel_link_selector"),
  panelSts: document.getElementById("tbm_panel_sts"),
  panelPagejump: document.getElementById("tbm_panel_pagejump"),

  enableTabControl: document.getElementById("tbm_enable_tab_control"),
  enableTabSearch: document.getElementById("tbm_enable_tab_search"),
  enableSlashToSearch: document.getElementById("tbm_enable_slash_to_search"),
  enablePageJump: document.getElementById("tbm_enable_page_jump"),

  groupControl: document.getElementById("tbm_group_control"),
  groupSearch: document.getElementById("tbm_group_search"),
  groupLinkSelector: document.getElementById("tbm_group_link_selector"),
  groupSts: document.getElementById("tbm_group_sts"),
  groupPageJump: document.getElementById("tbm_group_pagejump"),

  labelNewTabPlacement: document.getElementById("tbm_label_new_tab_placement"),
  labelCloseActivation: document.getElementById("tbm_label_close_activation"),
  labelNewTabOpenMode: document.getElementById("tbm_label_new_tab_open_mode"),
  labelLauncherKey: document.getElementById("tbm_label_launcher_key"),

  selectNewTabPlacement: document.getElementById("tbm_new_tab_placement"),
  selectCloseActivation: document.getElementById("tbm_close_activation"),
  selectNewTabOpenMode: document.getElementById("tbm_new_tab_open_mode"),

  inputTabHistoryBackKey: document.getElementById("tbm_tab_history_back_key"),
  buttonTabHistoryBackCtrl: document.getElementById("tbm_tab_history_back_ctrl"),
  buttonTabHistoryBackAlt: document.getElementById("tbm_tab_history_back_alt"),
  buttonTabHistoryBackShift: document.getElementById("tbm_tab_history_back_shift"),
  tabHistoryBackPreview: document.getElementById("tbm_tab_history_back_preview"),
  buttonTabHistoryBackClear: document.getElementById("tbm_tab_history_back_clear"),

  inputTabHistoryForwardKey: document.getElementById("tbm_tab_history_forward_key"),
  buttonTabHistoryForwardCtrl: document.getElementById("tbm_tab_history_forward_ctrl"),
  buttonTabHistoryForwardAlt: document.getElementById("tbm_tab_history_forward_alt"),
  buttonTabHistoryForwardShift: document.getElementById("tbm_tab_history_forward_shift"),
  tabHistoryForwardPreview: document.getElementById("tbm_tab_history_forward_preview"),
  buttonTabHistoryForwardClear: document.getElementById("tbm_tab_history_forward_clear"),

  inputLauncherKey: document.getElementById("tbm_launcher_key"),
  buttonLauncherCtrl: document.getElementById("tbm_launcher_ctrl"),
  buttonLauncherAlt: document.getElementById("tbm_launcher_alt"),
  buttonLauncherShift: document.getElementById("tbm_launcher_shift"),
  launcherPreview: document.getElementById("tbm_launcher_preview"),
  buttonLauncherClear: document.getElementById("tbm_launcher_clear"),

  inputStsKey: document.getElementById("tbm_sts_key"),
  buttonStsCtrl: document.getElementById("tbm_sts_ctrl"),
  buttonStsAlt: document.getElementById("tbm_sts_alt"),
  buttonStsShift: document.getElementById("tbm_sts_shift"),
  stsPreview: document.getElementById("tbm_sts_preview"),
  buttonStsClear: document.getElementById("tbm_sts_clear"),

  inputStsSiteName: document.getElementById("tbm_sts_site_name_input"),
  inputStsSiteHost: document.getElementById("tbm_sts_site_host_input"),
  inputStsSiteOrder: document.getElementById("tbm_sts_site_order_input"),
  buttonStsSiteAdd: document.getElementById("tbm_sts_site_add_button"),
  stsSiteList: document.getElementById("tbm_sts_site_list"),

  inputPageJumpKey: document.getElementById("tbm_pj_key"),

  pjCtrl: document.getElementById("tbm_pj_ctrl"),
  pjAlt: document.getElementById("tbm_pj_alt"),
  pjShift: document.getElementById("tbm_pj_shift"),
  pjKey: document.getElementById("tbm_pj_key"),
  pjClear: document.getElementById("tbm_pj_clear"),
  pjPreview: document.getElementById("tbm_pj_preview"),
  pjBackCtrl: document.getElementById("tbm_pj_back_ctrl"),
  pjBackAlt: document.getElementById("tbm_pj_back_alt"),
  pjBackShift: document.getElementById("tbm_pj_back_shift"),
  pjBackKey: document.getElementById("tbm_pj_back_key"),
  pjBackClear: document.getElementById("tbm_pj_back_clear"),
  pjBackPreview: document.getElementById("tbm_pj_back_preview"),

  checkboxPageJumpMouseBack: document.getElementById("tbm_pj_mouse_back"),
  checkboxPageJumpMouseForward: document.getElementById("tbm_pj_mouse_forward"),

  checkboxGooglePageJump: document.getElementById("tbm_pj_google_enable"),

  googlePjCtrl: document.getElementById("tbm_google_pj_ctrl"),
  googlePjAlt: document.getElementById("tbm_google_pj_alt"),
  googlePjShift: document.getElementById("tbm_google_pj_shift"),
  googlePjKey: document.getElementById("tbm_google_pj_key"),
  googlePjClear: document.getElementById("tbm_google_pj_clear"),
  googlePjPreview: document.getElementById("tbm_google_pj_preview"),

  googlePjBackCtrl: document.getElementById("tbm_google_pj_back_ctrl"),
  googlePjBackAlt: document.getElementById("tbm_google_pj_back_alt"),
  googlePjBackShift: document.getElementById("tbm_google_pj_back_shift"),
  googlePjBackKey: document.getElementById("tbm_google_pj_back_key"),
  googlePjBackClear: document.getElementById("tbm_google_pj_back_clear"),
  googlePjBackPreview: document.getElementById("tbm_google_pj_back_preview"),

  checkboxGooglePjMouseBack: document.getElementById("tbm_google_pj_mouse_back"),
  checkboxGooglePjMouseForward: document.getElementById("tbm_google_pj_mouse_forward"),

  inputPageJumpModeList: Array.from(document.querySelectorAll('input[name="tbm_pj_mode"]')),

  groupPageJumpAuto: document.getElementById("tbm_pj_auto_group"),
  groupPageJumpManual: document.getElementById("tbm_pj_manual_group"),

  inputPageJumpUrl1: document.getElementById("tbm_pj_url1"),
  inputPageJumpUrl2: document.getElementById("tbm_pj_url2"),
  inputPageJumpUrl3: document.getElementById("tbm_pj_url3"),
  buttonPageJumpAnalyze: document.getElementById("tbm_pj_analyze"),
  textPageJumpAnalysis: document.getElementById("tbm_pj_analysis_text"),

  extensionIdInput: document.getElementById("tbm_extension_id"),
  copyExtensionIdButton: document.getElementById("tbm_copy_extension_id"),
  extensionIdCopyStatus: document.getElementById("tbm_extension_id_copy_status"),

  inputPageJumpSiteName: document.getElementById("tbm_pj_site_name"),
  inputPageJumpHost: document.getElementById("tbm_pj_host"),
  inputPageJumpPattern: document.getElementById("tbm_pj_pattern"),
  inputPageJumpStep: document.getElementById("tbm_pj_step"),
  inputPageJumpTypeList: Array.from(document.querySelectorAll('input[name="tbm_pj_type"]')),
  pageJumpRuleList: document.getElementById("tbm_pj_rule_list"),

  enableLinkBatchOpen: document.getElementById("tbm_enable_link_batch_open"),
  inputLinkBatchKey: document.getElementById("tbm_link_batch_key"),
  buttonLinkBatchCtrl: document.getElementById("tbm_link_batch_ctrl"),
  buttonLinkBatchAlt: document.getElementById("tbm_link_batch_alt"),
  buttonLinkBatchShift: document.getElementById("tbm_link_batch_shift"),
  linkBatchPreview: document.getElementById("tbm_link_batch_preview"),
  buttonLinkBatchClear: document.getElementById("tbm_link_batch_clear"),
  inputLinkBatchOverlayColor: document.getElementById("tbm_link_batch_overlay_color"),
  inputLinkBatchOverlayColorPicker: document.getElementById("tbm_link_batch_overlay_color_picker"),

  inputLinkBatchOverlayOpacity: document.getElementById("tbm_link_batch_overlay_opacity"),
  inputLinkBatchOverlayOpacityRange: document.getElementById("tbm_link_batch_overlay_opacity_range"),

  inputLinkBatchBorderColor: document.getElementById("tbm_link_batch_border_color"),
  inputLinkBatchBorderColorPicker: document.getElementById("tbm_link_batch_border_color_picker"),
  linkBatchBorderColorPreview: document.querySelector(".tbm_link_batch_color_preview_border"),

  inputLinkBatchCheckedColor: document.getElementById("tbm_link_batch_checked_color"),
  inputLinkBatchCheckedColorPicker: document.getElementById("tbm_link_batch_checked_color_picker"),
  linkBatchCheckedColorPreview: document.querySelector(".tbm_link_batch_color_preview_checked"),

  selectLinkBatchCheckboxPosition: document.getElementById("tbm_link_batch_checkbox_position"),
  inputLinkBatchMinWidth: document.getElementById("tbm_link_batch_min_width"),
  inputLinkBatchMinHeight: document.getElementById("tbm_link_batch_min_height"),

  saveButtons: Array.from(document.querySelectorAll(".tbm_save_button")),
  resetButtons: Array.from(document.querySelectorAll(".tbm_reset_button")),
  saveStatusList: Array.from(document.querySelectorAll(".tbm_save_status"))
};

function tbmI18nText(key) {
  return chrome.i18n.getMessage(key) || key;
}

function tbmDisplayShortcutKey(key) {
  if (key === "Escape") return tbmI18nText("keyNameEscape");
  if (key === "ArrowLeft") return tbmI18nText("keyNameArrowLeft");
  if (key === "ArrowRight") return tbmI18nText("keyNameArrowRight");
  if (key === "PageUp") return tbmI18nText("keyNamePageUp");
  if (key === "PageDown") return tbmI18nText("keyNamePageDown");
  if (key === "Home") return tbmI18nText("keyNameHome");
  if (key === "End") return tbmI18nText("keyNameEnd");
  if (key === " ") return tbmI18nText("keyNameSpace");
  return key;
}

function tbmApplyAboutVersion() {
  if (!tbmOptionElements.aboutVersion) return;

  try {
    const manifest = chrome.runtime.getManifest();
    tbmOptionElements.aboutVersion.textContent = manifest?.version || "";
  } catch (error) {
    tbmOptionElements.aboutVersion.textContent = "";
    console.warn("[TBM] about version apply failed", error);
  }
}

function tbmPrepareOptionsAsciiInput(input) {
  if (!input) return;

  try {
    input.setAttribute("lang", "en");
    input.setAttribute("autocapitalize", "off");
    input.setAttribute("autocorrect", "off");
    input.setAttribute("spellcheck", "false");
    input.setAttribute("inputmode", "url");
  } catch (e) {}

  try {
    const value = input.value;
    input.value = "";
    input.value = value;

    if (typeof input.setSelectionRange === "function") {
      const len = input.value.length;
      input.setSelectionRange(len, len);
    }
  } catch (e) {}
}

function tbmBindAsciiFocus(input) {
  if (!input) return;

  input.addEventListener("focus", () => {
    tbmPrepareOptionsAsciiInput(input);
  });

  input.addEventListener("mousedown", () => {
    try {
      input.setAttribute("lang", "en");
      input.setAttribute("autocapitalize", "off");
      input.setAttribute("autocorrect", "off");
      input.setAttribute("spellcheck", "false");
      input.setAttribute("inputmode", "url");
    } catch (e) {}
  });
}

function tbmBuildShortcutPreviewText(key, ctrl, alt, shift, fallback = "") {
  const parts = [];
  if (ctrl) parts.push(tbmI18nText("keyNameCtrl"));
  if (alt) parts.push(tbmI18nText("keyNameAlt"));
  if (shift) parts.push(tbmI18nText("keyNameShift"));
  if (key) parts.push(tbmDisplayShortcutKey(key));
  return parts.length ? parts.join(" + ") : fallback;
}

function tbmUpdateLinkBatchPreview() {
  if (!tbmOptionElements.linkBatchPreview) return;

  const key = tbmNormalizeShortcutKey(
    tbmOptionElements.inputLinkBatchKey?.value ?? "",
    { allowEmpty: true, fallback: "" }
  );

  tbmOptionElements.linkBatchPreview.textContent = tbmBuildShortcutPreviewText(
    key,
    !!tbmOptionElements.buttonLinkBatchCtrl?.classList.contains("tbm_active"),
    !!tbmOptionElements.buttonLinkBatchAlt?.classList.contains("tbm_active"),
    !!tbmOptionElements.buttonLinkBatchShift?.classList.contains("tbm_active"),
    tbmI18nText("commonNotSet")
  );
}

function tbmNormalizeLinkBatchHexColor(value, fallback) {
  const raw = String(value || "").trim();

  if (/^#[0-9a-fA-F]{6}$/.test(raw)) {
    return raw.toLowerCase();
  }

  if (/^#[0-9a-fA-F]{3}$/.test(raw)) {
    const expanded = "#" + raw
      .slice(1)
      .split("")
      .map(ch => ch + ch)
      .join("");

    return expanded.toLowerCase();
  }

  return String(fallback || "#000000").toLowerCase();
}

function tbmClampLinkBatchOpacity(value, fallback = 0.55) {
  const n = Number.parseFloat(String(value));
  if (!Number.isFinite(n)) return fallback;
  return Math.min(1, Math.max(0, n));
}

function tbmFormatLinkBatchOpacityText(value) {
  const clamped = tbmClampLinkBatchOpacity(value, 0.55);
  return clamped.toFixed(2);
}

function tbmRefreshLinkBatchMetaUi() {
  const overlayColor = tbmNormalizeLinkBatchHexColor(
    tbmOptionElements.inputLinkBatchOverlayColor?.value,
    TBM_DEFAULT_OPTIONS.linkBatchOverlayColor
  );
  const borderColor = tbmNormalizeLinkBatchHexColor(
    tbmOptionElements.inputLinkBatchBorderColor?.value,
    TBM_DEFAULT_OPTIONS.linkBatchBorderColor
  );
  const checkedColor = tbmNormalizeLinkBatchHexColor(
    tbmOptionElements.inputLinkBatchCheckedColor?.value,
    TBM_DEFAULT_OPTIONS.linkBatchCheckedColor
  );
  const overlayOpacity = tbmClampLinkBatchOpacity(
    tbmOptionElements.inputLinkBatchOverlayOpacity?.value,
    TBM_DEFAULT_OPTIONS.linkBatchOverlayOpacity
  );

  if (tbmOptionElements.inputLinkBatchOverlayColor) {
    tbmOptionElements.inputLinkBatchOverlayColor.value = overlayColor;
  }
  if (tbmOptionElements.inputLinkBatchOverlayColorPicker) {
    tbmOptionElements.inputLinkBatchOverlayColorPicker.value = overlayColor;
  }

  if (tbmOptionElements.inputLinkBatchBorderColor) {
    tbmOptionElements.inputLinkBatchBorderColor.value = borderColor;
  }
  if (tbmOptionElements.inputLinkBatchBorderColorPicker) {
    tbmOptionElements.inputLinkBatchBorderColorPicker.value = borderColor;
  }
  if (tbmOptionElements.linkBatchBorderColorPreview) {
    tbmOptionElements.linkBatchBorderColorPreview.style.borderColor = borderColor;
  }

  if (tbmOptionElements.inputLinkBatchCheckedColor) {
    tbmOptionElements.inputLinkBatchCheckedColor.value = checkedColor;
  }
  if (tbmOptionElements.inputLinkBatchCheckedColorPicker) {
    tbmOptionElements.inputLinkBatchCheckedColorPicker.value = checkedColor;
  }
  if (tbmOptionElements.linkBatchCheckedColorPreview) {
    tbmOptionElements.linkBatchCheckedColorPreview.style.borderColor = checkedColor;
  }

  if (tbmOptionElements.inputLinkBatchOverlayOpacity) {
    tbmOptionElements.inputLinkBatchOverlayOpacity.value =
      tbmFormatLinkBatchOpacityText(overlayOpacity);
  }
  if (tbmOptionElements.inputLinkBatchOverlayOpacityRange) {
    tbmOptionElements.inputLinkBatchOverlayOpacityRange.value =
      String(Math.round(overlayOpacity * 100));
  }
}

function tbmSetupLinkBatchEvents() {
  tbmOptionElements.buttonLinkBatchCtrl?.addEventListener("click", () => {
    tbmToggleModifierButton(tbmOptionElements.buttonLinkBatchCtrl, tbmUpdateLinkBatchPreview);
  });

  tbmOptionElements.buttonLinkBatchAlt?.addEventListener("click", () => {
    tbmToggleModifierButton(tbmOptionElements.buttonLinkBatchAlt, tbmUpdateLinkBatchPreview);
  });

  tbmOptionElements.buttonLinkBatchShift?.addEventListener("click", () => {
    tbmToggleModifierButton(tbmOptionElements.buttonLinkBatchShift, tbmUpdateLinkBatchPreview);
  });

  tbmOptionElements.inputLinkBatchKey?.addEventListener("focus", () => {
    const el = tbmOptionElements.inputLinkBatchKey;

    try {
      el.setAttribute("lang", "en");
      el.setAttribute("autocapitalize", "off");
      el.setAttribute("autocorrect", "off");
      el.setAttribute("inputmode", "none");
    } catch (e) {}

    el.select();
    tbmUpdateLinkBatchPreview();
  });

  tbmOptionElements.inputLinkBatchKey?.addEventListener("keydown", event => {
    event.preventDefault();
    event.stopPropagation();

    const capturedKey = tbmKeyFromKeyboardEvent(event);
    if (!capturedKey) {
      return;
    }

    tbmOptionElements.inputLinkBatchKey.value = capturedKey === " " ? " " : capturedKey;
    tbmUpdateLinkBatchPreview();
  });

  tbmOptionElements.inputLinkBatchKey?.addEventListener("click", () => {
    tbmOptionElements.inputLinkBatchKey.select();
  });

  tbmOptionElements.inputLinkBatchKey?.addEventListener("blur", () => {
    tbmOptionElements.inputLinkBatchKey.value = tbmNormalizeShortcutKey(
      tbmOptionElements.inputLinkBatchKey.value ?? "",
      { allowEmpty: true, fallback: "" }
    );
    tbmUpdateLinkBatchPreview();
  });

  tbmOptionElements.buttonLinkBatchClear?.addEventListener("click", () => {
    if (tbmOptionElements.inputLinkBatchKey) {
      tbmOptionElements.inputLinkBatchKey.value = "";
    }
    tbmUpdateLinkBatchPreview();
  });
}

let tbmStsSiteBoxOrderMapDraft = {};
let tbmPageJumpDraftRule = null;
let tbmPageJumpRulesDraft = [];
let tbmIsPageJumpEditing = false;

function tbmCreateEmptyPageJumpRule() {
  return {
    siteName: "",
    host: "",
    pathPrefix: "",
    mode: "query",
    pageParam: "",
    pageStep: "1",
    firstPageValue: "1",
    firstPageOmit: false,
    keepParams: [],

    pathTemplate: "",
    firstPagePath: "/",
    pageNumberPadding: "0",

    offsetParam: "",
    offsetStep: "20",
    offsetFirstValue: "0",
    offsetKeepParams: [],

    sampleUrl1: "",
    sampleUrl2: "",
    sampleUrl3: "",

    forwardKey: "",
    forwardCtrl: false,
    forwardAlt: false,
    forwardShift: false,
    forwardMouse: false,

    backKey: "",
    backCtrl: false,
    backAlt: false,
    backShift: false,
    backMouse: false,

    enabled: true
  };
}

function tbmNormalizePageJumpHostForRule(value) {
  let host = String(value || "").trim().toLowerCase();

  if (!host) return "";

  host = host.replace(/^https?:\/\//, "");
  host = host.replace(/^www\./, "");
  host = host.replace(/\/.*$/, "");

  return host;
}

function tbmNormalizePageJumpPathPrefix(value) {
  let path = String(value || "").trim();

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
  const base = tbmCreateEmptyPageJumpRule();

  const keepParams = Array.isArray(source.keepParams)
    ? source.keepParams.map(v => String(v || "").trim()).filter(Boolean)
    : [];

  const offsetKeepParams = Array.isArray(source.offsetKeepParams)
    ? source.offsetKeepParams.map(v => String(v || "").trim()).filter(Boolean)
    : [];

  const rawPadding = String(source.pageNumberPadding ?? base.pageNumberPadding ?? "0").trim();
  const normalizedPadding =
    /^\d+$/.test(rawPadding) ? String(Number.parseInt(rawPadding, 10)) : "0";

  let normalizedMode = "query";
  if (source.mode === "path") {
    normalizedMode = "path";
  } else if (source.mode === "offset") {
    normalizedMode = "offset";
  }

  return {
    siteName: String(source.siteName || "").trim(),
    host: tbmNormalizePageJumpHostForRule(source.host),
    pathPrefix: tbmNormalizePageJumpPathPrefix(source.pathPrefix || "/"),
    mode: normalizedMode,

    pageParam: String(source.pageParam || "").trim(),
    pageStep: String(source.pageStep || base.pageStep).trim() || "1",
    firstPageValue: String(source.firstPageValue ?? base.firstPageValue).trim() || "1",
    firstPageOmit: !!source.firstPageOmit,
    keepParams,

    pathTemplate: String(source.pathTemplate || "").trim(),
    firstPagePath: tbmNormalizePageJumpPathPrefix(source.firstPagePath || base.firstPagePath || "/"),
    pageNumberPadding: normalizedPadding,

    offsetParam: String(source.offsetParam || "").trim(),
    offsetStep: String(source.offsetStep || base.offsetStep).trim() || "20",
    offsetFirstValue: String(source.offsetFirstValue ?? base.offsetFirstValue).trim() || "0",
    offsetKeepParams,

    sampleUrl1: String(source.sampleUrl1 || "").trim(),
    sampleUrl2: String(source.sampleUrl2 || "").trim(),
    sampleUrl3: String(source.sampleUrl3 || "").trim(),
    forwardKey: tbmNormalizeShortcutKey(source.forwardKey || "", { allowEmpty: true, fallback: "" }),
    forwardCtrl: !!source.forwardCtrl,
    forwardAlt: !!source.forwardAlt,
    forwardShift: !!source.forwardShift,
    forwardMouse: !!source.forwardMouse,

    backKey: tbmNormalizeShortcutKey(source.backKey || "", { allowEmpty: true, fallback: "" }),
    backCtrl: !!source.backCtrl,
    backAlt: !!source.backAlt,
    backShift: !!source.backShift,
    backMouse: !!source.backMouse,

    enabled: source.enabled !== false
  };
}

function tbmBuildPageJumpRuleStorageKey(rule) {
  const normalized = tbmNormalizePageJumpRule(rule);

  let modeSpecificKey = "";

  if (normalized.mode === "path") {
    modeSpecificKey = String(normalized.pathTemplate || "").trim();
  } else if (normalized.mode === "offset") {
    modeSpecificKey = String(normalized.offsetParam || "").trim();
  } else {
    modeSpecificKey = String(normalized.pageParam || "").trim();
  }

  return [
    normalized.host,
    normalized.pathPrefix,
    normalized.mode,
    modeSpecificKey
  ].join("||");
}

function tbmBuildPageJumpRuleFromCurrentForm() {
  const mode =
    tbmOptionElements.inputPageJumpTypeList.find(radio => radio.checked)?.value || "query";

  const rawSiteName = String(tbmOptionElements.inputPageJumpSiteName?.value || "").trim();
  const rawPattern = String(tbmOptionElements.inputPageJumpPattern?.value || "").trim();
  const rawStep = String(tbmOptionElements.inputPageJumpStep?.value || "").trim() || "1";
  const rawHost = String(tbmOptionElements.inputPageJumpHost?.value || "").trim();

  const baseRule = tbmPageJumpDraftRule
    ? tbmNormalizePageJumpRule(tbmPageJumpDraftRule)
    : tbmCreateEmptyPageJumpRule();

  const nextRule = {
    ...baseRule,

    siteName: rawSiteName,
    host: rawHost || baseRule.host,
    mode,

    sampleUrl1: String(tbmOptionElements.inputPageJumpUrl1?.value || "").trim() || String(baseRule.sampleUrl1 || "").trim(),
    sampleUrl2: String(tbmOptionElements.inputPageJumpUrl2?.value || "").trim() || String(baseRule.sampleUrl2 || "").trim(),
    sampleUrl3: String(tbmOptionElements.inputPageJumpUrl3?.value || "").trim() || String(baseRule.sampleUrl3 || "").trim(),

    forwardKey: tbmNormalizeShortcutKey(tbmOptionElements.pjKey?.value || "", {
      allowEmpty: true,
      fallback: ""
    }),
    forwardCtrl: !!tbmOptionElements.pjCtrl?.classList.contains("tbm_active"),
    forwardAlt: !!tbmOptionElements.pjAlt?.classList.contains("tbm_active"),
    forwardShift: !!tbmOptionElements.pjShift?.classList.contains("tbm_active"),
    forwardMouse: !!tbmOptionElements.checkboxPageJumpMouseForward?.checked,

    backKey: tbmNormalizeShortcutKey(tbmOptionElements.pjBackKey?.value || "", {
      allowEmpty: true,
      fallback: ""
    }),
    backCtrl: !!tbmOptionElements.pjBackCtrl?.classList.contains("tbm_active"),
    backAlt: !!tbmOptionElements.pjBackAlt?.classList.contains("tbm_active"),
    backShift: !!tbmOptionElements.pjBackShift?.classList.contains("tbm_active"),
    backMouse: !!tbmOptionElements.checkboxPageJumpMouseBack?.checked
  };

  if (mode === "query") {
    let pathPrefix = baseRule.pathPrefix || "/";
    let pageParam = baseRule.pageParam || "";
    let firstPageValue = baseRule.firstPageValue || "1";
    let firstPageOmit = !!baseRule.firstPageOmit;
    let keepParams = Array.isArray(baseRule.keepParams) ? [...baseRule.keepParams] : [];

    if (rawPattern.includes("|")) {
      const pieces = rawPattern.split("|").map(v => v.trim());
      pathPrefix = pieces[0] || pathPrefix;
      pageParam = pieces[1] || pageParam;
    } else if (rawPattern) {
      pageParam = rawPattern;
    }

    nextRule.pathPrefix = tbmNormalizePageJumpPathPrefix(pathPrefix);
    nextRule.pageParam = pageParam;
    nextRule.pageStep = rawStep;
    nextRule.firstPageValue = firstPageValue;
    nextRule.firstPageOmit = firstPageOmit;
    nextRule.keepParams = keepParams;

    nextRule.pathTemplate = "";
    nextRule.firstPagePath = "/";
    nextRule.pageNumberPadding = "0";

    nextRule.offsetParam = "";
    nextRule.offsetStep = "20";
    nextRule.offsetFirstValue = "0";
    nextRule.offsetKeepParams = [];
  } else if (mode === "path") {
    let pathPrefix = baseRule.pathPrefix || "/";
    let pathTemplate = baseRule.pathTemplate || "";
    let firstPagePath = baseRule.firstPagePath || "/";
    let pageNumberPadding = String(baseRule.pageNumberPadding || "0");

    if (rawPattern.includes("|")) {
      const pieces = rawPattern.split("|").map(v => v.trim());
      pathPrefix = pieces[0] || pathPrefix;
      pathTemplate = pieces[1] || pathTemplate;
      firstPagePath = pieces[2] || firstPagePath;
    } else if (rawPattern) {
      pathTemplate = rawPattern;
    }

    nextRule.pathPrefix = tbmNormalizePageJumpPathPrefix(pathPrefix);
    nextRule.pathTemplate = pathTemplate;
    nextRule.firstPagePath = tbmNormalizePageJumpPathPrefix(firstPagePath);
    nextRule.pageNumberPadding = pageNumberPadding;
    nextRule.pageStep = rawStep;

    nextRule.pageParam = "";
    nextRule.keepParams = [];
    nextRule.offsetParam = "";
    nextRule.offsetStep = "20";
    nextRule.offsetFirstValue = "0";
    nextRule.offsetKeepParams = [];
  } else {
    let pathPrefix = baseRule.pathPrefix || "/";
    let offsetParam = baseRule.offsetParam || "";
    let offsetFirstValue = baseRule.offsetFirstValue || "0";
    let offsetKeepParams = Array.isArray(baseRule.offsetKeepParams)
      ? [...baseRule.offsetKeepParams]
      : [];

    if (rawPattern.includes("|")) {
      const pieces = rawPattern.split("|").map(v => v.trim());
      pathPrefix = pieces[0] || pathPrefix;
      offsetParam = pieces[1] || offsetParam;
    } else if (rawPattern) {
      offsetParam = rawPattern;
    }

    nextRule.pathPrefix = tbmNormalizePageJumpPathPrefix(pathPrefix);
    nextRule.offsetParam = offsetParam;
    nextRule.offsetStep = rawStep;
    nextRule.offsetFirstValue = offsetFirstValue;
    nextRule.offsetKeepParams = offsetKeepParams;

    nextRule.pageParam = "";
    nextRule.pageStep = "1";
    nextRule.firstPageValue = "1";
    nextRule.firstPageOmit = false;
    nextRule.keepParams = [];

    nextRule.pathTemplate = "";
    nextRule.firstPagePath = "/";
    nextRule.pageNumberPadding = "0";
  }

  return tbmNormalizePageJumpRule(nextRule);
}

function tbmApplyPageJumpRuleToForm(rule) {
  const normalized = tbmNormalizePageJumpRule(rule);
  tbmPageJumpDraftRule = normalized;

  if (tbmOptionElements.inputPageJumpUrl1) {
    tbmOptionElements.inputPageJumpUrl1.value = normalized.sampleUrl1 || "";
  }
  if (tbmOptionElements.inputPageJumpUrl2) {
    tbmOptionElements.inputPageJumpUrl2.value = normalized.sampleUrl2 || "";
  }
  if (tbmOptionElements.inputPageJumpUrl3) {
    tbmOptionElements.inputPageJumpUrl3.value = normalized.sampleUrl3 || "";
  }

  if (tbmOptionElements.inputPageJumpSiteName) {
    tbmOptionElements.inputPageJumpSiteName.value = normalized.siteName || "";
  }

  if (tbmOptionElements.inputPageJumpHost) {
    tbmOptionElements.inputPageJumpHost.value = normalized.host || "";
  }

  if (tbmOptionElements.inputPageJumpStep) {
    if (normalized.mode === "offset") {
      tbmOptionElements.inputPageJumpStep.value = normalized.offsetStep || "20";
    } else {
      tbmOptionElements.inputPageJumpStep.value = normalized.pageStep || "1";
    }
  }

  if (Array.isArray(tbmOptionElements.inputPageJumpTypeList)) {
    tbmOptionElements.inputPageJumpTypeList.forEach(radio => {
      radio.checked = radio.value === normalized.mode;
    });
  }

  if (tbmOptionElements.inputPageJumpPattern) {
    if (normalized.mode === "query") {
      tbmOptionElements.inputPageJumpPattern.value =
        `${normalized.pathPrefix} | ${normalized.pageParam}`;
    } else if (normalized.mode === "path") {
      tbmOptionElements.inputPageJumpPattern.value =
        `${normalized.pathPrefix} | ${normalized.pathTemplate} | ${normalized.firstPagePath}`;
    } else {
      tbmOptionElements.inputPageJumpPattern.value =
        `${normalized.pathPrefix} | ${normalized.offsetParam}`;
    }
  }

  if (tbmOptionElements.pjKey) {
    tbmOptionElements.pjKey.value = normalized.forwardKey || "";
  }
  tbmSetModifierState(tbmOptionElements.pjCtrl, !!normalized.forwardCtrl);
  tbmSetModifierState(tbmOptionElements.pjAlt, !!normalized.forwardAlt);
  tbmSetModifierState(tbmOptionElements.pjShift, !!normalized.forwardShift);
  tbmUpdatePageJumpPreview();

  if (tbmOptionElements.pjBackKey) {
    tbmOptionElements.pjBackKey.value = normalized.backKey || "";
  }
  tbmSetModifierState(tbmOptionElements.pjBackCtrl, !!normalized.backCtrl);
  tbmSetModifierState(tbmOptionElements.pjBackAlt, !!normalized.backAlt);
  tbmSetModifierState(tbmOptionElements.pjBackShift, !!normalized.backShift);
  tbmUpdatePageJumpBackPreview();

  if (tbmOptionElements.checkboxPageJumpMouseBack) {
    tbmOptionElements.checkboxPageJumpMouseBack.checked = !!normalized.backMouse;
  }

  if (tbmOptionElements.checkboxPageJumpMouseForward) {
    tbmOptionElements.checkboxPageJumpMouseForward.checked = !!normalized.forwardMouse;
  }
}

function tbmUpsertPageJumpRule(rules, rule) {
  const normalizedRule = tbmNormalizePageJumpRule(rule);
  const nextRules = Array.isArray(rules)
    ? rules.map(item => tbmNormalizePageJumpRule(item))
    : [];

  const ruleKey = tbmBuildPageJumpRuleStorageKey(normalizedRule);
  const foundIndex = nextRules.findIndex(item => {
    return tbmBuildPageJumpRuleStorageKey(item) === ruleKey;
  });

  if (foundIndex === -1) {
    nextRules.push(normalizedRule);
  } else {
    nextRules[foundIndex] = normalizedRule;
  }

  return nextRules;
}

function tbmGetPageJumpModeLabel(rule) {
  const normalized = tbmNormalizePageJumpRule(rule);

  if (normalized.mode === "path") return tbmI18nText("pjModePath");
  if (normalized.mode === "offset") return tbmI18nText("pjModeOffset");
  return tbmI18nText("pjModeQuery");
}

function tbmGetPageJumpPatternSummary(rule) {
  const normalized = tbmNormalizePageJumpRule(rule);

  if (normalized.mode === "path") {
    return normalized.pathTemplate || tbmI18nText("pjPatternUnsetPath");
  }

  if (normalized.mode === "offset") {
    return normalized.offsetParam || tbmI18nText("pjPatternUnsetOffset");
  }

  return normalized.pageParam || tbmI18nText("pjPatternUnsetQuery");
}

function tbmRenderPageJumpRuleList() {
  const listEl = tbmOptionElements.pageJumpRuleList;
  if (!listEl) return;

  const rules = Array.isArray(tbmPageJumpRulesDraft)
    ? tbmPageJumpRulesDraft.map(rule => tbmNormalizePageJumpRule(rule))
    : [];

  if (!rules.length) {
    listEl.innerHTML = `<div class="tbm_note">${tbmI18nText("pjRuleListEmpty")}</div>`;
    return;
  }

  listEl.innerHTML = rules.map((rule, index) => {
    const ruleKey = tbmBuildPageJumpRuleStorageKey(rule);
    const displayName = rule.siteName || rule.host || tbmI18nText("pjRuleUnsetSite");
    const hostText = rule.host || tbmI18nText("pjRuleUnsetHost");

    return `
      <div class="tbm_sts_site_item" data-rule-key="${ruleKey}">
        <div class="tbm_sts_site_item_index">
          <input
            type="checkbox"
            class="tbm_pj_rule_enabled_checkbox"
            data-rule-key="${ruleKey}"
            ${rule.enabled ? "checked" : ""}
          >
          ${tbmI18nText("pjRuleSitePrefix")}${index + 1}
        </div>

        <div class="tbm_sts_site_item_host" title="${hostText}">
          <strong>${displayName}</strong><br>
          <span class="tbm_note">${hostText}</span>
        </div>

        <div class="tbm_inline_action_row">
          <button
            type="button"
            class="tbm_secondary_button tbm_pj_rule_edit_button"
            data-rule-key="${ruleKey}"
          >
            ${tbmI18nText("pjRuleEditButton")}
          </button>
          <button
            type="button"
            class="tbm_secondary_button tbm_pj_rule_remove_button"
            data-rule-key="${ruleKey}"
          >
            ${tbmI18nText("pjRuleRemoveButton")}
          </button>
        </div>
      </div>
    `;
  }).join("");

  listEl.querySelectorAll(".tbm_pj_rule_edit_button").forEach(button => {
    button.addEventListener("click", () => {
      const ruleKey = String(button.dataset.ruleKey || "");
      const targetRule = tbmPageJumpRulesDraft.find(rule => {
        return tbmBuildPageJumpRuleStorageKey(rule) === ruleKey;
      });

      if (!targetRule) return;

      tbmIsPageJumpEditing = true;
      tbmApplyPageJumpRuleToForm(targetRule);

      if (tbmOptionElements.inputPageJumpModeList) {
        tbmOptionElements.inputPageJumpModeList.forEach(radio => {
          radio.checked = (radio.value === "manual");
        });
      }
      tbmRefreshEnableUi();

      if (tbmOptionElements.textPageJumpAnalysis) {
        tbmOptionElements.textPageJumpAnalysis.textContent = tbmI18nText("pjAnalysisShowingSavedRule");
        tbmOptionElements.textPageJumpAnalysis.style.color = "#2e7d32";
      }

      tbmSetStatus(tbmI18nText("pjStatusRuleApplied"), "ok");
      tbmClearStatusLater(tbmI18nText("pjStatusRuleApplied"), 1200);
    });
  });

  listEl.querySelectorAll(".tbm_pj_rule_remove_button").forEach(button => {
    button.addEventListener("click", () => {
      const ruleKey = String(button.dataset.ruleKey || "");
      const nextRules = tbmPageJumpRulesDraft.filter(rule => {
        return tbmBuildPageJumpRuleStorageKey(rule) !== ruleKey;
      });

      tbmPageJumpRulesDraft = nextRules.map(rule => tbmNormalizePageJumpRule(rule));

      const currentRuleKeyAfter = tbmPageJumpDraftRule
        ? tbmBuildPageJumpRuleStorageKey(tbmPageJumpDraftRule)
        : "";

      const stillExists = tbmPageJumpRulesDraft.some(rule => {
        return tbmBuildPageJumpRuleStorageKey(rule) === currentRuleKeyAfter;
      });

      if (!stillExists) {
        const fallbackRule = tbmPageJumpRulesDraft.length
          ? tbmPageJumpRulesDraft[0]
          : tbmCreateEmptyPageJumpRule();

        tbmApplyPageJumpRuleToForm(fallbackRule);

        if (tbmOptionElements.textPageJumpAnalysis) {
          if (tbmPageJumpRulesDraft.length) {
            tbmOptionElements.textPageJumpAnalysis.textContent = tbmI18nText("pjAnalysisShowingSavedRule");
            tbmOptionElements.textPageJumpAnalysis.style.color = "#2e7d32";
          } else {
            tbmOptionElements.textPageJumpAnalysis.textContent = "";
            tbmOptionElements.textPageJumpAnalysis.style.color = "";
          }
        }
      }

      tbmRenderPageJumpRuleList();
      tbmSetStatus(tbmI18nText("pjStatusRuleRemoved"), "ok");
      tbmClearStatusLater(tbmI18nText("pjStatusRuleRemoved"), 1600);
    });
  });

  listEl.querySelectorAll(".tbm_pj_rule_enabled_checkbox").forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      const ruleKey = String(checkbox.dataset.ruleKey || "");
      const checked = checkbox.checked;

      tbmPageJumpRulesDraft = tbmPageJumpRulesDraft.map(rule => {
        if (tbmBuildPageJumpRuleStorageKey(rule) === ruleKey) {
          return {
            ...rule,
            enabled: checked
          };
        }
        return rule;
      });

      if (
        tbmPageJumpDraftRule &&
        tbmBuildPageJumpRuleStorageKey(tbmPageJumpDraftRule) === ruleKey
      ) {
        tbmPageJumpDraftRule = {
          ...tbmPageJumpDraftRule,
          enabled: checked
        };
      }

      tbmSetStatus(tbmI18nText("pjStatusRuleEnabledUpdated"), "ok");
      tbmClearStatusLater(tbmI18nText("pjStatusRuleEnabledUpdated"), 1400);
    });
  });
}

function tbmNormalizeShortcutKey(value, options = {}) {
  const { allowEmpty = false, fallback = "/" } = options;
  const raw = String(value ?? "");

  if (raw === " ") {
    return " ";
  }

  let key = raw.trim();

  if (!key) {
    return allowEmpty ? "" : fallback;
  }

  if (key.length === 1) {
    return key;
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

function tbmKeyFromKeyboardEvent(event) {
  const code = String(event.code || "");
  const key = String(event.key || "");

  if (code === "Slash") return "/";
  if (code === "Space") return " ";
  if (key === "Escape" || code === "Escape") return "Escape";

  if (key === "ArrowLeft" || key === "Left" || code === "ArrowLeft") {
    return "ArrowLeft";
  }

  if (key === "ArrowRight" || key === "Right" || code === "ArrowRight") {
    return "ArrowRight";
  }

  if (key === "PageUp" || code === "PageUp") {
    return "PageUp";
  }

  if (key === "PageDown" || code === "PageDown") {
    return "PageDown";
  }

  if (key === "Home" || code === "Home") {
    return "Home";
  }

  if (key === "End" || code === "End") {
    return "End";
  }

  if (/^Key[A-Z]$/.test(code)) {
    return code.slice(3).toLowerCase();
  }

  if (/^Digit[0-9]$/.test(code)) {
    return code.slice(5);
  }

  if (/^F([1-9]|1[0-2])$/i.test(key)) {
    return key.toUpperCase();
  }

  if (key.length === 1) {
    return key;
  }

  return "";
}

function tbmSetStatus(message, type = "") {
  if (!tbmOptionElements.saveStatusList?.length) return;

  tbmOptionElements.saveStatusList.forEach(statusEl => {
    statusEl.textContent = message || "";
    statusEl.classList.remove("tbm_status_ok", "tbm_status_warn");

    if (type === "ok") {
      statusEl.classList.add("tbm_status_ok");
    } else if (type === "warn") {
      statusEl.classList.add("tbm_status_warn");
    }
  });
}

function tbmClearStatusLater(expectedText, delay = 1600) {
  setTimeout(() => {
    const hasExpectedText = tbmOptionElements.saveStatusList?.some(
      statusEl => statusEl.textContent === expectedText
    );

    if (hasExpectedText) {
      tbmSetStatus("");
    }
  }, delay);
}

function tbmSetActivePanel(panelName) {
  tbmOptionElements.tabButtons.forEach(button => {
    button.classList.toggle("is-active", button.dataset.panel === panelName);
  });

  tbmOptionElements.panels.forEach(panel => {
    const isActive = panel.dataset.panel === panelName;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  });
}

function tbmSetGroupEnabled(groupElement, enabled) {
  if (!groupElement) return;
  groupElement.classList.toggle("is-disabled", !enabled);
}

function tbmSetModifierState(buttonElement, isActive) {
  if (!buttonElement) return;
  buttonElement.classList.toggle("tbm_active", !!isActive);
}

function tbmToggleModifierButton(buttonElement, previewUpdater) {
  if (!buttonElement) return;
  buttonElement.classList.toggle("tbm_active");
  if (typeof previewUpdater === "function") {
    previewUpdater();
  }
}

function tbmGetShortcutState(kind) {
  if (kind === "launcher") {
    return {
      key: tbmNormalizeShortcutKey(tbmOptionElements.inputLauncherKey?.value ?? "", { allowEmpty: true, fallback: "" }),
      ctrl: !!tbmOptionElements.buttonLauncherCtrl?.classList.contains("tbm_active"),
      alt: !!tbmOptionElements.buttonLauncherAlt?.classList.contains("tbm_active"),
      shift: !!tbmOptionElements.buttonLauncherShift?.classList.contains("tbm_active")
    };
  }

  if (kind === "tabHistoryBack") {
    return {
      key: tbmNormalizeShortcutKey(tbmOptionElements.inputTabHistoryBackKey?.value ?? "", { allowEmpty: true, fallback: "" }),
      ctrl: !!tbmOptionElements.buttonTabHistoryBackCtrl?.classList.contains("tbm_active"),
      alt: !!tbmOptionElements.buttonTabHistoryBackAlt?.classList.contains("tbm_active"),
      shift: !!tbmOptionElements.buttonTabHistoryBackShift?.classList.contains("tbm_active")
    };
  }

  if (kind === "tabHistoryForward") {
    return {
      key: tbmNormalizeShortcutKey(tbmOptionElements.inputTabHistoryForwardKey?.value ?? "", { allowEmpty: true, fallback: "" }),
      ctrl: !!tbmOptionElements.buttonTabHistoryForwardCtrl?.classList.contains("tbm_active"),
      alt: !!tbmOptionElements.buttonTabHistoryForwardAlt?.classList.contains("tbm_active"),
      shift: !!tbmOptionElements.buttonTabHistoryForwardShift?.classList.contains("tbm_active")
    };
  }

  if (kind === "pagejump") {
    return {
      key: tbmNormalizeShortcutKey(tbmOptionElements.pjKey?.value || "", { allowEmpty: true, fallback: "" }),
      ctrl: !!tbmOptionElements.pjCtrl?.classList.contains("tbm_active"),
      alt: !!tbmOptionElements.pjAlt?.classList.contains("tbm_active"),
      shift: !!tbmOptionElements.pjShift?.classList.contains("tbm_active")
    };
  }

  return {
    key: tbmNormalizeShortcutKey(tbmOptionElements.inputStsKey?.value || "", { allowEmpty: true, fallback: "" }),
    ctrl: !!tbmOptionElements.buttonStsCtrl?.classList.contains("tbm_active"),
    alt: !!tbmOptionElements.buttonStsAlt?.classList.contains("tbm_active"),
    shift: !!tbmOptionElements.buttonStsShift?.classList.contains("tbm_active")
  };
}

function tbmFormatShortcutPreview(shortcutState, emptyText = tbmI18nText("commonNotSet")) {
  if (!shortcutState.key) {
    return emptyText;
  }

  const parts = [];

  if (shortcutState.ctrl) parts.push(tbmI18nText("keyNameCtrl"));
  if (shortcutState.alt) parts.push(tbmI18nText("keyNameAlt"));
  if (shortcutState.shift) parts.push(tbmI18nText("keyNameShift"));

  parts.push(tbmDisplayShortcutKey(shortcutState.key));

  return parts.join(" + ");
}

function tbmUpdateLauncherPreview() {
  if (!tbmOptionElements.launcherPreview) return;
  tbmOptionElements.launcherPreview.textContent = tbmFormatShortcutPreview(
    tbmGetShortcutState("launcher"),
    tbmI18nText("commonNotSet")
  );
  tbmOptionElements.launcherPreview.style.color = "#555";
}

function tbmUpdateStsPreview() {
  if (!tbmOptionElements.stsPreview) return;
  tbmOptionElements.stsPreview.textContent = tbmFormatShortcutPreview(
    tbmGetShortcutState("sts"),
    tbmI18nText("commonNotSet")
  );
  tbmOptionElements.stsPreview.style.color = "#555";
}

function tbmUpdateTabHistoryBackPreview() {
  if (!tbmOptionElements.tabHistoryBackPreview) return;
  tbmOptionElements.tabHistoryBackPreview.textContent = tbmFormatShortcutPreview(
    tbmGetShortcutState("tabHistoryBack"),
    tbmI18nText("commonNotSet")
  );
  tbmOptionElements.tabHistoryBackPreview.style.color = "#555";
}

function tbmUpdateTabHistoryForwardPreview() {
  if (!tbmOptionElements.tabHistoryForwardPreview) return;
  tbmOptionElements.tabHistoryForwardPreview.textContent = tbmFormatShortcutPreview(
    tbmGetShortcutState("tabHistoryForward"),
    tbmI18nText("commonNotSet")
  );
  tbmOptionElements.tabHistoryForwardPreview.style.color = "#555";
}

function tbmUpdatePageJumpPreview() {
  if (!tbmOptionElements.pjPreview) return;
  tbmOptionElements.pjPreview.textContent = tbmFormatShortcutPreview(
    tbmGetShortcutState("pagejump"),
    tbmI18nText("commonNotSet")
  );
  tbmOptionElements.pjPreview.style.color = "#555";
}

function tbmGetPageJumpBackShortcutState() {
  return {
    key: tbmNormalizeShortcutKey(
      tbmOptionElements.pjBackKey?.value || "",
      { allowEmpty: true, fallback: "" }
    ),
    ctrl: !!tbmOptionElements.pjBackCtrl?.classList.contains("tbm_active"),
    alt: !!tbmOptionElements.pjBackAlt?.classList.contains("tbm_active"),
    shift: !!tbmOptionElements.pjBackShift?.classList.contains("tbm_active")
  };
}

function tbmUpdatePageJumpBackPreview() {
  if (!tbmOptionElements.pjBackPreview) return;
  tbmOptionElements.pjBackPreview.textContent = tbmFormatShortcutPreview(
    tbmGetPageJumpBackShortcutState(),
    tbmI18nText("commonNotSet")
  );
  tbmOptionElements.pjBackPreview.style.color = "#555";
}

function tbmGetGooglePageJumpShortcutState() {
  return {
    key: tbmNormalizeShortcutKey(
      tbmOptionElements.googlePjKey?.value || "",
      { allowEmpty: true, fallback: "" }
    ),
    ctrl: !!tbmOptionElements.googlePjCtrl?.classList.contains("tbm_active"),
    alt: !!tbmOptionElements.googlePjAlt?.classList.contains("tbm_active"),
    shift: !!tbmOptionElements.googlePjShift?.classList.contains("tbm_active")
  };
}

function tbmUpdateGooglePageJumpPreview() {
  if (!tbmOptionElements.googlePjPreview) return;
  tbmOptionElements.googlePjPreview.textContent = tbmFormatShortcutPreview(
    tbmGetGooglePageJumpShortcutState(),
    tbmI18nText("commonNotSet")
  );
  tbmOptionElements.googlePjPreview.style.color = "#555";
}

function tbmGetGooglePageJumpBackShortcutState() {
  return {
    key: tbmNormalizeShortcutKey(
      tbmOptionElements.googlePjBackKey?.value || "",
      { allowEmpty: true, fallback: "" }
    ),
    ctrl: !!tbmOptionElements.googlePjBackCtrl?.classList.contains("tbm_active"),
    alt: !!tbmOptionElements.googlePjBackAlt?.classList.contains("tbm_active"),
    shift: !!tbmOptionElements.googlePjBackShift?.classList.contains("tbm_active")
  };
}

function tbmUpdateGooglePageJumpBackPreview() {
  if (!tbmOptionElements.googlePjBackPreview) return;
  tbmOptionElements.googlePjBackPreview.textContent = tbmFormatShortcutPreview(
    tbmGetGooglePageJumpBackShortcutState(),
    tbmI18nText("commonNotSet")
  );
  tbmOptionElements.googlePjBackPreview.style.color = "#555";
}

function tbmClearShortcutInput(inputElement, modifierButtons, previewUpdater) {
  if (inputElement) {
    inputElement.value = "";
  }

  if (Array.isArray(modifierButtons)) {
    modifierButtons.forEach(button => {
      tbmSetModifierState(button, false);
    });
  }

  if (typeof previewUpdater === "function") {
    previewUpdater();
  }
}

function tbmShowPreviewMessage(previewElement, updater, message, color, delay = 1300) {
  if (!previewElement) return;
  previewElement.textContent = message;
  previewElement.style.color = color;

  clearTimeout(previewElement._tbmTimer);
  previewElement._tbmTimer = setTimeout(() => {
    updater();
  }, delay);
}

function tbmShortcutEquals(a, b) {
  return (
    a.key === b.key &&
    !!a.ctrl === !!b.ctrl &&
    !!a.alt === !!b.alt &&
    !!a.shift === !!b.shift
  );
}

function tbmRefreshSideTabStates() {
  tbmOptionElements.tabButtonControl?.classList.toggle(
    "is-enabled",
    !!tbmOptionElements.enableTabControl?.checked
  );
  tbmOptionElements.tabButtonControl?.classList.toggle(
    "is-disabled",
    !tbmOptionElements.enableTabControl?.checked
  );

  tbmOptionElements.tabButtonSearch?.classList.toggle(
    "is-enabled",
    !!tbmOptionElements.enableTabSearch?.checked
  );
  tbmOptionElements.tabButtonSearch?.classList.toggle(
    "is-disabled",
    !tbmOptionElements.enableTabSearch?.checked
  );

  tbmOptionElements.tabButtonLinkSelector?.classList.toggle(
    "is-enabled",
    !!tbmOptionElements.enableLinkBatchOpen?.checked
  );
  tbmOptionElements.tabButtonLinkSelector?.classList.toggle(
    "is-disabled",
    !tbmOptionElements.enableLinkBatchOpen?.checked
  );

  tbmOptionElements.tabButtonSts?.classList.toggle(
    "is-enabled",
    !!tbmOptionElements.enableSlashToSearch?.checked
  );
  tbmOptionElements.tabButtonSts?.classList.toggle(
    "is-disabled",
    !tbmOptionElements.enableSlashToSearch?.checked
  );

  tbmOptionElements.tabButtonPagejump?.classList.toggle(
    "is-enabled",
    !!tbmOptionElements.enablePageJump?.checked
  );
  tbmOptionElements.tabButtonPagejump?.classList.toggle(
    "is-disabled",
    !tbmOptionElements.enablePageJump?.checked
  );
}

function tbmRefreshEnableUi() {
  tbmSetGroupEnabled(
    tbmOptionElements.groupControl,
    !!tbmOptionElements.enableTabControl?.checked
  );
  tbmSetGroupEnabled(
    tbmOptionElements.groupSearch,
    !!tbmOptionElements.enableTabSearch?.checked
  );
  tbmSetGroupEnabled(
    tbmOptionElements.groupLinkSelector,
    !!tbmOptionElements.enableLinkBatchOpen?.checked
  );
  tbmSetGroupEnabled(
    tbmOptionElements.groupSts,
    !!tbmOptionElements.enableSlashToSearch?.checked
  );
  tbmSetGroupEnabled(
    tbmOptionElements.groupPageJump,
    !!tbmOptionElements.enablePageJump?.checked
  );

  tbmRefreshSideTabStates();

  const selectedPageJumpMode =
    tbmOptionElements.inputPageJumpModeList.find(radio => radio.checked)?.value || "auto";

  if (!tbmOptionElements.enablePageJump?.checked) {
    tbmSetGroupEnabled(tbmOptionElements.groupPageJumpAuto, false);
    tbmSetGroupEnabled(tbmOptionElements.groupPageJumpManual, false);
    return;
  }

  if (selectedPageJumpMode === "auto") {
    tbmSetGroupEnabled(tbmOptionElements.groupPageJumpAuto, true);
    tbmSetGroupEnabled(tbmOptionElements.groupPageJumpManual, false);
  } else {
    tbmSetGroupEnabled(tbmOptionElements.groupPageJumpAuto, true);
    tbmSetGroupEnabled(tbmOptionElements.groupPageJumpManual, true);
  }
}

function tbmValidateBeforeSave(nextOptions) {
  const launcherShortcut = {
    key: tbmNormalizeShortcutKey(nextOptions.launcherKey, { fallback: "/" }),
    ctrl: !!nextOptions.launcherCtrl,
    alt: !!nextOptions.launcherAlt,
    shift: !!nextOptions.launcherShift
  };

  const stsShortcut = {
    key: tbmNormalizeShortcutKey(nextOptions.stsKey, { allowEmpty: true, fallback: "" }),
    ctrl: !!nextOptions.stsCtrl,
    alt: !!nextOptions.stsAlt,
    shift: !!nextOptions.stsShift
  };

  const tabHistoryBackShortcut = {
    key: tbmNormalizeShortcutKey(nextOptions.tabHistoryBackKey, { allowEmpty: true, fallback: "" }),
    ctrl: !!nextOptions.tabHistoryBackCtrl,
    alt: !!nextOptions.tabHistoryBackAlt,
    shift: !!nextOptions.tabHistoryBackShift
  };

  const tabHistoryForwardShortcut = {
    key: tbmNormalizeShortcutKey(nextOptions.tabHistoryForwardKey, { allowEmpty: true, fallback: "" }),
    ctrl: !!nextOptions.tabHistoryForwardCtrl,
    alt: !!nextOptions.tabHistoryForwardAlt,
    shift: !!nextOptions.tabHistoryForwardShift
  };

  if (
    nextOptions.enableTabControl &&
    tabHistoryBackShortcut.key &&
    tabHistoryForwardShortcut.key &&
    tbmShortcutEquals(tabHistoryBackShortcut, tabHistoryForwardShortcut)
  ) {
    return tbmI18nText("tabHistoryValidateBackAndForward");
  }

  const pageJumpRule = Array.isArray(nextOptions.pageJumpRules) && nextOptions.pageJumpRules.length
    ? tbmNormalizePageJumpRule(nextOptions.pageJumpRules[0])
    : tbmCreateEmptyPageJumpRule();

  const pageJumpShortcut = {
    key: tbmNormalizeShortcutKey(pageJumpRule.forwardKey, { allowEmpty: true, fallback: "" }),
    ctrl: !!pageJumpRule.forwardCtrl,
    alt: !!pageJumpRule.forwardAlt,
    shift: !!pageJumpRule.forwardShift
  };

  const pageJumpBackShortcut = {
    key: tbmNormalizeShortcutKey(pageJumpRule.backKey, { allowEmpty: true, fallback: "" }),
    ctrl: !!pageJumpRule.backCtrl,
    alt: !!pageJumpRule.backAlt,
    shift: !!pageJumpRule.backShift
  };

  const googlePageJumpShortcut = {
    key: tbmNormalizeShortcutKey(nextOptions.googlePageJumpForwardKey, { allowEmpty: true, fallback: "" }),
    ctrl: !!nextOptions.googlePageJumpForwardCtrl,
    alt: !!nextOptions.googlePageJumpForwardAlt,
    shift: !!nextOptions.googlePageJumpForwardShift
  };

  const googlePageJumpBackShortcut = {
    key: tbmNormalizeShortcutKey(nextOptions.googlePageJumpBackKey, { allowEmpty: true, fallback: "" }),
    ctrl: !!nextOptions.googlePageJumpBackCtrl,
    alt: !!nextOptions.googlePageJumpBackAlt,
    shift: !!nextOptions.googlePageJumpBackShift
  };

  if (
    nextOptions.enableTabSearch &&
    nextOptions.enableSlashToSearch &&
    nextOptions.stsKey &&
    tbmShortcutEquals(launcherShortcut, stsShortcut)
  ) {
    return tbmI18nText("pjValidateTabSearchAndKts");
  }

  if (
    pageJumpShortcut.key &&
    nextOptions.enableTabSearch &&
    tbmShortcutEquals(pageJumpShortcut, launcherShortcut)
  ) {
    return tbmI18nText("pjValidatePageJumpForwardAndTabSearch");
  }

  if (
    pageJumpShortcut.key &&
    nextOptions.enableSlashToSearch &&
    nextOptions.stsKey &&
    tbmShortcutEquals(pageJumpShortcut, stsShortcut)
  ) {
    return tbmI18nText("pjValidatePageJumpForwardAndKts");
  }

  if (
    pageJumpBackShortcut.key &&
    nextOptions.enableTabSearch &&
    tbmShortcutEquals(pageJumpBackShortcut, launcherShortcut)
  ) {
    return tbmI18nText("pjValidatePageJumpBackAndTabSearch");
  }

  if (
    pageJumpBackShortcut.key &&
    nextOptions.enableSlashToSearch &&
    nextOptions.stsKey &&
    tbmShortcutEquals(pageJumpBackShortcut, stsShortcut)
  ) {
    return tbmI18nText("pjValidatePageJumpBackAndKts");
  }

  if (
    pageJumpShortcut.key &&
    pageJumpBackShortcut.key &&
    tbmShortcutEquals(pageJumpShortcut, pageJumpBackShortcut)
  ) {
    return tbmI18nText("pjValidatePageJumpForwardAndBack");
  }

  if (
    googlePageJumpShortcut.key &&
    nextOptions.enableTabSearch &&
    tbmShortcutEquals(googlePageJumpShortcut, launcherShortcut)
  ) {
    return tbmI18nText("pjValidateGooglePageJumpForwardAndTabSearch");
  }

  if (
    googlePageJumpShortcut.key &&
    nextOptions.enableSlashToSearch &&
    nextOptions.stsKey &&
    tbmShortcutEquals(googlePageJumpShortcut, stsShortcut)
  ) {
    return tbmI18nText("pjValidateGooglePageJumpForwardAndKts");
  }

  if (
    googlePageJumpBackShortcut.key &&
    nextOptions.enableTabSearch &&
    tbmShortcutEquals(googlePageJumpBackShortcut, launcherShortcut)
  ) {
    return tbmI18nText("pjValidateGooglePageJumpBackAndTabSearch");
  }

  if (
    googlePageJumpBackShortcut.key &&
    nextOptions.enableSlashToSearch &&
    nextOptions.stsKey &&
    tbmShortcutEquals(googlePageJumpBackShortcut, stsShortcut)
  ) {
    return tbmI18nText("pjValidateGooglePageJumpBackAndKts");
  }

  if (
    googlePageJumpShortcut.key &&
    googlePageJumpBackShortcut.key &&
    tbmShortcutEquals(googlePageJumpShortcut, googlePageJumpBackShortcut)
  ) {
    return tbmI18nText("pjValidateGooglePageJumpForwardAndBack");
  }

  return "";
}

function tbmApplyI18n() {
  document.title = tbmI18nText("optionsPageTitle");
  tbmOptionElements.title.textContent = tbmI18nText("optionsHeading");

  tbmOptionElements.labelNewTabPlacement.textContent = tbmI18nText("labelNewTabPlacement");
  tbmOptionElements.labelCloseActivation.textContent = tbmI18nText("labelCloseActivation");
  tbmOptionElements.labelNewTabOpenMode.textContent = tbmI18nText("labelNewTabOpenMode");

  if (tbmOptionElements.labelLauncherKey) {
    tbmOptionElements.labelLauncherKey.textContent = tbmI18nText("searchLauncherKeyLabel");
  }
  const linkSelectorTabText = document.querySelector("#tbm_tab_button_link_selector .tbm_side_tab_text");
  if (linkSelectorTabText) {
    linkSelectorTabText.textContent = tbmI18nText("sideTabLinkSelector");
  }
  tbmOptionElements.saveButtons.forEach(button => {
    button.textContent = tbmI18nText("buttonSaveSettings");
  });

  tbmOptionElements.resetButtons.forEach(button => {
    button.textContent = tbmI18nText("buttonReset");
  });

  tbmReplaceSelectOptionText(tbmOptionElements.selectNewTabPlacement, {
    default: "optionChromeDefault",
    first: "optionFirst",
    left: "optionLeftOfCurrentTab",
    right: "optionRightOfCurrentTab",
    last: "optionLast"
  });

  tbmReplaceSelectOptionText(tbmOptionElements.selectCloseActivation, {
    default: "optionChromeDefault",
    last_used: "optionActivateLastUsedTab",
    left: "optionActivateLeftTab",
    right: "optionActivateRightTab"
  });

  tbmReplaceSelectOptionText(tbmOptionElements.selectNewTabOpenMode, {
    default: "optionChromeDefault",
    foreground: "optionForeground",
    background: "optionBackground"
  });
}

function tbmApplyI18nToHtml() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = tbmI18nText(key);
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const key = element.dataset.i18nAriaLabel;
    element.setAttribute("aria-label", tbmI18nText(key));
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    const key = element.dataset.i18nAlt;
    element.setAttribute("alt", tbmI18nText(key));
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    el.setAttribute("placeholder", tbmI18nText(key));
  });
}

function tbmReplaceSelectOptionText(selectElement, messageMap) {
  if (!selectElement) return;

  Array.from(selectElement.options).forEach(option => {
    const messageKey = messageMap[option.value];
    if (!messageKey) return;
    option.textContent = tbmI18nText(messageKey);
  });
}

function tbmNormalizeHostForStsSiteRule(value) {
  let host = String(value || "").trim().toLowerCase();

  if (!host) return "";

  host = host.replace(/^https?:\/\//, "");
  host = host.replace(/\/.*$/, "");
  host = host.trim();

  return host;
}

function tbmNormalizeStsSiteName(value) {
  return String(value || "").trim();
}

function tbmNormalizeStsSiteBoxOrderValue(value) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return 1;
  return Math.max(1, parsed);
}

function tbmNormalizeStsSiteRule(host, source) {
  const normalizedHost = tbmNormalizeHostForStsSiteRule(host);
  const raw = source && typeof source === "object" ? source : {};

  if (!normalizedHost) return null;

  if (typeof raw === "number" || typeof raw === "string") {
    return {
      siteName: "",
      order: tbmNormalizeStsSiteBoxOrderValue(raw)
    };
  }

  return {
    siteName: tbmNormalizeStsSiteName(raw.siteName || ""),
    order: tbmNormalizeStsSiteBoxOrderValue(raw.order ?? "1")
  };
}

function tbmCloneStsSiteBoxOrderMap(map) {
  if (!map || typeof map !== "object") return {};

  const cloned = {};

  Object.keys(map).forEach(host => {
    const normalized = tbmNormalizeStsSiteRule(host, map[host]);
    if (!normalized) return;
    cloned[host] = normalized;
  });

  return cloned;
}

function tbmRenderStsSiteList() {
  const listEl = tbmOptionElements.stsSiteList;
  if (!listEl) return;

  const map = tbmStsSiteBoxOrderMapDraft || {};
  const hosts = Object.keys(map).sort((a, b) => a.localeCompare(b));

  if (!hosts.length) {
    listEl.innerHTML = `<div class="tbm_note">${tbmI18nText("stsSiteListEmpty")}</div>`;
    return;
  }

  listEl.innerHTML = hosts.map((host, index) => {
    const normalized = tbmNormalizeStsSiteRule(host, map[host]);
    if (!normalized) return "";

    const displayName = normalized.siteName || host;

    return `
      <div class="tbm_sts_site_item" data-host="${host}">
         <div class="tbm_sts_site_item_index">${tbmI18nText("stsSitePrefix")}${index + 1}</div>
        <div class="tbm_sts_site_item_host" title="${host}">
          <strong>${displayName}</strong><br>
          <span class="tbm_note">${host}</span>
        </div>
        
        <div class="tbm_sts_site_item_order">${normalized.order}</div>
         <div class="tbm_sts_site_item_suffix">${tbmI18nText("stsSiteOrderSuffix")}</div>
        <button
          type="button"
          class="tbm_secondary_button tbm_sts_site_remove_button"
          data-host="${host}"
        >
          ${tbmI18nText("stsSiteRemoveButton")}
        </button>
      </div>
    `;
  }).join("");

  listEl.querySelectorAll(".tbm_sts_site_remove_button").forEach(button => {
    button.addEventListener("click", () => {
      const host = tbmNormalizeHostForStsSiteRule(button.dataset.host || "");
      if (!host) return;

      delete tbmStsSiteBoxOrderMapDraft[host];
      tbmRenderStsSiteList();
      tbmSetStatus(tbmI18nText("stsSiteRemoveStatus"), "ok");
      tbmClearStatusLater(tbmI18nText("stsSiteRemoveStatus"), 1600);
    });
  });
}

async function tbmLoadOptions() {
  const stored = await chrome.storage.local.get(TBM_DEFAULT_OPTIONS);

  tbmOptionElements.enableTabControl.checked = !!stored.enableTabControl;
  tbmOptionElements.enableTabSearch.checked = !!stored.enableTabSearch;
  tbmOptionElements.enableSlashToSearch.checked = !!stored.enableSlashToSearch;
  if (tbmOptionElements.enablePageJump) {
    tbmOptionElements.enablePageJump.checked =
      stored.enablePageJump !== undefined ? !!stored.enablePageJump : true;
  }

  tbmOptionElements.selectNewTabPlacement.value = stored.newTabPlacement;
  tbmOptionElements.selectCloseActivation.value = stored.closeActivation;
  tbmOptionElements.selectNewTabOpenMode.value = stored.newTabOpenMode;

  if (tbmOptionElements.inputTabHistoryBackKey) {
    tbmOptionElements.inputTabHistoryBackKey.value = stored.tabHistoryBackKey ?? "q";
  }
  tbmSetModifierState(tbmOptionElements.buttonTabHistoryBackCtrl, !!stored.tabHistoryBackCtrl);
  tbmSetModifierState(tbmOptionElements.buttonTabHistoryBackAlt, !!stored.tabHistoryBackAlt);
  tbmSetModifierState(tbmOptionElements.buttonTabHistoryBackShift, !!stored.tabHistoryBackShift);

  if (tbmOptionElements.inputTabHistoryForwardKey) {
    tbmOptionElements.inputTabHistoryForwardKey.value = stored.tabHistoryForwardKey ?? "w";
  }
  tbmSetModifierState(tbmOptionElements.buttonTabHistoryForwardCtrl, !!stored.tabHistoryForwardCtrl);
  tbmSetModifierState(tbmOptionElements.buttonTabHistoryForwardAlt, !!stored.tabHistoryForwardAlt);
  tbmSetModifierState(tbmOptionElements.buttonTabHistoryForwardShift, !!stored.tabHistoryForwardShift);

  tbmOptionElements.inputLauncherKey.value = stored.launcherKey ?? "/";
  tbmSetModifierState(tbmOptionElements.buttonLauncherCtrl, !!stored.launcherCtrl);
  tbmSetModifierState(tbmOptionElements.buttonLauncherAlt, !!stored.launcherAlt);
  tbmSetModifierState(tbmOptionElements.buttonLauncherShift, !!stored.launcherShift);

  tbmOptionElements.inputStsKey.value = stored.stsKey || "";
  tbmSetModifierState(tbmOptionElements.buttonStsCtrl, !!stored.stsCtrl);
  tbmSetModifierState(tbmOptionElements.buttonStsAlt, !!stored.stsAlt);
  tbmSetModifierState(tbmOptionElements.buttonStsShift, !!stored.stsShift);

  if (tbmOptionElements.enableLinkBatchOpen) {
    tbmOptionElements.enableLinkBatchOpen.checked = !!stored.enableLinkBatchOpen;
  }
  if (tbmOptionElements.inputLinkBatchKey) {
    tbmOptionElements.inputLinkBatchKey.value = stored.linkBatchOpenKey ?? "b";
  }
  tbmSetModifierState(tbmOptionElements.buttonLinkBatchCtrl, !!stored.linkBatchOpenCtrl);
  tbmSetModifierState(tbmOptionElements.buttonLinkBatchAlt, !!stored.linkBatchOpenAlt);
  tbmSetModifierState(tbmOptionElements.buttonLinkBatchShift, !!stored.linkBatchOpenShift);

  if (tbmOptionElements.inputLinkBatchOverlayColor) {
    tbmOptionElements.inputLinkBatchOverlayColor.value = stored.linkBatchOverlayColor || "#000000";
  }
  if (tbmOptionElements.inputLinkBatchOverlayOpacity) {
    tbmOptionElements.inputLinkBatchOverlayOpacity.value =
      stored.linkBatchOverlayOpacity ?? 0.55;
  }
  if (tbmOptionElements.inputLinkBatchBorderColor) {
    tbmOptionElements.inputLinkBatchBorderColor.value = stored.linkBatchBorderColor || "#ff4db8";
  }
  if (tbmOptionElements.inputLinkBatchCheckedColor) {
    tbmOptionElements.inputLinkBatchCheckedColor.value = stored.linkBatchCheckedColor || "#00e676";
  }
  if (tbmOptionElements.selectLinkBatchCheckboxPosition) {
    tbmOptionElements.selectLinkBatchCheckboxPosition.value =
      stored.linkBatchCheckboxPosition || "top_right";
  }
  if (tbmOptionElements.inputLinkBatchMinWidth) {
    tbmOptionElements.inputLinkBatchMinWidth.value =
      stored.linkBatchMinWidth ?? 24;
  }
  if (tbmOptionElements.inputLinkBatchMinHeight) {
    tbmOptionElements.inputLinkBatchMinHeight.value =
      stored.linkBatchMinHeight ?? 16;
  }
  if (typeof tbmUpdateLinkBatchPreview === "function") {
    tbmUpdateLinkBatchPreview();
  }

  tbmStsSiteBoxOrderMapDraft = tbmCloneStsSiteBoxOrderMap(stored.stsSiteBoxOrderMap);
  if (tbmOptionElements.inputStsSiteName) {
    tbmOptionElements.inputStsSiteName.value = "";
  }
  if (tbmOptionElements.inputStsSiteHost) {
    tbmOptionElements.inputStsSiteHost.value = "";
  }
  if (tbmOptionElements.inputStsSiteOrder) {
    tbmOptionElements.inputStsSiteOrder.value = "";
  }
  tbmRenderStsSiteList();

  if (tbmOptionElements.checkboxGooglePageJump) {
    tbmOptionElements.checkboxGooglePageJump.checked = !!stored.enableGooglePageJump;
  }

  if (tbmOptionElements.checkboxGooglePjMouseBack) {
    tbmOptionElements.checkboxGooglePjMouseBack.checked = !!stored.googlePageJumpMouseBack;
  }

  if (tbmOptionElements.checkboxGooglePjMouseForward) {
    tbmOptionElements.checkboxGooglePjMouseForward.checked = !!stored.googlePageJumpMouseForward;
  }

  if (tbmOptionElements.googlePjKey) {
    tbmOptionElements.googlePjKey.value = stored.googlePageJumpForwardKey || "";
  }
  tbmSetModifierState(tbmOptionElements.googlePjCtrl, !!stored.googlePageJumpForwardCtrl);
  tbmSetModifierState(tbmOptionElements.googlePjAlt, !!stored.googlePageJumpForwardAlt);
  tbmSetModifierState(tbmOptionElements.googlePjShift, !!stored.googlePageJumpForwardShift);

  if (tbmOptionElements.googlePjBackKey) {
    tbmOptionElements.googlePjBackKey.value = stored.googlePageJumpBackKey || "";
  }
  tbmSetModifierState(tbmOptionElements.googlePjBackCtrl, !!stored.googlePageJumpBackCtrl);
  tbmSetModifierState(tbmOptionElements.googlePjBackAlt, !!stored.googlePageJumpBackAlt);
  tbmSetModifierState(tbmOptionElements.googlePjBackShift, !!stored.googlePageJumpBackShift);

  if (Array.isArray(tbmOptionElements.inputPageJumpModeList)) {
    tbmOptionElements.inputPageJumpModeList.forEach(radio => {
      radio.checked = radio.value === (stored.pageJumpMode || "auto");
    });
  }

  if (tbmOptionElements.inputPageJumpUrl1) {
    tbmOptionElements.inputPageJumpUrl1.value = "";
  }
  if (tbmOptionElements.inputPageJumpUrl2) {
    tbmOptionElements.inputPageJumpUrl2.value = "";
  }
  if (tbmOptionElements.inputPageJumpUrl3) {
    tbmOptionElements.inputPageJumpUrl3.value = "";
  }

  const storedRules = Array.isArray(stored.pageJumpRules)
    ? stored.pageJumpRules
    : [];

  tbmPageJumpRulesDraft = storedRules.map(rule => tbmNormalizePageJumpRule(rule));

  const firstRule = tbmPageJumpRulesDraft.length
    ? tbmNormalizePageJumpRule(tbmPageJumpRulesDraft[0])
    : tbmCreateEmptyPageJumpRule();

  tbmIsPageJumpEditing = false;
  tbmApplyPageJumpRuleToForm(firstRule);

  if (tbmOptionElements.textPageJumpAnalysis) {
    if (firstRule.host) {
      tbmOptionElements.textPageJumpAnalysis.textContent = tbmI18nText("pjAnalysisShowingSavedRule");
      tbmOptionElements.textPageJumpAnalysis.style.color = "#2e7d32";
    } else {
      tbmOptionElements.textPageJumpAnalysis.textContent = "";
      tbmOptionElements.textPageJumpAnalysis.style.color = "";
    }
  }

  tbmUpdateTabHistoryBackPreview();
  tbmUpdateTabHistoryForwardPreview();
  tbmUpdateLauncherPreview();
  tbmUpdateStsPreview();
  tbmUpdatePageJumpPreview();
  tbmUpdatePageJumpBackPreview();
  tbmUpdateGooglePageJumpPreview();
  tbmUpdateGooglePageJumpBackPreview();
  tbmRefreshLinkBatchMetaUi();
  tbmRefreshEnableUi();
  tbmRenderPageJumpRuleList();
  tbmApplyI18nToHtml();
}

function tbmCollectOptionsFromForm() {
  const currentRule = tbmBuildPageJumpRuleFromCurrentForm();
  const currentRuleKey = tbmBuildPageJumpRuleStorageKey(currentRule);

  const existingRules = Array.isArray(tbmPageJumpRulesDraft)
    ? tbmPageJumpRulesDraft.map(rule => tbmNormalizePageJumpRule(rule))
    : [];

  const existingMatchedRule = existingRules.find(rule => {
    return tbmBuildPageJumpRuleStorageKey(rule) === currentRuleKey;
  });

  const normalizedCurrentRule = tbmNormalizePageJumpRule({
    ...currentRule,
    enabled: existingMatchedRule
      ? !!existingMatchedRule.enabled
      : !!currentRule.enabled
  });

  const mergedPageJumpRules = [
    normalizedCurrentRule,
    ...existingRules.filter(rule => {
      return tbmBuildPageJumpRuleStorageKey(rule) !== currentRuleKey;
    })
  ];

  return {
    enableTabControl: !!tbmOptionElements.enableTabControl.checked,
    enableTabSearch: !!tbmOptionElements.enableTabSearch.checked,
    enableSlashToSearch: !!tbmOptionElements.enableSlashToSearch.checked,
    enablePageJump: !!tbmOptionElements.enablePageJump?.checked,

    newTabPlacement: tbmOptionElements.selectNewTabPlacement.value,
    closeActivation: tbmOptionElements.selectCloseActivation.value,
    newTabOpenMode: tbmOptionElements.selectNewTabOpenMode.value,

    tabHistoryBackKey: tbmNormalizeShortcutKey(
      tbmOptionElements.inputTabHistoryBackKey?.value ?? "",
      { allowEmpty: true, fallback: "" }
    ),
    tabHistoryBackCtrl: !!tbmOptionElements.buttonTabHistoryBackCtrl?.classList.contains("tbm_active"),
    tabHistoryBackAlt: !!tbmOptionElements.buttonTabHistoryBackAlt?.classList.contains("tbm_active"),
    tabHistoryBackShift: !!tbmOptionElements.buttonTabHistoryBackShift?.classList.contains("tbm_active"),

    tabHistoryForwardKey: tbmNormalizeShortcutKey(
      tbmOptionElements.inputTabHistoryForwardKey?.value ?? "",
      { allowEmpty: true, fallback: "" }
    ),
    tabHistoryForwardCtrl: !!tbmOptionElements.buttonTabHistoryForwardCtrl?.classList.contains("tbm_active"),
    tabHistoryForwardAlt: !!tbmOptionElements.buttonTabHistoryForwardAlt?.classList.contains("tbm_active"),
    tabHistoryForwardShift: !!tbmOptionElements.buttonTabHistoryForwardShift?.classList.contains("tbm_active"),

    launcherKey: tbmNormalizeShortcutKey(
      tbmOptionElements.inputLauncherKey?.value ?? "",
      { allowEmpty: true, fallback: "" }
    ),
    launcherCtrl: !!tbmOptionElements.buttonLauncherCtrl?.classList.contains("tbm_active"),
    launcherAlt: !!tbmOptionElements.buttonLauncherAlt?.classList.contains("tbm_active"),
    launcherShift: !!tbmOptionElements.buttonLauncherShift?.classList.contains("tbm_active"),

    stsKey: tbmNormalizeShortcutKey(
      tbmOptionElements.inputStsKey?.value || "",
      { allowEmpty: true, fallback: "" }
    ),
    stsCtrl: !!tbmOptionElements.buttonStsCtrl?.classList.contains("tbm_active"),
    stsAlt: !!tbmOptionElements.buttonStsAlt?.classList.contains("tbm_active"),
    stsShift: !!tbmOptionElements.buttonStsShift?.classList.contains("tbm_active"),

    enableLinkBatchOpen: !!tbmOptionElements.enableLinkBatchOpen?.checked,
    linkBatchOpenKey: tbmNormalizeShortcutKey(
      tbmOptionElements.inputLinkBatchKey?.value ?? "",
      { allowEmpty: true, fallback: "" }
    ),
    linkBatchOpenCtrl: !!tbmOptionElements.buttonLinkBatchCtrl?.classList.contains("tbm_active"),
    linkBatchOpenAlt: !!tbmOptionElements.buttonLinkBatchAlt?.classList.contains("tbm_active"),
    linkBatchOpenShift: !!tbmOptionElements.buttonLinkBatchShift?.classList.contains("tbm_active"),
    linkBatchOverlayColor: String(tbmOptionElements.inputLinkBatchOverlayColor?.value || "#000000").trim() || "#000000",
    linkBatchOverlayOpacity: Math.min(
      1,
      Math.max(0, Number.parseFloat(tbmOptionElements.inputLinkBatchOverlayOpacity?.value || "0.55") || 0.55)
    ),
    linkBatchBorderColor: String(tbmOptionElements.inputLinkBatchBorderColor?.value || "#ff4db8").trim() || "#ff4db8",
    linkBatchCheckedColor: String(tbmOptionElements.inputLinkBatchCheckedColor?.value || "#00e676").trim() || "#00e676",
    linkBatchCheckboxPosition:
      String(tbmOptionElements.selectLinkBatchCheckboxPosition?.value || "top_right") || "top_right",
    linkBatchMinWidth: Math.max(
      0,
      Number.parseInt(String(tbmOptionElements.inputLinkBatchMinWidth?.value || "24"), 10) || 24
    ),
    linkBatchMinHeight: Math.max(
      0,
      Number.parseInt(String(tbmOptionElements.inputLinkBatchMinHeight?.value || "16"), 10) || 16
    ),

    stsSiteBoxOrderMap: tbmCloneStsSiteBoxOrderMap(tbmStsSiteBoxOrderMapDraft),

    pageJumpRules: mergedPageJumpRules,

    enableGooglePageJump: !!tbmOptionElements.checkboxGooglePageJump?.checked,

    googlePageJumpForwardKey: tbmNormalizeShortcutKey(
      tbmOptionElements.googlePjKey?.value || "",
      { allowEmpty: true, fallback: "" }
    ),
    googlePageJumpForwardCtrl: !!tbmOptionElements.googlePjCtrl?.classList.contains("tbm_active"),
    googlePageJumpForwardAlt: !!tbmOptionElements.googlePjAlt?.classList.contains("tbm_active"),
    googlePageJumpForwardShift: !!tbmOptionElements.googlePjShift?.classList.contains("tbm_active"),

    googlePageJumpBackKey: tbmNormalizeShortcutKey(
      tbmOptionElements.googlePjBackKey?.value || "",
      { allowEmpty: true, fallback: "" }
    ),
    googlePageJumpBackCtrl: !!tbmOptionElements.googlePjBackCtrl?.classList.contains("tbm_active"),
    googlePageJumpBackAlt: !!tbmOptionElements.googlePjBackAlt?.classList.contains("tbm_active"),
    googlePageJumpBackShift: !!tbmOptionElements.googlePjBackShift?.classList.contains("tbm_active"),

    googlePageJumpMouseBack: !!tbmOptionElements.checkboxGooglePjMouseBack?.checked,
    googlePageJumpMouseForward: !!tbmOptionElements.checkboxGooglePjMouseForward?.checked,

    pageJumpMode:
      tbmOptionElements.inputPageJumpModeList.find(radio => radio.checked)?.value || "auto"
  };
}

async function tbmSaveOptions() {
  const nextOptions = tbmCollectOptionsFromForm();
  const validationMessage = tbmValidateBeforeSave(nextOptions);

  if (validationMessage) {
    tbmSetStatus(validationMessage, "warn");
    return;
  }

  await chrome.storage.local.set(nextOptions);

  if (Array.isArray(nextOptions.pageJumpRules) && nextOptions.pageJumpRules.length) {
    tbmPageJumpRulesDraft = nextOptions.pageJumpRules.map(rule => {
      return tbmNormalizePageJumpRule(rule);
    });
  } else {
    tbmPageJumpRulesDraft = [];
  }

  tbmPageJumpDraftRule = null;
  tbmIsPageJumpEditing = false;
  tbmRenderPageJumpRuleList();
  tbmSetStatus(tbmI18nText("statusSaved"), "ok");
  tbmClearStatusLater(tbmI18nText("statusSaved"));
}

async function tbmResetOptions() {
  await chrome.storage.local.set(TBM_DEFAULT_OPTIONS);
  await tbmLoadOptions();

  tbmSetActivePanel("control");
  tbmSetStatus(tbmI18nText("statusReset"), "ok");
  tbmClearStatusLater(tbmI18nText("statusReset"));
}

function tbmSetBackupStatus(message, type = "") {
  const el = tbmOptionElements.backupStatus;
  if (!el) return;

  el.textContent = message || "";
  el.classList.remove("is-ok", "is-warn");

  if (type === "ok") {
    el.classList.add("is-ok");
  } else if (type === "warn") {
    el.classList.add("is-warn");
  }
}

function tbmBuildSafeExportOptions(source) {
  const raw = source && typeof source === "object" ? source : {};
  const merged = {
    ...TBM_DEFAULT_OPTIONS,
    ...raw
  };

  const normalizedMap = {};
  const rawMap = raw.stsSiteBoxOrderMap;

  if (rawMap && typeof rawMap === "object" && !Array.isArray(rawMap)) {
    for (const [host, entry] of Object.entries(rawMap)) {
      const normalized = tbmNormalizeStsSiteRule(host, entry);
      if (!normalized) continue;

      normalizedMap[normalized.host] = {
        siteName: normalized.siteName,
        order: normalized.order
      };
    }
  }

  const normalizedRules = Array.isArray(raw.pageJumpRules)
    ? raw.pageJumpRules.map(rule => tbmNormalizePageJumpRule(rule))
    : [];

return {
  ...merged,
  stsSiteBoxOrderMap: normalizedMap,
  pageJumpRules: normalizedRules
};
}

async function tbmExportOptionsToTextarea() {
  try {
    const stored = await chrome.storage.local.get(TBM_DEFAULT_OPTIONS);
    const safeOptions = tbmBuildSafeExportOptions(stored);
    const text = JSON.stringify(safeOptions, null, 2);

    if (tbmOptionElements.backupTextarea) {
      tbmOptionElements.backupTextarea.value = text;
      tbmOptionElements.backupTextarea.focus();
      tbmOptionElements.backupTextarea.select();
    }

    tbmSetBackupStatus(tbmI18nText("backupExportSuccess"), "ok");
  } catch (error) {
    console.error("[TBM] export options failed", error);
    tbmSetBackupStatus(tbmI18nText("backupExportFailed"), "warn");
  }
}

function tbmNormalizeImportedOptions(parsed) {
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("root must be object");
  }

  const rawMap = parsed.stsSiteBoxOrderMap;
  const normalizedMap = {};

  if (rawMap && typeof rawMap === "object" && !Array.isArray(rawMap)) {
    for (const [host, entry] of Object.entries(rawMap)) {
      const normalized = tbmNormalizeStsSiteRule(host, entry);
      if (!normalized) continue;

      normalizedMap[normalized.host] = {
        siteName: normalized.siteName,
        order: normalized.order
      };
    }
  }

  const normalizedRules = Array.isArray(parsed.pageJumpRules)
    ? parsed.pageJumpRules.map(rule => tbmNormalizePageJumpRule(rule))
    : [];

  const nextOptions = {
    enableTabControl:
      parsed.enableTabControl !== undefined
        ? !!parsed.enableTabControl
        : TBM_DEFAULT_OPTIONS.enableTabControl,

    enableTabSearch:
      parsed.enableTabSearch !== undefined
        ? !!parsed.enableTabSearch
        : TBM_DEFAULT_OPTIONS.enableTabSearch,

    enableSlashToSearch:
      parsed.enableSlashToSearch !== undefined
        ? !!parsed.enableSlashToSearch
        : TBM_DEFAULT_OPTIONS.enableSlashToSearch,

    enablePageJump:
      parsed.enablePageJump !== undefined
        ? !!parsed.enablePageJump
        : TBM_DEFAULT_OPTIONS.enablePageJump,

    newTabPlacement:
      String(parsed.newTabPlacement || TBM_DEFAULT_OPTIONS.newTabPlacement),

    closeActivation:
      String(parsed.closeActivation || TBM_DEFAULT_OPTIONS.closeActivation),

    newTabOpenMode:
      String(parsed.newTabOpenMode || TBM_DEFAULT_OPTIONS.newTabOpenMode),

    tabHistoryBackKey: tbmNormalizeShortcutKey(
      parsed.tabHistoryBackKey ?? TBM_DEFAULT_OPTIONS.tabHistoryBackKey,
      { allowEmpty: true, fallback: "" }
    ),
    tabHistoryBackCtrl: !!parsed.tabHistoryBackCtrl,
    tabHistoryBackAlt:
      parsed.tabHistoryBackAlt !== undefined
        ? !!parsed.tabHistoryBackAlt
        : TBM_DEFAULT_OPTIONS.tabHistoryBackAlt,
    tabHistoryBackShift: !!parsed.tabHistoryBackShift,

    tabHistoryForwardKey: tbmNormalizeShortcutKey(
      parsed.tabHistoryForwardKey ?? TBM_DEFAULT_OPTIONS.tabHistoryForwardKey,
      { allowEmpty: true, fallback: "" }
    ),
    tabHistoryForwardCtrl: !!parsed.tabHistoryForwardCtrl,
    tabHistoryForwardAlt:
      parsed.tabHistoryForwardAlt !== undefined
        ? !!parsed.tabHistoryForwardAlt
        : TBM_DEFAULT_OPTIONS.tabHistoryForwardAlt,
    tabHistoryForwardShift: !!parsed.tabHistoryForwardShift,

    launcherKey: tbmNormalizeShortcutKey(
      parsed.launcherKey ?? TBM_DEFAULT_OPTIONS.launcherKey,
      { allowEmpty: true, fallback: "" }
    ),
    launcherCtrl: !!parsed.launcherCtrl,
    launcherAlt: !!parsed.launcherAlt,
    launcherShift: !!parsed.launcherShift,

    stsKey: tbmNormalizeShortcutKey(
      parsed.stsKey ?? TBM_DEFAULT_OPTIONS.stsKey,
      { allowEmpty: true, fallback: "" }
    ),
    stsCtrl: !!parsed.stsCtrl,
    stsAlt: !!parsed.stsAlt,
    stsShift: !!parsed.stsShift,

    enableLinkBatchOpen:
      parsed.enableLinkBatchOpen !== undefined
        ? !!parsed.enableLinkBatchOpen
        : TBM_DEFAULT_OPTIONS.enableLinkBatchOpen,

    linkBatchOpenKey: tbmNormalizeShortcutKey(
      parsed.linkBatchOpenKey ?? TBM_DEFAULT_OPTIONS.linkBatchOpenKey,
      { allowEmpty: true, fallback: "" }
    ),
    linkBatchOpenCtrl: !!parsed.linkBatchOpenCtrl,
    linkBatchOpenAlt: !!parsed.linkBatchOpenAlt,
    linkBatchOpenShift: !!parsed.linkBatchOpenShift,

    linkBatchOverlayColor:
      String(parsed.linkBatchOverlayColor || TBM_DEFAULT_OPTIONS.linkBatchOverlayColor),

    linkBatchOverlayOpacity:
      parsed.linkBatchOverlayOpacity !== undefined
        ? Math.min(1, Math.max(0, Number.parseFloat(parsed.linkBatchOverlayOpacity) || 0.55))
        : TBM_DEFAULT_OPTIONS.linkBatchOverlayOpacity,

    linkBatchBorderColor:
      String(parsed.linkBatchBorderColor || TBM_DEFAULT_OPTIONS.linkBatchBorderColor),

    linkBatchCheckedColor:
      String(parsed.linkBatchCheckedColor || TBM_DEFAULT_OPTIONS.linkBatchCheckedColor),

    linkBatchCheckboxPosition:
      String(parsed.linkBatchCheckboxPosition || TBM_DEFAULT_OPTIONS.linkBatchCheckboxPosition),

    linkBatchMinWidth:
      parsed.linkBatchMinWidth !== undefined
        ? Math.max(0, Number.parseInt(String(parsed.linkBatchMinWidth), 10) || 24)
        : TBM_DEFAULT_OPTIONS.linkBatchMinWidth,

    linkBatchMinHeight:
      parsed.linkBatchMinHeight !== undefined
        ? Math.max(0, Number.parseInt(String(parsed.linkBatchMinHeight), 10) || 16)
        : TBM_DEFAULT_OPTIONS.linkBatchMinHeight,

    stsSiteBoxOrderMap: normalizedMap,

    pageJumpRules: normalizedRules,

    enableGooglePageJump:
      parsed.enableGooglePageJump !== undefined
        ? !!parsed.enableGooglePageJump
        : TBM_DEFAULT_OPTIONS.enableGooglePageJump,

    googlePageJumpForwardKey: tbmNormalizeShortcutKey(
      parsed.googlePageJumpForwardKey ?? TBM_DEFAULT_OPTIONS.googlePageJumpForwardKey,
      { allowEmpty: true, fallback: "" }
    ),
    googlePageJumpForwardCtrl: !!parsed.googlePageJumpForwardCtrl,
    googlePageJumpForwardAlt: !!parsed.googlePageJumpForwardAlt,
    googlePageJumpForwardShift: !!parsed.googlePageJumpForwardShift,

    googlePageJumpBackKey: tbmNormalizeShortcutKey(
      parsed.googlePageJumpBackKey ?? TBM_DEFAULT_OPTIONS.googlePageJumpBackKey,
      { allowEmpty: true, fallback: "" }
    ),
    googlePageJumpBackCtrl: !!parsed.googlePageJumpBackCtrl,
    googlePageJumpBackAlt: !!parsed.googlePageJumpBackAlt,
    googlePageJumpBackShift: !!parsed.googlePageJumpBackShift,

    googlePageJumpMouseBack:
      parsed.googlePageJumpMouseBack !== undefined
        ? !!parsed.googlePageJumpMouseBack
        : TBM_DEFAULT_OPTIONS.googlePageJumpMouseBack,

    googlePageJumpMouseForward:
      parsed.googlePageJumpMouseForward !== undefined
        ? !!parsed.googlePageJumpMouseForward
        : TBM_DEFAULT_OPTIONS.googlePageJumpMouseForward,

    pageJumpMode:
      parsed.pageJumpMode === "manual" ? "manual" : "auto"
  };

  const validationMessage = tbmValidateBeforeSave(nextOptions);
  if (validationMessage) {
    throw new Error(validationMessage);
  }

  return nextOptions;
}

async function tbmImportOptionsFromTextarea() {
  try {
    const rawText = String(tbmOptionElements.backupTextarea?.value || "").trim();

    if (!rawText) {
      tbmSetBackupStatus(tbmI18nText("backupImportEmpty"), "warn");
      tbmOptionElements.backupTextarea?.focus();
      return;
    }

    let parsed = null;
    try {
      parsed = JSON.parse(rawText);
    } catch (error) {
      tbmSetBackupStatus(tbmI18nText("backupImportInvalidJson"), "warn");
      tbmOptionElements.backupTextarea?.focus();
      return;
    }

    const nextOptions = tbmNormalizeImportedOptions(parsed);

    await chrome.storage.local.set(nextOptions);
    await tbmLoadOptions();
    tbmSetActivePanel("about");
    tbmSetBackupStatus(tbmI18nText("backupImportSuccess"), "ok");
  } catch (error) {
    console.error("[TBM] import options failed", error);
    tbmSetBackupStatus(error?.message || tbmI18nText("backupImportFailed"), "warn");
  }
}

function tbmSetupExtensionIdEvents() {
  if (tbmOptionElements.extensionIdInput) {
    tbmOptionElements.extensionIdInput.value = chrome.runtime.id || "";
  }

  tbmOptionElements.copyExtensionIdButton?.addEventListener("click", async () => {
    const extensionId = chrome.runtime.id || "";
    if (!extensionId) return;

    try {
      await navigator.clipboard.writeText(extensionId);
      if (tbmOptionElements.extensionIdCopyStatus) {
        tbmOptionElements.extensionIdCopyStatus.textContent = tbmI18nText("statusCopiedExtensionId");
        window.setTimeout(() => {
          if (tbmOptionElements.extensionIdCopyStatus) {
            tbmOptionElements.extensionIdCopyStatus.textContent = "";
          }
        }, 1600);
      }
    } catch (error) {
      if (tbmOptionElements.extensionIdInput) {
        tbmOptionElements.extensionIdInput.focus();
        tbmOptionElements.extensionIdInput.select();
      }
    }
  });
}

function tbmSetupBackupEvents() {
  tbmOptionElements.backupExportButton?.addEventListener("click", () => {
    tbmExportOptionsToTextarea();
  });

  tbmOptionElements.backupImportButton?.addEventListener("click", () => {
    tbmImportOptionsFromTextarea();
  });

  tbmBindAsciiFocus(tbmOptionElements.backupTextarea);
}

function tbmSetupPanelTabs() {
  tbmOptionElements.tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      tbmSetActivePanel(button.dataset.panel || "control");
    });
  });
}

function tbmSetupEnableCheckboxes() {
  [
    tbmOptionElements.enableTabControl,
    tbmOptionElements.enableTabSearch,
    tbmOptionElements.enableLinkBatchOpen,
    tbmOptionElements.enableSlashToSearch,
    tbmOptionElements.enablePageJump
  ].forEach(checkbox => {
    checkbox?.addEventListener("change", () => {
      tbmRefreshEnableUi();
    });
  });

  tbmOptionElements.inputPageJumpModeList.forEach(radio => {
    radio.addEventListener("change", () => {
      tbmRefreshEnableUi();
    });
  });
}

function tbmSetupLinkBatchMetaInputs() {
  const updateAll = () => {
    tbmRefreshLinkBatchMetaUi();
    if (typeof tbmUpdateLinkBatchPreview === "function") {
      tbmUpdateLinkBatchPreview();
    }
  };

  tbmOptionElements.inputLinkBatchOverlayColor?.addEventListener("input", () => {
    const normalized = tbmNormalizeLinkBatchHexColor(
      tbmOptionElements.inputLinkBatchOverlayColor.value,
      TBM_DEFAULT_OPTIONS.linkBatchOverlayColor
    );
    tbmOptionElements.inputLinkBatchOverlayColor.value = normalized;
    updateAll();
  });

  tbmOptionElements.inputLinkBatchOverlayColorPicker?.addEventListener("input", () => {
    tbmOptionElements.inputLinkBatchOverlayColor.value =
      tbmOptionElements.inputLinkBatchOverlayColorPicker.value;
    updateAll();
  });

  tbmOptionElements.inputLinkBatchOverlayOpacity?.addEventListener("input", () => {
    updateAll();
  });

  tbmOptionElements.inputLinkBatchOverlayOpacity?.addEventListener("blur", () => {
    tbmOptionElements.inputLinkBatchOverlayOpacity.value =
      tbmFormatLinkBatchOpacityText(tbmOptionElements.inputLinkBatchOverlayOpacity.value);
    updateAll();
  });

  tbmOptionElements.inputLinkBatchOverlayOpacityRange?.addEventListener("input", () => {
    const rangeValue = Number.parseInt(
      String(tbmOptionElements.inputLinkBatchOverlayOpacityRange.value || "55"),
      10
    );

    const clampedPercent = Number.isFinite(rangeValue)
      ? Math.min(100, Math.max(0, rangeValue))
      : 55;

    tbmOptionElements.inputLinkBatchOverlayOpacity.value =
      tbmFormatLinkBatchOpacityText(clampedPercent / 100);

    updateAll();
  });

  tbmOptionElements.inputLinkBatchBorderColor?.addEventListener("input", () => {
    const normalized = tbmNormalizeLinkBatchHexColor(
      tbmOptionElements.inputLinkBatchBorderColor.value,
      TBM_DEFAULT_OPTIONS.linkBatchBorderColor
    );
    tbmOptionElements.inputLinkBatchBorderColor.value = normalized;
    updateAll();
  });

  tbmOptionElements.inputLinkBatchBorderColorPicker?.addEventListener("input", () => {
    tbmOptionElements.inputLinkBatchBorderColor.value =
      tbmOptionElements.inputLinkBatchBorderColorPicker.value;
    updateAll();
  });

  tbmOptionElements.inputLinkBatchCheckedColor?.addEventListener("input", () => {
    const normalized = tbmNormalizeLinkBatchHexColor(
      tbmOptionElements.inputLinkBatchCheckedColor.value,
      TBM_DEFAULT_OPTIONS.linkBatchCheckedColor
    );
    tbmOptionElements.inputLinkBatchCheckedColor.value = normalized;
    updateAll();
  });

  tbmOptionElements.inputLinkBatchCheckedColorPicker?.addEventListener("input", () => {
    tbmOptionElements.inputLinkBatchCheckedColor.value =
      tbmOptionElements.inputLinkBatchCheckedColorPicker.value;
    updateAll();
  });

  [
    tbmOptionElements.selectLinkBatchCheckboxPosition,
    tbmOptionElements.inputLinkBatchMinWidth,
    tbmOptionElements.inputLinkBatchMinHeight
  ].forEach(input => {
    input?.addEventListener("input", updateAll);
  });

  updateAll();
}


function tbmSetupCapturedShortcut(inputElement, ctrlButton, altButton, shiftButton, previewUpdater, fallbackKey, clearButton = null) {
  ctrlButton?.addEventListener("click", () => {
    tbmToggleModifierButton(ctrlButton, previewUpdater);
  });

  altButton?.addEventListener("click", () => {
    tbmToggleModifierButton(altButton, previewUpdater);
  });

  shiftButton?.addEventListener("click", () => {
    tbmToggleModifierButton(shiftButton, previewUpdater);
  });

  inputElement?.addEventListener("focus", () => {
    try {
      inputElement.setAttribute("lang", "en");
      inputElement.setAttribute("autocapitalize", "off");
      inputElement.setAttribute("autocorrect", "off");
      inputElement.setAttribute("inputmode", "none");
    } catch (e) {}

    inputElement.select();
    previewUpdater();
  });

  inputElement?.addEventListener("keydown", event => {
    event.preventDefault();
    event.stopPropagation();

    const capturedKey = tbmKeyFromKeyboardEvent(event);
    if (!capturedKey) {
      return;
    }

    inputElement.value = capturedKey === " " ? " " : capturedKey;
    previewUpdater();
  });

  inputElement?.addEventListener("click", () => {
    inputElement.select();
  });

  inputElement?.addEventListener("blur", () => {
    inputElement.value = tbmNormalizeShortcutKey(
      inputElement.value ?? "",
      { allowEmpty: true, fallback: "" }
    );
    previewUpdater();
  });

  clearButton?.addEventListener("click", () => {
    if (inputElement) {
      inputElement.value = "";
    }
    previewUpdater();
  });
}

function tbmSetupTabHistoryEvents() {
  tbmSetupCapturedShortcut(
    tbmOptionElements.inputTabHistoryBackKey,
    tbmOptionElements.buttonTabHistoryBackCtrl,
    tbmOptionElements.buttonTabHistoryBackAlt,
    tbmOptionElements.buttonTabHistoryBackShift,
    tbmUpdateTabHistoryBackPreview,
    "q",
    tbmOptionElements.buttonTabHistoryBackClear
  );

  tbmSetupCapturedShortcut(
    tbmOptionElements.inputTabHistoryForwardKey,
    tbmOptionElements.buttonTabHistoryForwardCtrl,
    tbmOptionElements.buttonTabHistoryForwardAlt,
    tbmOptionElements.buttonTabHistoryForwardShift,
    tbmUpdateTabHistoryForwardPreview,
    "w",
    tbmOptionElements.buttonTabHistoryForwardClear
  );
}

function tbmSetupLauncherEvents() {
  tbmOptionElements.buttonLauncherCtrl?.addEventListener("click", () => {
    tbmToggleModifierButton(tbmOptionElements.buttonLauncherCtrl, tbmUpdateLauncherPreview);
  });

  tbmOptionElements.buttonLauncherAlt?.addEventListener("click", () => {
    tbmToggleModifierButton(tbmOptionElements.buttonLauncherAlt, tbmUpdateLauncherPreview);
  });

  tbmOptionElements.buttonLauncherShift?.addEventListener("click", () => {
    tbmToggleModifierButton(tbmOptionElements.buttonLauncherShift, tbmUpdateLauncherPreview);
  });

  tbmOptionElements.inputLauncherKey?.addEventListener("focus", () => {
    const el = tbmOptionElements.inputLauncherKey;

    try {
      el.setAttribute("lang", "en");
      el.setAttribute("autocapitalize", "off");
      el.setAttribute("autocorrect", "off");
      el.setAttribute("inputmode", "none");
    } catch (e) {}

    el.select();
    tbmUpdateLauncherPreview();
  });

  tbmOptionElements.inputLauncherKey?.addEventListener("keydown", event => {
    event.preventDefault();
    event.stopPropagation();

    const capturedKey = tbmKeyFromKeyboardEvent(event);
    const isSpace = capturedKey === " ";

    const ctrlOn = !!tbmOptionElements.buttonLauncherCtrl?.classList.contains("tbm_active");
    const altOn = !!tbmOptionElements.buttonLauncherAlt?.classList.contains("tbm_active");
    const shiftOn = !!tbmOptionElements.buttonLauncherShift?.classList.contains("tbm_active");

    if (!capturedKey) {
      tbmShowPreviewMessage(
        tbmOptionElements.launcherPreview,
        tbmUpdateLauncherPreview,
        "Not supported",
        "#d93025",
        1200
      );
      return;
    }

    if (isSpace && ctrlOn && !altOn && !shiftOn) {
      tbmShowPreviewMessage(
        tbmOptionElements.launcherPreview,
        tbmUpdateLauncherPreview,
        "Not supported",
        "#d93025",
        1200
      );
      return;
    }

    if (isSpace && altOn && !ctrlOn && !shiftOn) {
      tbmShowPreviewMessage(
        tbmOptionElements.launcherPreview,
        tbmUpdateLauncherPreview,
        "Not supported",
        "#d93025",
        1200
      );
      return;
    }

    tbmOptionElements.inputLauncherKey.value = isSpace ? " " : capturedKey;
    tbmUpdateLauncherPreview();
  });

  tbmOptionElements.inputLauncherKey?.addEventListener("click", () => {
    tbmOptionElements.inputLauncherKey.select();
  });

  tbmOptionElements.inputLauncherKey?.addEventListener("blur", () => {
    tbmOptionElements.inputLauncherKey.value = tbmNormalizeShortcutKey(
      tbmOptionElements.inputLauncherKey.value ?? "",
      { allowEmpty: true, fallback: "" }
    );
    tbmUpdateLauncherPreview();
  });

  tbmOptionElements.buttonLauncherClear?.addEventListener("click", () => {
    if (tbmOptionElements.inputLauncherKey) {
      tbmOptionElements.inputLauncherKey.value = "";
    }
    tbmUpdateLauncherPreview();
  });
}

function tbmSetupStsEvents() {
  tbmOptionElements.buttonStsCtrl?.addEventListener("click", () => {
    tbmToggleModifierButton(tbmOptionElements.buttonStsCtrl, tbmUpdateStsPreview);
  });

  tbmOptionElements.buttonStsAlt?.addEventListener("click", () => {
    tbmToggleModifierButton(tbmOptionElements.buttonStsAlt, tbmUpdateStsPreview);
  });

  tbmOptionElements.buttonStsShift?.addEventListener("click", () => {
    tbmToggleModifierButton(tbmOptionElements.buttonStsShift, tbmUpdateStsPreview);
  });

  tbmOptionElements.inputStsKey?.addEventListener("focus", () => {
    const el = tbmOptionElements.inputStsKey;

    try {
      el.setAttribute("lang", "en");
      el.setAttribute("autocapitalize", "off");
      el.setAttribute("autocorrect", "off");
      el.setAttribute("inputmode", "none");
    } catch (e) {}

    el.select();
    tbmUpdateStsPreview();
  });

  tbmOptionElements.inputStsKey?.addEventListener("keydown", event => {
    event.preventDefault();
    event.stopPropagation();

    const capturedKey = tbmKeyFromKeyboardEvent(event);

    if (!capturedKey) {
      tbmShowPreviewMessage(
        tbmOptionElements.stsPreview,
        tbmUpdateStsPreview,
        "Not supported",
        "#d93025",
        1200
      );
      return;
    }

    tbmOptionElements.inputStsKey.value = capturedKey === " " ? " " : capturedKey;
    tbmUpdateStsPreview();
  });

  tbmOptionElements.inputStsKey?.addEventListener("click", () => {
    tbmOptionElements.inputStsKey.select();
  });

  tbmOptionElements.inputStsKey?.addEventListener("blur", () => {
    tbmOptionElements.inputStsKey.value = tbmNormalizeShortcutKey(
      tbmOptionElements.inputStsKey.value || "",
      { allowEmpty: true, fallback: "" }
    );
    tbmUpdateStsPreview();
  });

  tbmOptionElements.inputStsKey?.addEventListener("dblclick", () => {
    tbmOptionElements.inputStsKey.value = "";
    tbmUpdateStsPreview();
  });

  tbmOptionElements.buttonStsClear?.addEventListener("click", () => {
    if (tbmOptionElements.inputStsKey) {
      tbmOptionElements.inputStsKey.value = "";
    }
    tbmUpdateStsPreview();
  });
  tbmOptionElements.buttonStsSiteAdd?.addEventListener("click", () => {
    const siteName = tbmNormalizeStsSiteName(
      tbmOptionElements.inputStsSiteName?.value || ""
    );
    const host = tbmNormalizeHostForStsSiteRule(
      tbmOptionElements.inputStsSiteHost?.value || ""
    );
    const order = tbmNormalizeStsSiteBoxOrderValue(
      tbmOptionElements.inputStsSiteOrder?.value || "1"
    );

    if (!host) {
      tbmSetStatus("ホスト名を入力してください。", "warn");
      tbmClearStatusLater("ホスト名を入力してください。", 1600);
      tbmOptionElements.inputStsSiteHost?.focus();
      return;
    }

    tbmStsSiteBoxOrderMapDraft[host] = {
      siteName,
      order
    };
    tbmRenderStsSiteList();

    if (tbmOptionElements.inputStsSiteName) {
      tbmOptionElements.inputStsSiteName.value = "";
    }
    if (tbmOptionElements.inputStsSiteHost) {
      tbmOptionElements.inputStsSiteHost.value = "";
    }
    if (tbmOptionElements.inputStsSiteOrder) {
      tbmOptionElements.inputStsSiteOrder.value = "";
    }

    tbmSetStatus("サイト別設定を追加しました。", "ok");
    tbmClearStatusLater("サイト別設定を追加しました。", 1200);
    tbmOptionElements.inputStsSiteHost?.focus();
  });

  tbmOptionElements.inputStsSiteName?.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      tbmOptionElements.buttonStsSiteAdd?.click();
    }
  });

  tbmOptionElements.inputStsSiteOrder?.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      tbmOptionElements.buttonStsSiteAdd?.click();
    }
  });

  tbmOptionElements.inputStsSiteHost?.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      tbmOptionElements.buttonStsSiteAdd?.click();
    }
  });
}

function tbmSetupPageJumpEvents() {
  function tbmNormalizePageJumpHostForOptions(value) {
    return tbmNormalizePageJumpHostForRule(value);
  }

  function tbmParsePageJumpUrl(value) {
    const raw = String(value || "").trim();
    if (!raw) return null;

    try {
      return new URL(raw);
    } catch (error) {
      return null;
    }
  }

  function tbmSetPageJumpAnalysisText(message, type = "") {
    if (!tbmOptionElements.textPageJumpAnalysis) return;

    tbmOptionElements.textPageJumpAnalysis.textContent = message || "";

    if (type === "ok") {
      tbmOptionElements.textPageJumpAnalysis.style.color = "#2e7d32";
      return;
    }

    if (type === "warn") {
      tbmOptionElements.textPageJumpAnalysis.style.color = "#b42318";
      return;
    }

    tbmOptionElements.textPageJumpAnalysis.style.color = "#555";
  }

  function tbmGetCommonPathPrefix(paths) {
    const normalized = paths.map(path => tbmNormalizePageJumpPathPrefix(path));
    if (!normalized.length) return "/";

    const splitLists = normalized.map(path => path.split("/").filter(Boolean));
    const first = splitLists[0];
    const common = [];

    for (let i = 0; i < first.length; i++) {
      const piece = first[i];
      if (splitLists.every(list => list[i] === piece)) {
        common.push(piece);
      } else {
        break;
      }
    }

    return common.length ? "/" + common.join("/") : "/";
  }

  function tbmAnalyzeQueryMode(url1, url2, url3, host) {
    const allParamNames = new Set([
      ...Array.from(url1.searchParams.keys()),
      ...Array.from(url2.searchParams.keys()),
      ...Array.from(url3.searchParams.keys())
    ]);

    let detectedPageParam = "";
    let detectedStep = "";
    let detectedFirstPageValue = "1";
    let detectedFirstPageOmit = false;

    for (const paramName of allParamNames) {
      const raw1 = url1.searchParams.get(paramName);
      const raw2 = url2.searchParams.get(paramName);
      const raw3 = url3.searchParams.get(paramName);

      const has1 = url1.searchParams.has(paramName);
      const has2 = url2.searchParams.has(paramName);
      const has3 = url3.searchParams.has(paramName);

      if (!has2 || !has3) {
        continue;
      }

      const n2 = Number.parseInt(raw2 || "", 10);
      const n3 = Number.parseInt(raw3 || "", 10);

      if (!Number.isFinite(n2) || !Number.isFinite(n3)) {
        continue;
      }

      if ((n3 - n2) <= 0) {
        continue;
      }

      if (!has1) {
        detectedPageParam = paramName;
        detectedStep = String(n3 - n2);
        detectedFirstPageValue = String(n2 - (n3 - n2));
        detectedFirstPageOmit = true;
        break;
      }

      const n1 = Number.parseInt(raw1 || "", 10);
      if (!Number.isFinite(n1)) {
        continue;
      }

      if ((n2 - n1) !== (n3 - n2)) {
        continue;
      }

      detectedPageParam = paramName;
      detectedStep = String(n2 - n1);
      detectedFirstPageValue = String(n1);
      detectedFirstPageOmit = false;
      break;
    }

    if (!detectedPageParam) {
      return null;
    }

    const keepParams = Array.from(allParamNames).filter(paramName => {
      if (paramName === detectedPageParam) {
        return false;
      }

      const v1 = url1.searchParams.get(paramName);
      const v2 = url2.searchParams.get(paramName);
      const v3 = url3.searchParams.get(paramName);

      return v1 === v2 && v2 === v3 && (v1 !== null || v2 !== null || v3 !== null);
    });

    return tbmNormalizePageJumpRule({
      host,
      pathPrefix: tbmGetCommonPathPrefix([url1.pathname, url2.pathname, url3.pathname]),
      mode: "query",

      pageParam: detectedPageParam,
      pageStep: detectedStep,
      firstPageValue: detectedFirstPageValue,
      firstPageOmit: detectedFirstPageOmit,
      keepParams,

      pathTemplate: "",

      forwardKey: tbmOptionElements.pjKey?.value || "",
      forwardCtrl: !!tbmOptionElements.pjCtrl?.classList.contains("tbm_active"),
      forwardAlt: !!tbmOptionElements.pjAlt?.classList.contains("tbm_active"),
      forwardShift: !!tbmOptionElements.pjShift?.classList.contains("tbm_active"),
      forwardMouse: !!tbmOptionElements.checkboxPageJumpMouseForward?.checked,

      backKey: tbmOptionElements.pjBackKey?.value || "",
      backCtrl: !!tbmOptionElements.pjBackCtrl?.classList.contains("tbm_active"),
      backAlt: !!tbmOptionElements.pjBackAlt?.classList.contains("tbm_active"),
      backShift: !!tbmOptionElements.pjBackShift?.classList.contains("tbm_active"),
      backMouse: !!tbmOptionElements.checkboxPageJumpMouseBack?.checked,

      enabled: true
    });
  }

function tbmAnalyzePathMode(url1, url2, url3, host) {
  const path1 = tbmNormalizePageJumpPathPrefix(url1.pathname);
  const path2 = tbmNormalizePageJumpPathPrefix(url2.pathname);
  const path3 = tbmNormalizePageJumpPathPrefix(url3.pathname);

  const segs1 = path1.split("/").filter(Boolean);
  const segs2 = path2.split("/").filter(Boolean);
  const segs3 = path3.split("/").filter(Boolean);

  let templateBaseSegs = null;
  let changingIndex = -1;
  let firstPageValue = null;
  let step = null;
  let pageNumberPadding = 0;
  let firstPagePath = path1;

  if (segs1.length === segs2.length && segs2.length === segs3.length) {
    templateBaseSegs = [...segs1];

    let n1 = null;
    let n2 = null;
    let n3 = null;

    for (let i = 0; i < segs1.length; i++) {
      const a = segs1[i];
      const b = segs2[i];
      const c = segs3[i];

      if (a === b && b === c) {
        continue;
      }

      const pa = Number.parseInt(a, 10);
      const pb = Number.parseInt(b, 10);
      const pc = Number.parseInt(c, 10);

      if (
        !Number.isFinite(pa) ||
        !Number.isFinite(pb) ||
        !Number.isFinite(pc) ||
        (pb - pa) <= 0 ||
        (pc - pb) !== (pb - pa)
      ) {
        return null;
      }

      if (changingIndex !== -1) {
        return null;
      }

      changingIndex = i;
      n1 = pa;
      n2 = pb;
      n3 = pc;

      if (/^\d+$/.test(a) && /^\d+$/.test(b) && /^\d+$/.test(c)) {
        if (a.length > 1 && a.startsWith("0")) {
          pageNumberPadding = Math.max(pageNumberPadding, a.length);
        }
        if (b.length > 1 && b.startsWith("0")) {
          pageNumberPadding = Math.max(pageNumberPadding, b.length);
        }
        if (c.length > 1 && c.startsWith("0")) {
          pageNumberPadding = Math.max(pageNumberPadding, c.length);
        }
      }
    }

    if (changingIndex === -1) {
      return null;
    }

    step = n2 - n1;
    firstPageValue = n1;
  } else if (
    segs2.length === segs3.length &&
    segs1.length < segs2.length
  ) {
    let detected = null;

    for (let i = 0; i < segs2.length; i++) {
      const b = segs2[i];
      const c = segs3[i];

      if (b === c) {
        continue;
      }

      const pb = Number.parseInt(b, 10);
      const pc = Number.parseInt(c, 10);

      if (
        !Number.isFinite(pb) ||
        !Number.isFinite(pc) ||
        (pc - pb) <= 0
      ) {
        return null;
      }

      if (detected) {
        return null;
      }

      detected = {
        index: i,
        n2: pb,
        n3: pc
      };

      if (/^\d+$/.test(b) && /^\d+$/.test(c)) {
        if (b.length > 1 && b.startsWith("0")) {
          pageNumberPadding = Math.max(pageNumberPadding, b.length);
        }
        if (c.length > 1 && c.startsWith("0")) {
          pageNumberPadding = Math.max(pageNumberPadding, c.length);
        }
      }
    }

    if (!detected) {
      return null;
    }

    changingIndex = detected.index;
    step = detected.n3 - detected.n2;
    firstPageValue = detected.n2 - step;

    if (!Number.isFinite(firstPageValue) || firstPageValue <= 0) {
      return null;
    }

    if (pageNumberPadding === 0 && /^\d+$/.test(segs2[changingIndex] || "")) {
      const sample = segs2[changingIndex];
      if (sample.length > 1 && sample.startsWith("0")) {
        pageNumberPadding = sample.length;
      }
    }

// --- 末尾 page/{n} 専用パターン ---
if (
  segs2.length >= 2 &&
  segs3.length >= 2 &&
  segs2[segs2.length - 2] === "page" &&
  segs3[segs3.length - 2] === "page"
) {
  const n2 = Number.parseInt(segs2[segs2.length - 1], 10);
  const n3 = Number.parseInt(segs3[segs3.length - 1], 10);

  if (
    Number.isFinite(n2) &&
    Number.isFinite(n3) &&
    n3 > n2
  ) {
    const expected = segs2.slice(0, -2); // page/{n}除去

    if (expected.join("/") === segs1.join("/")) {
      templateBaseSegs = [...segs2];
      changingIndex = segs2.length - 1;
      step = n3 - n2;
      firstPageValue = n2 - step;

      if (!Number.isFinite(firstPageValue) || firstPageValue <= 0) {
        return null;
      }

      // padding
      const sample = segs2[changingIndex];
      if (/^\d+$/.test(sample) && sample.length > 1 && sample.startsWith("0")) {
        pageNumberPadding = sample.length;
      }

    } else {
      return null;
    }
  } else {
    return null;
  }

} else {
  return null;
}
  } else {
    return null;
  }

  if (!Number.isFinite(step) || step <= 0) {
    return null;
  }

  if (!templateBaseSegs || changingIndex < 0) {
    return null;
  }

  const templateSegs = [...templateBaseSegs];
  templateSegs[changingIndex] = "{n}";
  const pathTemplate = "/" + templateSegs.join("/");

  return tbmNormalizePageJumpRule({
    host,
    pathPrefix: tbmGetCommonPathPrefix([path1, path2, path3]),
    mode: "path",

    pageParam: "",
    pageStep: String(step),
    firstPageValue: String(firstPageValue),
    firstPageOmit: false,
    keepParams: [],

    pathTemplate,
    firstPagePath,
    pageNumberPadding: String(pageNumberPadding),

    offsetParam: "",
    offsetStep: "20",
    offsetFirstValue: "0",
    offsetKeepParams: [],

    forwardKey: tbmNormalizeShortcutKey(tbmOptionElements.pjKey?.value || "", {
      allowEmpty: true,
      fallback: ""
    }),
    forwardCtrl: !!tbmOptionElements.pjCtrl?.classList.contains("tbm_active"),
    forwardAlt: !!tbmOptionElements.pjAlt?.classList.contains("tbm_active"),
    forwardShift: !!tbmOptionElements.pjShift?.classList.contains("tbm_active"),
    forwardMouse: !!tbmOptionElements.checkboxPageJumpMouseForward?.checked,

    backKey: tbmNormalizeShortcutKey(tbmOptionElements.pjBackKey?.value || "", {
      allowEmpty: true,
      fallback: ""
    }),
    backCtrl: !!tbmOptionElements.pjBackCtrl?.classList.contains("tbm_active"),
    backAlt: !!tbmOptionElements.pjBackAlt?.classList.contains("tbm_active"),
    backShift: !!tbmOptionElements.pjBackShift?.classList.contains("tbm_active"),
    backMouse: !!tbmOptionElements.checkboxPageJumpMouseBack?.checked,

    enabled: true
  });
}

function tbmAnalyzeOffsetMode(url1, url2, url3, host) {
  const pathPrefix = tbmGetCommonPathPrefix([
    url1.pathname,
    url2.pathname,
    url3.pathname
  ]);

  const allParamNames = new Set([
    ...Array.from(url1.searchParams.keys()),
    ...Array.from(url2.searchParams.keys()),
    ...Array.from(url3.searchParams.keys())
  ]);

  let detectedOffsetParam = "";
  let detectedOffsetStep = "";
  let detectedOffsetFirstValue = "";

  for (const paramName of allParamNames) {
    const has1 = url1.searchParams.has(paramName);
    const has2 = url2.searchParams.has(paramName);
    const has3 = url3.searchParams.has(paramName);

    if (!has1 || !has2 || !has3) {
      continue;
    }

    const raw1 = url1.searchParams.get(paramName);
    const raw2 = url2.searchParams.get(paramName);
    const raw3 = url3.searchParams.get(paramName);

    const n1 = Number.parseInt(raw1 || "", 10);
    const n2 = Number.parseInt(raw2 || "", 10);
    const n3 = Number.parseInt(raw3 || "", 10);

    if (!Number.isFinite(n1) || !Number.isFinite(n2) || !Number.isFinite(n3)) {
      continue;
    }

    const diff1 = n2 - n1;
    const diff2 = n3 - n2;

    if (diff1 <= 1) {
      continue;
    }

    if (diff1 !== diff2) {
      continue;
    }

    detectedOffsetParam = paramName;
    detectedOffsetStep = String(diff1);
    detectedOffsetFirstValue = String(n1);
    break;
  }

  if (!detectedOffsetParam) {
    return null;
  }

  const offsetKeepParams = Array.from(allParamNames).filter(paramName => {
    if (paramName === detectedOffsetParam) {
      return false;
    }

    const v1 = url1.searchParams.get(paramName);
    const v2 = url2.searchParams.get(paramName);
    const v3 = url3.searchParams.get(paramName);

    return v1 === v2 && v2 === v3 && (v1 !== null || v2 !== null || v3 !== null);
  });

  return tbmNormalizePageJumpRule({
    host,
    pathPrefix,
    mode: "offset",

    offsetParam: detectedOffsetParam,
    offsetStep: detectedOffsetStep,
    offsetFirstValue: detectedOffsetFirstValue,
    offsetKeepParams,

    forwardKey: tbmNormalizeShortcutKey(tbmOptionElements.pjKey?.value || "", {
      allowEmpty: true,
      fallback: ""
    }),
    forwardCtrl: !!tbmOptionElements.pjCtrl?.classList.contains("tbm_active"),
    forwardAlt: !!tbmOptionElements.pjAlt?.classList.contains("tbm_active"),
    forwardShift: !!tbmOptionElements.pjShift?.classList.contains("tbm_active"),
    forwardMouse: !!tbmOptionElements.checkboxPageJumpMouseForward?.checked,

    backKey: tbmNormalizeShortcutKey(tbmOptionElements.pjBackKey?.value || "", {
      allowEmpty: true,
      fallback: ""
    }),
    backCtrl: !!tbmOptionElements.pjBackCtrl?.classList.contains("tbm_active"),
    backAlt: !!tbmOptionElements.pjBackAlt?.classList.contains("tbm_active"),
    backShift: !!tbmOptionElements.pjBackShift?.classList.contains("tbm_active"),
    backMouse: !!tbmOptionElements.checkboxPageJumpMouseBack?.checked,

    enabled: true
  });
}

  function tbmApplyPageJumpAnalysisResult(result) {
    if (!result) return;

    const enrichedRule = tbmNormalizePageJumpRule({
      ...result,
      sampleUrl1: String(tbmOptionElements.inputPageJumpUrl1?.value || "").trim(),
      sampleUrl2: String(tbmOptionElements.inputPageJumpUrl2?.value || "").trim(),
      sampleUrl3: String(tbmOptionElements.inputPageJumpUrl3?.value || "").trim()
    });

    tbmApplyPageJumpRuleToForm(enrichedRule);
  }

function tbmAnalyzePageJumpFromUrls() {
  const url1 = tbmParsePageJumpUrl(tbmOptionElements.inputPageJumpUrl1?.value || "");
  const url2 = tbmParsePageJumpUrl(tbmOptionElements.inputPageJumpUrl2?.value || "");
  const url3 = tbmParsePageJumpUrl(tbmOptionElements.inputPageJumpUrl3?.value || "");

  if (!url1 || !url2 || !url3) {
    return {
      ok: false,
      message: "1〜3ページ目URLをすべて正しい形式で入力してください。"
    };
  }

  const host1 = tbmNormalizePageJumpHostForOptions(url1.hostname);
  const host2 = tbmNormalizePageJumpHostForOptions(url2.hostname);
  const host3 = tbmNormalizePageJumpHostForOptions(url3.hostname);

  if (!host1 || host1 !== host2 || host2 !== host3) {
    return {
      ok: false,
      message: "3つのURLは同一ホストである必要があります。"
    };
  }

  const pathResult = tbmAnalyzePathMode(url1, url2, url3, host1);
  if (pathResult) {
    return {
      ok: true,
      message: "path型として解析しました。",
      result: pathResult
    };
  }

  const offsetResult = tbmAnalyzeOffsetMode(url1, url2, url3, host1);
  if (offsetResult) {
    return {
      ok: true,
      message: "offset型として解析しました。",
      result: offsetResult
    };
  }

  const queryResult = tbmAnalyzeQueryMode(url1, url2, url3, host1);
  if (queryResult) {
    return {
      ok: true,
      message: "query型として解析しました。",
      result: queryResult
    };
  }

  return {
    ok: false,
    message: "URL差分からページ送り規則を特定できませんでした。"
  };
}

  tbmOptionElements.pjCtrl?.addEventListener("click", () => {
    tbmToggleModifierButton(tbmOptionElements.pjCtrl, tbmUpdatePageJumpPreview);
  });

  tbmOptionElements.pjAlt?.addEventListener("click", () => {
    tbmToggleModifierButton(tbmOptionElements.pjAlt, tbmUpdatePageJumpPreview);
  });

  tbmOptionElements.pjShift?.addEventListener("click", () => {
    tbmToggleModifierButton(tbmOptionElements.pjShift, tbmUpdatePageJumpPreview);
  });

  tbmOptionElements.pjKey?.addEventListener("focus", () => {
    const el = tbmOptionElements.pjKey;

    try {
      el.setAttribute("lang", "en");
      el.setAttribute("autocapitalize", "off");
      el.setAttribute("autocorrect", "off");
      el.setAttribute("inputmode", "none");
    } catch (e) {}

    el.select();
    tbmUpdatePageJumpPreview();
  });

  tbmOptionElements.pjKey?.addEventListener("keydown", event => {
    event.preventDefault();
    event.stopPropagation();

    const capturedKey = tbmKeyFromKeyboardEvent(event);

    if (!capturedKey) {
      tbmShowPreviewMessage(
        tbmOptionElements.pjPreview,
        tbmUpdatePageJumpPreview,
        "Not supported",
        "#d93025",
        1200
      );
      return;
    }

    tbmOptionElements.pjKey.value = capturedKey === " " ? " " : capturedKey;
    tbmUpdatePageJumpPreview();
  });

  tbmOptionElements.pjKey?.addEventListener("click", () => {
    tbmOptionElements.pjKey.select();
  });

  tbmOptionElements.pjKey?.addEventListener("blur", () => {
    tbmOptionElements.pjKey.value = tbmNormalizeShortcutKey(
      tbmOptionElements.pjKey.value || "",
      { allowEmpty: true, fallback: "" }
    );
    tbmUpdatePageJumpPreview();
  });

  tbmOptionElements.pjKey?.addEventListener("dblclick", () => {
    tbmOptionElements.pjKey.value = "";
    tbmUpdatePageJumpPreview();
  });

  tbmOptionElements.pjClear?.addEventListener("click", () => {
    tbmClearShortcutInput(
      tbmOptionElements.pjKey,
      [
        tbmOptionElements.pjCtrl,
        tbmOptionElements.pjAlt,
        tbmOptionElements.pjShift
      ],
      tbmUpdatePageJumpPreview
    );
  });

  tbmOptionElements.pjBackCtrl?.addEventListener("click", () => {
    tbmToggleModifierButton(tbmOptionElements.pjBackCtrl, tbmUpdatePageJumpBackPreview);
  });

  tbmOptionElements.pjBackAlt?.addEventListener("click", () => {
    tbmToggleModifierButton(tbmOptionElements.pjBackAlt, tbmUpdatePageJumpBackPreview);
  });

  tbmOptionElements.pjBackShift?.addEventListener("click", () => {
    tbmToggleModifierButton(tbmOptionElements.pjBackShift, tbmUpdatePageJumpBackPreview);
  });

  tbmOptionElements.pjBackKey?.addEventListener("focus", () => {
    const el = tbmOptionElements.pjBackKey;

    try {
      el.setAttribute("lang", "en");
      el.setAttribute("autocapitalize", "off");
      el.setAttribute("autocorrect", "off");
      el.setAttribute("inputmode", "none");
    } catch (e) {}

    el.select();
    tbmUpdatePageJumpBackPreview();
  });

  tbmOptionElements.pjBackKey?.addEventListener("keydown", event => {
    event.preventDefault();
    event.stopPropagation();

    const capturedKey = tbmKeyFromKeyboardEvent(event);

    if (!capturedKey) {
      tbmShowPreviewMessage(
        tbmOptionElements.pjBackPreview,
        tbmUpdatePageJumpBackPreview,
        "Not supported",
        "#d93025",
        1200
      );
      return;
    }

    tbmOptionElements.pjBackKey.value = capturedKey === " " ? " " : capturedKey;
    tbmUpdatePageJumpBackPreview();
  });

  tbmOptionElements.pjBackKey?.addEventListener("click", () => {
    tbmOptionElements.pjBackKey.select();
  });

  tbmOptionElements.pjBackKey?.addEventListener("blur", () => {
    tbmOptionElements.pjBackKey.value = tbmNormalizeShortcutKey(
      tbmOptionElements.pjBackKey.value || "",
      { allowEmpty: true, fallback: "" }
    );
    tbmUpdatePageJumpBackPreview();
  });

  tbmOptionElements.pjBackKey?.addEventListener("dblclick", () => {
    tbmOptionElements.pjBackKey.value = "";
    tbmUpdatePageJumpBackPreview();
  });

  tbmOptionElements.pjBackClear?.addEventListener("click", () => {
    tbmClearShortcutInput(
      tbmOptionElements.pjBackKey,
      [
        tbmOptionElements.pjBackCtrl,
        tbmOptionElements.pjBackAlt,
        tbmOptionElements.pjBackShift
      ],
      tbmUpdatePageJumpBackPreview
    );
  });

  tbmOptionElements.buttonPageJumpAnalyze?.addEventListener("click", () => {
    const analyzed = tbmAnalyzePageJumpFromUrls();

    if (!analyzed.ok) {
      tbmSetPageJumpAnalysisText(analyzed.message, "warn");
      tbmSetStatus(analyzed.message, "warn");
      return;
    }

    tbmApplyPageJumpAnalysisResult(analyzed.result);
    tbmSetGroupEnabled(tbmOptionElements.groupPageJumpManual, true);

    if (tbmOptionElements.inputPageJumpUrl1) {
      tbmOptionElements.inputPageJumpUrl1.value = "";
    }
    if (tbmOptionElements.inputPageJumpUrl2) {
      tbmOptionElements.inputPageJumpUrl2.value = "";
    }
    if (tbmOptionElements.inputPageJumpUrl3) {
      tbmOptionElements.inputPageJumpUrl3.value = "";
    }

    tbmSetPageJumpAnalysisText(
      (analyzed.message || "URL解析しました。").replace("しました。", "し、") + "フォームへ反映しました。保存してください。",
      "ok"
    );
    tbmSetStatus("URL解析結果を反映しました。Save Settings を押してください。", "ok");
    tbmClearStatusLater("URL解析結果を反映しました。Save Settings を押してください。", 1800);
  });

  tbmOptionElements.inputPageJumpUrl1?.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      tbmOptionElements.buttonPageJumpAnalyze?.click();
    }
  });

  tbmOptionElements.inputPageJumpUrl2?.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      tbmOptionElements.buttonPageJumpAnalyze?.click();
    }
  });

  tbmOptionElements.inputPageJumpUrl3?.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      tbmOptionElements.buttonPageJumpAnalyze?.click();
    }
  });

  tbmBindAsciiFocus(tbmOptionElements.inputPageJumpUrl1);
  tbmBindAsciiFocus(tbmOptionElements.inputPageJumpUrl2);
  tbmBindAsciiFocus(tbmOptionElements.inputPageJumpUrl3);
  tbmBindAsciiFocus(tbmOptionElements.inputPageJumpHost);
  tbmBindAsciiFocus(tbmOptionElements.inputPageJumpPattern);
  tbmBindAsciiFocus(tbmOptionElements.inputPageJumpStep);
  tbmBindAsciiFocus(tbmOptionElements.inputStsSiteHost);
  tbmBindAsciiFocus(tbmOptionElements.inputStsSiteOrder);

  tbmOptionElements.googlePjCtrl?.addEventListener("click", () => {
    tbmToggleModifierButton(tbmOptionElements.googlePjCtrl, tbmUpdateGooglePageJumpPreview);
  });

  tbmOptionElements.googlePjAlt?.addEventListener("click", () => {
    tbmToggleModifierButton(tbmOptionElements.googlePjAlt, tbmUpdateGooglePageJumpPreview);
  });

  tbmOptionElements.googlePjShift?.addEventListener("click", () => {
    tbmToggleModifierButton(tbmOptionElements.googlePjShift, tbmUpdateGooglePageJumpPreview);
  });

  tbmOptionElements.googlePjKey?.addEventListener("focus", () => {
    const el = tbmOptionElements.googlePjKey;

    try {
      el.setAttribute("lang", "en");
      el.setAttribute("autocapitalize", "off");
      el.setAttribute("autocorrect", "off");
      el.setAttribute("inputmode", "none");
    } catch (e) {}

    el.select();
    tbmUpdateGooglePageJumpPreview();
  });

  tbmOptionElements.googlePjKey?.addEventListener("keydown", event => {
    event.preventDefault();
    event.stopPropagation();

    const capturedKey = tbmKeyFromKeyboardEvent(event);

    if (!capturedKey) {
      tbmShowPreviewMessage(
        tbmOptionElements.googlePjPreview,
        tbmUpdateGooglePageJumpPreview,
        "Not supported",
        "#d93025",
        1200
      );
      return;
    }

    tbmOptionElements.googlePjKey.value = capturedKey === " " ? " " : capturedKey;
    tbmUpdateGooglePageJumpPreview();
  });

  tbmOptionElements.googlePjKey?.addEventListener("click", () => {
    tbmOptionElements.googlePjKey.select();
  });

  tbmOptionElements.googlePjKey?.addEventListener("blur", () => {
    tbmOptionElements.googlePjKey.value = tbmNormalizeShortcutKey(
      tbmOptionElements.googlePjKey.value || "",
      { allowEmpty: true, fallback: "" }
    );
    tbmUpdateGooglePageJumpPreview();
  });

  tbmOptionElements.googlePjClear?.addEventListener("click", () => {
    tbmClearShortcutInput(
      tbmOptionElements.googlePjKey,
      [
        tbmOptionElements.googlePjCtrl,
        tbmOptionElements.googlePjAlt,
        tbmOptionElements.googlePjShift
      ],
      tbmUpdateGooglePageJumpPreview
    );
  });

  tbmOptionElements.googlePjBackCtrl?.addEventListener("click", () => {
    tbmToggleModifierButton(tbmOptionElements.googlePjBackCtrl, tbmUpdateGooglePageJumpBackPreview);
  });

  tbmOptionElements.googlePjBackAlt?.addEventListener("click", () => {
    tbmToggleModifierButton(tbmOptionElements.googlePjBackAlt, tbmUpdateGooglePageJumpBackPreview);
  });

  tbmOptionElements.googlePjBackShift?.addEventListener("click", () => {
    tbmToggleModifierButton(tbmOptionElements.googlePjBackShift, tbmUpdateGooglePageJumpBackPreview);
  });

  tbmOptionElements.googlePjBackKey?.addEventListener("focus", () => {
    const el = tbmOptionElements.googlePjBackKey;

    try {
      el.setAttribute("lang", "en");
      el.setAttribute("autocapitalize", "off");
      el.setAttribute("autocorrect", "off");
      el.setAttribute("inputmode", "none");
    } catch (e) {}

    el.select();
    tbmUpdateGooglePageJumpBackPreview();
  });

  tbmOptionElements.googlePjBackKey?.addEventListener("keydown", event => {
    event.preventDefault();
    event.stopPropagation();

    const capturedKey = tbmKeyFromKeyboardEvent(event);

    if (!capturedKey) {
      tbmShowPreviewMessage(
        tbmOptionElements.googlePjBackPreview,
        tbmUpdateGooglePageJumpBackPreview,
        "Not supported",
        "#d93025",
        1200
      );
      return;
    }

    tbmOptionElements.googlePjBackKey.value = capturedKey === " " ? " " : capturedKey;
    tbmUpdateGooglePageJumpBackPreview();
  });

  tbmOptionElements.googlePjBackKey?.addEventListener("click", () => {
    tbmOptionElements.googlePjBackKey.select();
  });

  tbmOptionElements.googlePjBackKey?.addEventListener("blur", () => {
    tbmOptionElements.googlePjBackKey.value = tbmNormalizeShortcutKey(
      tbmOptionElements.googlePjBackKey.value || "",
      { allowEmpty: true, fallback: "" }
    );
    tbmUpdateGooglePageJumpBackPreview();
  });

  tbmOptionElements.googlePjBackClear?.addEventListener("click", () => {
    tbmClearShortcutInput(
      tbmOptionElements.googlePjBackKey,
      [
        tbmOptionElements.googlePjBackCtrl,
        tbmOptionElements.googlePjBackAlt,
        tbmOptionElements.googlePjBackShift
      ],
      tbmUpdateGooglePageJumpBackPreview
    );
  });

}

async function tbmInitOptionsPage() {
  tbmApplyI18n();
  tbmApplyAboutVersion();
  tbmSetupPanelTabs();
  tbmSetupEnableCheckboxes();
  tbmSetupLinkBatchEvents();
  tbmSetupLinkBatchMetaInputs();
  tbmSetupTabHistoryEvents();
  tbmSetupLauncherEvents();
  tbmSetupStsEvents();
  tbmSetupPageJumpEvents();
  tbmSetupBackupEvents();
  tbmSetupExtensionIdEvents();

  await tbmLoadOptions();

  tbmOptionElements.saveButtons
    .filter(button => button.id !== "tbm_backup_import_button")
    .forEach(button => {
      button.addEventListener("click", tbmSaveOptions);
    });

  tbmOptionElements.resetButtons.forEach(button => {
    button.addEventListener("click", tbmResetOptions);
  });
}

tbmInitOptionsPage().catch(error => {
  console.error("[TBM] options init error", error);
});