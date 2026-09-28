'use client';

import { useEffect, useState } from 'react';
import { useLang } from '@/hooks/useLang';
import { COPY } from '@/lib/constants';
import { Heading, Subtitle } from '@/components/ui/Typography';

interface HeroProps {
  startAnimation: boolean;
}

export default function Hero({ startAnimation }: HeroProps) {
  const { lang } = useLang();
  const copy = COPY[lang].hero;
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!startAnimation) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setRevealed(true)));
    return () => cancelAnimationFrame(id);
  }, [startAnimation]);

  const revealStyle = (index: number): React.CSSProperties => ({
    opacity: revealed ? 1 : 0,
    transform: revealed ? 'translateY(0)' : 'translateY(14px)',
    transition: 'opacity 1100ms var(--ease-out-quart), transform 1100ms var(--ease-out-quart)',
    transitionDelay: `${index * 140 + 120}ms`,
  });

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full flex items-center justify-center px-5 md:px-10 pt-24 md:pt-28 pb-20"
    >
      <div className="w-full max-w-4xl flex flex-col items-center text-center">
        <div style={revealStyle(0)} className="flex items-center justify-center gap-2 md:gap-3 w-full">
          <img
            src="/component/left.png"
            alt=""
            className="h-14 md:h-20 w-auto opacity-85 select-none"
            draggable={false}
          />
          <Subtitle as="span" className="shrink-0 tracking-[0.45em] !text-xs md:!text-base">
            {copy.eyebrow}
          </Subtitle>
          <img
            src="/component/right.png"
            alt=""
            className="h-14 md:h-20 w-auto opacity-85 select-none"
            draggable={false}
          />
        </div>

        <div style={revealStyle(1)} className="mt-5 flex items-center gap-3">
          <span className="block w-16 md:w-24 h-px bg-ink/30" />
          <Ornament />
          <span className="block w-16 md:w-24 h-px bg-ink/30" />
        </div>

        <Heading variant="h1" style={revealStyle(2)} className="mt-6 md:mt-5 text-center">
          <span className="block" style={{ fontSize: 'clamp(3.6rem, 13vw, 8rem)' }}>
            Ying <span className="italic font-light text-ink-soft">&amp;</span> Anh
          </span>
        </Heading>

        {/* The champagne tower the couple drew — their toast, at the top of the page */}
        <div style={revealStyle(3)} className="relative mt-8 md:mt-10 w-[18rem] md:w-[22rem]">
          <img
            src="/component/champagne.png"
            alt="Illustration of the couple toasting above a champagne tower"
            className="w-full h-auto select-none block"
            style={{ animation: 'floatToast 5s ease-in-out infinite' }}
            draggable={false}
          />
        </div>

        <div style={revealStyle(4)} className="mt-8 md:mt-10 flex flex-col items-center gap-4">
          <div className="flex items-center gap-4 text-ink-soft">
            {/* Left column: month & year */}
            <div className="flex flex-col text-right font-display leading-tight">
              <span className="text-[clamp(1.6rem,4vw,2.1rem)] italic font-light lowercase">
                {copy.month}
              </span>
              <span className="text-[clamp(1.25rem,3vw,1.6rem)] font-light tracking-wider opacity-85">
                2026
              </span>
            </div>

            <div className="h-14 md:h-16 w-px bg-ink/25" />

            {/* Right column: day */}
            <div className="font-display text-[clamp(3rem,8vw,4.5rem)] leading-none font-light">20</div>
          </div>

          <Subtitle className="mt-3 !text-xs md:!text-base !tracking-[0.35em]">{copy.location}</Subtitle>
        </div>
      </div>

      <div
        style={revealStyle(5)}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="block w-px h-8 bg-ink/30"
          style={{ animation: 'scrollLine 2.4s ease-in-out infinite' }}
        />
      </div>

      <style>{`
        @keyframes scrollLine {
          0%, 100% { transform: scaleY(0.3); transform-origin: top; opacity: 0.3; }
          50% { transform: scaleY(1); opacity: 0.7; }
        }
        @keyframes floatToast {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(-1deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="floatToast"], [style*="scrollLine"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}

function Ornament() {
  return (
    <svg width="30" height="30" viewBox="0 0 22 22" fill="none" className="text-ink" aria-hidden>
      <circle cx="11" cy="11" r="1.6" fill="currentColor" />
      <path
        d="M11 3 Q12 7 11 11 Q10 7 11 3 Z M11 19 Q10 15 11 11 Q12 15 11 19 Z M3 11 Q7 10 11 11 Q7 12 3 11 Z M19 11 Q15 12 11 11 Q15 10 19 11 Z"
        fill="currentColor"
        opacity="0.65"
      />
    </svg>
  );
}
