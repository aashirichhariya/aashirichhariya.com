import React from 'react';
import { Link } from 'react-router-dom';
import { Num } from './Type';
import { CalendarIcon, LockIcon } from './Icons';
import type { Plate as PlateT } from '../content';

/* A row in the index of work. Deliberately thin.

   It had grown into the whole case study: four paragraphs of prose, a
   drop cap, a metadata table. That is the project page's job. A
   listing exists to let someone scan seven projects and choose one,
   so it carries only what you choose on — who it was for, what it
   was, when, and a single line of what it did.

   The whole row is the link; the title is the accessible name. */

const Plate: React.FC<{
  plate: PlateT;
  locked?: boolean;
  onLocked?: (to: string) => void;
}> = ({ plate: p, locked = false, onLocked }) => {
  const client = p.clientFull || p.client;
  /* On the Publicis projects the case page's sector line is the parent
     company, which is the client again — printing both put the same
     name twice in one row. */
  const sector = p.sector && p.sector !== client ? p.sector : null;

  const to = `/work/${p.id}`;

  /* Every row offers the case study, including the two whose pages
     carry only a cover. A locked row is a button, not a link: it
     opens the gate rather than navigating, so it is not a
     destination to the keyboard or to a crawler. */
  const Row: React.ElementType = locked ? 'button' : Link;
  const rowProps = locked
    ? {
        type: 'button' as const,
        className: 'entry-link is-locked',
        onClick: () => onLocked && onLocked(to),
      }
    : { to, className: 'entry-link' };

  return (
  <article className="entry">
    <Row {...rowProps}>
      <div className="entry-top">
        <span className="entry-id">
          <span className="entry-client">{client}</span>
          {sector && <span className="entry-sector">{sector}</span>}
        </span>
        <span className="entry-year"><CalendarIcon /><Num>{p.year}</Num></span>
      </div>

      <h3 className="entry-title">
        {p.titleTop}
        {p.titleItalic && (
          <>
            {' '}
            <span className="it">{p.titleItalic}</span>
          </>
        )}
      </h3>

      <p className="entry-lede">{p.lede}</p>

      <div className="entry-foot">
        <span className="entry-read">
          {/* Only the locked rows carry a mark. The open one needs no
              badge saying it is open. */}
          {locked && <LockIcon />}
          Read Case study
          <span className="arrow">→</span>
        </span>
      </div>
    </Row>
  </article>
  );
};

export default Plate;
