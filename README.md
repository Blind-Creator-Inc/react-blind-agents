# react-blind-agents

React component for the [Blind Agents](https://blindagents.com) pixel widget — AI bug reporter, webchat, and product guides.

## Installation

```bash
npm install react-blind-agents
```

## Usage

### Plain React (Vite, CRA)

```tsx
import { BlindAgentsWidget } from 'react-blind-agents';

export default function App() {
  return (
    <>
      <MyRoutes />
      <BlindAgentsWidget
        apiKey="ba_YOUR_API_KEY"
        primaryColor="#e11d48"
        title="Help Center"
        reportBtnText="Report an issue"
        btnEmoji="🔴"
        btnTooltip="Report an issue"
        emptyText="No issues reported yet."
      />
    </>
  );
}
```

### Next.js App Router

```tsx
// app/layout.tsx
import { BlindAgentsWidget } from 'react-blind-agents/next';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <BlindAgentsWidget
          apiKey="ba_YOUR_API_KEY"
          primaryColor="#e11d48"
          title="Help Center"
          reportBtnText="Report an issue"
          btnEmoji="🔴"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
```

### Next.js with authenticated user (skip identity verification)

```tsx
// components/ReportWidget.tsx
'use client';
import { BlindAgentsWidget } from 'react-blind-agents/next';
import { useAuth } from './AuthProvider';

export function ReportWidget() {
  const { user } = useAuth();
  return (
    <BlindAgentsWidget
      apiKey="ba_YOUR_API_KEY"
      primaryColor="#e11d48"
      userWhatsapp={user?.whatsapp_number ?? user?.email ?? ''}
    />
  );
}
```

### Next.js Pages Router

```tsx
// pages/_app.tsx
import type { AppProps } from 'next/app';
import { BlindAgentsWidget } from 'react-blind-agents/next';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <BlindAgentsWidget apiKey="ba_YOUR_API_KEY" primaryColor="#e11d48" />
    </>
  );
}
```

## Props

| Prop            | Type                                              | Default                                    | Description                                         |
|-----------------|---------------------------------------------------|--------------------------------------------|-----------------------------------------------------|
| `apiKey`        | `string`                                          | **required**                               | Your Blind Agents public API key (`ba_...`)         |
| `primaryColor`  | `string`                                          | —                                          | Accent color (any valid CSS color)                  |
| `title`         | `string`                                          | `"Help Center"`                            | Widget panel header title                           |
| `reportBtnText` | `string`                                          | `"Report an issue"`                        | Report button label                                 |
| `btnEmoji`      | `string`                                          | —                                          | Emoji on the floating launcher button               |
| `btnTooltip`    | `string`                                          | —                                          | Tooltip on the launcher button                      |
| `emptyText`     | `string`                                          | `"No issues reported yet."`               | Text shown when there are no reports                |
| `userWhatsapp`  | `string`                                          | —                                          | Pre-fill user identity (WhatsApp number or email)   |
| `strategy`      | `"afterInteractive" \| "lazyOnload" \| "beforeInteractive"` | `"afterInteractive"` | Script loading strategy              |
| `src`           | `string`                                          | `"https://cdn.blindagents.com/report.js"` | Override CDN URL (self-hosting)                     |
| `onLoad`        | `() => void`                                      | —                                          | Called when the script loads successfully           |
| `onError`       | `(error: Error) => void`                          | —                                          | Called if the script fails to load                  |

## Why two import paths?

- `react-blind-agents` — plain React. Injects the script via `useEffect`. Works anywhere React runs.
- `react-blind-agents/next` — Next.js only. Uses `next/script` for correct hydration, strategy support, and deduplication across navigations.

Importing `react-blind-agents/next` in a non-Next.js app will throw because `next/script` won't be available.

## License

MIT
