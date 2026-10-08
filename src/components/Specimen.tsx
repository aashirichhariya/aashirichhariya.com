import React, { useEffect, useState } from 'react';
import { SectionTitle } from './Type';

/* ============================================================
   THE SPECIMEN

   Every portfolio for a design-systems lead asserts that the person
   can build a system. This one shows the system it is itself built
   from, and reads it live: the values below are pulled out of the
   running stylesheet with getComputedStyle at mount, not typed into
   this file. Change a token in the CSS and this section changes with
   it — which is the only honest way to print a specimen, and is the
   claim the page is making.
   ============================================================ */

type Swatch = { token: string; name: string; use: string };

const COLOUR: Swatch[] = [
  { token: '--paper', name: 'Paper', use: 'Ground' },
  { token: '--ink', name: 'Ink', use: 'The writing' },
  { token: '--ochre', name: 'Ochre', use: 'The voice' },
  { token: '--ochre-deep', name: 'Ochre deep', use: 'The labels' },
  { token: '--umber', name: 'Umber', use: 'Tertiary' },
  { token: '--petrol', name: 'Petrol', use: 'The figures' },
  { token: '--muted', name: 'Muted', use: 'Secondary' },
  { token: '--hairline', name: 'Hairline', use: 'Division' },
];

const MEASURE = [
  { token: '--section-py', name: 'Section' },
  { token: '--section-head-mb', name: 'Head' },
  { token: '--gutter', name: 'Gutter' },
];

/* Read off the scale tokens, so the samples are the sizes the page
   actually sets rather than numbers typed in beside them. */
const SCALE = [
  { label: 'Title', family: 'var(--serif)', size: 'var(--t-h1)', weight: 200, style: 'normal' as const },
  { label: 'Heading', family: 'var(--serif)', size: 'var(--t-h3)', weight: 300, style: 'italic' as const },
  { label: 'Lead', family: 'var(--serif)', size: 'var(--t-lead)', weight: 300, style: 'normal' as const },
  { label: 'Running text', family: 'var(--serif)', size: 'var(--t-body)', weight: 400, style: 'normal' as const },
  { label: 'Label', family: 'var(--mono)', size: 'var(--t-label)', weight: 300, style: 'normal' as const },
];

/* Relative luminance, so each swatch can label itself with its own
   contrast against the paper it sits on. The numbers are measured,
   not asserted. */
const luminance = (rgb: string): number | null => {
  const m = rgb.match(/\d+(\.\d+)?/g);
  if (!m || m.length < 3) return null;
  const [r, g, b] = m.slice(0, 3).map((v) => {
    const c = Number(v) / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const ratio = (a: string, b: string): string | null => {
  const la = luminance(a);
  const lb = luminance(b);
  if (la === null || lb === null) return null;
  const hi = Math.max(la, lb);
  const lo = Math.min(la, lb);
  return ((hi + 0.05) / (lo + 0.05)).toFixed(2);
};

const Specimen: React.FC = () => {
  const [read, setRead] = useState<Record<string, string>>({});

  useEffect(() => {
    const cs = getComputedStyle(document.documentElement);
    const probe = document.createElement('span');
    probe.style.display = 'none';
    document.body.appendChild(probe);

    const out: Record<string, string> = {};
    [...COLOUR, ...MEASURE].forEach(({ token }) => {
      out[token] = cs.getPropertyValue(token).trim();
    });

    /* Resolve each colour to the rgb() the browser actually paints, so
       the contrast figures are real rather than parsed from hex. */
    COLOUR.forEach(({ token }) => {
      probe.style.color = `var(${token})`;
      probe.style.setProperty('color', out[token]);
      out[token + ':rgb'] = getComputedStyle(probe).color;
    });

    document.body.removeChild(probe);
    setRead(out);
  }, []);

  const paperRgb = read['--paper:rgb'];

  return (
    <section className="canvas specimen" id="specimen" aria-labelledby="specimen-h">
      <div className="section-head">
        <SectionTitle id="specimen-h">
          The system <span className="it">beneath this page</span>
        </SectionTitle>
        <div className="range">Read live from the stylesheet</div>
      </div>

      <div className="specimen-grid">
        {/* ------------------------------------------------ colour */}
        <div className="spec-col">
          <h3 className="spec-label">Colour</h3>
          <ul className="spec-swatches">
            {COLOUR.map((c) => {
              const value = read[c.token];
              const rgb = read[c.token + ':rgb'];
              const cr = rgb && paperRgb && c.token !== '--paper' ? ratio(rgb, paperRgb) : null;
              return (
                <li key={c.token}>
                  <span className="spec-chip" style={{ background: `var(${c.token})` }} aria-hidden="true" />
                  <span className="spec-chip-text">
                    <span className="spec-chip-name">{c.name}</span>
                    <span className="spec-chip-token">{c.token}</span>
                  </span>
                  <span className="spec-chip-meta">
                    <span className="spec-chip-use">{c.use}</span>
                    <span className="spec-chip-val">{value || '\u2014'}</span>
                  </span>
                  <span className="spec-chip-cr">{cr ? `${cr}:1` : ''}</span>
                </li>
              );
            })}
          </ul>
          <p className="spec-note">
            Divided by job, so no two kinds of information share a colour.
            Ochre is the author&rsquo;s voice; ochre deep names the fields; umber
            carries ranges and attributions; petrol is reserved for figures.
            Contrast is measured against the paper at render, not claimed.
          </p>
        </div>

        {/* -------------------------------------------------- type */}
        <div className="spec-col">
          <h3 className="spec-label">Type</h3>
          <ul className="spec-scale">
            {SCALE.map((s) => (
              <li key={s.label}>
                <span className="spec-scale-label">{s.label}</span>
                <span
                  className="spec-scale-sample"
                  style={{
                    fontFamily: s.family,
                    fontSize: s.size,
                    fontWeight: s.weight,
                    fontStyle: s.style,
                  }}
                >
                  Aa
                </span>
              </li>
            ))}
          </ul>
          <p className="spec-note">
            Fraunces for everything that speaks, JetBrains Mono for everything
            that labels. No third family; a system earns its range from
            weight and size. Ten steps hold the whole site.
          </p>
        </div>

        {/* ----------------------------------------------- measure */}
        <div className="spec-col">
          <h3 className="spec-label">Measure</h3>
          <ul className="spec-measures">
            {MEASURE.map((m) => (
              <li key={m.token}>
                <span className="spec-measure-head">
                  <span className="spec-measure-name">{m.name}</span>
                  <span className="spec-measure-val">{read[m.token] || '—'}</span>
                </span>
                <span
                  className="spec-measure-bar"
                  style={{ width: read[m.token] || 0 }}
                  aria-hidden="true"
                />
              </li>
            ))}
          </ul>
          <p className="spec-note">
            The bars are drawn at the token&rsquo;s real value, so they shorten with
            the viewport exactly as the page does. These three hold the
            vertical rhythm; everything else is derived from them.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Specimen;
