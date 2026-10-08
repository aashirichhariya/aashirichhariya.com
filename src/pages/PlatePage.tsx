import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Num, SectionTitle } from '../components/Type';
import { plates, markHeight } from '../content';
import { CalendarIcon, LockIcon } from '../components/Icons';
import PinGate, { isUnlocked } from '../components/PinGate';

/* The project page. Everything the index deliberately leaves out ends
   up here: the full standfirst, the engagement facts, and the prose. */

const PlatePage: React.FC = () => {
  const { id } = useParams();
  const plate = plates.find((p) => p.id === id);
  const index = plates.findIndex((p) => p.id === id);
  const next = plates[(index + 1) % plates.length];

  /* The next-project link was the one way past the gate: it is a
     plain Link, so clicking it walked straight into a locked case.
     It now goes through the same dialog as the index rows. */
  const [gate, setGate] = useState<string | null>(null);
  const [open, setOpen] = useState(isUnlocked());
  const nextTo = `/work/${next.id}`;
  /* Same rule as the index: the first project is open, the rest wait. */
  const nextLocked = !open && next.id !== plates[0].id;

  if (!plate) {
    return (
      <section className="canvas">
        <div className="section-head">
          <SectionTitle as="h1">Not found</SectionTitle>
          <div className="range">No project under that name</div>
        </div>
        <Link to="/work" className="entry-read">
          Back to the work <span className="arrow">→</span>
        </Link>
      </section>
    );
  }

  const facts = [
    { k: 'Client', v: plate.clientFull || plate.client },
    { k: 'Year', v: plate.year },
    { k: 'Role', v: plate.role },
    { k: 'Duration', v: plate.duration },
    { k: 'Sector', v: plate.sector },
  ].filter((f) => f.v);

  return (
    <article className="canvas page">
      <header className="case-head">
        {/* The mark belongs here, at a size where it is legible, rather
            than shrunk into the index where the client's name already
            scans faster than a logo does. */}
        {plate.logo && (
          <img
            className="case-mark client-mark"
            src={plate.logo}
            alt={plate.clientFull || plate.client}
            style={{ height: markHeight(plate.logo) }}
          />
        )}

        <div className="case-eyebrow">
          <span>{plate.clientFull || plate.client}</span>
          {plate.sector && <span className="sep">·</span>}
          {plate.sector && <span>{plate.sector}</span>}
        </div>

        <h1 className="case-title">
          {plate.titleTop}
          {plate.titleItalic && (
            <>
              <br />
              <span className="it">{plate.titleItalic}</span>
            </>
          )}
        </h1>

        <p className="case-dek">{plate.dek}</p>

        <dl className="case-facts">
          {facts.map((f) => (
            <div className="case-fact" key={f.k}>
              <dt>{(f.k === 'Year' || f.k === 'Duration') && <CalendarIcon />}{f.k}</dt>
              <dd>{typeof f.v === 'string' ? <Num>{f.v}</Num> : f.v}</dd>
            </div>
          ))}
        </dl>
      </header>

      {/* The case study. Each movement keeps the label it had in the
          static edition — The Brief, The Work, and so on — in the rail. */}
      {plate.sections.map((sec, i) => (
        <section className="case-section" key={sec.label || i}>
          <div className="case-section-label">{sec.label}</div>
          <div className="case-section-body">
            {sec.heading && <h2 className="case-section-heading">{sec.heading}</h2>}
            <div className="wall-text">
              {sec.paras.map((para, n) => (
                <p key={n}>
                  {i === 0 && n === 0 ? (
                    <>
                      <span className="drop">{para.charAt(0)}</span>
                      {para.slice(1)}
                    </>
                  ) : (
                    para
                  )}
                </p>
              ))}

              {sec.bullets && sec.bullets.length > 0 && (
                <ul className="case-list">
                  {sec.bullets.map((b, n) => (
                    <li key={n}>{b}</li>
                  ))}
                </ul>
              )}
            </div>

            {sec.figures && sec.figures.map((fig) => (
              <figure className="case-figure" key={fig.src}>
                <img src={fig.src} alt={fig.alt} loading="lazy" decoding="async" />
                <figcaption>{fig.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ))}

      {plate.outcomes.length > 0 && (
        <section className="case-section case-outcomes">
          <div className="case-section-label">Outcomes</div>
          <div className="case-section-body">
            <dl className="outcomes-grid">
              {plate.outcomes.map((o) => (
                <div className="outcome" key={o.label}>
                  <dt className="outcome-stat">{o.stat}</dt>
                  <dd className="outcome-label">{o.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      <div className="entry-nav">
        <Link to="/work" className="entry-read">
          <span className="arrow">←</span> All work
        </Link>
        {nextLocked ? (
          <button
            type="button"
            className="entry-read as-button"
            onClick={() => setGate(nextTo)}
          >
            <LockIcon />
            {next.clientFull || next.client} <span className="arrow">→</span>
          </button>
        ) : (
          <Link to={nextTo} className="entry-read">
            {next.clientFull || next.client} <span className="arrow">→</span>
          </Link>
        )}
      </div>

      <PinGate to={gate} onClose={() => { setGate(null); setOpen(isUnlocked()); }} />
    </article>
  );
};

export default PlatePage;
