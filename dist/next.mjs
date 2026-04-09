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
function Report({
  primaryColor,
  title,
  reportBtnText,
  btnEmoji,
  btnTooltip,
  emptyText,
  userWhatsapp: localWhatsapp,
  cdnBase: localCdn,
  strategy: localStrategy,
  onLoad,
  onError
}) {
  const ctx = React.useContext(BlindAgentsContext);
  const src = `${localCdn ?? ctx.cdnBase}/report.js`;
  const wa = localWhatsapp ?? ctx.userWhatsapp ?? "";
  return /* @__PURE__ */ jsx(
    Script,
    {
      src,
      strategy: localStrategy ?? ctx.strategy,
      "data-api-key": ctx.apiKey,
      "data-primary-color": primaryColor,
      "data-title": title,
      "data-report-btn-text": reportBtnText,
      "data-btn-emoji": btnEmoji,
      "data-btn-tooltip": btnTooltip,
      "data-empty-text": emptyText,
      "data-user-whatsapp": wa,
      onLoad,
      onError: onError ? () => onError(new Error(`Failed to load ${src}`)) : void 0
    }
  );
}
function Chat({
  agentId,
  primaryColor,
  userWhatsapp: localWhatsapp,
  cdnBase: localCdn,
  strategy: localStrategy,
  onLoad,
  onError
}) {
  const ctx = React.useContext(BlindAgentsContext);
  const src = `${localCdn ?? ctx.cdnBase}/chat.js`;
  const wa = localWhatsapp ?? ctx.userWhatsapp ?? "";
  return /* @__PURE__ */ jsx(
    Script,
    {
      src,
      strategy: localStrategy ?? ctx.strategy,
      "data-api-key": ctx.apiKey,
      "data-agent-id": agentId,
      "data-primary-color": primaryColor,
      "data-user-whatsapp": wa,
      onLoad,
      onError: onError ? () => onError(new Error(`Failed to load ${src}`)) : void 0
    }
  );
}
function Guide({
  userWhatsapp: localWhatsapp,
  cdnBase: localCdn,
  strategy: localStrategy,
  onLoad,
  onError
}) {
  const ctx = React.useContext(BlindAgentsContext);
  const src = `${localCdn ?? ctx.cdnBase}/guide.js`;
  const wa = localWhatsapp ?? ctx.userWhatsapp ?? "";
  return /* @__PURE__ */ jsx(
    Script,
    {
      src,
      strategy: localStrategy ?? ctx.strategy,
      "data-api-key": ctx.apiKey,
      "data-user-whatsapp": wa,
      onLoad,
      onError: onError ? () => onError(new Error(`Failed to load ${src}`)) : void 0
    }
  );
}
function BlindAgents({
  apiKey,
  userWhatsapp,
  cdnBase = CDN_BASE,
  strategy = "afterInteractive",
  children
}) {
  return /* @__PURE__ */ jsx(BlindAgentsContext.Provider, { value: { apiKey, userWhatsapp, cdnBase, strategy }, children });
}
BlindAgents.Report = Report;
BlindAgents.Chat = Chat;
BlindAgents.Guide = Guide;
function BlindAgentsWidget(props) {
  return /* @__PURE__ */ jsx(BlindAgents, { apiKey: props.apiKey, userWhatsapp: props.userWhatsapp, strategy: props.strategy, children: /* @__PURE__ */ jsx(Report, { ...props }) });
}
export {
  BlindAgents,
  BlindAgentsWidget
};
//# sourceMappingURL=next.mjs.map