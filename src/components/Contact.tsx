import React from 'react';
import { SectionTitle } from './Type';
import { MailIcon, LinkedInIcon, ClockIcon, PinIcon } from './Icons';
import { profile } from '../content';

/* Contact appears twice: as the closing section of the home page, where
   the name is already the h1, and as the whole of /contact, where it is
   the page's own heading. The level follows the context. */
const Contact: React.FC<{ lead?: boolean }> = ({ lead = false }) => {
  return (
  <section id="inquire" className="inquiries canvas">
    <div className="section-head is-bare">
      <SectionTitle as={lead ? 'h1' : 'h2'}>Contact</SectionTitle>
      <div className="range">Where to write · Toronto</div>
    </div>

    {/* No spacer element: the empty div that held the left column open
        on desktop became a blank grid row once the grid stacked, eating
        a 48px gap on mobile. The column is held by placement instead. */}
    <div className="inquiries-grid">
      <div className="inq-main">
        <div className="inq-status">
          <span className="dot" />
          <span>Replying within 48 hours · Toronto, EST</span>
        </div>

        <p className="inq-statement">
          Open to <em>leadership conversations</em>, advisory engagements and select
          platform work. Write to <a href={`mailto:${profile.email}`}>{profile.email}</a>.
        </p>

        <div className="inq-channels">
          <div className="inq-channel">
            <span className="label"><MailIcon /> Email</span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <span className="sub">Case studies, role briefs and anything with detail attached</span>
          </div>
          <div className="inq-channel">
            <span className="label"><LinkedInIcon /> LinkedIn</span>
            <a href={profile.linkedin} rel="me noopener noreferrer" target="_blank">
              /in/aashi-richhariya
            </a>
            <span className="sub">Read what the people I have worked for wrote there</span>
          </div>
          <div className="inq-channel">
            <span className="label"><ClockIcon /> A conversation</span>
            {/* A prefilled brief rather than "ask by email": the reply
                already contains the three things a first call needs. */}
            <a
              href={
                `mailto:${profile.email}` +
                '?subject=' + encodeURIComponent('A conversation') +
                '&body=' + encodeURIComponent(
                  'Role or project:\n\nThree times that suit you (with time zone):\n1.\n2.\n3.\n\n30 or 60 minutes?\n'
                )
              }
            >
              Send three times
            </a>
            <span className="sub">30 or 60 minutes · Toronto, EST (UTC−5)</span>
          </div>
          <div className="inq-channel">
            <span className="label"><PinIcon /> Located</span>
            <span className="v">Toronto, Canada</span>
            <span className="sub">Open to remote · English and Hindi</span>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default Contact;
