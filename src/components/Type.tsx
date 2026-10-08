import React from 'react';

/* ============================================================
   Two typographic primitives, so the same decisions are not made
   again separately in nine places.
   ============================================================ */

/* ── Num ──
   Figures carry the figure colour wherever they appear, not only
   where a whole element happens to be a number. "7 projects · 2020 /
   2026" was one flat tertiary string; the numerals in it are the
   part a reader scans for, so they take petrol and the words around
   them stay tertiary. Splitting on the capture group keeps the
   separators, so nothing is dropped from the original string. */
export const Num: React.FC<{ children: string }> = ({ children }) => (
  <>
    {children.split(/(\d+(?:[.,:]\d+)*\+?%?)/g).map((part, i) =>
      /\d/.test(part) ? (
        <span className="num" key={i}>
          {part}
        </span>
      ) : (
        <React.Fragment key={i}>{part}</React.Fragment>
      )
    )}
  </>
);

/* ── SectionTitle ──
   Every section heading was hand-set, with its own <br /> deciding
   where the line broke. They read as separate decisions rather than
   one system, so they are one component now: a single line that
   wraps only when it must, cut open on scroll the same way the
   wordmark is cut on load. */
type TitleProps = {
  as?: 'h1' | 'h2';
  id?: string;
  children: React.ReactNode;
};

export const SectionTitle: React.FC<TitleProps> = ({ as = 'h2', id, children }) => {
  const Tag = as;
  return (
    <Tag className="title" id={id}>
      <span className="title-cut">{children}</span>
    </Tag>
  );
};
