import React, { useEffect, useState } from 'react';

/* Text that types itself out.

   Four things keep it from being the usual nuisance:

   - It does not move the page. The finished line is rendered
     underneath, hidden but holding its box, so the layout is settled
     from the first paint and nothing below shifts as characters land.
   - It is read whole. The typing is decoration, so it is hidden from
     assistive tech and the heading carries the finished sentence as
     its accessible name. Nobody hears it stutter.
   - It does not type at all under prefers-reduced-motion. The line is
     simply there, which is the same sentence.
   - It always finishes. The count is read from the clock rather than
     incremented per tick, so a throttled timer makes it catch up
     rather than crawl, and a tab that was in the background the whole
     time arrives at a finished line instead of an empty one.

   requestAnimationFrame would be the usual driver and is the wrong one
   here: a browser that is not painting does not run it, and the first
   version of this sat at zero characters with the headline blank. A
   timer is coarser and always fires. */

type Props = {
  text: string;
  /* When the first character lands, in ms from mount. */
  delay: number;
  /* Milliseconds per character. */
  speed: number;
  className?: string;
  /* Types once a visit. Clicking the wordmark to come home should not
     make someone sit through the sentence being written again; the
     gesture is an introduction, and you are only introduced once. */
  once?: string;
};

const stillness = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Storage throws in a private window and comes back empty with site
   data cleared, so a failure here just means it types again. */
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
    /* nothing to do: it types again next time, which is not a fault */
  }
};

const Typed: React.FC<Props> = ({ text, delay, speed, className, once }) => {
  const [n, setN] = useState(() =>
    stillness() || seen(once) ? text.length : 0,
  );

  useEffect(() => {
    if (stillness() || seen(once)) {
      setN(text.length);
      return;
    }
    const start = Date.now() + delay;
    const id = window.setInterval(() => {
      const chars = Math.floor((Date.now() - start) / speed);
      if (chars >= text.length) {
        setN(text.length);
        remember(once);
        window.clearInterval(id);
      } else if (chars > 0) {
        setN(chars);
      }
    }, speed);
    return () => window.clearInterval(id);
  }, [text, delay, speed, once]);

  const typing = n < text.length;

  return (
    <h2 className={`typed${className ? ' ' + className : ''}`} aria-label={text}>
      <span className="typed-ghost" aria-hidden="true">
        {text}
      </span>
      <span className="typed-ink" aria-hidden="true">
        {text.slice(0, n)}
        {typing && <span className="typed-caret" />}
      </span>
    </h2>
  );
};

export default Typed;
