import type { Proposal } from "@/lib/types";

// Example proposal (fictional client) showing every slide type. Copy patterns from here.
const proposal: Proposal = {
  client: "Harbour & Pine",
  title: "Strategy Proposal",
  date: "2026-11-03",
  preparedBy: "Mesmerise",
  slides: [
    { type: "cover" },
    { type: "contents" },
    {
      type: "text",
      heading: "*Thank you.*",
      greeting: "Hi Sam,",
      intro: "In this deck you’ll find:",
      bullets: [
        "A summary of where Harbour & Pine sits today and where the opportunity is",
        "An honest audit of your website and local search presence",
        "A phased growth plan for both bakeries",
        "A clear investment overview with defined deliverables at each stage",
      ],
      outro: "You told us weekends are full but weekdays are quiet. Our job is to fill the weekdays without discounting.",
      signOff: "Regards,\nPetar",
    },
    {
      type: "columns",
      heading: "Summary",
      columns: [
        {
          heading: "Challenges",
          bullets: [
            "Weekday foot traffic is half of the weekend’s",
            "The website takes six seconds to load on a phone",
            "Google profiles are missing holiday hours and recent photos",
          ],
        },
        {
          heading: "Goals & Success Metrics",
          bullets: ["Grow weekday sales by 30% this financial year", "Double online pre-orders", "Reach a 4.8 Google rating at both locations"],
        },
        {
          heading: "Strategy Overview",
          bullets: ["Rebuild the website around pre-orders", "Fix local search first", "Run weekday-only Meta offers once tracking is live"],
        },
      ],
    },

    { type: "section", title: "About *Mesmerise*" },
    { type: "stats" },
    { type: "logos" },
    { type: "team" },
    { type: "process" },

    { type: "section", title: "Case Studies" },
    { type: "case-study", use: "moon-bg" },
    { type: "testimonial", use: "moon-bg" },
    { type: "testimonial", use: "able-foods" },

    { type: "section", title: "The Growth Strategy" },
    {
      type: "table",
      heading: "Summary Of Focus Areas",
      columns: ["Problems you shared", "Goals you want to hit", "Actions we propose"],
      rows: [
        ["Weekdays are quiet", "Grow weekday sales by 30%", "Weekday-only offers on Meta, aimed within 3 km of each shop"],
        ["The website is slow and hard to order from", "Double online pre-orders", "A fast new site built around pre-orders"],
        ["Google profiles are out of date", "Reach a 4.8 rating", "Monthly photo updates and a review request at checkout"],
      ],
    },

    {
      type: "section",
      title: "*Local Search* Audit",
      subtitle: "Analysis & Recommendations",
      link: { label: "View the keyword research", href: "https://docs.google.com/" },
    },
    {
      type: "audit",
      heading: "*Local Search* Audit & Recommendations.",
      images: [],
      takeaways: [
        "Both profiles rank in the top three for “bakery near me”, but neither shows holiday hours, which costs calls on long weekends",
        "The newest photo is fourteen months old. Profiles with recent photos get noticeably more direction requests",
      ],
    },
    {
      type: "scale",
      heading: "Focus Areas, *Next 12 Months*",
      levels: [
        { label: "Future-proof", title: "Booked out all week", bullets: ["Weekday pre-orders as steady as weekends", "Regulars coming back through email, not discounts"] },
        { label: "Growing", title: "Foundations in place", bullets: ["A website that takes orders", "Tracking live on every channel"] },
        { label: "Vulnerable", title: "Relying on weekend walk-ins", bullets: ["No way to fill a quiet Tuesday", "Online orders lost to a slow site"] },
      ],
    },
    {
      type: "table",
      heading: "Focus Areas, *December–May*",
      columns: ["Months", "Focus areas", "What needs to be done", "The problems this solves"],
      rows: [
        [
          "Phase 1\nMonths 1–3",
          ["Website rebuild", "Google Business profiles"],
          ["Design and build with pre-orders", "Holiday hours, photos and review prompts"],
          ["Orders lost to a slow site", "Missed calls on long weekends"],
        ],
        ["Phase 2\nMonths 3–6", ["Meta ads"], ["Weekday offers within 3 km of each shop"], ["Quiet weekdays"]],
      ],
    },
    {
      type: "columns",
      heading: "*Additional Thoughts* For Consideration",
      intro: "The foundation comes first, then ads get switched on once the site can take orders.",
      columns: [
        { heading: "Keep In Mind", bullets: ["Your regulars already love you. The plan is about reaching their neighbours"] },
        { heading: "Some Risks", bullets: ["The first two months are build time, so results start in month three"] },
        { heading: "Summary Of Recommendations", bullets: ["Start with the website and Google profiles", "Review together at month six"] },
      ],
    },

    { type: "section", title: "*Investment*", subtitle: "Analysis & Recommendations" },
    {
      type: "pricing",
      heading: "Investment, *Next 12 Months*",
      points: [
        "The website is the priority in months 1 to 3. Everything else is built on it",
        "Meta ads start once the site and tracking are live",
      ],
      items: [
        { name: "Website design and build", price: [5000, 10000] },
        { name: "Google Business setup, both locations", price: 1200 },
        { name: "Meta ads management", price: 1500, per: "month" },
      ],
    },
    {
      type: "options",
      heading: "Website Build – You Have *Options*",
      options: [
        {
          name: "Professional",
          price: 5000,
          tagline: "A fast, clean site with your menu and both locations",
          features: ["Mobile optimised", "Menu and opening hours you can edit", "Google Analytics set up"],
        },
        {
          name: "Premium",
          price: 10000,
          tagline: "Everything in Professional, plus online pre-orders",
          features: ["All inclusions from Professional", "Pre-orders with pick-up times", "Conversion tracking for Meta"],
        },
      ],
    },
    {
      type: "budget",
      heading: "*Investment* Allocation (Over 12 Months)",
      total: 30000,
      items: [
        { label: "Website", amount: 10000 },
        { label: "Meta ads", amount: 12000 },
        { label: "Google Business", amount: 1200 },
        { label: "Email flows", amount: 3000 },
      ],
      takeaways: ["Most of the budget goes to the website and ads, because that’s where weekday orders will come from"],
    },
    {
      type: "options",
      heading: "Stay Ahead Of The Curve *(Add-ons For Growth)*",
      options: [
        { name: "Email Nurture Sequences", price: 3000, from: true },
        { name: "Photo Shoot", price: 1500, from: true },
        { name: "Backlink Building", price: 2000, from: true },
      ],
    },

    { type: "next-steps" },
    { type: "closing" },
  ],
};

export default proposal;
