interface BlindAgentsWidgetProps {
    /** Your Blind Agents public API key (ba_...) */
    apiKey: string;
    /** Accent color for the widget UI — any valid CSS color */
    primaryColor?: string;
    /** Title displayed in the widget panel header @default "Help Center" */
    title?: string;
    /** Label for the report button @default "Report an issue" */
    reportBtnText?: string;
    /** Emoji on the launcher floating button */
    btnEmoji?: string;
    /** Tooltip on the launcher button */
    btnTooltip?: string;
    /** Text shown when there are no reports @default "No issues reported yet." */
    emptyText?: string;
    /** Pre-fill the user's WhatsApp number or email to skip identity verification */
    userWhatsapp?: string;
    /** Script loading strategy @default "afterInteractive" */
    strategy?: 'afterInteractive' | 'lazyOnload' | 'beforeInteractive';
    /** Override the CDN URL (useful for self-hosting) @default "https://cdn.blindagents.com/report.js" */
    src?: string;
    /** Called once the script finishes loading */
    onLoad?: () => void;
    /** Called if the script fails to load */
    onError?: (error: Error) => void;
}

declare function BlindAgentsWidget({ apiKey, primaryColor, title, reportBtnText, btnEmoji, btnTooltip, emptyText, userWhatsapp, strategy, src, onLoad, onError, }: BlindAgentsWidgetProps): null;

export { BlindAgentsWidget, type BlindAgentsWidgetProps };
