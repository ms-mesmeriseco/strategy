"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Proposal } from "@/lib/types";
import { SlideView } from "./slides/Slides";

export function Deck({ proposal }: { proposal: Proposal }) {
  const ref = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);
  const total = proposal.slides.length;

  // Track which slide is on screen.
  useEffect(() => {
    const slides = Array.from(ref.current?.querySelectorAll<HTMLElement>(".slide") ?? []);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(slides.indexOf(e.target as HTMLElement));
      },
      { threshold: 0.55 }
    );
    slides.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Arrow keys / Page Up / Page Down / Space move between slides.
  useEffect(() => {
    const go = (i: number) => {
      const slides = ref.current?.querySelectorAll<HTMLElement>(".slide");
      const target = slides?.[Math.max(0, Math.min(total - 1, i))];
      if (!target) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && e.target.closest("input, textarea, button, a")) return;
      if (["ArrowDown", "ArrowRight", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        go(current + 1);
      } else if (["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key)) {
        e.preventDefault();
        go(current - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, total]);

  const style = proposal.accent ? ({ "--accent": proposal.accent } as CSSProperties) : undefined;

  return (
    <main ref={ref} className="deck" style={style}>
      {proposal.slides.map((slide, i) => (
        <SlideView key={i} slide={slide} proposal={proposal} />
      ))}
      <div className="controls" aria-label="Deck controls">
        <span aria-live="polite">
          {current + 1} / {total}
        </span>
        <button type="button" onClick={() => window.print()}>
          Save as PDF
        </button>
      </div>
    </main>
  );
}
