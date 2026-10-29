import type { Proposal, Slide } from "@/lib/types";
import { formatDate, formatPrice } from "@/lib/format";

/** Renders one slide. Add a case here when you add a slide type in lib/types.ts. */
export function SlideView({ slide, proposal }: { slide: Slide; proposal: Proposal }) {
  switch (slide.type) {
    case "cover":
      return (
        <section className="slide slide--cover">
          <div className="slide__inner">
            <p className="cover__client">{proposal.client}</p>
            <h1 className="cover__title">{slide.title}</h1>
            {slide.subtitle && <p className="cover__subtitle">{slide.subtitle}</p>}
            <p className="cover__meta">
              Prepared by {proposal.preparedBy}, {formatDate(proposal.date)}
            </p>
          </div>
        </section>
      );

    case "statement":
      return (
        <section className="slide slide--statement">
          <div className="slide__inner">
            <p className="statement__text">{slide.text}</p>
            {slide.detail && <p className="statement__detail">{slide.detail}</p>}
          </div>
        </section>
      );

    case "text":
      return (
        <section className="slide">
          <div className="slide__inner">
            <h2>{slide.heading}</h2>
            <div className="prose">
              {slide.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      );

    case "points":
      return (
        <section className="slide">
          <div className="slide__inner">
            <h2>{slide.heading}</h2>
            {slide.intro && <p className="lede">{slide.intro}</p>}
            <div className="points">
              {slide.points.map((pt) => (
                <div className="point" key={pt.title}>
                  <h3>{pt.title}</h3>
                  <p>{pt.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case "timeline":
      return (
        <section className="slide">
          <div className="slide__inner">
            <h2>{slide.heading}</h2>
            <ol className="timeline">
              {slide.steps.map((s, i) => (
                <li key={i}>
                  <span className="timeline__when">{s.when}</span>
                  <div>
                    <h3>{s.title}</h3>
                    {s.body && <p>{s.body}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      );

    case "pricing": {
      const total = slide.items.reduce((sum, it) => sum + it.price, 0);
      const exGst = slide.excludesGst !== false;
      return (
        <section className="slide">
          <div className="slide__inner">
            <h2>{slide.heading}</h2>
            <div className="table-wrap">
              <table className="pricing">
                <tbody>
                  {slide.items.map((it) => (
                    <tr key={it.name}>
                      <th scope="row">
                        {it.name}
                        {it.description && <span>{it.description}</span>}
                      </th>
                      <td>{formatPrice(it.price)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th scope="row">Total</th>
                    <td>
                      {formatPrice(total)}
                      {exGst && <span> + GST</span>}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            {slide.note && <p className="note">{slide.note}</p>}
          </div>
        </section>
      );
    }

    case "team":
      return (
        <section className="slide">
          <div className="slide__inner">
            <h2>{slide.heading}</h2>
            <div className="team">
              {slide.people.map((p) => (
                <div key={p.name}>
                  <h3>{p.name}</h3>
                  <p className="team__role">{p.role}</p>
                  {p.bio && <p>{p.bio}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case "quote":
      return (
        <section className="slide">
          <div className="slide__inner">
            <figure className="quote">
              <blockquote>{slide.quote}</blockquote>
              <figcaption>{slide.attribution}</figcaption>
            </figure>
          </div>
        </section>
      );

    case "next-steps":
      return (
        <section className="slide">
          <div className="slide__inner">
            <h2>{slide.heading}</h2>
            <ol className="steps">
              {slide.steps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
            <div className="contact">
              <p>{slide.contact.name}</p>
              <p>
                <a href={`mailto:${slide.contact.email}`}>{slide.contact.email}</a>
              </p>
              {slide.contact.phone && (
                <p>
                  <a href={`tel:${slide.contact.phone.replace(/\s/g, "")}`}>{slide.contact.phone}</a>
                </p>
              )}
            </div>
          </div>
        </section>
      );
  }
}
