'use client';

import { useEffect, useRef } from 'react';
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
  const injected = useRef(false);

  useEffect(() => {
    if (injected.current) return;
    injected.current = true;

    // Deduplicate across multiple widget instances
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${src}"][data-ba-managed]`
    );
    if (existing) return;

    const el = document.createElement('script');
    el.src = src;
    el.setAttribute('data-ba-managed', 'true');
    el.setAttribute('data-api-key', apiKey);
    if (primaryColor)  el.setAttribute('data-primary-color', primaryColor);
    if (title)         el.setAttribute('data-title', title);
    if (reportBtnText) el.setAttribute('data-report-btn-text', reportBtnText);
    if (btnEmoji)      el.setAttribute('data-btn-emoji', btnEmoji);
    if (btnTooltip)    el.setAttribute('data-btn-tooltip', btnTooltip);
    if (emptyText)     el.setAttribute('data-empty-text', emptyText);
    if (userWhatsapp)  el.setAttribute('data-user-whatsapp', userWhatsapp);

    if (onLoad)  el.addEventListener('load', () => onLoad());
    if (onError) el.addEventListener('error', () => onError(new Error(`Failed to load ${src}`)));

    const inject = () => {
      if (strategy === 'afterInteractive') el.defer = true;
      if (strategy === 'lazyOnload')       el.async = true;
      document.head.appendChild(el);
    };

    if (strategy === 'lazyOnload' && typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(inject);
    } else {
      inject();
    }

    return () => {
      el.parentNode?.removeChild(el);
      injected.current = false;
    };
  }, [apiKey, src]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
