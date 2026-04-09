# @duvandroid/react-blind-agents

React component for the [Blind Agents](https://blindagents.com) pixel widget — AI bug reporter, webchat, and product guides.

[![npm](https://img.shields.io/npm/v/@duvandroid/react-blind-agents)](https://www.npmjs.com/package/@duvandroid/react-blind-agents)
[![license](https://img.shields.io/npm/l/@duvandroid/react-blind-agents)](LICENSE)

---

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [React (Vite / CRA)](#react-vite--cra)
- [Next.js — App Router](#nextjs--app-router)
- [Next.js — Pages Router](#nextjs--pages-router)
- [Authenticated users](#authenticated-users)
- [Props reference](#props-reference)
- [HTML / Any website (script tag)](#html--any-website-script-tag)
- [Shopify](#shopify)
- [Lovable](#lovable)
- [Wix](#wix)
- [WordPress](#wordpress)
- [Webflow](#webflow)
- [Squarespace](#squarespace)
- [Ghost](#ghost)
- [Bubble](#bubble)
- [Framer](#framer)
- [Google Tag Manager](#google-tag-manager)
- [Webhooks — Slack integration](#webhooks--slack-integration)
- [Webhooks — n8n integration](#webhooks--n8n-integration)
- [Webhook payload reference](#webhook-payload-reference)
- [Signature verification](#signature-verification)

---

## Installation

```bash
npm install @duvandroid/react-blind-agents
```

---

## Quick Start

Paste this before `</body>` in any HTML file — no npm needed:

```html
<script
  src="https://cdn.blindagents.com/report.js"
  data-api-key="YOUR_API_KEY"
  data-primary-color="#e11d48"
  data-title="Help Center"
  data-report-btn-text="Report an issue"
  data-btn-emoji="🔴"
  data-btn-tooltip="Report an issue"
  data-empty-text="No issues reported yet."
  data-user-whatsapp="">
</script>
```

> Get your API key from **Blind Agents → Settings → API Keys**.

---

## React (Vite / CRA)

```tsx
// src/App.tsx
import { BlindAgentsWidget } from '@duvandroid/react-blind-agents';

export default function App() {
  return (
    <>
      <MyRoutes />
      <BlindAgentsWidget
        apiKey="YOUR_API_KEY"
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

Place `<BlindAgentsWidget>` once at the App root — it renders nothing in the DOM, only injects the script.

---

## Next.js — App Router

Import from the `/next` subpath — it uses `next/script` internally for correct hydration and strategy support.

```tsx
// app/layout.tsx
import { BlindAgentsWidget } from '@duvandroid/react-blind-agents/next';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <BlindAgentsWidget
          apiKey="YOUR_API_KEY"
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

---

## Next.js — Pages Router

```tsx
// pages/_app.tsx
import type { AppProps } from 'next/app';
import { BlindAgentsWidget } from '@duvandroid/react-blind-agents/next';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <BlindAgentsWidget apiKey="YOUR_API_KEY" primaryColor="#e11d48" />
    </>
  );
}
```

---

## Authenticated users

Pass the logged-in user's phone or email via `userWhatsapp` to skip the identity verification step inside the widget:

```tsx
// components/ReportWidget.tsx
'use client';
import { BlindAgentsWidget } from '@duvandroid/react-blind-agents/next';
import { useAuth } from './AuthProvider';

export function ReportWidget() {
  const { user } = useAuth();
  return (
    <BlindAgentsWidget
      apiKey="YOUR_API_KEY"
      primaryColor="#e11d48"
      userWhatsapp={user?.phone ?? user?.email ?? ''}
    />
  );
}
```

Place `<ReportWidget />` **inside** your `AuthProvider` tree so `useAuth()` has access to the context.

---

## Props reference

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `apiKey` | `string` | ✅ | — | Your Blind Agents public API key (`ba_...`) |
| `primaryColor` | `string` | — | — | Accent color (any valid CSS color) |
| `title` | `string` | — | `"Help Center"` | Widget panel header title |
| `reportBtnText` | `string` | — | `"Report an issue"` | Report button label |
| `btnEmoji` | `string` | — | — | Emoji on the floating launcher button |
| `btnTooltip` | `string` | — | — | Tooltip on the launcher button |
| `emptyText` | `string` | — | `"No issues reported yet."` | Text shown when there are no reports |
| `userWhatsapp` | `string` | — | — | Pre-fill user phone/email — skips identity verification |
| `strategy` | `"afterInteractive" \| "lazyOnload" \| "beforeInteractive"` | — | `"afterInteractive"` | Script loading strategy |
| `src` | `string` | — | `"https://cdn.blindagents.com/report.js"` | Override CDN URL (self-hosting) |
| `onLoad` | `() => void` | — | — | Called when the script loads |
| `onError` | `(error: Error) => void` | — | — | Called if the script fails to load |

### Why two import paths?

| Import | Use case |
|---|---|
| `@duvandroid/react-blind-agents` | Plain React — Vite, CRA, Remix, any non-Next.js |
| `@duvandroid/react-blind-agents/next` | Next.js — App Router & Pages Router |

Importing `/next` in a non-Next.js project will throw because `next/script` won't be available.

---

## HTML / Any website (script tag)

No npm required. Paste before `</body>`:

```html
<script
  src="https://cdn.blindagents.com/report.js"
  data-api-key="YOUR_API_KEY"
  data-primary-color="#e11d48"
  data-title="Help Center"
  data-report-btn-text="Report an issue"
  data-btn-emoji="🔴"
  data-btn-tooltip="Report an issue"
  data-empty-text="No issues reported yet."
  data-user-whatsapp="">
</script>
```

The `data-*` attribute names map 1:1 to the React props (kebab-case → camelCase).

---

## Shopify

1. **Online Store → Themes → Edit code → Layout → theme.liquid**
2. Paste before `</body>`:

```liquid
{%- comment -%} Blind Agents widget {%- endcomment -%}
<script
  src="https://cdn.blindagents.com/report.js"
  data-api-key="YOUR_API_KEY"
  data-primary-color="#e11d48"
  data-title="Help Center"
  data-report-btn-text="Report an issue"
  data-btn-emoji="🔴"
  data-btn-tooltip="Report an issue"
  data-user-whatsapp="{{ customer.phone | default: '' }}">
</script>
```

The `{{ customer.phone }}` Liquid variable auto-fills logged-in customer's phone — skipping identity verification for authenticated shoppers.

For Shopify Plus headless stores (Hydrogen / Remix), use the React npm package instead.

---

## Lovable

**Option A — Prompt Lovable:**
> "Install @duvandroid/react-blind-agents and add a BlindAgentsWidget to App.tsx with apiKey='YOUR_API_KEY' and primaryColor='#e11d48'"

**Option B — Manual (index.html):**
```html
<!-- Paste in index.html before </body> -->
<script
  src="https://cdn.blindagents.com/report.js"
  data-api-key="YOUR_API_KEY"
  data-primary-color="#e11d48"
  data-title="Help Center"
  data-report-btn-text="Report an issue"
  data-btn-emoji="🔴">
</script>
```

---

## Wix

**Option A — Custom Code (no-code, recommended):**
1. **Settings → Custom Code → + Add Custom Code**
2. Paste the script tag, set placement to **Body – end**, apply to **All Pages**, load **Once**

**Option B — Velo:**
```js
$w.onReady(() => {
  const script = document.createElement('script');
  script.src = 'https://cdn.blindagents.com/report.js';
  script.setAttribute('data-api-key', 'YOUR_API_KEY');
  script.setAttribute('data-primary-color', '#e11d48');
  script.setAttribute('data-title', 'Help Center');
  script.defer = true;
  document.body.appendChild(script);
});
```

---

## WordPress

**Via functions.php (child theme):**
```php
function blindagents_widget() {
    echo '<script
      src="https://cdn.blindagents.com/report.js"
      data-api-key="YOUR_API_KEY"
      data-primary-color="#e11d48"
      data-title="Help Center"
      data-report-btn-text="Report an issue"
      data-btn-emoji="🔴"
      defer>
    </script>';
}
add_action('wp_footer', 'blindagents_widget');
```

**Via plugin (no-code):** Install **WPCode** or **Insert Headers and Footers**, paste the script tag in the Footer section.

**Via Elementor:** Custom Code → Body End.

---

## Webflow

**Site Settings → Custom Code → Footer Code:**
```html
<script
  src="https://cdn.blindagents.com/report.js"
  data-api-key="YOUR_API_KEY"
  data-primary-color="#e11d48"
  data-title="Help Center"
  data-report-btn-text="Report an issue"
  data-btn-emoji="🔴"
  defer>
</script>
```

---

## Squarespace

> Requires Business plan or above.

**Settings → Advanced → Code Injection → Footer:**
```html
<script
  src="https://cdn.blindagents.com/report.js"
  data-api-key="YOUR_API_KEY"
  data-primary-color="#e11d48"
  data-title="Help Center"
  data-report-btn-text="Report an issue"
  data-btn-emoji="🔴"
  defer>
</script>
```

---

## Ghost

**Admin → Settings → Code Injection → Site Footer:**
```html
<script
  src="https://cdn.blindagents.com/report.js"
  data-api-key="YOUR_API_KEY"
  data-primary-color="#e11d48"
  data-title="Help Center"
  data-report-btn-text="Report an issue"
  data-btn-emoji="🔴"
  defer>
</script>
```

---

## Bubble

**Settings → SEO / metatags → Script/meta tags in header:**
```html
<script
  src="https://cdn.blindagents.com/report.js"
  data-api-key="YOUR_API_KEY"
  data-primary-color="#e11d48"
  data-title="Help Center"
  data-report-btn-text="Report an issue"
  data-btn-emoji="🔴"
  defer>
</script>
```

Or add an **HTML element** on any page and paste the script tag there.

---

## Framer

**Site Settings → General → Custom Code → End of body tag:**
```html
<script
  src="https://cdn.blindagents.com/report.js"
  data-api-key="YOUR_API_KEY"
  data-primary-color="#e11d48"
  data-title="Help Center"
  data-report-btn-text="Report an issue"
  data-btn-emoji="🔴"
  defer>
</script>
```

> Requires a Framer paid plan.

---

## Google Tag Manager

1. **Tags → New → Custom HTML**
2. Paste:

```html
<script>
(function() {
  var el = document.createElement('script');
  el.src = 'https://cdn.blindagents.com/report.js';
  el.setAttribute('data-api-key', 'YOUR_API_KEY');
  el.setAttribute('data-primary-color', '#e11d48');
  el.setAttribute('data-title', 'Help Center');
  el.setAttribute('data-report-btn-text', 'Report an issue');
  el.setAttribute('data-btn-emoji', '🔴');
  el.defer = true;
  document.head.appendChild(el);
})();
</script>
```

3. Trigger: **All Pages — Page View**
4. Submit and publish

---

## Webhooks — Slack integration

Get real-time Slack notifications for every Blind Agents event.

### 1. Create a Slack Incoming Webhook

1. Go to [api.slack.com/apps](https://api.slack.com/apps) → **Create New App → From scratch**
2. **Features → Incoming Webhooks** → enable → **Add New Webhook to Workspace**
3. Select the channel (e.g. `#bugs`) and copy the webhook URL

Test it:
```bash
curl -X POST https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK \
  -H "Content-Type: application/json" \
  -d '{"text": "Blind Agents test message ✅"}'
```

### 2. Create a Blind Agents webhook

In **Blind Agents → Webhooks → Add webhook**, set the URL to your server endpoint and select events.

### 3. Forward events to Slack (Node.js / Express)

```ts
import express from 'express';
import crypto from 'crypto';

const app = express();
app.use(express.raw({ type: 'application/json' })); // raw body required for signature check

const BA_SECRET = process.env.BLIND_AGENTS_WEBHOOK_SECRET;
const SLACK_URL = process.env.SLACK_WEBHOOK_URL;

function verify(rawBody: string, signature: string) {
  const parts = Object.fromEntries(signature.split(',').map(p => p.split('=')));
  const expected = crypto.createHmac('sha256', BA_SECRET!)
    .update(`${parts.t}.${rawBody}`).digest('hex');
  const valid  = crypto.timingSafeEqual(Buffer.from(parts.v1, 'hex'), Buffer.from(expected, 'hex'));
  const recent = Date.now() / 1000 - Number(parts.t) < 300;
  return valid && recent;
}

app.post('/webhooks/blind-agents', async (req, res) => {
  const sig = req.headers['x-blindagents-signature'] as string;
  if (!verify(req.body.toString(), sig)) return res.sendStatus(401);

  const { event, data } = JSON.parse(req.body.toString());

  const messages: Record<string, string> = {
    'ticket.created':        `🎫 *New ticket:* <${data.page_url}|${data.title}> — ${data.priority} priority`,
    'ticket.status_changed': `🔄 *Ticket updated:* ${data.title} → ${data.status}`,
    'ticket.resolved':       `✅ *Ticket resolved:* ${data.title}`,
    'ticket.closed':         `🔒 *Ticket closed:* ${data.title}`,
    'contact.created':       `👤 *New contact:* ${data.name} (${data.email})`,
    'contact.updated':       `✏️ *Contact updated:* ${data.name}`,
    'contact.assigned':      `📋 *Contact assigned:* ${data.name}`,
    'contact.tag_added':     `🏷️ *Tag added:* ${data.tag} → ${data.contact_id}`,
    'contact.comment_added': `💬 *New comment on contact:* ${data.content}`,
    'conversation.created':  `💬 *New conversation started*`,
    'conversation.closed':   `🔒 *Conversation closed*`,
  };

  await fetch(SLACK_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: messages[event] ?? `📡 Blind Agents event: ${event}` }),
  });

  res.sendStatus(200);
});
```

### 4. Rich Slack messages with Block Kit (optional)

```ts
const block = {
  blocks: [
    { type: 'header', text: { type: 'plain_text', text: '🎫 New Bug Report' } },
    {
      type: 'section',
      fields: [
        { type: 'mrkdwn', text: `*Title:*\n${data.title}` },
        { type: 'mrkdwn', text: `*Priority:*\n${data.priority}` },
        { type: 'mrkdwn', text: `*Reporter:*\n${data.contact?.name ?? 'Anonymous'}` },
        { type: 'mrkdwn', text: `*Page:*\n${data.page_url ?? '—'}` },
      ],
    },
    {
      type: 'actions',
      elements: [{
        type: 'button',
        text: { type: 'plain_text', text: 'View ticket' },
        url: `https://app.blindagents.com/tickets/${data.id}`,
        style: 'primary',
      }],
    },
  ],
};
```

---

## Webhooks — n8n integration

Connect Blind Agents to any service (Slack, Jira, Notion, Google Sheets, HubSpot…) without writing a server.

### 1. Add a Webhook trigger node in n8n

1. Create a new workflow in n8n
2. Add a **Webhook** node → Method: **POST** → copy the URL
3. In **Blind Agents → Webhooks → Add webhook**, paste that URL and select events
4. Copy the **signing secret**

### 2. Verify the signature (Code node)

Add a **Code** node after the Webhook trigger. Store the secret in **n8n Credentials** as `BLIND_AGENTS_SECRET`:

```js
const crypto = require('crypto');

const secret    = $env.BLIND_AGENTS_SECRET;
const signature = $input.first().headers['x-blindagents-signature'];
const rawBody   = JSON.stringify($input.first().body);

const parts = Object.fromEntries(signature.split(',').map(p => p.split('=')));
const hmac  = crypto.createHmac('sha256', secret).update(`${parts.t}.${rawBody}`).digest('hex');

const isValid  = crypto.timingSafeEqual(Buffer.from(parts.v1, 'hex'), Buffer.from(hmac, 'hex'));
const isRecent = Math.abs(Date.now() / 1000 - Number(parts.t)) < 300;

if (!isValid || !isRecent) throw new Error('Invalid signature — aborting workflow');

return $input.all();
```

### 3. Send to Slack (Slack node)

Add a **Slack** node, connect it to your workspace, and set the message text using expressions:

```
🎫 New ticket: {{ $json.body.data.title }}
Priority: {{ $json.body.data.priority }}
Reporter: {{ $json.body.data.contact.name }}
Page: {{ $json.body.data.page_url }}
```

### 4. Always respond with 200

Add a **Respond to Webhook** node at the end — Response Code `200`. Without it, Blind Agents marks the delivery as failed and retries.

### Other n8n workflow ideas

| Trigger | Action |
|---|---|
| `ticket.created` | Create Jira / Linear issue |
| `ticket.created` (high priority) | Send Gmail alert to on-call |
| `ticket.resolved` | Append row to Google Sheet |
| `ticket.status_changed` | Update Notion database row |
| `contact.created` | Sync contact to HubSpot / Mailchimp |
| `contact.tag_added` | Enroll contact in an email sequence |
| `contact.comment_added` | Log internal notes to Notion |
| `conversation.closed` | Trigger a CSAT survey email |
| Any event | POST to Zapier catch hook for further routing |

### Self-hosting n8n with Docker

```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -e N8N_BASIC_AUTH_ACTIVE=true \
  -e N8N_BASIC_AUTH_USER=admin \
  -e N8N_BASIC_AUTH_PASSWORD=yourpassword \
  -v ~/.n8n:/home/node/.n8n \
  docker.n8n.io/n8nio/n8n
```

Expose port 5678 via your domain and use `https://your-domain.com/webhook/...` as the Blind Agents webhook URL.

---

## Webhook payload reference

Every event sends this JSON body:

```json
{
  "id": "evt_01HXYZ...",
  "event": "ticket.created",
  "created_at": "2026-04-09T03:00:00Z",
  "data": { ... }
}
```

The `data` shape depends on the event type:

**Ticket events** (`ticket.created`, `ticket.status_changed`, `ticket.resolved`, `ticket.closed`)

```json
{
  "id": "uuid",
  "org_id": "uuid",
  "contact_id": "uuid or null",
  "title": "Button not working on checkout",
  "description": "Steps to reproduce...",
  "status": "open",
  "priority": "high",
  "type": "bug",
  "page_url": "https://yoursite.com/checkout",
  "created_at": "2026-04-09T03:00:00+00:00",
  "updated_at": "2026-04-09T03:00:00+00:00"
}
```

For `ticket.status_changed`, `ticket.resolved`, and `ticket.closed`, the payload also includes:

```json
{
  "previous_status": "open",
  "changed_by_id": "uuid or null"
}
```

**Contact events** (`contact.created`, `contact.updated`, `contact.assigned`)

```json
{
  "contact_id": "uuid",
  "email": "jane@example.com",
  "name": "Jane Doe",
  "phone": "1234567890"
}
```

For `contact.assigned`, the payload also includes:
```json
{
  "assigned_to_id": "uuid or null"
}
```

**Contact tag events** (`contact.tag_added`, `contact.tag_removed`)

```json
{
  "contact_id": "uuid",
  "tag": "vip"
}
```

**Contact comment event** (`contact.comment_added`)

```json
{
  "contact_id": "uuid",
  "comment_id": "uuid",
  "author_id": "uuid",
  "content": "Followed up via email."
}
```

### Supported events

| Event | Fired when |
|---|---|
| `ticket.created` | A new ticket is submitted |
| `ticket.status_changed` | Ticket status is updated (any change) |
| `ticket.resolved` | Ticket is marked resolved |
| `ticket.closed` | Ticket is closed |
| `contact.created` | A new contact is registered |
| `contact.updated` | Contact profile fields are edited |
| `contact.assigned` | Contact is assigned to a team member |
| `contact.tag_added` | A tag is added to a contact |
| `contact.tag_removed` | A tag is removed from a contact |
| `contact.comment_added` | An internal comment is posted on a contact |
| `conversation.created` | A new chat conversation starts |
| `conversation.closed` | A conversation is closed |

---

## Signature verification

Every request includes an `X-BlindAgents-Signature` header:

```
t={unix_timestamp},v1={hmac_sha256(secret, "{timestamp}.{raw_body}")}
```

**Node.js:**
```ts
import crypto from 'crypto';

function verifyWebhook(rawBody: string, signature: string, secret: string) {
  const parts = Object.fromEntries(signature.split(',').map(p => p.split('=')));
  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${parts.t}.${rawBody}`)
    .digest('hex');
  const valid  = crypto.timingSafeEqual(Buffer.from(parts.v1, 'hex'), Buffer.from(expected, 'hex'));
  const recent = Date.now() / 1000 - Number(parts.t) < 300;
  return valid && recent;
}
```

**Python:**
```python
import hmac, hashlib, time

def verify_webhook(raw_body: bytes, signature: str, secret: str) -> bool:
    parts = dict(p.split("=", 1) for p in signature.split(","))
    msg = f"{parts['t']}.".encode() + raw_body
    expected = hmac.new(secret.encode(), msg, hashlib.sha256).hexdigest()
    return (
        hmac.compare_digest(parts["v1"], expected)
        and abs(time.time() - int(parts["t"])) < 300
    )
```

**Go:**
```go
import (
    "crypto/hmac"
    "crypto/sha256"
    "encoding/hex"
    "math"
    "strings"
    "strconv"
    "time"
)

func VerifyWebhook(rawBody []byte, signature, secret string) bool {
    parts := map[string]string{}
    for _, p := range strings.Split(signature, ",") {
        kv := strings.SplitN(p, "=", 2)
        if len(kv) == 2 { parts[kv[0]] = kv[1] }
    }
    ts, _ := strconv.ParseInt(parts["t"], 10, 64)
    msg := append([]byte(parts["t"]+"."), rawBody...)
    mac := hmac.New(sha256.New, []byte(secret))
    mac.Write(msg)
    expected, _ := hex.DecodeString(hex.EncodeToString(mac.Sum(nil)))
    got, _      := hex.DecodeString(parts["v1"])
    return hmac.Equal(got, expected) && math.Abs(float64(time.Now().Unix()-ts)) < 300
}
```

> Always use constant-time comparison (`timingSafeEqual` / `hmac.Equal` / `hmac.compare_digest`) and reject requests older than 5 minutes to prevent replay attacks.

---

## License

MIT © [Blind Agents](https://blindagents.com)
