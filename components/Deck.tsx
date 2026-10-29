"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import type { Proposal } from "@/lib/types";
import { plain } from "@/lib/format";
import { SlideView, type SlideContext } from "./slides/Slides";

/** Slide number from the URL, e.g. "#7" → index 6. */
const fromHash = (total: number) => {
  const n = parseInt(window.location.hash.slice(1), 10);
  return Number.isFinite(n) ? Math.min(Math.max(n - 1, 0), total - 1) : 0;
};

export function Deck({ proposal }: { proposal: Proposal }) {
  const total = proposal.slides.length;
  const [current, setCurrent] = useState(0);
  const [ready, setReady] = useState(false);
  const touch = useRef<{ x: number; y: number } | null>(null);

  const goTo = useCallback(
    (i: number) => {
      const next = Math.min(Math.max(i, 0), total - 1);
      setCurrent(next);
      history.replaceState(null, "", next === 0 ? window.location.pathname : `#${next + 1}`);
    },
    [total]
  );

  // Open on the slide in the URL, and follow manual hash edits. Transitions
  // switch on a frame later, so a shared link doesn't animate from the cover.
  useEffect(() => {
    const sync = () => setCurrent(fromHash(total));
    sync();
    const frame = requestAnimationFrame(() => setReady(true));
    window.addEventListener("hashchange", sync);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", sync);
    };
  }, [total]);

  // Arrow keys / Page Up / Page Down / Space / Home / End.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.target instanceof HTMLElement && e.target.closest("input, textarea, select")) return;
      if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(e.key)) goTo(current + 1);
      else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) goTo(current - 1);
      else if (e.key === "Home") goTo(0);
      else if (e.key === "End") goTo(total - 1);
      else return;
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, total, goTo]);

  const ctx: SlideContext = useMemo(
    () => ({
      proposal,
      goTo,
      sections: proposal.slides.flatMap((s, index) => (s.type === "section" ? [{ title: plain(s.title), index }] : [])),
    }),
    [proposal, goTo]
  );

  const style = proposal.accent ? ({ "--accent": proposal.accent } as CSSProperties) : undefined;

  return (
    <main
      className={ready ? "deck" : "deck deck--loading"}
      style={style}
      aria-roledescription="carousel"
      aria-label={`${proposal.title} for ${proposal.client}`}
      onTouchStart={(e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
      onTouchEnd={(e) => {
        const start = touch.current;
        touch.current = null;
        if (!start) return;
        const dx = e.changedTouches[0].clientX - start.x;
        const dy = e.changedTouches[0].clientY - start.y;
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) goTo(current + (dx < 0 ? 1 : -1));
      }}
    >
      <div className="progress" style={{ "--p": (current + 1) / total } as CSSProperties} aria-hidden="true" />

      {proposal.slides.map((slide, i) => (
        <section
          key={i}
          className={`slide slide--${slide.type}`}
          data-pos={i === current ? "current" : i < current ? "past" : "future"}
          aria-roledescription="slide"
          aria-label={`${i + 1} of ${total}`}
          aria-hidden={i !== current}
          inert={i !== current}
        >
          <SlideView slide={slide} ctx={ctx} />
        </section>
      ))}

      <nav className="controls" aria-label="Slide controls">
        <button type="button" onClick={() => goTo(current - 1)} disabled={current === 0} aria-label="Previous slide">
          ←
        </button>
        <span aria-live="polite">
          {current + 1} / {total}
        </span>
        <button type="button" onClick={() => goTo(current + 1)} disabled={current === total - 1} aria-label="Next slide">
          →
        </button>
        <button type="button" className="controls__pdf" onClick={() => window.print()}>
          Save as PDF
        </button>
      </nav>
    </main>
  );
}
