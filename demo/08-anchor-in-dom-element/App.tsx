/**
 * Step 8 — Mount a widget inside a specific DOM element
 *
 * By default every widget appends itself to <body> and uses `position: fixed`
 * so it floats over the whole page. Pass `anchor` to change both:
 *
 *   anchor="#my-container"
 *
 * What changes when you use anchor:
 *   1. The widget is mounted INSIDE document.querySelector("#my-container")
 *      instead of <body>.
 *   2. The launcher switches from `position: fixed` to `position: absolute`,
 *      so it is positioned relative to that container, not the viewport.
 *   3. The SDK automatically sets `position: relative` on the container
 *      if it doesn't already have a positioning context.
 *
 * Good use cases:
 *   - Embed a chat bubble in a sidebar or support panel
 *   - Keep the bug reporter scoped to a specific app section
 *   - Iframe / micro-frontend environments where you can't touch <body>
 *
 * Install:
 *   npm install @duvandroid/react-blind-agents
 */

import { useRef, useEffect } from 'react';
import { BlindAgents } from '@duvandroid/react-blind-agents';

export default function App() {
  return (
    <BlindAgents apiKey="YOUR_API_KEY">
      <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>

        {/* ── Main content ───────────────────────────────────────────────── */}
        <main style={{ flex: 1, padding: 40 }}>
          <h1>My App</h1>
          <p>The chat widget lives inside the sidebar, not floating over the page.</p>
        </main>

        {/* ── Sidebar that owns the widget ───────────────────────────────── */}
        {/*
          IMPORTANT: the container must have a non-static CSS position so the
          widget's `position: absolute` launcher stays inside it.
          The SDK sets `position: relative` automatically, but being explicit
          here is clearer and avoids any flash.
        */}
        <aside
          id="support-sidebar"
          style={{
            position: 'relative',   // required for absolute-positioned widget
            width: 320,
            borderLeft: '1px solid #e2e8f0',
            background: '#f8fafc',
            padding: 24,
            overflow: 'hidden',     // clip the widget to this box
          }}
        >
          <h2 style={{ margin: '0 0 12px', fontSize: 16 }}>Support</h2>
          <p style={{ fontSize: 14, color: '#64748b' }}>
            Need help? Use the chat button below.
          </p>

          {/*
            The widget mounts its launcher button inside #support-sidebar.
            Position "bottom-right" means bottom-right corner of the sidebar,
            not the viewport.
          */}
          <BlindAgents.Chat
            agentId="YOUR_AGENT_UUID"
            primaryColor="#625df5"
            anchor="#support-sidebar"   // ← CSS selector of the container above
            position="bottom-right"     // relative to #support-sidebar
            bubbleSize={48}
            panelWidth="300px"
            panelHeight="480px"
          />
        </aside>

      </div>

      {/*
        You can combine anchored and non-anchored widgets at the same time.
        This report widget is anchored to <body> (default) and floats freely.
      */}
      <BlindAgents.Report
        primaryColor="#e11d48"
        btnEmoji="🐛"
        position="bottom-left"
      />
    </BlindAgents>
  );
}
