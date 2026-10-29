# strategy.mesmeriseco.com

Client proposal decks. Each proposal is one file in `proposals/`, rendered with
shared slide templates and hosted on Vercel.

## Make a proposal
```bash
npm install
npm run new -- "Client Name"   # creates proposals/client-name-xxxxx.ts
npm run dev                     # preview at http://localhost:3000/client-name-xxxxx
```
Then edit the new file (or ask your AI tool to; it will follow `CLAUDE.md`).
Commit on a branch, open a pull request, and check the Vercel preview link.
Once it's merged, the proposal is live at `https://strategy.mesmeriseco.com/<slug>`.

Viewers move between slides with the arrow keys, the on-screen arrows, or by swiping on a phone.
Each slide has its own link (e.g. `/<slug>#7`), and "Save as PDF" prints one slide per page.

## Slide types
Every proposal is built from these. Most decks use them in roughly this order (see `proposals/_template.ts`).

| Type | Use it for |
| --- | --- |
| `cover` | Opening slide with the client name |
| `contents` | Numbered list, built automatically from the `section` slides |
| `section` | Big title that opens each part (About, Website Audit, Investment…) |
| `text` | The thank-you letter, or any note with bullets |
| `columns` | Summary, Additional Thoughts: 2–4 ticked columns |
| `stats` · `logos` · `team` · `process` | Standard Mesmerise slides, filled in automatically |
| `case-study` · `testimonial` | Use a saved one (`use: "flo-landscapes"`) or write a new one |
| `table` | Focus areas summary, phase-by-phase plan |
| `audit` | Screenshots with key takeaways |
| `scale` | Vulnerable → Growing → Future-proof |
| `pricing` | Numbered priorities beside a price table |
| `options` | Website tiers, or add-ons (leave out `features` for compact cards) |
| `budget` | Annual budget with bar chart |
| `next-steps` · `closing` | Standard ending, filled in automatically |

Shared content (results, logos, team, case studies, testimonials) lives in `lib/defaults.ts`.
Change it there and every proposal picks it up.

## One-time setup
1. **Create the repo:** `gh repo create mesmerise/strategy-decks --private --source=. --push`
   (or create an empty private repo on GitHub and push to it).
2. **Vercel:** Import the repo as a new project on the Pro team, since client work
   isn't allowed on Hobby. No build settings are needed.
3. **Domain:** In Vercel, go to Project → Settings → Domains and add `strategy.mesmeriseco.com`.
   At your DNS provider, add `CNAME strategy → cname.vercel-dns.com`.
4. **Password (optional):** Set the `SITE_PASSWORD` environment variable in Vercel and redeploy.
   Every proposal will then ask for it once and remember it for 30 days. Without it,
   links are open but unguessable.
5. **Protect main:** In GitHub, go to Settings → Branches and require a pull request before merging to `main`.

## Rebranding
The colours and fonts are tokens at the top of `app/globals.css`. You can override the accent colour
for a single proposal with `accent: "#hex"`.
