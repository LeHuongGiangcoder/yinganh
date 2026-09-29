import React from 'react';

// A long, shallow hand-drawn wave. preserveAspectRatio="none" lets it stretch to
// whatever width is left over; non-scaling-stroke keeps the line weight honest.
function Wave({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 300 24"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
      className="flex-1 h-6 min-w-0"
      style={{ transform: flip ? 'scaleX(-1)' : undefined }}
    >
      <path
        d="M4 12C34 4 58 20 92 12s58-10 92 0 54 8 84 0"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M272 12c8-6 18-6 24 0-6 6-16 6-24 0Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

// Sparkles along the rule, as % of the row
const SPARKS = [
  { x: 6, y: 22, size: 11, gold: true, delay: 0 },
  { x: 15, y: 70, size: 7, delay: 1.3 },
  { x: 26, y: 18, size: 6, delay: 2.2 },
  { x: 74, y: 24, size: 7, gold: true, delay: 0.7 },
  { x: 85, y: 72, size: 10, delay: 1.9 },
  { x: 94, y: 30, size: 6, gold: true, delay: 2.6 },
];

// A closing ornament for a section: an illustration held between two waves that
// run out to the page gutters, with sparkles scattered along them.
export default function OrnamentRow({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative w-full max-w-7xl mx-auto px-5 md:px-10 ${className}`}>
      <div className="flex items-center gap-4 md:gap-8 text-ink/30">
        <Wave />
        <div className="shrink-0">{children}</div>
        <Wave flip />
      </div>

      {SPARKS.map((s, i) => (
        <span
          key={i}
          aria-hidden
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
        >
          <span
            className={`block animate-twinkle leading-none ${s.gold ? 'text-gold' : 'text-ink-muted'}`}
            style={{ fontSize: s.size, animationDelay: `${s.delay}s` }}
          >
            ✦
          </span>
        </span>
      ))}
    </div>
  );
}
