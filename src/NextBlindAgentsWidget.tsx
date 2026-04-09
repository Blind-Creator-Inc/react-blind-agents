'use client';

// This file is only included in the `react-blind-agents/next` subpath entry.
// It relies on `next/script` which is NOT available in plain React apps.
import Script from 'next/script';
import type { BlindAgentsWidgetProps } from './types';

const CDN_DEFAULT = 'https://cdn.blindagents.com/report.js';

export function BlindAgentsWidget({
  apiKey,
  primaryColor,
  title,
  reportBtnText,
  btnEmoji,
  btnTooltip,
  emptyText,
  userWhatsapp,
  strategy = 'afterInteractive',
  src = CDN_DEFAULT,
  onLoad,
  onError,
}: BlindAgentsWidgetProps) {
  return (
    <Script
      src={src}
      strategy={strategy}
      data-api-key={apiKey}
      data-primary-color={primaryColor}
      data-title={title}
      data-report-btn-text={reportBtnText}
      data-btn-emoji={btnEmoji}
      data-btn-tooltip={btnTooltip}
      data-empty-text={emptyText}
      data-user-whatsapp={userWhatsapp ?? ''}
      onLoad={onLoad}
      onError={onError ? () => onError(new Error(`Failed to load ${src}`)) : undefined}
    />
  );
}
