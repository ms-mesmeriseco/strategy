import type { Proposal } from "@/lib/types";

// Starting point for new proposals. `npm run new -- "Client Name"` copies this.
const proposal: Proposal = {
  client: "__CLIENT__",
  title: "Proposal title",
  date: "__DATE__",
  preparedBy: "Mesmerise",
  slides: [
    { type: "cover", title: "Proposal title", subtitle: "One sentence on the outcome the client wants." },
    { type: "text", heading: "Where things stand", paragraphs: ["Describe the client’s current situation."] },
    {
      type: "points",
      heading: "What we’ll do",
      points: [
        { title: "First piece of work", body: "What it is and why it matters." },
        { title: "Second piece of work", body: "What it is and why it matters." },
      ],
    },
    { type: "timeline", heading: "Timeline", steps: [{ when: "Weeks 1–2", title: "First phase" }] },
    { type: "pricing", heading: "Investment", items: [{ name: "Line item", price: 0 }] },
    {
      type: "next-steps",
      heading: "Next steps",
      steps: ["Reply to confirm you’d like to go ahead"],
      contact: { name: "Your name", email: "hello@mesmeriseco.com" },
    },
  ],
};

export default proposal;
