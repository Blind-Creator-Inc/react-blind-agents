/**
 * Step 3 — Product Guides widget (plain React / Vite)
 *
 * The Guide widget is fully dashboard-driven — you configure which
 * DOM elements to annotate and what text to show in Blind Agents → Guides.
 *
 * No extra props are required. The widget fetches its module config
 * from the API using your apiKey.
 *
 * Install:
 *   npm install @duvandroid/react-blind-agents
 */

import { BlindAgents } from '@duvandroid/react-blind-agents';

export default function App() {
  return (
    <BlindAgents apiKey="YOUR_API_KEY">
      <main style={{ fontFamily: 'sans-serif', padding: 40 }}>
        <h1>My App</h1>

        {/* The guide tooltip will attach to elements matching the
            CSS selectors you configured in the Blind Agents dashboard. */}
        <button id="save-btn">Save</button>
        <button id="export-btn">Export</button>
      </main>

      {/* Minimal — just drop it in, config comes from the dashboard */}
      <BlindAgents.Guide />

      {/* Or with positioning / user identity overrides: */}
      {/*
      <BlindAgents.Guide
        position="bottom-left"
        externalId="usr_123"
        userEmail="jane@example.com"
        userFullName="Jane Doe"
      />
      */}
    </BlindAgents>
  );
}
