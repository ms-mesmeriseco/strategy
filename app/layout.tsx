import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Proposal",
  robots: { index: false, follow: false, nocache: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <body>{children}</body>
    </html>
  );
}
