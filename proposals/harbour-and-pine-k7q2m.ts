import type { Proposal } from "@/lib/types";

// Example proposal showing every slide type. Copy patterns from here.
const proposal: Proposal = {
  client: "Harbour & Pine",
  title: "A new website and local search plan",
  date: "2026-11-03",
  preparedBy: "Mesmerise",
  accent: "#0f6b5c",
  slides: [
    {
      type: "cover",
      title: "A new website and local search plan",
      subtitle: "Getting more Saturday-morning regulars through the door at both bakeries.",
    },
    {
      type: "statement",
      text: "Most of your customers decide where to buy bread on their phone, within a kilometre of your shop.",
      detail: "So the plan below is built around local search and a site that loads fast on a phone.",
    },
    {
      type: "text",
      heading: "Where things stand",
      paragraphs: [
        "Your current site was built in 2019 and takes around six seconds to load on mobile. Your Google Business profiles are missing opening hours for public holidays and haven’t had new photos in over a year.",
        "None of this is unusual, and all of it is fixable in the first month.",
      ],
    },
    {
      type: "points",
      heading: "What we’ll do",
      intro: "Three pieces of work, done in order so each one supports the next.",
      points: [
        { title: "Rebuild the website", body: "A fast, simple site with your menu, both locations and online pre-orders." },
        { title: "Fix local search", body: "Complete and maintain both Google Business profiles, with fresh photos monthly." },
        { title: "Report monthly", body: "One page each month: visits, calls, direction requests and pre-orders." },
      ],
    },
    {
      type: "timeline",
      heading: "Timeline",
      steps: [
        { when: "Weeks 1–2", title: "Discovery and design", body: "Workshop with you, then homepage and menu designs to review." },
        { when: "Weeks 3–5", title: "Build", body: "Development, content entry and pre-order setup." },
        { when: "Week 6", title: "Launch", body: "Go live, redirect old pages and update Google profiles." },
        { when: "Ongoing", title: "Local search and reporting" },
      ],
    },
    {
      type: "pricing",
      heading: "Investment",
      items: [
        { name: "Website design and build", description: "Including pre-orders and two rounds of revisions", price: 9500 },
        { name: "Google Business setup", description: "Both locations", price: 1200 },
        { name: "Local search and reporting", description: "First three months", price: 2400 },
      ],
      note: "50% deposit to begin, balance on launch. Ongoing local search is $800 a month after the first three months.",
    },
    {
      type: "team",
      heading: "Who you’ll work with",
      people: [
        { name: "Alex Example", role: "Account lead", bio: "Your main contact for the whole project." },
        { name: "Sam Example", role: "Design and development", bio: "Designs and builds the site." },
      ],
    },
    {
      type: "quote",
      quote: "Online orders doubled in the first quarter after launch, and the phone finally stopped ringing to ask what time we close.",
      attribution: "Owner, a previous hospitality client",
    },
    {
      type: "next-steps",
      heading: "Next steps",
      steps: ["Reply to confirm you’d like to go ahead", "We send the agreement and deposit invoice", "Book the discovery workshop"],
      contact: { name: "Alex Example", email: "hello@mesmeriseco.com" },
    },
  ],
};

export default proposal;
