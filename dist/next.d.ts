import * as react_jsx_runtime from 'react/jsx-runtime';

/** Common props shared by all widget types. */
interface BaseWidgetProps {
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
interface ReportWidgetProps extends Omit<BaseWidgetProps, 'apiKey'> {
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
interface ChatWidgetProps extends Omit<BaseWidgetProps, 'apiKey'> {
    /** The agent UUID to connect this chat to */
    agentId?: string;
    /** Accent color for the chat bubble and header */
    primaryColor?: string;
}
/** Product guides widget */
interface GuideWidgetProps extends Omit<BaseWidgetProps, 'apiKey'> {
}
/** Root provider props — all children share this apiKey */
interface BlindAgentsProps extends BaseWidgetProps {
    children: React.ReactNode;
}
/** @deprecated Use <BlindAgents apiKey="..."><BlindAgents.Report /></BlindAgents> instead */
interface BlindAgentsWidgetProps extends BaseWidgetProps {
    primaryColor?: string;
    title?: string;
    reportBtnText?: string;
    btnEmoji?: string;
    btnTooltip?: string;
    emptyText?: string;
    /** @deprecated Prefer userWhatsapp */
    src?: string;
}

declare function BlindAgents({ apiKey, userWhatsapp, cdnBase, strategy, children, }: BlindAgentsProps): react_jsx_runtime.JSX.Element;
declare namespace BlindAgents {
    var Report: ({ primaryColor, title, reportBtnText, btnEmoji, btnTooltip, emptyText, userWhatsapp: localWhatsapp, cdnBase: localCdn, strategy: localStrategy, onLoad, onError, }: ReportWidgetProps) => react_jsx_runtime.JSX.Element;
    var Chat: ({ agentId, primaryColor, userWhatsapp: localWhatsapp, cdnBase: localCdn, strategy: localStrategy, onLoad, onError, }: ChatWidgetProps) => react_jsx_runtime.JSX.Element;
    var Guide: ({ userWhatsapp: localWhatsapp, cdnBase: localCdn, strategy: localStrategy, onLoad, onError, }: GuideWidgetProps) => react_jsx_runtime.JSX.Element;
}
/** @deprecated Use <BlindAgents><BlindAgents.Report /></BlindAgents> */
declare function BlindAgentsWidget(props: ReportWidgetProps & {
    apiKey: string;
}): react_jsx_runtime.JSX.Element;

export { BlindAgents, type BlindAgentsProps, BlindAgentsWidget, type BlindAgentsWidgetProps, type ChatWidgetProps, type GuideWidgetProps, type ReportWidgetProps };
