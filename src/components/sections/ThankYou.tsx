'use client';

import React from 'react';
import { useLang } from '@/hooks/useLang';
import { COPY } from '@/lib/constants';
import { Heading, Body } from '@/components/ui/Typography';

export default function ThankYou() {
  const { lang } = useLang();
  const copy = COPY[lang].thankYou;

  return (
    <section
      id="thank-you"
      className="w-full max-w-7xl mx-auto px-5 md:px-10 py-24 md:py-32 flex flex-col items-center justify-center text-center border-t border-ink/10"
    >
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
        <span className="font-display italic text-lg font-light">Ying &amp; Anh</span>
        <span className="block w-10 h-px bg-ink/20" />
      </div>
      <span className="mt-3 font-body text-[10px] tracking-[0.4em] uppercase text-ink-muted">
        20.12.2026 · Saigon
      </span>
    </section>
  );
}
