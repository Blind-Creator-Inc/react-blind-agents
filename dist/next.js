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
  BlindAgentsWidget: () => BlindAgentsWidget
});
module.exports = __toCommonJS(next_exports);

// src/NextBlindAgentsWidget.tsx
var import_script = __toESM(require("next/script"));
var import_jsx_runtime = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_script.default,
    {
      src,
      strategy,
      "data-api-key": apiKey,
      "data-primary-color": primaryColor,
      "data-title": title,
      "data-report-btn-text": reportBtnText,
      "data-btn-emoji": btnEmoji,
      "data-btn-tooltip": btnTooltip,
      "data-empty-text": emptyText,
      "data-user-whatsapp": userWhatsapp ?? "",
      onLoad,
      onError: onError ? () => onError(new Error(`Failed to load ${src}`)) : void 0
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BlindAgentsWidget
});
//# sourceMappingURL=next.js.map