# Blind Agents — Demo Examples

Step-by-step examples for every integration scenario.

| # | Folder | What it shows |
|---|--------|---------------|
| 1 | [01-report-widget](./01-report-widget/App.tsx) | Bug reporter widget — basic setup in plain React / Vite |
| 2 | [02-chat-widget](./02-chat-widget/App.tsx) | Webchat widget with font, greeting, and placeholder customization |
| 3 | [03-guide-widget](./03-guide-widget/App.tsx) | Product guides — dashboard-driven, zero config required |
| 4 | [04-authenticated-user](./04-authenticated-user/App.tsx) | Pre-fill user identity to skip verification prompts |
| 5 | [05-nextjs-app-router](./05-nextjs-app-router/layout.tsx) | Next.js App Router — all three widgets in `app/layout.tsx` |
| 6 | [06-nextjs-pages-router](./06-nextjs-pages-router/_app.tsx) | Next.js Pages Router — widgets in `pages/_app.tsx` |
| 7 | [07-custom-position](./07-custom-position/App.tsx) | Custom launcher position, size, and container anchoring |
| 8 | [08-anchor-in-dom-element](./08-anchor-in-dom-element/App.tsx) | Mount a widget inside a specific DOM element (sidebar, panel, iframe) |

---

## Prerequisites

1. Sign up at [blindagents.com](https://blindagents.com) and create a project.
2. Go to **Settings → API Keys** and copy your `ba_...` key.
3. (For chat) Go to **Agents**, create an agent, and copy its UUID.
4. (For guides) Go to **Guides**, create modules, and configure DOM selectors.

---

## Running an example

These files are standalone snippets — copy the relevant file into your own project:

```bash
# Plain React (Vite)
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install @duvandroid/react-blind-agents
# Replace src/App.tsx with the contents of any 01–04 or 07 example
npm run dev
```

```bash
# Next.js App Router
npx create-next-app@latest my-app --typescript --app
cd my-app
npm install @duvandroid/react-blind-agents
# Replace app/layout.tsx with the contents of 05-nextjs-app-router/layout.tsx
npm run dev
```

```bash
# Next.js Pages Router
npx create-next-app@latest my-app --typescript
cd my-app
npm install @duvandroid/react-blind-agents
# Replace pages/_app.tsx with the contents of 06-nextjs-pages-router/_app.tsx
npm run dev
```

---

## Key concepts

### Provider pattern

All widgets must be nested inside `<BlindAgents apiKey="...">`. Props set on the provider (`userEmail`, `externalId`, etc.) are inherited by every child widget unless overridden at the widget level.

```tsx
<BlindAgents apiKey="ba_..." userEmail="jane@acme.com" externalId="usr_123">
  <BlindAgents.Report />   {/* inherits userEmail + externalId */}
  <BlindAgents.Chat agentId="..." userEmail="other@acme.com" /> {/* overrides userEmail */}
</BlindAgents>
```

### Import paths

| Import | Use case |
|--------|----------|
| `@duvandroid/react-blind-agents` | Plain React — Vite, CRA, Remix |
| `@duvandroid/react-blind-agents/next` | Next.js — App Router & Pages Router |

### Widget position presets

```tsx
position="bottom-right"   // default
position="bottom-left"
position="top-right"
position="top-left"
position={{ bottom: '20px', right: '80px' }}  // custom CSS object
```

### Font families (Chat widget)

| Value | Renders as |
|-------|-----------|
| `"System"` | OS default sans-serif |
| `"Serif"` | Georgia / Times New Roman |
| `"Mono"` | Fira Code / Courier New |
| `"Rounded"` | Nunito / Varela Round |
| any string | Treated as a custom font stack |
