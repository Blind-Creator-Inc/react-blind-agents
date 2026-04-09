'use client';

import React, { useEffect, useRef } from 'react';
import { BlindAgentsContext } from './context';
import type {
  BlindAgentsProps,
  ReportWidgetProps,
  ChatWidgetProps,
  GuideWidgetProps,
} from './types';
import { CDN_BASE } from './types';

// ── Script injection helper ───────────────────────────────────────────────────

function useScript(
  src: string,
  attrs: Record<string, string | undefined>,
  strategy: 'afterInteractive' | 'lazyOnload' | 'beforeInteractive',
  onLoad?: () => void,
  onError?: (e: Error) => void,
) {
  const injected = useRef(false);

  useEffect(() => {
    if (injected.current) return;
    injected.current = true;

    // Deduplicate — only one script per src
    if (document.querySelector(`script[src="${src}"][data-ba-managed]`)) return;

    const el = document.createElement('script');
    el.src = src;
    el.setAttribute('data-ba-managed', 'true');
    Object.entries(attrs).forEach(([k, v]) => {
      if (v != null && v !== '') el.setAttribute(k, v);
    });

    if (onLoad)  el.addEventListener('load',  () => onLoad());
    if (onError) el.addEventListener('error', () => onError(new Error(`Failed to load ${src}`)));

    const inject = () => {
      if (strategy === 'afterInteractive') el.defer = true;
      if (strategy === 'lazyOnload')       el.async = true;
      document.head.appendChild(el);
    };

    if (strategy === 'lazyOnload' && 'requestIdleCallback' in window) {
      (window as any).requestIdleCallback(inject);
    } else {
      inject();
    }

    return () => { el.parentNode?.removeChild(el); injected.current = false; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);
}

// ── Widget sub-components ─────────────────────────────────────────────────────

function serializePosition(pos?: import('./types').WidgetPosition): string | undefined {
  if (!pos) return undefined;
  if (typeof pos === 'string') return pos;
  return JSON.stringify(pos);
}

function Report({
  primaryColor, title, reportBtnText, btnEmoji, iconUrl, btnTooltip, emptyText,
  position, anchor, bubbleSize, panelWidth, panelHeight,
  userWhatsapp: localWhatsapp, externalId,
  cdnBase: localCdn, strategy: localStrategy, onLoad, onError,
}: ReportWidgetProps) {
  const ctx = React.useContext(BlindAgentsContext);
  const src = `${localCdn ?? ctx.cdnBase}/report.js`;
  const wa  = localWhatsapp ?? ctx.userWhatsapp;
  const eid = externalId ?? ctx.externalId;

  useScript(src, {
    'data-api-key':          ctx.apiKey,
    'data-primary-color':    primaryColor,
    'data-title':            title,
    'data-report-btn-text':  reportBtnText,
    'data-btn-emoji':        btnEmoji,
    'data-icon-url':         iconUrl,
    'data-btn-tooltip':      btnTooltip,
    'data-empty-text':       emptyText,
    'data-user-whatsapp':    wa,
    'data-external-id':      eid,
    'data-position':         serializePosition(position),
    'data-anchor':           anchor,
    'data-bubble-size':      bubbleSize != null ? String(bubbleSize) : undefined,
    'data-panel-width':      panelWidth,
    'data-panel-height':     panelHeight,
  }, localStrategy ?? ctx.strategy, onLoad, onError);

  return null;
}

function Chat({
  agentId, primaryColor, btnEmoji, iconUrl, btnTooltip,
  greeting, placeholder, fontSize, fontFamily,
  position, anchor, bubbleSize, panelWidth, panelHeight,
  userWhatsapp: localWhatsapp, externalId,
  cdnBase: localCdn, strategy: localStrategy, onLoad, onError,
}: ChatWidgetProps) {
  const ctx = React.useContext(BlindAgentsContext);
  const src = `${localCdn ?? ctx.cdnBase}/chat.js`;
  const wa  = localWhatsapp ?? ctx.userWhatsapp;
  const eid = externalId ?? ctx.externalId;

  useScript(src, {
    'data-api-key':       ctx.apiKey,
    'data-agent-id':      agentId,
    'data-primary-color': primaryColor,
    'data-btn-emoji':     btnEmoji,
    'data-icon-url':      iconUrl,
    'data-btn-tooltip':   btnTooltip,
    'data-greeting':      greeting,
    'data-placeholder':   placeholder,
    'data-font-size':     fontSize,
    'data-font-family':   fontFamily,
    'data-user-whatsapp': wa,
    'data-external-id':   eid,
    'data-position':      serializePosition(position),
    'data-anchor':        anchor,
    'data-bubble-size':   bubbleSize != null ? String(bubbleSize) : undefined,
    'data-panel-width':   panelWidth,
    'data-panel-height':  panelHeight,
  }, localStrategy ?? ctx.strategy, onLoad, onError);

  return null;
}

function Guide({
  userWhatsapp: localWhatsapp,
  cdnBase: localCdn,
  strategy: localStrategy,
  onLoad,
  onError,
}: GuideWidgetProps) {
  const ctx = React.useContext(BlindAgentsContext);
  const src = `${localCdn ?? ctx.cdnBase}/guide.js`;
  const wa  = localWhatsapp ?? ctx.userWhatsapp;

  useScript(src, {
    'data-api-key':       ctx.apiKey,
    'data-user-whatsapp': wa,
  }, localStrategy ?? ctx.strategy, onLoad, onError);

  return null;
}

// ── Root provider ─────────────────────────────────────────────────────────────

export function BlindAgents({
  apiKey, userWhatsapp, externalId,
  cdnBase = CDN_BASE, strategy = 'afterInteractive', children,
}: BlindAgentsProps) {
  return (
    <BlindAgentsContext.Provider value={{ apiKey, userWhatsapp, externalId, cdnBase, strategy }}>
      {children}
    </BlindAgentsContext.Provider>
  );
}

BlindAgents.Report = Report;
BlindAgents.Chat   = Chat;
BlindAgents.Guide  = Guide;

// ── Legacy single-widget export (backwards compat) ───────────────────────────
/** @deprecated Use <BlindAgents><BlindAgents.Report /></BlindAgents> */
export function BlindAgentsWidget(props: ReportWidgetProps & { apiKey: string }) {
  return (
    <BlindAgents apiKey={props.apiKey} userWhatsapp={props.userWhatsapp} strategy={props.strategy}>
      <Report {...props} />
    </BlindAgents>
  );
}
