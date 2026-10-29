import type { CSSProperties, ReactNode } from "react";
import type { Proposal, Slide } from "@/lib/types";
import { formatMoney, formatPrice, plain, yearOf } from "@/lib/format";
import * as defaults from "@/lib/defaults";
import { Mark, Wordmark } from "../Logo";

export type SlideContext = {
  proposal: Proposal;
  /** Section slides, for the automatic contents list. */
  sections: { title: string; index: number }[];
  goTo: (index: number) => void;
};

/** Turns "Why *Mesmerise?*" into text with the starred part in the accent colour. */
function hl(text: string): ReactNode {
  return text.split(/\*([^*]+)\*/g).map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part));
}

function Check() {
  return (
    <svg className="check" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10.5" />
      <path d="M7.5 12.3l3 3 6-6.3" />
    </svg>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="bullets">
      {items.map((b, i) => (
        <li key={i}>{hl(b)}</li>
      ))}
    </ul>
  );
}

/** The standard slide: title and rule at the top, logo and year at the bottom. */
function Frame({ title, year, className = "", children }: { title?: string; year: string; className?: string; children: ReactNode }) {
  return (
    <div className={`frame ${className}`}>
      {title && (
        <header className="frame__head">
          <h2>{hl(title)}</h2>
        </header>
      )}
      <div className="frame__body">{children}</div>
      <footer className="frame__foot">
        <Wordmark className="wordmark" />
        <span>{year}</span>
      </footer>
    </div>
  );
}

const gst = <span className="gst"> + GST</span>;

/** Renders one slide. Add a case here when you add a slide type in lib/types.ts. */
export function SlideView({ slide, ctx }: { slide: Slide; ctx: SlideContext }) {
  const { proposal } = ctx;
  const year = yearOf(proposal.date);

  switch (slide.type) {
    case "cover":
      return (
        <div className="frame frame--cover">
          <h1 className="display">{hl(slide.title ?? defaults.coverTitle)}</h1>
          <div className="cover__foot">
            <p className="cover__client">{proposal.client}</p>
            <Wordmark className="cover__logo" />
          </div>
        </div>
      );

    case "contents": {
      const items = slide.items ?? ctx.sections.map((s) => s.title);
      return (
        <Frame year={year}>
          <ol className="contents rise">
            {items.map((item, i) => {
              const target = slide.items ? undefined : ctx.sections[i];
              return (
                <li key={i}>
                  <span className="contents__n">{String(i + 1).padStart(2, "0")}</span>
                  {target ? (
                    <button type="button" onClick={() => ctx.goTo(target.index)}>
                      {plain(item)}
                    </button>
                  ) : (
                    <span>{plain(item)}</span>
                  )}
                </li>
              );
            })}
          </ol>
        </Frame>
      );
    }

    case "section":
      return (
        <Frame year={year} className="frame--section">
          <h1 className="display">{hl(slide.title)}</h1>
          {slide.subtitle && <p className="section__sub">{slide.subtitle}</p>}
          {slide.link && (
            <a className="section__link" href={slide.link.href} target="_blank" rel="noopener noreferrer">
              {slide.link.label} ↗
            </a>
          )}
        </Frame>
      );

    case "text":
      return (
        <Frame title={slide.heading} year={year}>
          <div className="text rise">
            {slide.greeting && <h3>{slide.greeting}</h3>}
            {slide.intro && <p>{hl(slide.intro)}</p>}
            {slide.bullets && <Bullets items={slide.bullets} />}
            {slide.outro && <p>{hl(slide.outro)}</p>}
            {slide.signOff && <p className="text__sign">{slide.signOff}</p>}
          </div>
        </Frame>
      );

    case "columns":
      return (
        <Frame title={slide.heading} year={year}>
          {slide.intro && <p className="intro">{hl(slide.intro)}</p>}
          <div className="columns rise" style={{ "--n": slide.columns.length } as CSSProperties}>
            {slide.columns.map((col) => (
              <section key={col.heading}>
                <Check />
                <h3>{hl(col.heading)}</h3>
                <Bullets items={col.bullets} />
              </section>
            ))}
          </div>
        </Frame>
      );

    case "stats": {
      const stats = slide.stats ?? defaults.stats.stats;
      return (
        <Frame title={slide.heading ?? defaults.stats.heading} year={year}>
          <div className="stats rise">
            {stats.map((s) => (
              <section key={s.figure + s.label}>
                <h3>
                  <em>{s.figure}</em> {s.label}
                </h3>
                <p className="with-check">
                  <Check />
                  {s.body}
                </p>
              </section>
            ))}
          </div>
        </Frame>
      );
    }

    case "logos":
      return (
        <Frame title={slide.heading ?? defaults.logos.heading} year={year}>
          <div className="panel logos rise">
            {(slide.logos ?? defaults.logos.logos).map((l) => (
              <img key={l.src} src={l.src} alt={l.name} decoding="async" />
            ))}
          </div>
        </Frame>
      );

    case "team":
      return (
        <Frame title={slide.heading ?? defaults.team.heading} year={year}>
          <div className="team rise">
            {(slide.people ?? defaults.team.people).map((p) => (
              <figure key={p.name}>
                <img src={p.photo} alt="" decoding="async" />
                <figcaption>
                  <span>{p.name}</span>
                  <span className="muted">{p.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Frame>
      );

    case "process":
    case "next-steps": {
      const fallback = slide.type === "process" ? defaults.process : defaults.nextSteps;
      const steps = slide.steps ?? fallback.steps;
      return (
        <Frame title={slide.heading ?? fallback.heading} year={year} className="frame--centre">
          <ol className="steps rise" style={{ "--n": steps.length } as CSSProperties}>
            {steps.map((s, i) => (
              <li key={i}>
                <span className="steps__n">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </Frame>
      );
    }

    case "table":
      return (
        <Frame title={slide.heading} year={year}>
          <div className="table-wrap rise">
            <table className="table">
              <thead>
                <tr>
                  {slide.columns.map((c) => (
                    <th key={c} scope="col">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {slide.rows.map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, c) => (
                      <td key={c}>{Array.isArray(cell) ? <Bullets items={cell} /> : hl(cell)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Frame>
      );

    case "case-study": {
      const cs = "use" in slide ? defaults.caseStudies[slide.use] : slide;
      return (
        <Frame year={year} className="frame--split">
          <div className="split__text">
            <header className="frame__head">
              <h2>
                <em>{cs.client}</em> Case Study
              </h2>
            </header>
            <Check />
            <dl className="milestones rise">
              {cs.milestones.map((m) => (
                <div key={m.when}>
                  <dt>{m.when}</dt>
                  <dd>{hl(m.text)}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="split__media">
            <div className="photo">
              <img src={cs.image} alt="" decoding="async" />
            </div>
            {cs.tags && (
              <ul className="tags">
                {cs.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            )}
          </div>
        </Frame>
      );
    }

    case "testimonial": {
      const t = "use" in slide ? defaults.testimonials[slide.use] : slide;
      if (t.image) {
        return (
          <Frame year={year} className="frame--split">
            <div className="split__text">
              <header className="frame__head">
                <h2>
                  <em>{t.client}</em> Testimonial
                </h2>
              </header>
              <figure className="quote rise">
                <blockquote>{hl(t.quote)}</blockquote>
                <figcaption className="muted">
                  {t.name} – {t.role}
                </figcaption>
              </figure>
              {t.logo && <img className="quote__logo" src={t.logo} alt={t.client} decoding="async" />}
            </div>
            <div className="split__media">
              <div className="photo">
                <img src={t.image} alt="" decoding="async" />
              </div>
            </div>
          </Frame>
        );
      }
      return (
        <Frame title={`*${t.client}* Testimonial`} year={year} className="frame--centre">
          <figure className="quote quote--big rise">
            <blockquote>{hl(t.quote)}</blockquote>
            <figcaption>
              {t.avatar && <img className="quote__avatar" src={t.avatar} alt="" decoding="async" />}
              <span>
                {t.name}
                <span className="muted">{t.role}</span>
              </span>
              {t.logo && <img className="quote__logo" src={t.logo} alt={t.client} decoding="async" />}
            </figcaption>
          </figure>
        </Frame>
      );
    }

    case "audit":
      return (
        <Frame title={slide.heading} year={year}>
          {slide.images.length > 0 && (
            <div className="shots rise" style={{ "--n": slide.images.length } as CSSProperties}>
              {slide.images.map((src) => (
                <img key={src} src={src} alt="" decoding="async" />
              ))}
            </div>
          )}
          <div className="panel takeaways rise">
            <h3>Key Takeaways</h3>
            <Bullets items={slide.takeaways} />
          </div>
        </Frame>
      );

    case "scale": {
      const here = slide.youAreHere ?? 2;
      return (
        <Frame title={slide.heading} year={year}>
          <div className="scale rise">
            <div className="scale__bar" aria-hidden="true" />
            <span className="scale__here" style={{ gridRow: here + 1 }}>
              You are here
            </span>
            {slide.levels.map((l, i) => (
              <div key={i} className={`scale__level scale__level--${i}`} style={{ gridRow: i + 1 }}>
                <p className="scale__label">{l.label}</p>
                <div className="scale__card">
                  <h3>{hl(l.title)}</h3>
                  <Bullets items={l.bullets} />
                </div>
              </div>
            ))}
          </div>
        </Frame>
      );
    }

    case "pricing":
      return (
        <Frame title={slide.heading} year={year}>
          <div className="pricing rise">
            {slide.points && (
              <ol className="numbered">
                {slide.points.map((p, i) => (
                  <li key={i} className="panel">
                    <span>{i + 1}</span>
                    <p>{hl(p)}</p>
                  </li>
                ))}
              </ol>
            )}
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Item</th>
                    <th scope="col">Investment</th>
                  </tr>
                </thead>
                <tbody>
                  {slide.items.map((it) => (
                    <tr key={it.name}>
                      <td>{it.name}</td>
                      <td className="nowrap">
                        {formatPrice(it.price, it)}
                        {gst}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Frame>
      );

    case "options": {
      const compact = slide.options.every((o) => !o.features?.length && !o.tagline);
      return (
        <Frame title={slide.heading} year={year}>
          <div className={`options rise${compact ? " options--compact" : ""}`}>
            {slide.options.map((o) => (
              <section key={o.name} className="panel">
                {compact && <Check />}
                <h3>{o.name}</h3>
                {o.price !== undefined && (
                  <p className="options__price">
                    {formatPrice(o.price, o)}
                    {gst}
                  </p>
                )}
                {o.tagline && <p className="options__tagline">{o.tagline}</p>}
                {o.features && (
                  <ul className="checklist">
                    {o.features.map((f) => (
                      <li key={f}>
                        <Check />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </Frame>
      );
    }

    case "budget": {
      const max = Math.max(...slide.items.map((it) => it.amount), 1);
      return (
        <Frame title={slide.heading} year={year}>
          <div className="budget__cards rise">
            <div className="panel">
              <p>Total Budget (Annual)</p>
              <p className="budget__value">{formatMoney(slide.total)}</p>
            </div>
            <div className="panel">
              <p>Monthly Budget</p>
              <p className="budget__value">{formatMoney(Math.round(slide.total / 12 / 100) * 100)}</p>
            </div>
            <div className="panel">
              <p>Investment Categories</p>
              <p className="budget__value">{slide.items.length}</p>
            </div>
          </div>
          <dl className="bars rise">
            {slide.items.map((it) => (
              <div key={it.label}>
                <dt>{it.label}</dt>
                <dd>
                  <span className="bars__bar" style={{ "--w": it.amount / max } as CSSProperties} />
                  <span className="bars__value">{formatMoney(it.amount)}</span>
                </dd>
              </div>
            ))}
          </dl>
          {slide.takeaways && (
            <div className="panel takeaways rise">
              <h3>Key Takeaways</h3>
              <Bullets items={slide.takeaways} />
            </div>
          )}
        </Frame>
      );
    }

    case "closing": {
      const c = { ...defaults.closing, ...slide };
      return (
        <div className="frame frame--closing">
          <div className="closing rise">
            <h2>{hl(c.message)}</h2>
            <p className="muted">To continue the conversation:</p>
            <ul>
              {c.contacts.map((email) => (
                <li key={email}>
                  <a href={`mailto:${email}`}>{email}</a>
                </li>
              ))}
            </ul>
            <p className="closing__sign">{c.signOff}</p>
          </div>
          <Mark className="closing__mark" />
        </div>
      );
    }
  }
}
