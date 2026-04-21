// src/NextBlindAgents.tsx
import React from "react";
import Script from "next/script";

// src/context.ts
import { createContext, useContext } from "react";

// src/types.ts
var CDN_BASE = "https://cdn.blindagents.com";

// src/context.ts
var BlindAgentsContext = createContext({
  apiKey: "",
  cdnBase: CDN_BASE,
  strategy: "afterInteractive"
});

// src/NextBlindAgents.tsx
import { jsx } from "react/jsx-runtime";
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
  const ctx = React.useContext(BlindAgentsContext);
  const src = `${localCdn ?? ctx.cdnBase}/report.js`;
  const wa = localWhatsapp ?? ctx.userWhatsapp ?? "";
  const eid = externalId ?? ctx.externalId;
  const url = localApiUrl ?? ctx.apiUrl;
  return /* @__PURE__ */ jsx(
    Script,
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
  const ctx = React.useContext(BlindAgentsContext);
  const src = `${localCdn ?? ctx.cdnBase}/chat.js`;
  const wa = localWhatsapp ?? ctx.userWhatsapp ?? "";
  const eid = externalId ?? ctx.externalId;
  const url = localApiUrl ?? ctx.apiUrl;
  return /* @__PURE__ */ jsx(
    Script,
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
  return /* @__PURE__ */ jsx(BlindAgentsContext.Provider, { value: { apiKey, userWhatsapp, externalId, apiUrl, cdnBase, strategy }, children });
}
BlindAgents.Report = Report;
BlindAgents.Chat = Chat;
function BlindAgentsWidget(props) {
  return /* @__PURE__ */ jsx(BlindAgents, { apiKey: props.apiKey, userWhatsapp: props.userWhatsapp, strategy: props.strategy, children: /* @__PURE__ */ jsx(Report, { ...props }) });
}
export {
  BlindAgents,
  BlindAgentsWidget
};
//# sourceMappingURL=next.mjs.map