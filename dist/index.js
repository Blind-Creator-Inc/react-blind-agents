"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  BlindAgentsWidget: () => BlindAgentsWidget
});
module.exports = __toCommonJS(src_exports);

// src/ReactBlindAgentsWidget.tsx
var import_react = require("react");
var CDN_DEFAULT = "https://cdn.blindagents.com/report.js";
function BlindAgentsWidget({
  apiKey,
  primaryColor,
  title,
  reportBtnText,
  btnEmoji,
  btnTooltip,
  emptyText,
  userWhatsapp,
  strategy = "afterInteractive",
  src = CDN_DEFAULT,
  onLoad,
  onError
}) {
  const injected = (0, import_react.useRef)(false);
  (0, import_react.useEffect)(() => {
    if (injected.current) return;
    injected.current = true;
    const existing = document.querySelector(
      `script[src="${src}"][data-ba-managed]`
    );
    if (existing) return;
    const el = document.createElement("script");
    el.src = src;
    el.setAttribute("data-ba-managed", "true");
    el.setAttribute("data-api-key", apiKey);
    if (primaryColor) el.setAttribute("data-primary-color", primaryColor);
    if (title) el.setAttribute("data-title", title);
    if (reportBtnText) el.setAttribute("data-report-btn-text", reportBtnText);
    if (btnEmoji) el.setAttribute("data-btn-emoji", btnEmoji);
    if (btnTooltip) el.setAttribute("data-btn-tooltip", btnTooltip);
    if (emptyText) el.setAttribute("data-empty-text", emptyText);
    if (userWhatsapp) el.setAttribute("data-user-whatsapp", userWhatsapp);
    if (onLoad) el.addEventListener("load", () => onLoad());
    if (onError) el.addEventListener("error", () => onError(new Error(`Failed to load ${src}`)));
    const inject = () => {
      if (strategy === "afterInteractive") el.defer = true;
      if (strategy === "lazyOnload") el.async = true;
      document.head.appendChild(el);
    };
    if (strategy === "lazyOnload" && typeof window !== "undefined" && "requestIdleCallback" in window) {
      window.requestIdleCallback(inject);
    } else {
      inject();
    }
    return () => {
      el.parentNode?.removeChild(el);
      injected.current = false;
    };
  }, [apiKey, src]);
  return null;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BlindAgentsWidget
});
//# sourceMappingURL=index.js.map