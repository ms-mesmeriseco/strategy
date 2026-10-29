/**
 * The building blocks of a proposal. Each proposal is a list of slides,
 * and each slide is one of the types below. To add a new kind of slide,
 * add it here AND add a matching component in components/slides/.
 */

export type Slide =
  | { type: "cover"; title: string; subtitle?: string }
  | { type: "statement"; text: string; detail?: string }
  | { type: "text"; heading: string; paragraphs: string[] }
  | { type: "points"; heading: string; intro?: string; points: { title: string; body: string }[] }
  | { type: "timeline"; heading: string; steps: { when: string; title: string; body?: string }[] }
  | {
      type: "pricing";
      heading: string;
      /** Prices in AUD, excluding GST. */
      items: { name: string; description?: string; price: number }[];
      note?: string;
      /** Shows "+ GST" beside the total. Defaults to true. */
      excludesGst?: boolean;
    }
  | { type: "team"; heading: string; people: { name: string; role: string; bio?: string }[] }
  | { type: "quote"; quote: string; attribution: string }
  | {
      type: "next-steps";
      heading: string;
      steps: string[];
      contact: { name: string; email: string; phone?: string };
    };

export type Proposal = {
  client: string;
  title: string;
  /** ISO date, e.g. "2026-11-03" */
  date: string;
  preparedBy: string;
  /** Optional brand colour for this proposal, e.g. "#0F6B5C". */
  accent?: string;
  slides: Slide[];
};
