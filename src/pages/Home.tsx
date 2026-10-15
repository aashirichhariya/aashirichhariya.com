import React, { useState } from 'react';
import Plate from '../components/Plate';
import Contact from '../components/Contact';
import { Num, SectionTitle } from '../components/Type';
import PinGate, { isUnlocked } from '../components/PinGate';
import Crits from '../components/Crits';
import Typed from '../components/Typed';
import { profile, plates, clientMarks, roster } from '../content';

/* The hero's clock.

   The whole right-hand column is written out, one character after
   another, in the order it is read: the role, then the claim, then
   the three features a third of a beat apart so they cascade rather
   than queue. One speed throughout, and one gesture, which is the
   point: the role used to wipe open while everything under it was
   written.

   Each line waits on the length of the one before it, counted from
   the text itself, so editing any of the copy cannot quietly put the
   sequence out of step. */
const BEAT = 800;
const SPEED = 30;
const PAUSE = 180;

const roleText = profile.role + '·' + profile.discipline;
const ROLE_IN = BEAT;
const CLAIM_IN = ROLE_IN + roleText.length * SPEED + PAUSE;
const FEATURE_IN = CLAIM_IN + profile.claim.length * SPEED + PAUSE;
const FEATURE_STAGGER = 280;

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
          {/* The role is written out too. It used to wipe open while
              everything under it was written, which is two gestures
              for one column. */}
          <Typed
            as="div"
            className="fp-role"
            delay={ROLE_IN}
            speed={SPEED}
            parts={[
              { text: profile.role, className: 'fp-role-title' },
              { text: '·', className: 'fp-role-sep' },
              { text: profile.discipline, className: 'fp-role-discipline' },
            ]}
          />
          <Typed
            as="h2"
            className="fp-claim"
            delay={CLAIM_IN}
            speed={SPEED}
            parts={[{ text: profile.claim }]}
          />

          {/* The features write themselves, a third of a beat apart. */}
          <ul className="fp-features">
            {profile.features.map((f, i) => (
              <li key={f.term}>
                <Typed
                  as="div"
                  className="fp-feature"
                  delay={FEATURE_IN + i * FEATURE_STAGGER}
                  speed={SPEED}
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
