import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { proposals } from "@/proposals";
import { fetchSanityProposal } from "@/lib/sanity";
import { validateProposal } from "@/lib/validate";
import { Deck } from "@/components/Deck";

type Props = { params: Promise<{ slug: string }> };

// Proposals in proposals/ are built ahead of time; Sanity ones are fetched on demand.
export const dynamicParams = true;
export const revalidate = 30; // keep in step with REFRESH_SECONDS in lib/sanity.ts

export function generateStaticParams() {
  return Object.keys(proposals).map((slug) => ({ slug }));
}

/** Slugs always end in a random 5-character suffix; that's what keeps links private. */
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*-[a-z2-9]{5}$/;

const load = cache(async (slug: string) => {
  if (proposals[slug]) return { proposal: proposals[slug], problems: [] as string[] };
  if (!SLUG.test(slug)) return null;
  const data = await fetchSanityProposal(slug);
  return data ? validateProposal(data) : null;
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = (await load((await params).slug))?.proposal;
  return p ? { title: `${p.title} for ${p.client}` } : {};
}

export default async function ProposalPage({ params }: Props) {
  const result = await load((await params).slug);
  if (!result) notFound();
  if (!result.proposal) {
    return (
      <main className="plain">
        <div className="problems">
          <h1>This proposal needs a few fixes</h1>
          <p>Copy this list into your Claude chat and ask it to fix the proposal. The page updates within a minute.</p>
          <ul>
            {result.problems.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </main>
    );
  }
  return <Deck proposal={result.proposal} />;
}
