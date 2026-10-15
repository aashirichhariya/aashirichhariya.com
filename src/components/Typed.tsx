import React, { useEffect, useState } from 'react';

/* Text that writes itself out, one character at a time, across one or
   more styled parts: a feature's name and its line are two spans but
   one stream, so the caret runs straight from the end of the name into
   the line beneath it.

   The text is in the document once. An earlier version held two
   copies, a hidden one to reserve the box and a growing one on top,
   which meant selecting the page copied everything twice and ran the
   name into its line. Here the characters that have not been written
   yet are simply hidden: they still occupy their space, so the box is
   its final size from the first paint and nothing below ever moves,
   but there is only one of each word in the page.

   The rest of it:

   - It writes on every load. An earlier version remembered that it
     had run and skipped it for the rest of the session, which meant
     that after the first visit nobody ever saw it again, including
     anyone reloading the page to look at it.
   - It is read whole. The writing is decoration, so the spans are
     hidden from assistive tech and the element carries the finished
     text as its accessible name. Nobody hears it stutter.
   - The caret only exists while this one is being written. Before its
     turn there is no caret, or three would blink at once.
   - It does not write at all under prefers-reduced-motion.
   - It always finishes. The count is read from the clock rather than
     incremented per tick, so a throttled tab catches up rather than
     crawling, and a tab left in the background arrives at finished
     text instead of nothing. requestAnimationFrame would be the usual
     driver and is the wrong one: a browser that is not painting never
     runs it, and an earlier version sat at zero characters with the
     line blank. */

export type Part = { text: string; className?: string };

type Props = {
  parts: Part[];
  /* When the first character lands, in ms from mount. */
  delay: number;
  /* Milliseconds per character. */
  speed: number;
  as?: 'div' | 'span' | 'h2';
  className?: string;
};

const stillness = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Typed: React.FC<Props> = ({
  parts,
  delay,
  speed,
  as: Tag = 'div',
  className,
}) => {
  /* Spoken as one sentence: a feature's name, a full stop, its line. */
  const whole = parts.map((p) => p.text).join('. ');
  const total = parts.reduce((n, p) => n + p.text.length, 0);
  const instant = stillness();

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
        window.clearInterval(id);
      } else {
        setN(chars);
      }
    }, speed);
    return () => window.clearInterval(id);
  }, [total, delay, speed, instant]);

  const writing = n >= 0 && n < total;

  /* Walk the parts, handing each the slice of the stream it owns. */
  let taken = 0;

  return (
    <Tag className={`typed${className ? ' ' + className : ''}`} aria-label={whole}>
      {parts.map((part, i) => {
        const from = taken;
        taken += part.text.length;
        const shown = instant
          ? part.text.length
          : Math.max(0, Math.min(part.text.length, n - from));
        /* The write head is in this part, so the caret belongs here. */
        const head = n >= from && n < taken;
        const rest = part.text.slice(shown);
        return (
          <React.Fragment key={i}>
            {i > 0 && ' '}
          <span className={part.className} aria-hidden="true">
            {part.text.slice(0, shown)}
            {writing && head && <span className="typed-caret" />}
            {rest && <span className="typed-rest">{rest}</span>}
          </span>
          </React.Fragment>
        );
      })}
    </Tag>
  );
};

export default Typed;
