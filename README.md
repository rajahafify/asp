# ASEAN Startup Passport

Cross-border eKYB and deal matching for ASEAN startups. Gemma and Gemini handle multilingual registry documents, UBO mapping and readiness scoring, and the app matches startups to corporate challenges and tracks each deal to close.

Every company, person, document and buyer in the demo is synthetic.

## What it does

- **eKYB:** upload an SSM, ACRA, AHU or DBD registry extract, an IC or passport, and an address video. Gemma or Gemini extracts the fields and checks them against each other.
- **Readiness:** an investment readiness score built from ownership, financials, compliance and ESG.
- **Challenges and deals:** corporate challenges matched to the startup, with a six-stage deal tracker from AI Matched to Deal Closed.
- **Personas:** four demo startups, plus an empty "New Founder" profile for running the flow from scratch.

## Run locally

Requires Node.js 20 or later.

```bash
npm install
cp .env.example .env     # add GEMINI_API_KEY
npm run dev              # Express server with Vite, on http://localhost:3000
```

`npm run build` builds the front end to `dist/`. `npm run lint` runs the TypeScript check.

## API routes

The `/api` routes run on the Express server in `server.ts` for local development. On Cloudflare Pages they run as Pages Functions in `functions/`.

| Route | Purpose |
| --- | --- |
| `GET /api/health` | Server status and whether a key is set |
| `POST /api/ai/test-connection` | Test a model and key (Settings page) |
| `POST /api/ekyb/analyze` | Extract fields from a registry document |
| `POST /api/ekyb/chat-diligence` | Due-diligence chat |
| `POST /api/ekyb/verify-simple` | Three-proof eKYB check |
| `POST /api/ekyb/verify-passport` | Structural check of a verifiable credential |

The model is chosen in Settings. The Gemma 4 option uses `gemma-4-26b-a4b-it`.

## API keys

The key is read in this order: the `x-gemini-api-key` header or the Settings page (bring your own key), then the `GEMINI_API_KEY` environment variable. Never commit a key. Keep it in `.env`, which is git-ignored, or in your host's secret store.

## Deploy to Cloudflare Pages

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | blank |

Then add `GEMINI_API_KEY` as a Pages secret under **Settings → Variables and Secrets**, and redeploy. The `functions/` folder runs the API routes on Pages.

## Project layout

- `src/`: React front end (portal, eKYB, challenges, deal tracker, settings)
- `src/data/`: synthetic demo data for personas, deals, dossiers and eKYB
- `functions/`: Pages Functions that serve the `/api` routes
- `server.ts`: Express server for local development
- `public/samples/`: specimen SSM certificate and IC card, marked demo only

## Disclaimer

This is a prototype. Scores and verdicts are illustrative and are not legal, financial or investment advice.
