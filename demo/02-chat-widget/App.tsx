/**
 * Step 2 — Webchat widget (plain React / Vite)
 *
 * Prerequisites:
 *   - Create an AI agent in Blind Agents → Agents
 *   - Copy the agent UUID from the agent's settings page
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
        <p>The chat button should appear in the bottom-right corner.</p>
      </main>

      <BlindAgents.Chat
        agentId="YOUR_AGENT_UUID"     // required — from Blind Agents → Agents
        primaryColor="#625df5"        // accent color
        btnEmoji="💬"                 // launcher emoji
        btnTooltip="Chat with us"     // launcher tooltip
        greeting="Hi! How can I help you today?" // shown before first message
        placeholder="Type a message…"            // input placeholder
        fontFamily="Rounded"          // 'System' | 'Serif' | 'Mono' | 'Rounded'
        fontSize="14px"               // any CSS font-size value
        position="bottom-right"
        panelWidth="380px"            // optional panel size override
        panelHeight="600px"
      />
    </BlindAgents>
  );
}
