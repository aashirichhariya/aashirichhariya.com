import React from 'react';

/* ============================================================
   Four marks, drawn rather than imported.

   An icon library would bring a second visual language onto a page
   whose whole vocabulary is type and rule: filled glyphs, rounded
   caps, a different optical weight. These are drawn on the same
   16px grid with a single 1.25px stroke, square caps, no fills, so
   they sit beside JetBrains Mono labels at the same colour and
   weight and read as part of the same system.

   They are decorative: every one sits next to a text label that
   already says what it is, so they are hidden from assistive tech.
   ============================================================ */

type Props = { className?: string };

const base = {
  width: 16,
  height: 16,
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'square' as const,
  strokeLinejoin: 'miter' as const,
  'aria-hidden': true,
  focusable: false,
};

export const MailIcon: React.FC<Props> = ({ className }) => (
  <svg {...base} className={className}>
    <rect x="1.5" y="3.5" width="13" height="9" />
    <path d="M1.5 4.5 8 9l6.5-4.5" />
  </svg>
);

export const LinkedInIcon: React.FC<Props> = ({ className }) => (
  <svg {...base} className={className}>
    <rect x="1.5" y="1.5" width="13" height="13" />
    <path d="M4.6 6.6v5" />
    <path d="M4.6 4.2v0.2" />
    <path d="M7.6 11.6v-5" />
    <path d="M7.6 8.2c0-1 .7-1.6 1.6-1.6s1.6.6 1.6 1.8v3.2" />
  </svg>
);

export const ClockIcon: React.FC<Props> = ({ className }) => (
  <svg {...base} className={className}>
    <circle cx="8" cy="8" r="6.3" />
    <path d="M8 4.4V8l2.6 1.6" />
  </svg>
);

export const PinIcon: React.FC<Props> = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M8 14.5s4.8-4.3 4.8-8a4.8 4.8 0 1 0-9.6 0c0 3.7 4.8 8 4.8 8Z" />
    <circle cx="8" cy="6.4" r="1.7" />
  </svg>
);

export const CalendarIcon: React.FC<Props> = ({ className }) => (
  <svg {...base} className={className}>
    <rect x="1.8" y="3.2" width="12.4" height="11" />
    <path d="M1.8 6.4h12.4" />
    <path d="M5 1.6v2.6" />
    <path d="M11 1.6v2.6" />
  </svg>
);

export const LockIcon: React.FC<Props> = ({ className }) => (
  <svg {...base} className={className}>
    <rect x="3.2" y="7" width="9.6" height="7.2" />
    <path d="M5.6 7V4.9a2.4 2.4 0 0 1 4.8 0V7" />
  </svg>
);

export const UnlockIcon: React.FC<Props> = ({ className }) => (
  <svg {...base} className={className}>
    <rect x="3.2" y="7" width="9.6" height="7.2" />
    <path d="M5.6 7V4.9a2.4 2.4 0 0 1 4.8 0" />
  </svg>
);

export const ArrowLeft: React.FC<Props> = ({ className }) => (
  <svg {...base} className={className} strokeWidth={1.4}>
    <path d="M13 8H3.4" />
    <path d="M7.2 3.8 3 8l4.2 4.2" />
  </svg>
);

export const ArrowRight: React.FC<Props> = ({ className }) => (
  <svg {...base} className={className} strokeWidth={1.4}>
    <path d="M3 8h9.6" />
    <path d="M8.8 3.8 13 8l-4.2 4.2" />
  </svg>
);
