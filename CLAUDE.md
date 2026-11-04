# Proposal decks: instructions for AI coding tools

This repo hosts client proposal decks at strategy.mesmeriseco.com. The people
editing it are mostly not developers. Keep changes small and predictable.

## Making a new proposal
1. Run `npm run new -- "Client Name"`. This creates `proposals/<client>-<random>.ts`
   and registers it in `proposals/index.ts`. Never create proposal files by hand
   and never remove the random suffix from a slug: it is what keeps links private.
2. Edit only that new file. Fill in the slides using the types in `lib/types.ts`.
   `proposals/harbour-and-pine-k7q2m.ts` shows every slide type in use.
   - Slides like `{ type: "team" }`, `{ type: "stats" }`, `{ type: "logos" }`, `{ type: "process" }`,
     `{ type: "next-steps" }` and `{ type: "closing" }` fill themselves from `lib/defaults.ts`.
     Only add content to them when this client needs something different.
   - Saved case studies and testimonials: `{ type: "case-study", use: "flo-landscapes" }`.
     The ids are listed in `lib/defaults.ts`.
   - Wrap words in `*asterisks*` to show them in the accent colour, e.g. `"Why *Mesmerise?*"`.
   - Delete slides the proposal doesn't need. Don't leave placeholder text in.
3. Run `npm run build` and fix any errors before committing.

## Proposals from Claude chat
Most proposals are written to Sanity (project `wpr5jlmc`, private dataset `proposals`) from a
claude.ai chat using the skill in `claude-skill/mesmerise-proposals/SKILL.md`; they're never
files in this repo. `lib/validate.ts` checks them before they render. If you add or change a
slide type or a saved case study/testimonial, update `lib/validate.ts` and `SKILL.md` too.

## Standard content
`lib/defaults.ts` holds the content shared by every proposal: results, client logos,
team, process, next steps, sign-off, case studies and testimonials. Change it only when
the person asks to update the standard content, since the change shows in every proposal.
Photos and logos live in `public/images/`.

## Rules
- Only edit files in `proposals/` unless the person explicitly asks to change the
  design or add a slide type. Don't touch `components/`, `app/`, `middleware.ts`
  or `app/globals.css` otherwise.
- Prices are numbers in AUD excluding GST (e.g. `9500`, not `"$9,500"`). Use `[5000, 15000]`
  for a range. "+ GST" is added on screen automatically.
- Use Australian English spelling.
- The accent is Mesmerise yellow by default. Only set `accent` on a proposal if the person asks,
  and use one of the brand colours listed at the top of `app/globals.css`. Don't edit CSS for it.
- Never add a page that lists proposals, and never remove the noindex settings.
- Never put passwords, API keys or private client data other than the proposal
  itself in the repo.
- Work on a branch and open a pull request; don't push to `main`.

## Adding a new slide type (only when asked)
Add it to the `Slide` union in `lib/types.ts`, add a matching `case` in
`components/slides/Slides.tsx`, and style it in `app/globals.css` using the
existing tokens. Wrap it in `Frame` so it gets the title rule, logo and year, and add
`rise` to its main blocks so they animate in. Don't add new colours or fonts.
