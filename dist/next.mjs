// src/NextBlindAgentsWidget.tsx
import Script from "next/script";
import { jsx } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx(
    Script,
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
export {
  BlindAgentsWidget
};
//# sourceMappingURL=next.mjs.map