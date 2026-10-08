import React, { useState } from 'react';
import Plate from '../components/Plate';
import { Num, SectionTitle } from '../components/Type';
import PinGate, { isUnlocked } from '../components/PinGate';
import { plates } from '../content';

const Work: React.FC = () => {
  const [gate, setGate] = useState<string | null>(null);
  const [open, setOpen] = useState(isUnlocked());

  return (
    <section className="canvas" id="work">
      <div className="section-head">
        <SectionTitle as="h1">Selected Work</SectionTitle>
        <div className="range"><Num>{`${plates.length} projects · 2020 / 2026`}</Num></div>
      </div>

      <div className="index-list">
        {plates.map((p, i) => (
          <Plate
            key={p.id}
            plate={p}
            /* CoreAI is the open one. The rest wait behind the pin
               until it has been entered once this session. */
            locked={i > 0 && !open}
            onLocked={setGate}
          />
        ))}
      </div>

      <PinGate to={gate} onClose={() => { setGate(null); setOpen(isUnlocked()); }} />
    </section>
  );
};

export default Work;
