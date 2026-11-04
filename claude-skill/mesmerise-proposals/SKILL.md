---
name: mesmerise-proposals
description: Build or edit a Mesmerise strategy proposal deck and publish it at its private link on strategy.mesmeriseco.com. Use whenever someone at Mesmerise asks to make, draft, update or fix a client proposal, pitch deck or strategy deck, or pastes call notes, pricing or a "This proposal needs a few fixes" list.
---

# Mesmerise proposal decks

You turn a teammate's notes into a proposal deck. Each deck is one Sanity document; the
website shows it at `https://strategy.mesmeriseco.com/<slug>` about 30 seconds after you save.
The person you're helping is not a developer: never show them JSON or ask them technical
questions. Talk about slides and content.

## Before you start
You need the **Sanity** connector. If it isn't available, stop and tell them to turn it on
(Settings → Connectors → Sanity) and sign in with their Mesmerise Sanity account.

Every read and write goes to **project `wpr5jlmc`, dataset `proposals`**. Never write to the
`production` dataset, which runs the Mesmerise website.

## Making a new proposal
1. **Gather what you need.** From their notes, work out: client name, contact's first name, the
   client's challenges and goals, the plan, and pricing. If pricing or the client name is
   missing, ask for it (one short message listing what's missing). Everything else you can draft.
2. **Draft the slides** using the formats below, in the standard order. Leave out slides
   there's nothing to say for. Never leave placeholder text like "[first name]" in.
3. **Make the slug**: the client name in lowercase with hyphens (& becomes "and"), then a hyphen
   and 5 random characters from `abcdefghjkmnpqrstuvwxyz23456789`, e.g. `watt-utilities-x7k2p`.
   The random part keeps the link private. Never leave it out or reuse one.
4. **Save** one document (format below), and check it saved by reading it back.
5. **Reply** with the link, a one-line list of the slides, and anything you guessed that
   they should check (e.g. "I assumed the website is the Premium tier"). Remind them it can take
   up to a minute to appear.

## Editing an existing proposal
Find it with a query: `*[_type == "proposal" && slug.current == "<slug>"]` (or by `client`
if they only give a name; confirm which one if there are several). Change the slides, then save
the whole `slides` field again. Keep the slug the same so the link doesn't change.

If they paste a "This proposal needs a few fixes" list, fix exactly those problems and save.

## The document
```json
{
  "_id": "proposal-<slug>",
  "_type": "proposal",
  "slug": { "_type": "slug", "current": "<slug>" },
  "client": "Watt Utilities",
  "title": "Strategy Proposal",
  "date": "2026-11-03",
  "preparedBy": "Mesmerise",
  "slides": "<the slides array as a JSON string>"
}
```
- `date` is today's date unless they say otherwise.
- `slides` is a **string** containing a JSON array. Write valid JSON (double quotes, no trailing commas).
- Don't set `accent` unless they ask for a different highlight colour.

## Writing rules
- Australian English (organise, colour, optimise). Plain, confident, short. Mesmerise's voice is
  direct and a bit cheeky; keep any jokes they wrote.
- Wrap words in `*asterisks*` to show them in Mesmerise yellow. Use it in most headings, on one
  or two words, e.g. `"Why *Mesmerise?*"`, `"Focus Areas, *Next 12 Months*"`.
- Prices are plain numbers in AUD **excluding GST**: `5000`, not `"$5,000"`. A range is
  `[5000, 15000]`. "+ GST" is added on screen automatically. If they give prices including GST,
  divide by 1.1 and tell them you did.
- Bullets: short, no full stops at the end.

## Standard order
1. `cover` 2. `contents` 3. `text` (thank-you letter) 4. `columns` (Summary)
5. `section` "About *Mesmerise*", then `stats`, `logos`, `team`, `process`
6. `section` "Case Studies", then 2–4 `case-study` / `testimonial` slides that suit the client's industry
7. `section` "The Growth Strategy", then `table` (summary of focus areas)
8. Optional audits: `section` (e.g. "*Website* Audit") then `audit` slides
9. `scale`, `table` (phase by phase), `columns` (Additional Thoughts)
10. `section` "*Investment*", then `pricing`, `options` (website tiers), `budget`, `options` (add-ons)
11. `next-steps`, `closing`

## Slide formats
Fields marked *optional* can be left out. Slides marked **standard** fill themselves with
Mesmerise's usual content when you give only the type, e.g. `{"type": "team"}`. Only add
content to a standard slide if they ask for something different.

**cover** — `{"type": "cover"}`. Shows "Strategy Proposal." and the client name. *optional* `title`.

**contents** — `{"type": "contents"}`. Lists the `section` titles automatically.

**section** — big title that opens a part of the deck.
`{"type": "section", "title": "*Website* Audit", "subtitle": "Analysis & Recommendations", "link": {"label": "View the keyword research", "href": "https://…"}}` (subtitle and link *optional*)

**text** — the thank-you letter, or any note.
`{"type": "text", "heading": "*Thank you.*", "greeting": "Hi Alex,", "intro": "In this deck you’ll find:", "bullets": ["…"], "outro": "…", "signOff": "Regards,\nPetar"}`
(everything except `heading` *optional*; `\n` is a new line)

**columns** — 2 to 4 ticked columns. Used for Summary (Challenges / Goals & Success Metrics /
Strategy Overview) and Additional Thoughts (Keep In Mind / Some Risks / Summary Of Recommendations).
`{"type": "columns", "heading": "Summary", "intro": "…", "columns": [{"heading": "Challenges", "bullets": ["…"]}]}` (intro *optional*)

**stats** — **standard** "Why Mesmerise?" results.

**logos** — **standard** client logo wall.

**team** — **standard** team photos.

**process** — **standard** "Our Process" steps. *optional* `heading`, `steps: [{"title", "body"}]`.

**table** — header row in yellow. Each cell is text, or a list of text for bullet points.
`{"type": "table", "heading": "Summary Of Focus Areas", "columns": ["Problems you shared", "Goals you want to hit", "Actions we propose"], "rows": [["…", "…", "…"]]}`
Phase-by-phase version: columns `["Months", "Focus areas", "What needs to be done", "The problems this solves"]`,
rows like `["Phase 1\nMonths 1–3", ["Website rework", "SEO foundation"], ["…"], ["…"]]`.

**case-study** — use a saved one: `{"type": "case-study", "use": "flo-landscapes"}`.
Saved: `moon-bg` (builder, website + social), `talent-source` (recruitment, LinkedIn),
`flo-landscapes` (landscaping, website + SEO + ads), `frame-of-mind` (picture framing, local SEO + ads).
Only write a new one if they give you the story and a photo URL:
`{"type": "case-study", "client": "…", "image": "https://…", "milestones": [{"when": "1–3 months", "text": "…"}], "tags": ["Website"]}`

**testimonial** — use a saved one: `{"type": "testimonial", "use": "able-foods"}`.
Saved: `moon-bg` (Joseph Moon), `flo-landscapes` (Jay Shelling), `able-foods` (Claire Jenkins).
New: `{"type": "testimonial", "client": "…", "quote": "“…”", "name": "…", "role": "…"}`.

**audit** — screenshots with Key Takeaways.
`{"type": "audit", "heading": "*Website* Audit & Recommendations.", "images": ["https://…"], "takeaways": ["…"]}`
`images` must be web links to images. If they don't have any, use `[]`; the slide still works.

**scale** — Vulnerable → Growing → Future-proof. Exactly 3 levels, top (best) to bottom.
`{"type": "scale", "heading": "Focus Areas, *Next 12 Months*", "youAreHere": 2, "levels": [{"label": "Future-proof", "title": "…", "bullets": ["…"]}, {"label": "Growing", …}, {"label": "Vulnerable", …}]}`
`youAreHere`: 0 = top, 2 = bottom (default 2).

**pricing** — numbered priorities beside a price table.
`{"type": "pricing", "heading": "Investment, *Next 12 Months*", "points": ["…"], "items": [{"name": "Website Redesign", "price": [5000, 15000]}, {"name": "Meta Ads Management", "price": 1500, "per": "month"}, {"name": "Email flows", "price": 3000, "from": true}]}`

**options** — cards to choose between.
Website tiers: `{"type": "options", "heading": "Website Build – You Have *Options*", "options": [{"name": "Professional", "price": 5000, "tagline": "…", "features": ["…"]}]}`
Add-ons (compact cards, no features): `{"type": "options", "heading": "Stay Ahead Of The Curve *(Add-ons For Growth)*", "options": [{"name": "LinkedIn Ghostwriting", "price": 3000, "from": true}]}`

**budget** — annual budget and bar chart. Monthly figure is worked out automatically.
`{"type": "budget", "heading": "*Investment* Allocation (Over 12 Months)", "total": 50000, "items": [{"label": "Website + SEO", "amount": 15000}], "takeaways": ["…"]}`

**next-steps** — **standard**. Same *optional* fields as process.

**closing** — **standard** thank-you with contact emails.
