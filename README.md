# OneAI Dashboard

A responsive **Next.js** frontend prototype for the OneAI multi-model AI platform analytics and administration experience.

## Product context

The dashboard is designed around the public OneAI experience at [oneaibd.com](https://oneaibd.com/), including the following subscription tiers:

- **Free** — ৳0/month
- **Lite** — ৳99/month launch offer
- **Plus** — ৳299/month launch offer
- **Pro** — ৳799/month launch offer

It includes local brand assets and model icons for GPT, Claude, Gemini, Grok, DeepSeek, MiniMax, and Veo.

## Dashboard capabilities

- Revenue, token consumption, model cost, and gross-margin reporting
- Plan-level analytics across Free, Lite, Plus, and Pro subscriptions
- Interactive top-10 and bottom-10 customer usage analysis per plan
- AI power-user leaderboard by tokens or routing savings
- Multi-model catalog, access controls, creative-model overview, and routing controls
- User search, plan/role filtering, invitations, admin profile drawer, and exports
- Invoices, plan management, payment method, notifications, workspace switching, and settings controls
- Responsive desktop, tablet, and mobile UI

## Run locally

Install dependencies and start the Next.js development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npm run start
```

## Project structure

```text
app/
  globals.css       # Responsive dashboard system and UI styling
  layout.js         # App metadata and shared layout
  page.js           # Client-side dashboard views and interactions
public/assets/
  oneai-logo-white.png
  models/           # Local SVG model marks
```

## Notes

Usage, revenue, cost, user, and leaderboard figures are frontend demonstration data. Connect production billing, subscription, provider-usage, and user APIs to replace the sample metrics.
