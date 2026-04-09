/**
 * Step 6 — Next.js Pages Router
 *
 * Import from '@duvandroid/react-blind-agents/next'.
 * Place in pages/_app.tsx so widgets render on every page.
 *
 * Install:
 *   npm install @duvandroid/react-blind-agents
 */

// pages/_app.tsx
import type { AppProps } from 'next/app';
import { BlindAgents } from '@duvandroid/react-blind-agents/next';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />

      <BlindAgents apiKey={process.env.NEXT_PUBLIC_BLIND_AGENTS_KEY!}>
        <BlindAgents.Report
          primaryColor="#e11d48"
          title="Help Center"
          btnEmoji="🐛"
          strategy="afterInteractive"
        />

        <BlindAgents.Chat
          agentId={process.env.NEXT_PUBLIC_AGENT_ID!}
          primaryColor="#625df5"
          position="bottom-left"
          strategy="afterInteractive"
        />
      </BlindAgents>
    </>
  );
}

/**
 * .env.local:
 *   NEXT_PUBLIC_BLIND_AGENTS_KEY=ba_...
 *   NEXT_PUBLIC_AGENT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
 */
