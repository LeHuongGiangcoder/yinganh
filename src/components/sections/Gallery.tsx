'use client';

import { useEffect, useRef, useState } from 'react';
import { useLang } from '@/hooks/useLang';
import { FLASHBACK_IMAGES, COPY } from '@/lib/constants';
import { Heading, Subtitle, Body } from '@/components/ui/Typography';

// The photographs from the entrance, laid back out as a strip so guests can
// look at them properly once the montage has flown past.
const TILT = [-3, 2, -2, 3, -2.5, 2.5, -3.5];

export default function Gallery() {
  const { lang } = useLang();
  const copy = COPY[lang].gallery;
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const revealStyle = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition:
      'opacity 1200ms var(--ease-out-quart), transform 1200ms var(--ease-out-quart)',
    transitionDelay: `${delay}ms`,
  });

  return (
    <section ref={ref} className="w-full">
      {/* Title sits above the strip, centred over the full-bleed scroller */}
      <div className="w-full max-w-7xl mx-auto px-5 md:px-10 pt-8 md:pt-12 flex flex-col items-center text-center">
        <Subtitle as="div" className="mb-4" style={revealStyle(0)}>
          {copy.subtitle}
        </Subtitle>
        <Heading variant="h2" style={revealStyle(120)}>
          {copy.title}
        </Heading>
        <div
          className="w-12 h-[1px] bg-ink/20 mt-6"
          style={revealStyle(200)}
        ></div>

        {/* Nudge so guests know the strip keeps going sideways */}
        <div
          className="mt-6 flex items-center gap-2 text-ink-muted"
          style={revealStyle(280)}
        >
          <Body
            variant="small"
            as="span"
            className="tracking-[0.25em] uppercase"
          >
            {copy.hint}
          </Body>
          <svg
            width="28"
            height="8"
            viewBox="0 0 28 8"
            fill="none"
            aria-hidden="true"
            className="animate-nudge"
          >
            <path
              d="M0 4h25M21 1l4 3-4 3"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="w-full overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex items-center gap-4 md:gap-6 px-5 md:px-10 py-10 md:py-14 w-max mx-auto">
          {FLASHBACK_IMAGES.map((src, i) => (
            <div
              key={src}
              className="shrink-0 bg-sky-light p-2 md:p-3 border border-ink/10 shadow-[0_10px_30px_-14px_rgba(18,48,91,0.5)]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible
                  ? `translateY(0) rotate(${TILT[i % TILT.length]}deg)`
                  : 'translateY(28px) rotate(0deg)',
                transition:
                  'opacity 900ms var(--ease-out-quart), transform 900ms var(--ease-out-quart)',
                transitionDelay: `${360 + i * 90}ms`,
              }}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                draggable={false}
                className="block h-[42vh] md:h-[52vh] w-auto aspect-[2/3] object-cover object-center border border-ink/15 select-none"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
