import React, { useState } from 'react';
import Plate from '../components/Plate';
import Contact from '../components/Contact';
import { Num, SectionTitle } from '../components/Type';
import PinGate, { isUnlocked } from '../components/PinGate';
import Crits from '../components/Crits';
import Typed from '../components/Typed';
import { profile, plates, clientMarks, roster } from '../content';

/* The hero's clock, the same numbers the stylesheet counts in.

   The claim does not animate. It is the one sentence the page exists
   to say, so it is simply there, from the first paint, and the lines
   above it keep the wipe they have always had.

   The features are the only thing written out, which is what makes it
   one gesture rather than three competing ones. They are written at a
   deliberate 35ms a character and started half a beat apart, so the
   three cascade and overlap: slow enough to read as a hand writing,
   short enough overall that the set is finished in under three
   seconds rather than the eight that writing them end to end would
   cost. FEATURE_SPEED and FEATURE_STAGGER are the two numbers to turn.
*/
const BEAT = 800;
const LEAD = 1200;
const FEATURE_IN = LEAD + BEAT * 2;
const FEATURE_SPEED = 35;
const FEATURE_STAGGER = BEAT / 2;

const Home: React.FC = () => {
  const [gate, setGate] = useState<string | null>(null);
  const [open, setOpen] = useState(isUnlocked());

  return (
  <>
    {/* ---------------------------------------------- frontispiece */}
    <section className="frontispiece canvas">
      <div className="fp-grid">
        <div>
          {/* The full stop belongs to the wordmark and sits hard against it;
              .surname leaves the inline flow so the period closes "Aashi."
              while the accessible text still reads "Aashi Richhariya." */}
          <h1 className="name">
            Aa<span className="it">shi</span>
            <span className="surname"> Richhariya</span>
            {/* The stop hangs: it carries almost no ink but a full
                advance width, so counting it in the centring box
                pushed the letters left of the surname beneath. */}
            <span className="stop">.</span>
          </h1>
        </div>

        <div className="fp-right">
          {/* Two beats, not one line: the title lands, then the
              discipline, then the claim. */}
          <p className="fp-role">
            <span className="fp-role-title">{profile.role}</span>
            <span className="fp-role-sep" aria-hidden="true">·</span>
            <span className="fp-role-discipline">{profile.discipline}</span>
          </p>
          {/* Always there. The page's one sentence does not need an
              entrance. */}
          <h2 className="fp-claim">{profile.claim}</h2>

          {/* The features write themselves, half a beat apart. */}
          <ul className="fp-features">
            {profile.features.map((f, i) => (
              <li key={f.term}>
                <Typed
                  as="div"
                  className="fp-feature"
                  once={`hero-feature-${i}`}
                  delay={FEATURE_IN + i * FEATURE_STAGGER}
                  speed={FEATURE_SPEED}
                  parts={[
                    { text: f.term, className: 'fp-feature-term' },
                    { text: f.gloss, className: 'fp-feature-gloss' },
                  ]}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    {/* ---------------------------------------------- clients */}
    <section className="canvas clients">
      <div className="clients-head-row">
        <h2 className="clients-head">Brands I have worked with</h2>
        <span className="range">Retail · AI · Healthcare · Apparel</span>
      </div>
      <ul className="client-row">
        {clientMarks.map((c, i) => (
          <li key={c.name} style={{ '--i': i } as React.CSSProperties}>
            <img src={c.src} alt={c.name} className="client-mark" style={{ height: c.h }} />
          </li>
        ))}
        {roster.map((name, i) => (
          <li key={name} style={{ '--i': i + clientMarks.length } as React.CSSProperties}>
            <span className="client-name">{name}</span>
          </li>
        ))}
      </ul>
    </section>

    {/* ---------------------------------------------- the work */}
    <section className="canvas" id="work">
      <div className="section-head">
        <SectionTitle>Selected Work</SectionTitle>
        <div className="range"><Num>{`${plates.length} projects · 2020 / 2026`}</Num></div>
      </div>

      <div className="index-list">
        {plates.map((p, i) => (
          <Plate key={p.id} plate={p} locked={i > 0 && !open} onLocked={setGate} />
        ))}
      </div>
    </section>

    {/* ------------------------------------------------- what they said
        The critiques used to be interleaved one-per-project, which cut
        the index in half at every row and made two opinions look like
        seven. They read as a set, so they sit as a set. */}
    <section className="canvas crits" aria-labelledby="crits-h">
      <div className="section-head">
        <SectionTitle id="crits-h">What they <span className="it">said</span></SectionTitle>
        <div className="range">From the people who ran the work</div>
      </div>

      <Crits />

    </section>

    <Contact />

    <PinGate to={gate} onClose={() => { setGate(null); setOpen(isUnlocked()); }} />
  </>
  );
};

export default Home;
