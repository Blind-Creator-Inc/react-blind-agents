/**
 * Step 7 — Custom widget position & sizing
 *
 * Use a position preset or pass a custom CSS object to place
 * the launcher anywhere on the screen.
 * Use `anchor` to mount the widget inside a specific container.
 */

import { BlindAgents } from '@duvandroid/react-blind-agents';

export default function App() {
  return (
    <BlindAgents apiKey="YOUR_API_KEY">
      <main style={{ fontFamily: 'sans-serif', padding: 40 }}>
        <h1>Custom positions</h1>

        {/* Container for the anchored widget */}
        <div
          id="sidebar"
          style={{ position: 'relative', width: 300, height: 400, background: '#f1f5f9' }}
        >
          <p style={{ padding: 16 }}>Widget mounts inside this box</p>
        </div>
      </main>

      {/* Preset position */}
      <BlindAgents.Report
        primaryColor="#e11d48"
        position="bottom-left"
        bubbleSize={48}
      />

      {/* Custom position with arbitrary CSS */}
      <BlindAgents.Chat
        agentId="YOUR_AGENT_UUID"
        primaryColor="#625df5"
        position={{ bottom: '24px', right: '100px' }}
      />

      {/* Anchored inside #sidebar — launcher appears relative to that element */}
      <BlindAgents.Guide
        anchor="#sidebar"
        position="bottom-right"
      />
    </BlindAgents>
  );
}
