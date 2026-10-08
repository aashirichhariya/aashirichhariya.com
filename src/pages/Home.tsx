import React, { useState } from 'react';
import Plate from '../components/Plate';
import Contact from '../components/Contact';
import Specimen from '../components/Specimen';
import { Num, SectionTitle } from '../components/Type';
import PinGate, { isUnlocked } from '../components/PinGate';
import Crits from '../components/Crits';
import { profile, plates, clientMarks, roster } from '../content';

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
              discipline, then the paragraph. */}
          <p className="fp-role">
            <span className="fp-role-title">{profile.role}</span>
            <span className="fp-role-sep" aria-hidden="true">·</span>
            <span className="fp-role-discipline">{profile.discipline}</span>
          </p>
          <p className="tagline">
            <em>I design the systems other teams build on:</em>{' '}
            {profile.tagline.replace('I design the systems other teams build on: ', '')}
          </p>
        </div>
      </div>
    </section>

    {/* ---------------------------------------------- clients */}
    <section className="canvas clients">
      <h2 className="clients-head">Brands I have worked with</h2>
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

    <Specimen />

    <Contact />

    <PinGate to={gate} onClose={() => { setGate(null); setOpen(isUnlocked()); }} />
  </>
  );
};

export default Home;
