import React from 'react';
import { Num, SectionTitle } from '../components/Type';
import { CalendarIcon } from '../components/Icons';
import { about, roles, extras, profile } from '../content';

/* The static edition carried About as four prose blocks. Two problems:
   each block's heading was rendered into a <dt> with an empty <dd>
   beside it — wrong semantically, and the cause of the label colliding
   with the lede — and the whole employment history sat inside one of
   those blocks as four run-on paragraphs with the role titles buried
   mid-sentence.

   Here the narrative stays prose, and the record becomes a record. */

const About: React.FC = () => {
  const [lede, narrative, , closing] = about;

  return (
    <section className="canvas">
      <div className="section-head">
        <SectionTitle as="h1">About</SectionTitle>
        <div className="range">Toronto · Principal Design System Lead</div>
      </div>

      {lede && (
        <div className="about-lede">
          {lede.paras.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      )}

      {narrative && (
        <section className="about-movement">
          <h2 className="about-heading">{narrative.heading}</h2>
          <div className="wall-text">
            {narrative.paras.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>
      )}

      {/* The record. One row per thing held, newest first. */}
      <section className="about-movement">
        <h2 className="about-heading">Where I have worked and what I held there.</h2>

        {/* One wrapper, because .about-movement is a two-column grid:
            as three children the extras wrapped into the heading rail. */}
        <div>
        <ol className="record">
          {roles.map((r) => (
            <li className="record-row" key={r.role + r.org}>
              <div className="record-when"><CalendarIcon /><Num>{r.years}</Num></div>
              <div className="record-what">
                <h3 className="record-role">{r.role}</h3>
                <div className="record-org">{r.org}</div>
                {r.body && <p className="record-body">{r.body}</p>}
              </div>
            </li>
          ))}
        </ol>

        <dl className="record-extras">
          {extras.map((e) => (
            <React.Fragment key={e.label}>
              <dt>{e.label}</dt>
              <dd>{e.body}</dd>
            </React.Fragment>
          ))}
        </dl>
        </div>
      </section>

      {closing && (
        <section className="about-movement about-closing">
          <h2 className="about-heading">{closing.heading}</h2>
          <div className="wall-text">
            <p>{closing.paras[0]}</p>
            <p>
              Write to{' '}
              <a className="ink-link" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
              , or find me on{' '}
              <a
                className="ink-link"
                href={profile.linkedin}
                rel="me noopener noreferrer"
                target="_blank"
              >
                LinkedIn
              </a>
              .
            </p>
          </div>
        </section>
      )}
    </section>
  );
};

export default About;
