import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from './Icons';
import { crits } from '../content';

/* ============================================================
   The critiques, one at a time, on a loop.

   Eight of them is too many to stack, and the two-up grid made a
   set of eight read as a wall. Same quote design as before; it just
   advances. Rules it follows:
     - pauses on hover and on keyboard focus, so nobody loses a
       sentence halfway through reading it
     - pauses when the section is off screen, so it is not animating
       against a page nobody is looking at
     - stops entirely under prefers-reduced-motion, where it becomes
       a manual carousel with its own controls
     - the live region announces each quote as it arrives
   ============================================================ */

const HOLD = 11000;

const Crits: React.FC = () => {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [seen, setSeen] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const go = useCallback(
    (n: number) => setI((c) => (c + n + crits.length) % crits.length),
    []
  );

  /* Only run while the section is actually on screen. */
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), {
      threshold: 0.25,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || paused || !seen) return;
    const t = setInterval(() => go(1), HOLD);
    return () => clearInterval(t);
  }, [reduced, paused, seen, go]);

  const c = crits[i];

  return (
    <div
      className="crit-stage"
      ref={ref}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1);
        if (e.key === 'ArrowLeft') go(-1);
      }}
    >
      <div className="crit-window" aria-live="polite">
        <blockquote className="crit" key={i}>
          <p className="crit-hook">{c.hook}</p>
          {c.body && <p className="crit-body">{c.body}</p>}
          <footer className="crit-author">
            <span className="who">{c.who}</span>{' '}
            <span className="role">{c.role}</span>
          </footer>
        </blockquote>
      </div>

      <div className="crit-controls">
        <button type="button" className="crit-arrow" onClick={() => go(-1)} aria-label="Previous">
          <ArrowLeft />
        </button>

        <ol className="crit-dots">
          {crits.map((q, n) => (
            <li key={q.who}>
              <button
                type="button"
                className={n === i ? 'is-current' : ''}
                aria-label={`Quote ${n + 1} of ${crits.length}, ${q.who}`}
                aria-current={n === i}
                onClick={() => setI(n)}
              >
                <span className="crit-dot-fill" />
              </button>
            </li>
          ))}
        </ol>

        <button type="button" className="crit-arrow" onClick={() => go(1)} aria-label="Next">
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Crits;
