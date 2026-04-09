/**
 * Step 5 — Next.js App Router
 *
 * Import from '@duvandroid/react-blind-agents/next' — this uses next/script
 * internally so strategies and hydration work correctly.
 *
 * Place in app/layout.tsx (root layout) so widgets are present on every page.
 *
 * Install:
 *   npm install @duvandroid/react-blind-agents
 */

// app/layout.tsx
import { BlindAgents } from '@duvandroid/react-blind-agents/next';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}

        {/* Step 1: Wrap widgets in <BlindAgents> with your API key */}
        <BlindAgents
          apiKey={process.env.NEXT_PUBLIC_BLIND_AGENTS_KEY!}
          // Optional: pre-fill user identity server-side
          // userEmail={session?.user?.email}
          // userFullName={session?.user?.name}
          // externalId={session?.user?.id}
        >
          {/* Step 2: Add the widgets you want */}
          <BlindAgents.Report
            primaryColor="#e11d48"
            title="Help Center"
            btnEmoji="🐛"
            strategy="afterInteractive"   // default — loads after hydration
          />

          <BlindAgents.Chat
            agentId={process.env.NEXT_PUBLIC_AGENT_ID!}
            primaryColor="#625df5"
            position="bottom-left"
            fontFamily="Rounded"
            strategy="afterInteractive"
          />

          {/* Product guides — dashboard-configured */}
          <BlindAgents.Guide strategy="lazyOnload" />
        </BlindAgents>
      </body>
    </html>
  );
}

/**
 * .env.local:
 *   NEXT_PUBLIC_BLIND_AGENTS_KEY=ba_...
 *   NEXT_PUBLIC_AGENT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
 */
