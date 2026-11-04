/**
 * The building blocks of a proposal. Each proposal is a list of slides,
 * and each slide is one of the types below. To add a new kind of slide,
 * add it here AND add a matching case in components/slides/Slides.tsx.
 *
 * Highlighting: wrap words in *asterisks* in any heading, quote or case study
 * line to show them in the accent colour, e.g. "Why *Mesmerise?*".
 *
 * Fields marked "Optional: defaults to …" fall back to the standard Mesmerise
 * content in lib/defaults.ts, so `{ type: "team" }` on its own is a full slide.
 */

/** AUD excluding GST. A single number, or a [low, high] range. */
export type Price = number | [number, number];

export type PriceItem = {
  name: string;
  price: Price;
  /** Shows "From $3K" instead of "$3K". */
  from?: boolean;
  /** e.g. "month" shows "$1.5K/month". */
  per?: string;
};

export type CaseStudy = {
  client: string;
  /** Path to a photo in /public, e.g. "/images/work/flo-case-study.jpg". */
  image: string;
  milestones: { when: string; text: string }[];
  tags?: string[];
};

export type Testimonial = {
  client: string;
  quote: string;
  name: string;
  role: string;
  /** Large photo on the right. Leave out for a centred quote. */
  image?: string;
  /** Small round headshot, shown with the centred layout. */
  avatar?: string;
  /** Client logo (white on transparent works best). */
  logo?: string;
};

export type CaseStudyId = "moon-bg" | "talent-source" | "flo-landscapes" | "frame-of-mind";
export type TestimonialId = "moon-bg" | "flo-landscapes" | "able-foods";

export type ScaleLevel = { label: string; title: string; bullets: string[] };

export type Slide =
  /** Opening slide. Shows the client name and Mesmerise logo. */
  | { type: "cover"; /** Optional: defaults to "Strategy Proposal." */ title?: string }
  /** Numbered contents list. Optional: defaults to the titles of the `section` slides, linked. */
  | { type: "contents"; items?: string[] }
  /** Big title that opens a part of the deck, e.g. "*Website* Audit". */
  | { type: "section"; title: string; subtitle?: string; link?: { label: string; href: string } }
  /** Letter or note: heading, then any of greeting, intro, bullets, outro, sign-off. */
  | {
      type: "text";
      heading: string;
      greeting?: string;
      intro?: string;
      bullets?: string[];
      outro?: string;
      /** Use \n for a new line, e.g. "Regards,\nPetar". */
      signOff?: string;
    }
  /** Two to four columns of bullet points, e.g. Summary or Additional Thoughts. */
  | { type: "columns"; heading: string; intro?: string; columns: { heading: string; bullets: string[] }[] }
  /** Headline numbers. Optional: defaults to "Why Mesmerise?" results. */
  | { type: "stats"; heading?: string; stats?: { figure: string; label: string; body: string }[] }
  /** Client logo wall. Optional: defaults to "Trusted By Visionary Leaders". */
  | { type: "logos"; heading?: string; logos?: { name: string; src: string }[] }
  /** Team photos. Optional: defaults to the Mesmerise team. */
  | { type: "team"; heading?: string; people?: { name: string; role: string; photo: string }[] }
  /** Numbered steps on a line. Optional: defaults to "Our Process". */
  | { type: "process"; heading?: string; steps?: { title: string; body: string }[] }
  /** Same layout as process. Optional: defaults to the standard next steps. */
  | { type: "next-steps"; heading?: string; steps?: { title: string; body: string }[] }
  /**
   * Table with a highlighted header row. Each cell is text, or a list of
   * strings for bullet points.
   */
  | { type: "table"; heading: string; columns: string[]; rows: (string | string[])[][] }
  /** Case study: timeline on the left, photo on the right. Use a saved one with `use`. */
  | ({ type: "case-study" } & ({ use: CaseStudyId } | CaseStudy))
  /** Client quote. Use a saved one with `use`. */
  | ({ type: "testimonial" } & ({ use: TestimonialId } | Testimonial))
  /** Screenshots (1 to 4) with key takeaways underneath. */
  | { type: "audit"; heading: string; images: string[]; takeaways: string[] }
  /** Vulnerable → Growing → Future-proof scale. Levels run top to bottom. */
  | {
      type: "scale";
      heading: string;
      levels: [ScaleLevel, ScaleLevel, ScaleLevel];
      /** Which level gets the "You are here" marker: 0 = top, 2 = bottom. Defaults to 2. */
      youAreHere?: 0 | 1 | 2;
    }
  /** Numbered points beside a price table. */
  | { type: "pricing"; heading: string; points?: string[]; items: PriceItem[] }
  /** Cards to choose between: website tiers, add-ons. Leave out `features` for compact cards. */
  | {
      type: "options";
      heading: string;
      options: { name: string; price?: Price; from?: boolean; per?: string; tagline?: string; features?: string[] }[];
    }
  /** Annual budget with a bar chart. Monthly figure and category count are worked out for you. */
  | { type: "budget"; heading: string; total: number; items: { label: string; amount: number }[]; takeaways?: string[] }
  /** Final thank-you slide. Optional: defaults to the standard sign-off. */
  | { type: "closing"; message?: string; contacts?: string[]; signOff?: string };

export type Proposal = {
  client: string;
  title: string;
  /** ISO date, e.g. "2026-11-03" */
  date: string;
  preparedBy: string;
  /** Optional: replaces the Mesmerise yellow for this proposal, e.g. "#1ae2bd". */
  accent?: string;
  slides: Slide[];
};
