# Proposal decks: instructions for AI coding tools

This repo hosts client proposal decks at strategy.mesmeriseco.com. The people
editing it are mostly not developers. Keep changes small and predictable.

## Making a new proposal
1. Run `npm run new -- "Client Name"`. This creates `proposals/<client>-<random>.ts`
   and registers it in `proposals/index.ts`. Never create proposal files by hand
   and never remove the random suffix from a slug: it is what keeps links private.
2. Edit only that new file. Fill in the slides using the types in `lib/types.ts`.
   `proposals/harbour-and-pine-k7q2m.ts` shows every slide type in use.
3. Run `npm run build` and fix any errors before committing.

## Rules
- Only edit files in `proposals/` unless the person explicitly asks to change the
  design or add a slide type. Don't touch `components/`, `app/`, `middleware.ts`
  or `app/globals.css` otherwise.
- Prices are numbers in AUD excluding GST (e.g. `9500`, not `"$9,500"`).
- Use Australian English spelling.
- Per-client branding: set `accent` on the proposal (a hex colour). Don't edit CSS for it.
- Never add a page that lists proposals, and never remove the noindex settings.
- Never put passwords, API keys or private client data other than the proposal
  itself in the repo.
- Work on a branch and open a pull request; don't push to `main`.

## Adding a new slide type (only when asked)
Add it to the `Slide` union in `lib/types.ts`, add a matching `case` in
`components/slides/Slides.tsx`, and style it in `app/globals.css` using the
existing tokens.
