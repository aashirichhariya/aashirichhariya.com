import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { profile } from '../content';

/* ============================================================
   The soft gate on the locked case studies.

   Honest about what this is: the case content ships inside the
   JavaScript bundle like everything else, so a determined reader can
   read it without the pin. This is a courtesy gate — it marks the
   work as somebody else's property and makes a person ask — not
   protection. Real protection needs the content served from behind
   an authenticated endpoint.

   One pin, held in content.ts, remembered for the session so nobody
   types it seven times.
   ============================================================ */

const KEY = 'ar.cases.unlocked';

export const isUnlocked = (): boolean => {
  try {
    return sessionStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
};

const MISSES = [
  'Not that one. Try again.',
  'Still no. It is four digits, if that helps.',
  'Let us call it a draw: email me and I will just send it.',
];

const PinGate: React.FC<{ to: string | null; onClose: () => void }> = ({ to, onClose }) => {
  const [value, setValue] = useState('');
  const [misses, setMisses] = useState(0);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const open = to !== null;

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      clearTimeout(t);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setValue('');
      setMisses(0);
    }
  }, [open]);

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() === profile.casePin) {
      try {
        sessionStorage.setItem(KEY, '1');
      } catch {
        /* private mode: the gate simply reopens next time */
      }
      onClose();
      navigate(to);
      return;
    }
    setMisses((m) => m + 1);
    setValue('');
    setShake(true);
    setTimeout(() => setShake(false), 420);
    inputRef.current?.focus();
  };

  return (
    <div className="pin-scrim" onMouseDown={onClose}>
      <div
        className={`pin-card ${shake ? 'is-wrong' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pin-h"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <span className="label">Still under wraps</span>
        <h2 className="pin-title" id="pin-h">
          Four digits, <span className="it">politely.</span>
        </h2>
        <p className="pin-body">
          This one still belongs to the people who paid for it, so it sits behind a
          pin. Ask and you will have it inside a minute. I have never said no.
        </p>

        <form onSubmit={submit} className="pin-form">
          <label className="sr-only" htmlFor="pin-input">
            Pin
          </label>
          <input
            id="pin-input"
            ref={inputRef}
            className="pin-input"
            inputMode="numeric"
            autoComplete="off"
            maxLength={8}
            placeholder="● ● ● ●"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-describedby={misses ? 'pin-miss' : undefined}
          />
          <button type="submit" className="pin-go">
            Open <span className="arrow">→</span>
          </button>
        </form>

        <p className="pin-miss" id="pin-miss" role="status">
          {misses ? MISSES[Math.min(misses - 1, MISSES.length - 1)] : ' '}
        </p>

        <div className="pin-foot">
          <a href={`mailto:${profile.email}?subject=${encodeURIComponent('The pin, please')}`}>
            {profile.email}
          </a>
          <button type="button" className="pin-close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PinGate;
