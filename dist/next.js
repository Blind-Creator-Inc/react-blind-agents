"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/next.ts
var next_exports = {};
__export(next_exports, {
  BlindAgents: () => BlindAgents,
  BlindAgentsWidget: () => BlindAgentsWidget
});
module.exports = __toCommonJS(next_exports);

// src/NextBlindAgents.tsx
var import_react2 = __toESM(require("react"));
var import_script = __toESM(require("next/script"));

// src/context.ts
var import_react = require("react");

// src/types.ts
var CDN_BASE = "https://cdn.blindagents.com";

// src/context.ts
var BlindAgentsContext = (0, import_react.createContext)({
  apiKey: "",
  cdnBase: CDN_BASE,
  strategy: "afterInteractive"
});

// src/NextBlindAgents.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function serializePosition(pos) {
  if (!pos) return void 0;
  if (typeof pos === "string") return pos;
  return JSON.stringify(pos);
}
function Report({
  primaryColor,
  title,
  reportBtnText,
  btnEmoji,
  iconUrl,
  btnTooltip,
  emptyText,
  position,
  anchor,
  bubbleSize,
  panelWidth,
  panelHeight,
  userWhatsapp: localWhatsapp,
  externalId,
  apiUrl: localApiUrl,
  cdnBase: localCdn,
  strategy: localStrategy,
  onLoad,
  onError
}) {
  const ctx = import_react2.default.useContext(BlindAgentsContext);
  const src = `${localCdn ?? ctx.cdnBase}/report.js`;
  const wa = localWhatsapp ?? ctx.userWhatsapp ?? "";
  const eid = externalId ?? ctx.externalId;
  const url = localApiUrl ?? ctx.apiUrl;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_script.default,
    {
      src,
      strategy: localStrategy ?? ctx.strategy,
      "data-api-key": ctx.apiKey,
      "data-api-url": url,
      "data-primary-color": primaryColor,
      "data-title": title,
      "data-report-btn-text": reportBtnText,
      "data-btn-emoji": btnEmoji,
      "data-icon-url": iconUrl,
      "data-btn-tooltip": btnTooltip,
      "data-empty-text": emptyText,
      "data-user-whatsapp": wa,
      "data-external-id": eid,
      "data-position": serializePosition(position),
      "data-anchor": anchor,
      "data-bubble-size": bubbleSize != null ? String(bubbleSize) : void 0,
      "data-panel-width": panelWidth,
      "data-panel-height": panelHeight,
      onLoad,
      onError: onError ? () => onError(new Error(`Failed to load ${src}`)) : void 0
    }
  );
}
function Chat({
  agentId,
  primaryColor,
  btnEmoji,
  iconUrl,
  btnTooltip,
  fontSize,
  fontFamily,
  notificationSound,
  position,
  anchor,
  bubbleSize,
  panelWidth,
  panelHeight,
  userWhatsapp: localWhatsapp,
  externalId,
  apiUrl: localApiUrl,
  cdnBase: localCdn,
  strategy: localStrategy,
  onLoad,
  onError
}) {
  const ctx = import_react2.default.useContext(BlindAgentsContext);
  const src = `${localCdn ?? ctx.cdnBase}/chat.js`;
  const wa = localWhatsapp ?? ctx.userWhatsapp ?? "";
  const eid = externalId ?? ctx.externalId;
  const url = localApiUrl ?? ctx.apiUrl;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_script.default,
    {
      src,
      strategy: localStrategy ?? ctx.strategy,
      "data-api-key": ctx.apiKey,
      "data-api-url": url,
      "data-agent-id": agentId,
      "data-primary-color": primaryColor,
      "data-btn-emoji": btnEmoji,
      "data-icon-url": iconUrl,
      "data-btn-tooltip": btnTooltip,
      "data-font-size": fontSize,
      "data-font-family": fontFamily,
      "data-notification-sound": notificationSound != null ? String(notificationSound) : void 0,
      "data-user-whatsapp": wa,
      "data-external-id": eid,
      "data-position": serializePosition(position),
      "data-anchor": anchor,
      "data-bubble-size": bubbleSize != null ? String(bubbleSize) : void 0,
      "data-panel-width": panelWidth,
      "data-panel-height": panelHeight,
      onLoad,
      onError: onError ? () => onError(new Error(`Failed to load ${src}`)) : void 0
    }
  );
}
function BlindAgents({
  apiKey,
  userWhatsapp,
  externalId,
  apiUrl,
  cdnBase = CDN_BASE,
  strategy = "afterInteractive",
  children
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlindAgentsContext.Provider, { value: { apiKey, userWhatsapp, externalId, apiUrl, cdnBase, strategy }, children });
}
BlindAgents.Report = Report;
BlindAgents.Chat = Chat;
function BlindAgentsWidget(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlindAgents, { apiKey: props.apiKey, userWhatsapp: props.userWhatsapp, strategy: props.strategy, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Report, { ...props }) });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BlindAgents,
  BlindAgentsWidget
});
//# sourceMappingURL=next.js.map