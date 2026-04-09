/**
 * Step 1 — Bug Reporter widget (plain React / Vite)
 *
 * Install:
 *   npm install @duvandroid/react-blind-agents
 *
 * Run:
 *   npm run dev
 */

import { BlindAgents } from '@duvandroid/react-blind-agents';

export default function App() {
  return (
    // Step 1: Wrap your app with <BlindAgents apiKey="...">
    // All child widgets inherit the apiKey automatically.
    <BlindAgents apiKey="YOUR_API_KEY">

      {/* Your app content goes here */}
      <main style={{ fontFamily: 'sans-serif', padding: 40 }}>
        <h1>My App</h1>
        <p>The bug reporter button should appear in the bottom-right corner.</p>
      </main>

      {/* Step 2: Drop in the Report widget anywhere inside <BlindAgents> */}
      <BlindAgents.Report
        primaryColor="#e11d48"        // accent color — any valid CSS color
        title="Help Center"           // panel header
        reportBtnText="Report a bug"  // button label inside the panel
        btnEmoji="🐛"                 // launcher button emoji
        btnTooltip="Report a bug"     // tooltip on hover
        emptyText="No reports yet."   // empty state text
        position="bottom-right"       // 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
        bubbleSize={56}               // launcher diameter in px
      />
    </BlindAgents>
  );
}
