import * as react_jsx_runtime from 'react/jsx-runtime';

/** Widget position preset or custom object. */
type WidgetPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | Record<string, string>;
/** Shared positioning / sizing / mounting props used by all widget types. */
interface WidgetLayoutProps {
    /**
     * Position of the floating widget on the screen.
     * Use a preset string or a custom object like `{ bottom: "20px", right: "80px" }`.
     * @default "bottom-right"
     */
    position?: WidgetPosition;
    /**
     * CSS selector of a DOM element to mount the widget inside instead of `document.body`.
     * The element must have `position: relative` or it will be set automatically.
     * @example "#my-container"
     */
    anchor?: string;
    /**
     * Diameter of the floating launcher button in px.
     * @default 56
     */
    bubbleSize?: number;
    /**
     * Width of the open panel (any CSS length, e.g. "380px", "40vw").
     * Falls back to the widget's built-in default.
     */
    panelWidth?: string;
    /**
     * Height of the open panel (any CSS length, e.g. "600px", "80vh").
     * Falls back to the widget's built-in default.
     */
    panelHeight?: string;
}
/** Common props shared by all widget types. */
interface BaseWidgetProps extends WidgetLayoutProps {
    /** Your Blind Agents public API key (ba_...) */
    apiKey: string;
    /**
     * Pre-fill the user's phone number or email address.
     * Passed to the SDK as the WhatsApp/phone identity field.
     * When set, the in-widget verification prompt is skipped entirely.
     */
    userWhatsapp?: string;
    /**
     * Your app's internal user ID (e.g. database PK or UUID).
     * Stored as `contact.external_id` in Blind Agents so you can look up
     * tickets and conversations by your own ID via the REST API.
     * Does NOT skip the verification prompt — combine with `userWhatsapp` for that.
     * Supported by Report, Chat, and Guide widgets.
     */
    externalId?: string;
    /** Override the API base URL (useful for self-hosting or proxying) @default "https://api.blindagents.com" */
    apiUrl?: string;
    /** Override the CDN base URL (useful for self-hosting) */
    cdnBase?: string;
    /** Script loading strategy @default "afterInteractive" */
    strategy?: 'afterInteractive' | 'lazyOnload' | 'beforeInteractive';
    /** Called once the script finishes loading */
    onLoad?: () => void;
    /** Called if the script fails to load */
    onError?: (error: Error) => void;
}
/** Shared visual props for both Report and Chat widgets. */
interface VisualWidgetProps {
    /** Accent color for the widget UI — any valid CSS color */
    primaryColor?: string;
    /** Emoji on the launcher floating button */
    btnEmoji?: string;
    /** URL of an image to use as the launcher icon instead of an emoji */
    iconUrl?: string;
    /** Tooltip on the launcher button */
    btnTooltip?: string;
}
/** Report / bug-reporter widget */
interface ReportWidgetProps extends Omit<BaseWidgetProps, 'apiKey'>, VisualWidgetProps {
    /** Title displayed in the widget panel header @default "Help Center" */
    title?: string;
    /** Label for the report button @default "Report an issue" */
    reportBtnText?: string;
    /** Text shown when there are no reports @default "No issues reported yet." */
    emptyText?: string;
}
/** Webchat widget */
interface ChatWidgetProps extends Omit<BaseWidgetProps, 'apiKey'>, VisualWidgetProps {
    /** The agent UUID to connect this chat to */
    agentId?: string;
    /** Greeting text shown before user sends a message */
    greeting?: string;
    /** Placeholder text in the message input */
    placeholder?: string;
    /** Font size for chat messages e.g. "14px" */
    fontSize?: string;
    /**
     * Font family preset for the chat UI.
     * Built-in presets: `"System"` · `"Serif"` · `"Mono"` · `"Rounded"`
     * Pass any other string to use a custom font stack.
     */
    fontFamily?: string;
}
/** Product guides widget */
interface GuideWidgetProps extends Omit<BaseWidgetProps, 'apiKey'> {
}
/** Root provider props — all children share this apiKey */
interface BlindAgentsProps extends BaseWidgetProps {
    children: React.ReactNode;
}
/** @deprecated Use <BlindAgents apiKey="..."><BlindAgents.Report /></BlindAgents> instead */
interface BlindAgentsWidgetProps extends BaseWidgetProps, VisualWidgetProps {
    title?: string;
    reportBtnText?: string;
    emptyText?: string;
    /** @deprecated Prefer userWhatsapp */
    src?: string;
}

declare function BlindAgents({ apiKey, userWhatsapp, externalId, apiUrl, cdnBase, strategy, children, }: BlindAgentsProps): react_jsx_runtime.JSX.Element;
declare namespace BlindAgents {
    var Report: ({ primaryColor, title, reportBtnText, btnEmoji, iconUrl, btnTooltip, emptyText, position, anchor, bubbleSize, panelWidth, panelHeight, userWhatsapp: localWhatsapp, externalId, apiUrl: localApiUrl, cdnBase: localCdn, strategy: localStrategy, onLoad, onError, }: ReportWidgetProps) => null;
    var Chat: ({ agentId, primaryColor, btnEmoji, iconUrl, btnTooltip, greeting, placeholder, fontSize, fontFamily, position, anchor, bubbleSize, panelWidth, panelHeight, userWhatsapp: localWhatsapp, externalId, apiUrl: localApiUrl, cdnBase: localCdn, strategy: localStrategy, onLoad, onError, }: ChatWidgetProps) => null;
    var Guide: ({ userWhatsapp: localWhatsapp, externalId, apiUrl: localApiUrl, position, anchor, bubbleSize, panelWidth, panelHeight, cdnBase: localCdn, strategy: localStrategy, onLoad, onError, }: GuideWidgetProps) => null;
}
/** @deprecated Use <BlindAgents><BlindAgents.Report /></BlindAgents> */
declare function BlindAgentsWidget(props: ReportWidgetProps & {
    apiKey: string;
}): react_jsx_runtime.JSX.Element;

export { BlindAgents, type BlindAgentsProps, BlindAgentsWidget, type BlindAgentsWidgetProps, type ChatWidgetProps, type GuideWidgetProps, type ReportWidgetProps };
