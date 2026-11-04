/**
 * Reads proposals that were written to Sanity (usually from a Claude chat).
 * The `proposals` dataset is private, so this needs SANITY_READ_TOKEN, a
 * Viewer token set in Vercel. Without it, only the files in proposals/ work.
 */

const projectId = process.env.SANITY_PROJECT_ID ?? "wpr5jlmc";
const dataset = process.env.SANITY_DATASET ?? "proposals";
const token = process.env.SANITY_READ_TOKEN;

/** How often (seconds) a proposal is re-read, so chat edits show up quickly. */
export const REFRESH_SECONDS = 30;

const QUERY = `*[_type == "proposal" && slug.current == $slug] | order(_updatedAt desc)[0]`;

export async function fetchSanityProposal(slug: string): Promise<unknown | null> {
  if (!token) return null;
  const url = new URL(`https://${projectId}.api.sanity.io/v2025-02-19/data/query/${dataset}`);
  url.searchParams.set("query", QUERY);
  url.searchParams.set("$slug", JSON.stringify(slug));
  // Drafts count: nobody has to remember to press Publish.
  url.searchParams.set("perspective", "drafts");

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: REFRESH_SECONDS },
  });
  if (!res.ok) throw new Error(`Sanity returned ${res.status} for ${slug}`);
  const { result } = (await res.json()) as { result: unknown };
  return result ?? null;
}
