export const ACCESS_COOKIE = "deck_access";

/** Hash of the site password, stored in the cookie so the password itself never is. */
export async function accessToken(password: string) {
  const data = new TextEncoder().encode(`strategy-decks:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Only allow redirects back to a path on this site. */
export const safeNext = (next: unknown) =>
  typeof next === "string" && next.startsWith("/") && !next.startsWith("//") ? next : "/";
