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

Viewers can use the arrow keys to move between slides, and "Save as PDF" prints one slide per page.

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
