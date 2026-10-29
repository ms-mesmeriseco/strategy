# strategy.mesmeriseco.com

Client proposal decks, rendered with shared slide templates and hosted on Vercel.

## Make a proposal (no code)
In a claude.ai chat with the **Mesmerise proposals** skill and the **Sanity** connector on, say
"Make a proposal for <client>" and paste your call notes and pricing. Claude saves it to
Sanity and replies with the link, e.g. `https://strategy.mesmeriseco.com/watt-utilities-x7k2p`.
It's live within a minute. To change it, keep chatting ("make the website Premium tier",
"swap the Moon BG case study for Frame of Mind").

If the link shows "This proposal needs a few fixes", paste that list back into the chat.

## Make a proposal (in code)
Proposals can also be files in `proposals/`, which is how the example deck works.
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

### Proposals from Claude chat (Sanity)
6. **Private dataset:** at sanity.io/manage → Mesmerise project (`wpr5jlmc`) → Datasets, add a
   dataset called `proposals` with visibility **Private**. (CLI: `npx sanity dataset create proposals --visibility private`.)
   It must be private: a public dataset would let anyone list every client's pricing.
7. **Read token:** in the same project, go to API → Tokens and add a **Viewer** token. In Vercel,
   set it as `SANITY_READ_TOKEN` and redeploy.
8. **Teammates:** invite each person to the Sanity project with a role that can edit documents.
   On Sanity's standard plans this also lets them edit the website's `production` dataset, so the
   skill tells Claude to only ever write to `proposals`.
9. **Skill:** run `npm run skill` to make `mesmerise-proposals-skill.zip`, then upload it in
   claude.ai → Settings → Capabilities → Skills. An org admin can share it with the whole team.
   Re-upload it whenever `claude-skill/mesmerise-proposals/SKILL.md` changes.
10. **Connector:** each teammate turns on the Sanity connector in claude.ai (Settings → Connectors)
    and signs in once.

The skill lists the saved case studies, testimonials and slide formats. If you change
`lib/types.ts` or `lib/defaults.ts`, update `SKILL.md` to match.

## Rebranding
The colours and fonts are tokens at the top of `app/globals.css`. You can override the accent colour
for a single proposal with `accent: "#hex"`.
