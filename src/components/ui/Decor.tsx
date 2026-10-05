import React from 'react';

// Little ink drawings lifted from the element sheet (public/component/el-*.webp).
// Purely decorative: they break up the long information sections between the
// visa guide and the RSVP, and are hidden from screen readers.
export type DecorName =
  | 'cupid-wine'
  | 'cupid-coupe'
  | 'cupid-dive'
  | 'cupid-bottle'
  | 'cupid-bowl'
  | 'cupid-glass'
  | 'cat-arrow'
  | 'cat-heart'
  | 'orchid';

interface DecorProps {
  name: DecorName;
  /** Sizing and placement live here, e.g. "w-24 absolute -top-6 left-0" */
  className?: string;
  /** Resting tilt in degrees; the drift animation sways around it */
  tilt?: number;
  /** Mirror horizontally, for elements that should face the other way */
  flip?: boolean;
  /** Stagger so a group of them never bobs in unison */
  delay?: number;
  opacity?: number;
}

export default function Decor({
  name,
  className = '',
  tilt = 0,
  flip = false,
  delay = 0,
  opacity = 0.7,
}: DecorProps) {
  return (
    <span
      aria-hidden
      className={`block pointer-events-none select-none ${className}`}
      style={{ transform: flip ? 'scaleX(-1)' : undefined, opacity }}
    >
      <img
        src={`/component/el-${name}.webp`}
        alt=""
        loading="lazy"
        draggable={false}
        className="w-full h-auto animate-drift"
        style={{ ['--tilt' as string]: `${tilt}deg`, animationDelay: `${delay}s` }}
      />
    </span>
  );
}
