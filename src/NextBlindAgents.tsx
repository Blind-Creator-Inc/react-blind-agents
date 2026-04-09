'use client';

// Next.js subpath entry — uses next/script for correct strategy & hydration.
import React from 'react';
import Script from 'next/script';
import { BlindAgentsContext } from './context';
import type {
  BlindAgentsProps,
  ReportWidgetProps,
  ChatWidgetProps,
  GuideWidgetProps,
} from './types';
import { CDN_BASE } from './types';

// ── Widget sub-components ─────────────────────────────────────────────────────

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
  onError,
}: ReportWidgetProps) {
  const ctx = React.useContext(BlindAgentsContext);
  const src = `${localCdn ?? ctx.cdnBase}/report.js`;
  const wa  = localWhatsapp ?? ctx.userWhatsapp ?? '';

  return (
    <Script
      src={src}
      strategy={localStrategy ?? ctx.strategy}
      data-api-key={ctx.apiKey}
      data-primary-color={primaryColor}
      data-title={title}
      data-report-btn-text={reportBtnText}
      data-btn-emoji={btnEmoji}
      data-btn-tooltip={btnTooltip}
      data-empty-text={emptyText}
      data-user-whatsapp={wa}
      onLoad={onLoad}
      onError={onError ? () => onError(new Error(`Failed to load ${src}`)) : undefined}
    />
  );
}

function Chat({
  agentId,
  primaryColor,
  userWhatsapp: localWhatsapp,
  cdnBase: localCdn,
  strategy: localStrategy,
  onLoad,
  onError,
}: ChatWidgetProps) {
  const ctx = React.useContext(BlindAgentsContext);
  const src = `${localCdn ?? ctx.cdnBase}/chat.js`;
  const wa  = localWhatsapp ?? ctx.userWhatsapp ?? '';

  return (
    <Script
      src={src}
      strategy={localStrategy ?? ctx.strategy}
      data-api-key={ctx.apiKey}
      data-agent-id={agentId}
      data-primary-color={primaryColor}
      data-user-whatsapp={wa}
      onLoad={onLoad}
      onError={onError ? () => onError(new Error(`Failed to load ${src}`)) : undefined}
    />
  );
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
  const wa  = localWhatsapp ?? ctx.userWhatsapp ?? '';

  return (
    <Script
      src={src}
      strategy={localStrategy ?? ctx.strategy}
      data-api-key={ctx.apiKey}
      data-user-whatsapp={wa}
      onLoad={onLoad}
      onError={onError ? () => onError(new Error(`Failed to load ${src}`)) : undefined}
    />
  );
}

// ── Root provider ─────────────────────────────────────────────────────────────

export function BlindAgents({
  apiKey,
  userWhatsapp,
  cdnBase = CDN_BASE,
  strategy = 'afterInteractive',
  children,
}: BlindAgentsProps) {
  return (
    <BlindAgentsContext.Provider value={{ apiKey, userWhatsapp, cdnBase, strategy }}>
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
