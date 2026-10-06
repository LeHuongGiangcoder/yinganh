'use client';

import { useRef, useState } from 'react';
import { Subtitle, Body } from '@/components/ui/Typography';

// The chrome for a card the guest pages through: a count, a row of dots and
// two arrows, plus swipe on touch. The layout itself lives in globals.css
// (.stepper-*), so a section can lay its pages out however it likes and still
// wear the same controls. Used by the Google Maps walkthrough and the
// accommodation card.
export function useStepper(count: number) {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);

  // Stepping relative to the *current* index, so two quick taps advance two steps
  const go = (step: number) => setIndex((i) => (i + step + count) % count);

  // Spread onto whatever element should answer to a swipe
  const swipeHandlers = {
    onTouchStart: (e: React.TouchEvent) => {
      touchX.current = e.touches[0].clientX;
    },
    onTouchEnd: (e: React.TouchEvent) => {
      if (touchX.current === null) return;
      const dx = e.changedTouches[0].clientX - touchX.current;
      if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
      touchX.current = null;
    },
  };

  return { index, setIndex, go, swipeHandlers };
}

export function StepperControls({
  index,
  count,
  go,
  setIndex,
  caption,
  label = 'Step',
  className = '',
}: {
  index: number;
  count: number;
  go: (step: number) => void;
  setIndex: (i: number) => void;
  // Optional line of copy that changes with the page
  caption?: string;
  // What one page is called, for screen readers
  label?: string;
  className?: string;
}) {
  return (
    <div className={`mt-5 flex flex-col items-center text-center ${className}`}>
      <Subtitle as="div" className="!tracking-[0.3em] mb-2">
        {index + 1} / {count}
      </Subtitle>

      {caption !== undefined && (
        <Body variant="small" className="min-h-[3.5rem] max-w-xs italic">
          {caption}
        </Body>
      )}

      <div className="stepper-controls mt-3">
        <Arrow dir="prev" label={label} onClick={() => go(-1)} />
        <div className="stepper-dots">
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${label} ${i + 1}`}
              aria-current={i === index}
              className="stepper-dot"
            />
          ))}
        </div>
        <Arrow dir="next" label={label} onClick={() => go(1)} />
      </div>
    </div>
  );
}

function Arrow({
  dir,
  label,
  onClick,
}: {
  dir: 'prev' | 'next';
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${dir === 'prev' ? 'Previous' : 'Next'} ${label.toLowerCase()}`}
      className="stepper-arrow"
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
