import type { Price } from "./types";

const aud = new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 });

/** 5000 → "$5K", 1500 → "$1.5K", 1250 → "$1,250", 800 → "$800". */
export const formatMoney = (n: number) => (n >= 1000 && n % 100 === 0 ? `$${n / 1000}K` : aud.format(n));

/** Price text without GST, e.g. "$5K – $15K", "From $3K", "$1.5K/month". */
export function formatPrice(price: Price, opts: { from?: boolean; per?: string } = {}) {
  let text = Array.isArray(price) ? `${formatMoney(price[0])} – ${formatMoney(price[1])}` : formatMoney(price);
  if (opts.from) text = `From ${text}`;
  if (opts.per) text += `/${opts.per}`;
  return text;
}

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });

export const yearOf = (iso: string) => iso.slice(0, 4);

/** Strips the *highlight* markers, for places that need plain text. */
export const plain = (text: string) => text.replace(/\*/g, "");
