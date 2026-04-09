const CDN_BASE = 'https://cdn.blindagents.com';

export { CDN_BASE };

/** Common props shared by all widget types. */
export interface BaseWidgetProps {
  /** Your Blind Agents public API key (ba_...) */
  apiKey: string;
  /** Pre-filled WhatsApp number to skip identity verification */
  userWhatsapp?: string;
  /** Override the CDN base URL (useful for self-hosting) */
  cdnBase?: string;
  /** Script loading strategy @default "afterInteractive" */
  strategy?: 'afterInteractive' | 'lazyOnload' | 'beforeInteractive';
  /** Called once the script finishes loading */
  onLoad?: () => void;
  /** Called if the script fails to load */
  onError?: (error: Error) => void;
}

/** Report / bug-reporter widget */
export interface ReportWidgetProps extends Omit<BaseWidgetProps, 'apiKey'> {
  /** Accent color for the widget UI — any valid CSS color */
  primaryColor?: string;
  /** Title displayed in the widget panel header @default "Help Center" */
  title?: string;
  /** Label for the report button @default "Report an issue" */
  reportBtnText?: string;
  /** Emoji on the launcher floating button @default "🐛" */
  btnEmoji?: string;
  /** Tooltip on the launcher button */
  btnTooltip?: string;
  /** Text shown when there are no reports @default "No issues reported yet." */
  emptyText?: string;
}

/** Webchat widget */
export interface ChatWidgetProps extends Omit<BaseWidgetProps, 'apiKey'> {
  /** The agent UUID to connect this chat to */
  agentId?: string;
  /** Accent color for the chat bubble and header */
  primaryColor?: string;
}

/** Product guides widget */
export interface GuideWidgetProps extends Omit<BaseWidgetProps, 'apiKey'> {
  // No additional props yet — the guide SDK reads config from the dashboard
}

/** Root provider props — all children share this apiKey */
export interface BlindAgentsProps extends BaseWidgetProps {
  children: React.ReactNode;
}

// ── Legacy single-widget props (kept for backwards compatibility) ──────────────
/** @deprecated Use <BlindAgents apiKey="..."><BlindAgents.Report /></BlindAgents> instead */
export interface BlindAgentsWidgetProps extends BaseWidgetProps {
  primaryColor?: string;
  title?: string;
  reportBtnText?: string;
  btnEmoji?: string;
  btnTooltip?: string;
  emptyText?: string;
  /** @deprecated Prefer userWhatsapp */
  src?: string;
}
