import React, { useEffect, useRef } from 'react';

/* A figure in a case study.

   Most are stills. Where the thing being shown is a flow rather than a
   screen, the figure carries a clip instead: it loops silently in the
   still's place, with the still as its poster so the frame is filled
   from the first paint and the layout never jumps.

   Three rules hold it to the same manners as the rest of the page:

   - It plays only while it is on screen. A looping clip in the footer
     of a long page is a fan spinning for nothing.
   - It does not play at all under prefers-reduced-motion. The poster
     stays, which is a complete picture, not a degraded one.
   - It is muted, inert and unlabelled as a control. There is nothing
     to pause because there is nothing making noise. */

type Props = {
  src: string;
  alt: string;
  caption: string;
  video?: string;
  ratio?: string;
};

const Figure: React.FC<Props> = ({ src, alt, caption, video, ratio }) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (still.matches) return;

    /* Browsers throttle offscreen playback but do not all stop it, and
       a clip that has run on for a minute offscreen then resumes from
       the middle when it is finally reached. Rewinding is wrong too:
       pausing holds the frame the reader last saw. */
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const p = el.play();
          if (p) p.catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure className="case-figure">
      {video ? (
        <video
          ref={ref}
          src={video}
          poster={src}
          aria-label={alt}
          muted
          loop
          playsInline
          preload="metadata"
          style={ratio ? { aspectRatio: ratio } : undefined}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          style={ratio ? { aspectRatio: ratio } : undefined}
        />
      )}
      <figcaption>{caption}</figcaption>
    </figure>
  );
};

export default Figure;
