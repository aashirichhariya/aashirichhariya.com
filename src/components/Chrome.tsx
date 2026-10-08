import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useScrolled } from './Reveal';
import { profile } from '../content';

/* Simplified from the static edition: "Index" is gone, because it
   pointed at the same plates "Work" already lists. Three destinations. */
const links = [
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const Chrome: React.FC = () => {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  /* The wordmark duplicates the hero on the landing screen, so it is
     withheld there until the page scrolls. Every other route has no
     wordmark of its own, so it shows immediately. */
  const atHomeTop = pathname === '/' && !scrolled;

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <a className="skip-link" href="#top">Skip to content</a>

      {/* A reading rule. Driven entirely by CSS scroll(), so there is no
          scroll listener on the main thread; browsers without
          scroll-driven animation simply never draw it. */}
      <div className="progress" aria-hidden="true" />

      <header className={`chrome ${scrolled ? 'is-scrolled' : ''}`} id="chrome">
        <Link
          to="/"
          className={`mark ${atHomeTop ? 'is-withheld' : ''}`}
          aria-hidden={atHomeTop}
          tabIndex={atHomeTop ? -1 : undefined}
        >
          {profile.name}
        </Link>

        <nav className="nav" aria-label="Primary">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => (isActive ? 'is-current' : '')}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="meridian">{profile.meridian}</div>

        <button
          className="chrome-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="chrome-menu"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </header>

      {open && (
        <div className="chrome-menu" id="chrome-menu" role="dialog" aria-modal="true" aria-label="Menu">
          <nav>
            {links.map((l) => (
              <NavLink key={l.to} to={l.to}>{l.label}</NavLink>
            ))}
          </nav>
          <div className="meridian">{profile.meridian}</div>
        </div>
      )}
    </>
  );
};

export default Chrome;
