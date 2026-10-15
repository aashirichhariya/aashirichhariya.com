import React, { useState } from 'react';
import Plate from '../components/Plate';
import Contact from '../components/Contact';
import { Num, SectionTitle } from '../components/Type';
import PinGate, { isUnlocked } from '../components/PinGate';
import Crits from '../components/Crits';
import Typed from '../components/Typed';
import { profile, plates, clientMarks, roster } from '../content';

/* The hero's clock, the same numbers the stylesheet counts in. A line
   lands every beat; the mark is cut first and the first line waits for
   it. Kept here beside the stylesheet's --beat and --beat-1 because the
   claim is timed in JavaScript and the lines around it in CSS, and the
   two have to agree.

   CLAIM_SPEED is the one to turn. At 19ms a character the line did not
   type, it snapped, which is the opposite of what typing is for: the
   point is that a sentence is being thought, and nobody thinks at 53
   characters a second. At 50ms it is a shade slower than it can be
   read, so the eye arrives at the full stop just after the hand does. */
const BEAT = 800;
const LEAD = 1200;
const CLAIM_IN = LEAD + BEAT * 2;
const CLAIM_SPEED = 50;

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
          {/* The claim types itself, then the three things it rests
              on arrive as a set. */}
          <Typed
            className="fp-claim"
            text={profile.claim}
            delay={CLAIM_IN}
            speed={CLAIM_SPEED}
            once="hero-claim"
          />
          <ul className="fp-pillars">
            {profile.pillars.map((p, i) => (
              <li key={p.term} style={{ '--i': i } as React.CSSProperties}>
                <span className="fp-pillar-term">{p.term}.</span>{' '}
                <span className="fp-pillar-gloss">{p.gloss}</span>
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
