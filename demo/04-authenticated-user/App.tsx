/**
 * Step 4 — Authenticated user: pre-fill identity & link to your CRM
 *
 * Two props control how the widget handles a logged-in user:
 *
 * ┌─────────────────┬──────────────────────────────────────────────────────────┐
 * │ Prop            │ What it does                                             │
 * ├─────────────────┼──────────────────────────────────────────────────────────┤
 * │ userWhatsapp    │ Sent to the SDK as the user's phone/WhatsApp number.     │
 * │                 │ Also tells the widget "this user is already identified"  │
 * │                 │ — the verification prompt is SKIPPED.                    │
 * │                 │ Accepts an email address too (the field name is legacy). │
 * ├─────────────────┼──────────────────────────────────────────────────────────┤
 * │ externalId      │ Your app's own user ID (e.g. database PK, UUID).        │
 * │                 │ Stored as contact.external_id in Blind Agents so you     │
 * │                 │ can look up tickets / conversations by your own ID.      │
 * │                 │ Does NOT skip the verification prompt by itself —        │
 * │                 │ combine it with userWhatsapp for the full experience.    │
 * └─────────────────┴──────────────────────────────────────────────────────────┘
 *
 * Both props are supported in sdk-report AND sdk-chat — they share the same
 * initSession() call from sdk-core which sends both values to /pixel/init.
 *
 * Install:
 *   npm install @duvandroid/react-blind-agents
 */

import { BlindAgents } from '@duvandroid/react-blind-agents';

// Fake auth hook — replace with your real one (useSession, useAuth, etc.)
function useCurrentUser() {
  return {
    id: 'usr_abc123',       // your internal user ID
    email: 'jane@acme.com', // used as the WhatsApp/phone field (also accepts email)
  };
}

export default function App() {
  const user = useCurrentUser();

  return (
    <BlindAgents
      apiKey="YOUR_API_KEY"
      /**
       * userWhatsapp accepts a phone number OR an email address.
       * Passing either value:
       *   1. Pre-fills the identity step inside the widget
       *   2. Skips the verification prompt entirely (user is already known)
       */
      userWhatsapp={user.email}
      /**
       * externalId is YOUR internal user ID.
       * The SDK sends it to /pixel/init as `external_id`, which gets stored
       * on the Blind Agents contact record. This lets you:
       *   - Query tickets/conversations by your own user ID via the REST API
       *   - Match widget contacts to your database without relying on email/phone
       *
       * Supported by: Report widget ✅  Chat widget ✅  Guide widget ✅
       */
      externalId={user.id}
    >
      <main style={{ fontFamily: 'sans-serif', padding: 40 }}>
        <h1>Welcome, {user.email}</h1>
        <p>
          Both widgets below share your identity. No verification prompt will appear
          because <code>userWhatsapp</code> is set.
        </p>
        <p>
          Your user ID <code>{user.id}</code> is stored on the Blind Agents contact
          as <code>external_id</code>, so you can look up their tickets from your backend:
        </p>
        <pre style={{ background: '#f1f5f9', padding: 12, borderRadius: 6 }}>
          {`GET /api/contacts?external_id=${user.id}`}
        </pre>
      </main>

      {/* Both widgets inherit userWhatsapp + externalId from the provider */}
      <BlindAgents.Report
        primaryColor="#e11d48"
        title="Help Center"
        btnEmoji="🐛"
        position="bottom-right"
      />

      <BlindAgents.Chat
        agentId="YOUR_AGENT_UUID"
        primaryColor="#625df5"
        position="bottom-left"
      />
    </BlindAgents>
  );
}
