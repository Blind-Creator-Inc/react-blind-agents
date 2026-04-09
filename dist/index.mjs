// src/ReactBlindAgents.tsx
import React, { useEffect, useRef } from "react";

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

// src/ReactBlindAgents.tsx
import { jsx } from "react/jsx-runtime";
function useScript(src, attrs, strategy, onLoad, onError) {
  const injected = useRef(false);
  useEffect(() => {
    if (injected.current) return;
    injected.current = true;
    if (document.querySelector(`script[src="${src}"][data-ba-managed]`)) return;
    const el = document.createElement("script");
    el.src = src;
    el.setAttribute("data-ba-managed", "true");
    Object.entries(attrs).forEach(([k, v]) => {
      if (v != null && v !== "") el.setAttribute(k, v);
    });
    if (onLoad) el.addEventListener("load", () => onLoad());
    if (onError) el.addEventListener("error", () => onError(new Error(`Failed to load ${src}`)));
    const inject = () => {
      if (strategy === "afterInteractive") el.defer = true;
      if (strategy === "lazyOnload") el.async = true;
      document.head.appendChild(el);
    };
    if (strategy === "lazyOnload" && "requestIdleCallback" in window) {
      window.requestIdleCallback(inject);
    } else {
      inject();
    }
    return () => {
      el.parentNode?.removeChild(el);
      injected.current = false;
    };
  }, [src]);
}
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
  const wa = localWhatsapp ?? ctx.userWhatsapp;
  const eid = externalId ?? ctx.externalId;
  const url = localApiUrl ?? ctx.apiUrl;
  useScript(src, {
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
    "data-panel-height": panelHeight
  }, localStrategy ?? ctx.strategy, onLoad, onError);
  return null;
}
function Chat({
  agentId,
  primaryColor,
  btnEmoji,
  iconUrl,
  btnTooltip,
  greeting,
  placeholder,
  fontSize,
  fontFamily,
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
  const wa = localWhatsapp ?? ctx.userWhatsapp;
  const eid = externalId ?? ctx.externalId;
  const url = localApiUrl ?? ctx.apiUrl;
  useScript(src, {
    "data-api-key": ctx.apiKey,
    "data-api-url": url,
    "data-agent-id": agentId,
    "data-primary-color": primaryColor,
    "data-btn-emoji": btnEmoji,
    "data-icon-url": iconUrl,
    "data-btn-tooltip": btnTooltip,
    "data-greeting": greeting,
    "data-placeholder": placeholder,
    "data-font-size": fontSize,
    "data-font-family": fontFamily,
    "data-user-whatsapp": wa,
    "data-external-id": eid,
    "data-position": serializePosition(position),
    "data-anchor": anchor,
    "data-bubble-size": bubbleSize != null ? String(bubbleSize) : void 0,
    "data-panel-width": panelWidth,
    "data-panel-height": panelHeight
  }, localStrategy ?? ctx.strategy, onLoad, onError);
  return null;
}
function Guide({
  userWhatsapp: localWhatsapp,
  externalId,
  apiUrl: localApiUrl,
  position,
  anchor,
  bubbleSize,
  panelWidth,
  panelHeight,
  cdnBase: localCdn,
  strategy: localStrategy,
  onLoad,
  onError
}) {
  const ctx = React.useContext(BlindAgentsContext);
  const src = `${localCdn ?? ctx.cdnBase}/guide.js`;
  const wa = localWhatsapp ?? ctx.userWhatsapp;
  const eid = externalId ?? ctx.externalId;
  const url = localApiUrl ?? ctx.apiUrl;
  useScript(src, {
    "data-api-key": ctx.apiKey,
    "data-api-url": url,
    "data-user-whatsapp": wa,
    "data-external-id": eid,
    "data-position": serializePosition(position),
    "data-anchor": anchor,
    "data-bubble-size": bubbleSize != null ? String(bubbleSize) : void 0,
    "data-panel-width": panelWidth,
    "data-panel-height": panelHeight
  }, localStrategy ?? ctx.strategy, onLoad, onError);
  return null;
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
BlindAgents.Guide = Guide;
function BlindAgentsWidget(props) {
  return /* @__PURE__ */ jsx(BlindAgents, { apiKey: props.apiKey, userWhatsapp: props.userWhatsapp, strategy: props.strategy, children: /* @__PURE__ */ jsx(Report, { ...props }) });
}
export {
  BlindAgents,
  BlindAgentsWidget
};
//# sourceMappingURL=index.mjs.map