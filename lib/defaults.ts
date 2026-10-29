import type { CaseStudy, CaseStudyId, Testimonial, TestimonialId } from "./types";

/**
 * Standard Mesmerise content. Slides fall back to these when a proposal leaves
 * the field out, so updating something here updates every proposal that uses it.
 */

export const coverTitle = "Strategy Proposal.";

export const stats = {
  heading: "Why *Mesmerise?*",
  stats: [
    {
      figure: "$10+ million",
      label: "in revenue for our client partners",
      body: "Real results over the last 3 years. Money in the bank, not just numbers on a report.",
    },
    {
      figure: "874%",
      label: "more enquiries on average",
      body: "No more waiting for the phone to ring. Clients move from chasing work to switching off the phone until they can hire more staff. At the top end, enquiries spike by 2,800%.",
    },
    {
      figure: "1 in 3",
      label: "client partners lower ad spend or hire more staff within 3–6 months",
      body: "Clients ask us to reduce ad spend or shift budgets because they can’t meet demand. That means hiring, opening new locations, or wait lists as long as 3–6 months.",
    },
    {
      figure: "3,000%",
      label: "more traffic",
      body: "From zero to hero. Some clients see a 7,998% increase in traffic. That’s a lot of eyeballs.",
    },
    {
      figure: "$20–$23",
      label: "cost per qualified lead",
      body: "Qualified leads coming in for less than a chicken parma at the Napier.",
    },
    {
      figure: "25X",
      label: "ROAS on average",
      body: "Every $1 put into ads brings back $25, with a few clients breaking records and hitting 100X.",
    },
  ],
};

export const logos = {
  heading: "Trusted By *Visionary Leaders*",
  logos: [
    { name: "Burra Commercial Contractors", src: "/images/logos/burra.png" },
    { name: "Moon Building Group", src: "/images/logos/moon-building-group.png" },
    { name: "Hue Therapy", src: "/images/logos/hue-therapy.png" },
    { name: "The Sauna Company", src: "/images/logos/the-sauna-company.png" },
    { name: "Savage", src: "/images/logos/savage.png" },
    { name: "Flo Landscapes", src: "/images/logos/flo-landscapes.png" },
    { name: "Able Foods", src: "/images/logos/able-foods.png" },
    { name: "Bespoke Landscapes", src: "/images/logos/bespoke-landscapes.png" },
    { name: "Gondwana Landscaping and Stone", src: "/images/logos/gondwana.png" },
    { name: "North Bay Building", src: "/images/logos/north-bay-building.png" },
    { name: "Street Peace", src: "/images/logos/street-peace.png" },
    { name: "Tony Caulk’s Pro Sealers", src: "/images/logos/pro-sealers.png" },
    { name: "Frame of Mind", src: "/images/logos/frame-of-mind.png" },
    { name: "TPPT", src: "/images/logos/tppt.png" },
    { name: "Tender Loving Cuisine", src: "/images/logos/tender-loving-cuisine.png" },
    { name: "Good Luck Tattoo", src: "/images/logos/good-luck-tattoo.png" },
    { name: "Pro Sculpt", src: "/images/logos/pro-sculpt.png" },
    { name: "Reigner", src: "/images/logos/reigner.png" },
    { name: "One Season Australia", src: "/images/logos/one-season.png" },
    { name: "Studio Artegra", src: "/images/logos/studio-artegra.png" },
  ],
};

export const team = {
  heading: "Our *Team*",
  people: [
    { name: "Petar Petrovic", role: "Founder", photo: "/images/team/petar-petrovic.jpg" },
    { name: "Matilda Sutherland", role: "Design & Development", photo: "/images/team/matilda-sutherland.jpg" },
    { name: "Simba Dhaliwal", role: "Business Development", photo: "/images/team/simba-dhaliwal.jpg" },
    { name: "Nicole Uren", role: "Digital Marketing Strategist", photo: "/images/team/nicole-uren.jpg" },
  ],
};

export const process = {
  heading: "Our *Process*",
  steps: [
    {
      title: "Discovery, strategy & proposal",
      body: "We map out your ambitions, hurdles and pain points. Focusing on these fundamentals lets us create a custom strategy that generates alpha.",
    },
    {
      title: "Confirmation",
      body: "If you’re happy with the proposal and we’re fully aligned, we send through a service agreement (no lock-in) and you process the deposit.",
    },
    {
      title: "Onboarding",
      body: "Once the formalities are done, we book in a 60-minute onboarding session on Google Meet.",
    },
    {
      title: "Premium deliverables",
      body: "We get to work and deliver on the proposed strategy, with clear communication and attention to detail throughout.",
    },
  ],
};

export const nextSteps = {
  heading: "Next Steps",
  steps: [
    { title: "Review this deck", body: "Take a few days to go through everything and note any questions or areas you’d like to adjust." },
    { title: "Share your feedback", body: "Let us know if anything needs refining. We’re happy to adjust scope, phasing or focus areas based on your priorities." },
    { title: "Agree & sign off", body: "We lock in the deliverables, investment and timeline so we can get moving." },
    { title: "Onboarding", body: "We book in a one-on-one Google Meet and you send through permissions for platform access." },
  ],
};

export const closing = {
  message: "Thank you for your time and attention. We’re available for follow-up questions, further materials or next steps.",
  contacts: ["petar@mesmeriseco.com", "hello@mesmeriseco.com"],
  signOff: "We look forward to building something purposeful together.\n— Mesmerise Digital",
};

/** Saved case studies. Use with `{ type: "case-study", use: "flo-landscapes" }`. */
export const caseStudies: Record<CaseStudyId, CaseStudy> = {
  "moon-bg": {
    client: "Moon BG",
    image: "/images/work/moon-bg-case-study.jpg",
    milestones: [
      { when: "2–4 weeks", text: "Research and analysis on the industry." },
      { when: "3–6 months", text: "Built out the website and social media strategy." },
      {
        when: "1 year",
        text: "The premium website helped land architectural residential jobs and a commercial building project, *which led to the formation of a commercial building company.*",
      },
    ],
  },
  "talent-source": {
    client: "Talent Source",
    image: "/images/work/talent-source.jpg",
    milestones: [
      { when: "January 2026", text: "Implemented authority content on LinkedIn." },
      { when: "February", text: "Closed a major commercial builder that came through LinkedIn, resulting in a handful of senior roles to fill." },
      { when: "April", text: "Closed another commercial builder. *Was able to bring Dee on board as an HR arm to her business.*" },
    ],
    tags: ["LinkedIn Ghostwriting", "Business Consulting", "Content Creation"],
  },
  "flo-landscapes": {
    client: "Flo Landscapes",
    image: "/images/work/flo-case-study.jpg",
    milestones: [
      { when: "1–3 months", text: "Advised Jay on a strategy built for commercial impact. Redesigned the website and created high-intent lead magnets." },
      { when: "3–6 months", text: "Omnipresent acquisition strategy ramped up. Jay hired more staff and won big design and construct jobs in a saturated market." },
      { when: "1 year", text: "*Jay was able to go to Europe for 3 months.* The business kept humming while he was with family in Italy and Switzerland." },
    ],
    tags: ["Website", "SEO", "Omnipresent Acquisition", "Business Consulting", "Commercial Assets"],
  },
  "frame-of-mind": {
    client: "Frame of Mind",
    image: "/images/work/frame-of-mind.jpg",
    milestones: [
      { when: "1–12 months", text: "Built out the website with hyper-specific SEO pages. Implemented a Google review strategy." },
      { when: "2 years", text: "Omnipresent acquisition across Google and Meta. Working on a lean budget, we carved out untapped opportunities through keyword research." },
      { when: "3 years", text: "*Record-breaking months back to back to back.* Felix was in Brazil and Liam in Vietnam while the acquisition machine kept rolling." },
    ],
    tags: ["Website", "Local SEO + Reviews", "Business Consulting", "Omnipresent Acquisition"],
  },
};

/** Saved testimonials. Use with `{ type: "testimonial", use: "able-foods" }`. */
export const testimonials: Record<TestimonialId, Testimonial> = {
  "moon-bg": {
    client: "Moon BG",
    quote: "“*Blew my online presence up* since working with Mesmerise. Highly recommend.”",
    name: "Joseph Moon",
    role: "Founder & Director",
    image: "/images/work/moon-bg-testimonial.jpg",
    logo: "/images/logos/moon-building-group.png",
  },
  "flo-landscapes": {
    client: "Flo Landscapes",
    quote: "“Petar and the team are the best crew to work with. *They know the market and will get your company out there and ahead of the game.*”",
    name: "Jay Shelling",
    role: "Founder & Director",
    image: "/images/work/flo-testimonial.jpg",
    logo: "/images/logos/flo-landscapes.png",
  },
  "able-foods": {
    client: "Able Foods",
    quote: "“I’ve never had the pleasure of working with a more dynamic, supportive, proactive and accommodating agency… *you can quote me on that.*”",
    name: "Claire Jenkins",
    role: "Chief Marketing Officer, Tender Loving Cuisine & Able Foods",
    avatar: "/images/work/claire-jenkins.jpg",
    logo: "/images/logos/able-foods.png",
  },
};
