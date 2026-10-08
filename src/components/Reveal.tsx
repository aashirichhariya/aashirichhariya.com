import React, { useEffect, useState } from 'react';

/* ============================================================
   No scroll animation. The stylesheet gates all reveal motion
   behind a `js-anim` class that this build never sets, so the
   observer that used to live here was doing nothing visible.
   Content is present on first paint.
   ============================================================ */

type Tags = keyof React.JSX.IntrinsicElements;

type Props<E extends Tags> = {
  as?: E;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<E>, 'as' | 'className' | 'children'>;

export function Reveal<E extends Tags = 'div'>({
  as,
  className = '',
  children,
  ...rest
}: Props<E>) {
  const Tag = (as || 'div') as React.ElementType;
  return (
    <Tag className={className || undefined} {...rest}>
      {children}
    </Tag>
  );
}

/* The chrome gains its paper backing once the page leaves the top. */
export function useScrolled(threshold = 80) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > threshold);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}
