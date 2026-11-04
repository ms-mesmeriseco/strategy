import type { Proposal } from "@/lib/types";

// Starting point for new proposals. `npm run new -- "Client Name"` copies this.
// Delete any slides you don't need, and reorder freely. Wrap words in *asterisks*
// to highlight them. Slides with no content listed use the standard Mesmerise version.
const proposal: Proposal = {
  client: "__CLIENT__",
  title: "Strategy Proposal",
  date: "__DATE__",
  preparedBy: "Mesmerise",
  slides: [
    { type: "cover" },
    { type: "contents" },
    {
      type: "text",
      heading: "*Thank you.*",
      greeting: "Hi [first name],",
      intro: "In this deck you’ll find:",
      bullets: [
        "A summary of where the business sits today and where the opportunity is",
        "An honest audit of your website, SEO and social media presence",
        "A phased growth strategy built around your business life cycle",
        "A clear investment overview with defined deliverables at each stage",
      ],
      outro: "One or two sentences on what they told you and what this plan is for.",
      signOff: "Regards,\nPetar",
    },
    {
      type: "columns",
      heading: "Summary",
      columns: [
        { heading: "Challenges", bullets: ["What’s holding them back"] },
        { heading: "Goals & Success Metrics", bullets: ["Revenue goal", "North star metric"] },
        { heading: "Strategy Overview", bullets: ["Fix the foundation first", "Scale what works"] },
      ],
    },

    { type: "section", title: "About *Mesmerise*" },
    { type: "stats" },
    { type: "logos" },
    { type: "team" },
    { type: "process" },

    { type: "section", title: "Case Studies" },
    { type: "case-study", use: "flo-landscapes" },
    { type: "testimonial", use: "flo-landscapes" },
    { type: "case-study", use: "frame-of-mind" },
    { type: "testimonial", use: "able-foods" },

    { type: "section", title: "The Growth Strategy" },
    {
      type: "table",
      heading: "Summary Of Focus Areas",
      columns: ["Problems you shared", "Goals you want to hit", "Actions we propose"],
      rows: [["Problem", "Goal", "Action"]],
    },

    { type: "section", title: "*Website* Audit", subtitle: "Analysis & Recommendations" },
    {
      type: "audit",
      heading: "*Website* Audit & Recommendations.",
      images: [],
      takeaways: ["What the screenshot shows and why it matters"],
    },

    {
      type: "scale",
      heading: "Focus Areas, *Next 12 Months*",
      levels: [
        { label: "Future-proof", title: "State of the art omnipresence", bullets: ["Where they’ll be"] },
        { label: "Growing", title: "Foundations in place", bullets: ["What changes first"] },
        { label: "Vulnerable", title: "Relying on word of mouth alone", bullets: ["Where they are now"] },
      ],
    },
    {
      type: "table",
      heading: "Focus Areas, *Phase by Phase*",
      columns: ["Months", "Focus areas", "What needs to be done", "The problems this solves"],
      rows: [
        ["Phase 1\nMonths 1–3", ["Focus area"], ["Task"], ["Problem solved"]],
        ["Phase 2\nMonths 3–6", ["Focus area"], ["Task"], ["Problem solved"]],
      ],
    },
    {
      type: "columns",
      heading: "*Additional Thoughts* For Consideration",
      intro: "One line framing the plan.",
      columns: [
        { heading: "Keep In Mind", bullets: ["Point"] },
        { heading: "Some Risks", bullets: ["Risk"] },
        { heading: "Summary Of Recommendations", bullets: ["Recommendation"] },
      ],
    },

    { type: "section", title: "*Investment*", subtitle: "Analysis & Recommendations" },
    {
      type: "pricing",
      heading: "Investment, *Next 12 Months*",
      points: ["Why the first priority comes first"],
      items: [
        { name: "Website Redesign / Build", price: [5000, 15000] },
        { name: "Meta Ads Management", price: 1500, per: "month" },
      ],
    },
    {
      type: "options",
      heading: "Website Build – You Have *Options*",
      options: [
        { name: "Professional", price: 5000, tagline: "Professional website touch-up", features: ["Inclusion"] },
        { name: "Premium", price: 10000, tagline: "Everything in Professional, plus SEO & LLM foundations", features: ["Inclusion"] },
        { name: "Gold Standard", price: 15000, tagline: "Everything in Premium, plus high-intent service pages", features: ["Inclusion"] },
      ],
    },
    {
      type: "budget",
      heading: "*Investment* Allocation (Over 12 Months)",
      total: 50000,
      items: [
        { label: "Website + SEO", amount: 15000 },
        { label: "Meta Ads", amount: 12000 },
      ],
      takeaways: ["Why this level of investment suits where they are now"],
    },
    {
      type: "options",
      heading: "Stay Ahead Of The Curve *(Add-ons For Growth)*",
      options: [
        { name: "Email Nurture Sequences", price: 3000, from: true },
        { name: "Commercial Assets (Lead Magnets + Authority Articles)", price: 1000, from: true },
        { name: "Backlink Building", price: 2000, from: true },
        { name: "Omnipresent Acquisition Strategy", price: 1500, from: true },
        { name: "LinkedIn Ghostwriting", price: 3000, from: true },
      ],
    },

    { type: "next-steps" },
    { type: "closing" },
  ],
};

export default proposal;
