import React, { useEffect, useState } from 'react';

/* Text that writes itself out, one character at a time, across one or
   more styled parts: a feature's name and its line are two spans but
   one stream, so the caret runs straight from the end of the name into
   the line beneath it.

   Five things keep it from being the usual nuisance:

   - It does not move the page. The finished text is rendered
     underneath, hidden but holding its box, so every line below is in
     its final position from the first paint.
   - It is read whole. The writing is decoration, so it is hidden from
     assistive tech and the element carries the finished text as its
     accessible name. Nobody hears it stutter.
   - The caret only exists while this one is being written. Before its
     turn there is no caret, or three of them would blink at once.
   - It does not write at all under prefers-reduced-motion.
   - It always finishes. The count is read from the clock rather than
     incremented per tick, so a throttled tab catches up rather than
     crawling, and a tab left in the background arrives at finished
     text instead of nothing. requestAnimationFrame would be the usual
     driver and is the wrong one: a browser that is not painting never
     runs it, and an earlier version of this sat at zero characters
     with the line blank. */

export type Part = { text: string; className?: string };

type Props = {
  parts: Part[];
  /* When the first character lands, in ms from mount. */
  delay: number;
  /* Milliseconds per character. */
  speed: number;
  as?: 'div' | 'span' | 'h2';
  className?: string;
  /* Writes once a visit. Coming back to the page should not make
     someone sit through it being written again. */
  once?: string;
};

const stillness = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Storage throws in a private window and comes back empty with site
   data cleared, so a failure here just means it writes again. */
const seen = (key?: string) => {
  if (!key) return false;
  try {
    return window.sessionStorage.getItem('typed:' + key) === '1';
  } catch {
    return false;
  }
};
const remember = (key?: string) => {
  if (!key) return;
  try {
    window.sessionStorage.setItem('typed:' + key, '1');
  } catch {
    /* nothing to do: it writes again next time, which is not a fault */
  }
};

const Typed: React.FC<Props> = ({
  parts,
  delay,
  speed,
  as: Tag = 'div',
  className,
  once,
}) => {
  /* Spoken as one sentence: a feature's name, a full stop, its line. */
  const whole = parts.map((p) => p.text).join('. ');
  const total = parts.reduce((n, p) => n + p.text.length, 0);
  const instant = stillness() || seen(once);

  /* -1 is "not started": no characters and no caret either. */
  const [n, setN] = useState(() => (instant ? total : -1));

  useEffect(() => {
    if (instant) {
      setN(total);
      return;
    }
    const start = Date.now() + delay;
    const id = window.setInterval(() => {
      const elapsed = Date.now() - start;
      if (elapsed < 0) return;
      const chars = Math.floor(elapsed / speed);
      if (chars >= total) {
        setN(total);
        remember(once);
        window.clearInterval(id);
      } else {
        setN(chars);
      }
    }, speed);
    return () => window.clearInterval(id);
  }, [total, delay, speed, once, instant]);

  const writing = n >= 0 && n < total;

  /* Walk the parts, handing each the slice of the stream it owns. */
  let taken = 0;
  const written = parts.map((part, i) => {
    const from = taken;
    taken += part.text.length;
    const shown = Math.max(0, Math.min(part.text.length, n - from));
    /* The write head is in this part, so the caret belongs here. */
    const head = n >= from && n < taken;
    return (
      <span className={part.className} key={i}>
        {part.text.slice(0, shown)}
        {writing && head && <span className="typed-caret" />}
      </span>
    );
  });

  return (
    <Tag className={`typed${className ? ' ' + className : ''}`} aria-label={whole}>
      <span className="typed-ghost" aria-hidden="true">
        {parts.map((part, i) => (
          <span className={part.className} key={i}>
            {part.text}
          </span>
        ))}
      </span>
      <span className="typed-ink" aria-hidden="true">
        {written}
      </span>
    </Tag>
  );
};

export default Typed;
