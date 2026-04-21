'use client';

// Next.js subpath entry — uses next/script for correct strategy & hydration.
import React from 'react';
import Script from 'next/script';
import { BlindAgentsContext } from './context';
import type {
  BlindAgentsProps,
  ReportWidgetProps,
  ChatWidgetProps,
} from './types';
import { CDN_BASE } from './types';

function serializePosition(pos?: import('./types').WidgetPosition): string | undefined {
  if (!pos) return undefined;
  if (typeof pos === 'string') return pos;
  return JSON.stringify(pos);
}

// ── Widget sub-components ─────────────────────────────────────────────────────

function Report({
  primaryColor, title, reportBtnText, btnEmoji, iconUrl, btnTooltip, emptyText,
  position, anchor, bubbleSize, panelWidth, panelHeight,
  userWhatsapp: localWhatsapp, externalId, apiUrl: localApiUrl,
  cdnBase: localCdn, strategy: localStrategy, onLoad, onError,
}: ReportWidgetProps) {
  const ctx = React.useContext(BlindAgentsContext);
  const src = `${localCdn ?? ctx.cdnBase}/report.js`;
  const wa  = localWhatsapp ?? ctx.userWhatsapp ?? '';
  const eid = externalId    ?? ctx.externalId;
  const url = localApiUrl   ?? ctx.apiUrl;

  return (
    <Script
      src={src}
      strategy={localStrategy ?? ctx.strategy}
      data-api-key={ctx.apiKey}
      data-api-url={url}
      data-primary-color={primaryColor}
      data-title={title}
      data-report-btn-text={reportBtnText}
      data-btn-emoji={btnEmoji}
      data-icon-url={iconUrl}
      data-btn-tooltip={btnTooltip}
      data-empty-text={emptyText}
      data-user-whatsapp={wa}
      data-external-id={eid}
      data-position={serializePosition(position)}
      data-anchor={anchor}
      data-bubble-size={bubbleSize != null ? String(bubbleSize) : undefined}
      data-panel-width={panelWidth}
      data-panel-height={panelHeight}
      onLoad={onLoad}
      onError={onError ? () => onError(new Error(`Failed to load ${src}`)) : undefined}
    />
  );
}

function Chat({
  agentId, primaryColor, btnEmoji, iconUrl, btnTooltip,
  fontSize, fontFamily, notificationSound,
  position, anchor, bubbleSize, panelWidth, panelHeight,
  userWhatsapp: localWhatsapp, externalId, apiUrl: localApiUrl,
  cdnBase: localCdn, strategy: localStrategy, onLoad, onError,
}: ChatWidgetProps) {
  const ctx = React.useContext(BlindAgentsContext);
  const src = `${localCdn ?? ctx.cdnBase}/chat.js`;
  const wa  = localWhatsapp ?? ctx.userWhatsapp ?? '';
  const eid = externalId    ?? ctx.externalId;
  const url = localApiUrl   ?? ctx.apiUrl;

  return (
    <Script
      src={src}
      strategy={localStrategy ?? ctx.strategy}
      data-api-key={ctx.apiKey}
      data-api-url={url}
      data-agent-id={agentId}
      data-primary-color={primaryColor}
      data-btn-emoji={btnEmoji}
      data-icon-url={iconUrl}
      data-btn-tooltip={btnTooltip}
      data-font-size={fontSize}
      data-font-family={fontFamily}
      data-notification-sound={notificationSound != null ? String(notificationSound) : undefined}
      data-user-whatsapp={wa}
      data-external-id={eid}
      data-position={serializePosition(position)}
      data-anchor={anchor}
      data-bubble-size={bubbleSize != null ? String(bubbleSize) : undefined}
      data-panel-width={panelWidth}
      data-panel-height={panelHeight}
      onLoad={onLoad}
      onError={onError ? () => onError(new Error(`Failed to load ${src}`)) : undefined}
    />
  );
}

// ── Root provider ─────────────────────────────────────────────────────────────

export function BlindAgents({
  apiKey, userWhatsapp, externalId, apiUrl,
  cdnBase = CDN_BASE, strategy = 'afterInteractive', children,
}: BlindAgentsProps) {
  return (
    <BlindAgentsContext.Provider value={{ apiKey, userWhatsapp, externalId, apiUrl, cdnBase, strategy }}>
      {children}
    </BlindAgentsContext.Provider>
  );
}

BlindAgents.Report = Report;
BlindAgents.Chat   = Chat;

// ── Legacy single-widget export (backwards compat) ───────────────────────────
/** @deprecated Use <BlindAgents><BlindAgents.Report /></BlindAgents> */
export function BlindAgentsWidget(props: ReportWidgetProps & { apiKey: string }) {
  return (
    <BlindAgents apiKey={props.apiKey} userWhatsapp={props.userWhatsapp} strategy={props.strategy}>
      <Report {...props} />
    </BlindAgents>
  );
}
