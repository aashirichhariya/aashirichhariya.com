import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SectionTitle } from '../components/Type';

/* The catch-all used to render Home. With the SPA rewrite in place that
   meant every mistyped URL served the front page under a wrong address —
   a reader gets no signal they went astray, and a crawler sees the same
   page at unlimited URLs. This says what happened and offers the way on. */

const NotFound: React.FC = () => {
  useEffect(() => {
    const prev = document.title;
    document.title = 'Not found · Aashi Richhariya';
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <section className="canvas">
      <div className="section-head">
        <SectionTitle as="h1">Not <span className="it">found</span></SectionTitle>
        <div className="range">No page at this address</div>
      </div>

      <div className="wall-text" style={{ maxWidth: '46ch' }}>
        <p>
          The address does not match anything in this edition. The work is
          catalogued in full under Work and the shortest route to a person is
          an email.
        </p>

        <Link to="/work" className="entry-read">
          Back to the work <span className="arrow">→</span>
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
