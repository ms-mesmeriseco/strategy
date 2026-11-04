import type { Proposal, Slide } from "./types";
import { caseStudies, testimonials } from "./defaults";

/**
 * Checks proposal data that didn't come through TypeScript (e.g. written to
 * Sanity from a Claude chat). Returns a list of plain-English problems, so
 * whoever made the proposal can paste them back to Claude to fix.
 */

type Obj = Record<string, unknown>;
const isObj = (v: unknown): v is Obj => typeof v === "object" && v !== null && !Array.isArray(v);
const isStr = (v: unknown): v is string => typeof v === "string" && v.trim() !== "";
const isStrs = (v: unknown): v is string[] => Array.isArray(v) && v.every((x) => typeof x === "string");
const isPrice = (v: unknown) =>
  (typeof v === "number" && v >= 0) || (Array.isArray(v) && v.length === 2 && v.every((x) => typeof x === "number"));

/** One check per slide type: returns problems with the slide's fields. */
const checks: Record<Slide["type"], (s: Obj) => string[]> = {
  cover: (s) => opt(s, "title", isStr, "text"),
  contents: (s) => opt(s, "items", isStrs, "a list of text"),
  section: (s) => [
    ...need(s, "title", isStr, "text"),
    ...opt(s, "subtitle", isStr, "text"),
    ...opt(s, "link", (l) => isObj(l) && isStr(l.label) && isStr(l.href), "{ label, href }"),
  ],
  text: (s) => [
    ...need(s, "heading", isStr, "text"),
    ...["greeting", "intro", "outro", "signOff"].flatMap((k) => opt(s, k, isStr, "text")),
    ...opt(s, "bullets", isStrs, "a list of text"),
  ],
  columns: (s) => [
    ...need(s, "heading", isStr, "text"),
    ...opt(s, "intro", isStr, "text"),
    ...need(s, "columns", (c) => list(c, (x) => isObj(x) && isStr(x.heading) && isStrs(x.bullets)), "a list of { heading, bullets }"),
  ],
  stats: (s) => [
    ...opt(s, "heading", isStr, "text"),
    ...opt(s, "stats", (c) => list(c, (x) => isObj(x) && isStr(x.figure) && isStr(x.label) && isStr(x.body)), "a list of { figure, label, body }"),
  ],
  logos: (s) => [
    ...opt(s, "heading", isStr, "text"),
    ...opt(s, "logos", (c) => list(c, (x) => isObj(x) && isStr(x.name) && isStr(x.src)), "a list of { name, src }"),
  ],
  team: (s) => [
    ...opt(s, "heading", isStr, "text"),
    ...opt(s, "people", (c) => list(c, (x) => isObj(x) && isStr(x.name) && isStr(x.role) && isStr(x.photo)), "a list of { name, role, photo }"),
  ],
  process: (s) => steps(s),
  "next-steps": (s) => steps(s),
  table: (s) => [
    ...need(s, "heading", isStr, "text"),
    ...need(s, "columns", isStrs, "a list of text"),
    ...need(s, "rows", (r) => list(r, (row) => Array.isArray(row) && row.every((c) => typeof c === "string" || isStrs(c))), "a list of rows, each a list of cells"),
  ],
  "case-study": (s) =>
    "use" in s
      ? oneOf(s, "use", Object.keys(caseStudies))
      : [
          ...need(s, "client", isStr, "text"),
          ...need(s, "image", isStr, "an image path or URL"),
          ...need(s, "milestones", (m) => list(m, (x) => isObj(x) && isStr(x.when) && isStr(x.text)), "a list of { when, text }"),
          ...opt(s, "tags", isStrs, "a list of text"),
        ],
  testimonial: (s) =>
    "use" in s
      ? oneOf(s, "use", Object.keys(testimonials))
      : [
          ...["client", "quote", "name", "role"].flatMap((k) => need(s, k, isStr, "text")),
          ...["image", "avatar", "logo"].flatMap((k) => opt(s, k, isStr, "an image path or URL")),
        ],
  audit: (s) => [
    ...need(s, "heading", isStr, "text"),
    ...need(s, "images", isStrs, "a list of image URLs (can be empty)"),
    ...need(s, "takeaways", isStrs, "a list of text"),
  ],
  scale: (s) => [
    ...need(s, "heading", isStr, "text"),
    ...need(
      s,
      "levels",
      (l) => Array.isArray(l) && l.length === 3 && l.every((x) => isObj(x) && isStr(x.label) && isStr(x.title) && isStrs(x.bullets)),
      "exactly 3 of { label, title, bullets }"
    ),
    ...opt(s, "youAreHere", (v) => v === 0 || v === 1 || v === 2, "0, 1 or 2"),
  ],
  pricing: (s) => [
    ...need(s, "heading", isStr, "text"),
    ...opt(s, "points", isStrs, "a list of text"),
    ...need(s, "items", (c) => list(c, (x) => isObj(x) && isStr(x.name) && isPrice(x.price)), "a list of { name, price }, where price is a number or [low, high]"),
  ],
  options: (s) => [
    ...need(s, "heading", isStr, "text"),
    ...need(
      s,
      "options",
      (c) => list(c, (x) => isObj(x) && isStr(x.name) && (x.price === undefined || isPrice(x.price)) && (x.features === undefined || isStrs(x.features))),
      "a list of { name, price?, tagline?, features? }"
    ),
  ],
  budget: (s) => [
    ...need(s, "heading", isStr, "text"),
    ...need(s, "total", (v) => typeof v === "number" && v > 0, "a number"),
    ...need(s, "items", (c) => list(c, (x) => isObj(x) && isStr(x.label) && typeof x.amount === "number"), "a list of { label, amount }"),
    ...opt(s, "takeaways", isStrs, "a list of text"),
  ],
  closing: (s) => [
    ...opt(s, "message", isStr, "text"),
    ...opt(s, "contacts", isStrs, "a list of email addresses"),
    ...opt(s, "signOff", isStr, "text"),
  ],
};

function list(v: unknown, item: (x: unknown) => boolean) {
  return Array.isArray(v) && v.length > 0 && v.every(item);
}
function need(s: Obj, key: string, ok: (v: unknown) => boolean, what: string) {
  return ok(s[key]) ? [] : [s[key] === undefined ? `\`${key}\` is missing (should be ${what})` : `\`${key}\` should be ${what}`];
}
function opt(s: Obj, key: string, ok: (v: unknown) => boolean, what: string) {
  return s[key] === undefined ? [] : need(s, key, ok, what);
}
function oneOf(s: Obj, key: string, allowed: string[]) {
  return allowed.includes(s[key] as string) ? [] : [`\`${key}\` should be one of: ${allowed.join(", ")}`];
}
function steps(s: Obj) {
  return [
    ...opt(s, "heading", isStr, "text"),
    ...opt(s, "steps", (c) => list(c, (x) => isObj(x) && isStr(x.title) && isStr(x.body)), "a list of { title, body }"),
  ];
}

export function validateProposal(data: unknown): { proposal: Proposal; problems: [] } | { proposal: null; problems: string[] } {
  if (!isObj(data)) return { proposal: null, problems: ["The proposal is empty."] };
  const problems: string[] = [];

  for (const key of ["client", "title"]) if (!isStr(data[key])) problems.push(`\`${key}\` is missing.`);
  if (typeof data.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) problems.push("`date` should look like 2026-11-03.");
  if (data.accent !== undefined && !(typeof data.accent === "string" && /^#[0-9a-f]{6}$/i.test(data.accent)))
    problems.push("`accent` should be a hex colour like #dfff00.");

  let slides: unknown = data.slides;
  if (typeof slides === "string") {
    try {
      slides = JSON.parse(slides);
    } catch (e) {
      return { proposal: null, problems: [...problems, `The slides aren’t valid JSON: ${(e as Error).message}`] };
    }
  }
  if (!Array.isArray(slides) || slides.length === 0) problems.push("There are no slides.");
  else
    slides.forEach((s, i) => {
      const where = `Slide ${i + 1}`;
      if (!isObj(s) || typeof s.type !== "string") return problems.push(`${where} has no \`type\`.`);
      const check = checks[s.type as Slide["type"]];
      if (!check) return problems.push(`${where}: “${s.type}” isn’t a slide type. Use one of: ${Object.keys(checks).join(", ")}.`);
      for (const p of check(s)) problems.push(`${where} (${s.type}): ${p}`);
    });

  if (problems.length) return { proposal: null, problems };
  return {
    proposal: {
      client: data.client as string,
      title: data.title as string,
      date: data.date as string,
      preparedBy: isStr(data.preparedBy) ? data.preparedBy : "Mesmerise",
      accent: data.accent as string | undefined,
      slides: slides as Slide[],
    },
    problems: [],
  };
}
