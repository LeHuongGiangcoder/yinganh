'use client';

import React from 'react';
import { useLang } from '@/hooks/useLang';
import { COPY } from '@/lib/constants';
import { Heading, Body } from '@/components/ui/Typography';

// Sparkles scattered across the farewell, as % of the section box. Kept off the
// centre column so they never sit behind the message.
const SPARKS: { x: number; y: number; size: number; gold?: boolean; delay: number }[] = [
  { x: 12, y: 14, size: 21, gold: true, delay: 0 },
  { x: 22, y: 32, size: 13, delay: 1.2 },
  { x: 7, y: 52, size: 8, gold: true, delay: 2.1 },
  { x: 17, y: 72, size: 16, delay: 0.6 },
  { x: 31, y: 88, size: 10, gold: true, delay: 1.8 },
  { x: 36, y: 8, size: 11, delay: 2.4 },
  { x: 64, y: 11, size: 14, gold: true, delay: 0.9 },
  { x: 78, y: 27, size: 10, delay: 2.7 },
  { x: 88, y: 46, size: 19, gold: true, delay: 1.5 },
  { x: 71, y: 66, size: 11, delay: 0.3 },
  { x: 83, y: 82, size: 14, delay: 2.2 },
  { x: 60, y: 93, size: 8, gold: true, delay: 1.1 },
];

export default function ThankYou() {
  const { lang } = useLang();
  const copy = COPY[lang].thankYou;

  return (
    <section
      id="thank-you"
      className="relative w-full max-w-7xl mx-auto px-5 md:px-10 section-y flex flex-col items-center justify-center text-center border-t border-ink/10"
    >
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

      <style>{`
        @keyframes floatCupid {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1.5deg); }
        }
        .animate-float-cupid {
          animation: floatCupid 5s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-float-cupid { animation: none; }
        }
      `}</style>

      {/* Floating cupid illustration */}
      <div className="animate-float-cupid w-40 h-40 md:w-48 md:h-48 mb-6 select-none pointer-events-none">
        <img
          src="/component/5.png"
          alt="Cupid illustration"
          className="w-full h-full object-contain"
          draggable={false}
        />
      </div>

      <Heading variant="h2" className="mb-6">
        {copy.title}
      </Heading>

      <div className="max-w-md mx-auto">
        <Body variant="regular" className="text-ink-soft leading-relaxed">
          {copy.body}
        </Body>
      </div>

      <div className="mt-16 flex items-center gap-3 text-ink-muted">
        <span className="block w-10 h-px bg-ink/20" />
        <span className="font-display italic text-[clamp(1.25rem,2.8vw,1.4rem)] font-normal">Ying &amp; Anh</span>
        <span className="block w-10 h-px bg-ink/20" />
      </div>
      <span className="mt-3 font-body text-[11px] md:text-xs font-medium tracking-[0.35em] uppercase text-ink-soft">
        20.12.2026 · Ho Chi Minh
      </span>
    </section>
  );
}
