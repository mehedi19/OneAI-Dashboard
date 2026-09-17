# OneAI Dashboard

A responsive **Next.js** frontend prototype for the OneAI multi-model AI platform analytics and administration experience.

## Product context

The dashboard follows the public OneAI product direction at [oneaibd.com](https://oneaibd.com/). Its display data uses BDT pricing and includes the OneAI logo plus local model marks for GPT, Claude, Gemini, Grok, DeepSeek, MiniMax, and Veo.

| Plan | Launch price |
| --- | ---: |
| Free | BDT 0/month |
| Lite | BDT 99/month |
| Plus | BDT 299/month |
| Pro | BDT 799/month |

## Dashboard capabilities

- Revenue, token consumption, model cost, and gross-margin reporting
- Interactive SVG charts with hover/focus data tooltips
- Plan-level analytics across Free, Lite, Plus, and Pro subscriptions
- AI power-user leaderboards, model usage, and spend distribution
- Model catalogue, access controls, smart routing, and creative-model access
- User search, plan/role filters, invitations, profile drawer, and CSV exports
- Invoices, payment/plan flows, notifications, workspace switching, and settings controls
- Desktop, tablet, and mobile navigation layouts

## Developer architecture

The dashboard is intentionally organized by responsibility so feature work does not require editing one large page file.

```text
app/
  layout.js                         # Root metadata and shared global stylesheet
  page.js                           # Minimal Next.js route entry point
  globals.css                       # Design tokens, component styles, page styles, responsive rules

components/dashboard/
  Dashboard.jsx                     # Client state and page orchestration only
  navigation.jsx                    # Sidebar, top bar, mobile navigation
  primitives.jsx                    # Shared Button, Card, form, header, avatar, icon, footer components
  charts.jsx                        # Reusable interactive reporting/chart components
  sections.jsx                      # Shared page sections, metrics, tables, policy rows
  overlays.jsx                      # Notifications, profile drawer, modal dialogs
  downloads.js                      # Browser-only CSV/invoice download helpers
  pages/
    Overview.jsx                    # Overview and usage-intelligence page
    Spend.jsx                       # Spend and revenue page
    Models.jsx                      # Model catalogue and routing page
    Users.jsx                       # Members and invitations page
    Invoices.jsx                    # Billing history and payment page
    Settings.jsx                    # Workspace and developer settings page

lib/
  dashboard-data.js                 # Demo data, plan metadata, model metadata, menu configuration

public/assets/
  oneai-logo-white.png
  oneai-mark-*.png
  models/                           # Local SVG provider logos
```

### Development conventions

- Keep display-only seed data in `lib/dashboard-data.js`.
- Build repeated UI with primitives and section components instead of duplicating markup.
- Keep page-specific composition in `components/dashboard/pages/`.
- Keep coordination state (selected page, modal, notifications, workspace, profile) in `Dashboard.jsx`.
- Use the design tokens at the top of `app/globals.css` for palette, typography, borders, and shadows.
- Keep browser-only side effects (downloads, `window` calls) outside of data and presentation modules.

## Run locally

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm ci
npm run build
npm run start
```

`npm run build` uses webpack intentionally because it is the stable build path for this project environment.

## Notes

Usage, revenue, cost, user, and leaderboard figures are frontend demonstration data. Connect production billing, subscription, provider-usage, and user APIs to replace the seed metrics.
