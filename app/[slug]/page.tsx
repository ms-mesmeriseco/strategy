import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { proposals } from "@/proposals";
import { Deck } from "@/components/Deck";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(proposals).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = proposals[(await params).slug];
  return p ? { title: `${p.title} for ${p.client}` } : {};
}

export default async function ProposalPage({ params }: Props) {
  const proposal = proposals[(await params).slug];
  if (!proposal) notFound();
  return <Deck proposal={proposal} />;
}
