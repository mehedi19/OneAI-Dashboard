# OneAI Dashboard

A responsive frontend prototype for the **OneAI** multi-model AI platform analytics and administration experience.

## Included

- Revenue, token consumption, model cost, and margin reporting
- Plan-level analytics for **Free**, **Lite**, **Plus**, and **Pro** subscriptions
- Top and bottom user-usage analysis for every plan
- AI power-user leaderboard
- Multi-model catalog and smart-routing controls
- User, role, invoice, settings, profile, notification, and workspace controls
- Local OneAI and model-brand assets for GPT, Claude, Gemini, Grok, DeepSeek, MiniMax, and Veo
- Responsive desktop, tablet, and mobile layout

## Run locally

The project is dependency-free. From this directory, run:

```bash
python3 -m http.server 8000 --bind 0.0.0.0
```

Then open [http://localhost:8000](http://localhost:8000).

## Notes

The dashboard interaction and visual data are frontend demonstration data. Integrate the UI with production billing, subscription, provider-usage, and user APIs to replace the sample metrics.

Public plan and product references are aligned with [oneaibd.com](https://oneaibd.com/).
