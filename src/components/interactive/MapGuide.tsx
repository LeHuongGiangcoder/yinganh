'use client';

import { useRef, useState } from 'react';
import { Subtitle, Body } from '@/components/ui/Typography';

// The three screenshots, and where the button to press sits on each one.
// Positions are % of the image box, measured off the screenshots themselves, so
// they track the artwork at any width. `label` stays in English on purpose —
// it is what Google Maps itself prints on the button. `shape` follows what is
// being ringed: a pill round Google's own pill buttons, a rectangle round a
// block of rows, where a pill would read as sloppy.
type Marker = {
  left: number;
  top: number;
  width: number;
  height: number;
  label: string;
  shape?: 'pill' | 'rect';
};

const SLIDES: { src: string; markers: Marker[] }[] = [
  {
    src: '/guide/step-1.png',
    markers: [{ left: 8.4, top: 34.8, width: 21.2, height: 11.2, label: 'Save' }],
  },
  {
    src: '/guide/step-2.png',
    markers: [{ left: 2.5, top: 33.5, width: 28, height: 9.5, label: 'Saved' }],
  },
  {
    src: '/guide/step-3.png',
    markers: [
      { left: 5.5, top: 70.5, width: 64, height: 24, label: 'Lists you saved', shape: 'rect' },
    ],
  },
];

// All three screenshots are cropped to one box, so flipping between steps never
// changes the card's height.
const SLIDE_RATIO = '438 / 400';

export default function MapGuide({ steps }: { steps: string[] }) {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);

  // Stepping relative to the *current* index, so two quick taps advance two steps
  const go = (step: number) =>
    setIndex((i) => (i + step + SLIDES.length) % SLIDES.length);

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* The screenshot, with the button to press ringed on it */}
      <div
        className="relative w-full overflow-hidden border border-ink/15 bg-white/70"
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className={i === index ? 'relative' : 'hidden'}
            style={{ aspectRatio: SLIDE_RATIO }}
          >
            <img
              src={slide.src}
              alt=""
              loading="lazy"
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover object-top select-none"
            />
            {slide.markers.map((m) => (
              <span
                key={m.label}
                className={`absolute border-[2.5px] border-gold animate-marker-pulse pointer-events-none ${
                  m.shape === 'rect' ? 'rounded-[3px]' : 'rounded-full'
                }`}
                style={{
                  left: `${m.left}%`,
                  top: `${m.top}%`,
                  width: `${m.width}%`,
                  height: `${m.height}%`,
                }}
              >
                <span className="absolute left-1/2 -translate-x-1/2 -top-2 -translate-y-full whitespace-nowrap bg-ink text-white font-body text-[10px] tracking-[0.18em] uppercase px-2 py-1">
                  {m.label}
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Step number, caption, and the controls */}
      <div className="mt-5 flex flex-col items-center text-center">
        <Subtitle as="div" className="!tracking-[0.3em] mb-2">
          {index + 1} / {SLIDES.length}
        </Subtitle>
        <Body variant="small" className="min-h-[3.5rem] max-w-xs italic">
          {steps[index]}
        </Body>

        <div className="mt-3 flex items-center gap-5">
          <Arrow dir="prev" onClick={() => go(-1)} />
          <div className="flex items-center gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.src}
                onClick={() => setIndex(i)}
                aria-label={`Step ${i + 1}`}
                aria-current={i === index}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i === index ? 'bg-ink' : 'bg-ink/25 hover:bg-ink/50'
                }`}
              />
            ))}
          </div>
          <Arrow dir="next" onClick={() => go(1)} />
        </div>
      </div>
    </div>
  );
}

function Arrow({ dir, onClick }: { dir: 'prev' | 'next'; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === 'prev' ? 'Previous step' : 'Next step'}
      className="w-8 h-8 flex items-center justify-center border border-ink/20 text-ink-soft hover:text-ink hover:border-ink/50 transition-colors"
    >
      <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
        <path
          d={dir === 'next' ? 'M1 5h11M9 1.5L12.5 5 9 8.5' : 'M13 5H2M5 1.5L1.5 5 5 8.5'}
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
