'use client';

import { useEffect, useState, useRef } from 'react';
import { useLang } from '@/hooks/useLang';
import { COPY } from '@/lib/constants';
import { Heading, Subtitle, Body } from '@/components/ui/Typography';
import Decor from '@/components/ui/Decor';

// Sparkles around the postcard, as % of its box — kept to the empty corners
const POSTCARD_SPARKS = [
  { x: 4, y: 16, size: 12, gold: true, delay: 0 },
  { x: 14, y: 34, size: 7, delay: 1.4 },
  { x: 86, y: 14, size: 8, delay: 2.1 },
  { x: 95, y: 34, size: 11, gold: true, delay: 0.8 },
  { x: 8, y: 82, size: 9, delay: 1.7 },
  { x: 20, y: 94, size: 6, gold: true, delay: 2.5 },
];

export default function Travel() {
  const { lang } = useLang();
  const copy = COPY[lang].travel;
  const [isVisible, setIsVisible] = useState(false);
  const [openPlace, setOpenPlace] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const revealStyle = (delay: number): React.CSSProperties => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
    transition: 'opacity 1200ms var(--ease-out-quart), transform 1200ms var(--ease-out-quart)',
    transitionDelay: `${delay}ms`,
  });

  return (
    <section
      id="travel"
      ref={sectionRef}
      className="relative w-full max-w-7xl mx-auto px-5 md:px-10 section-y overflow-hidden border-t border-ink/10 scroll-mt-20"
    >
      <Decor
        name="cat-heart"
        className="hidden lg:block absolute bottom-24 left-0 xl:left-6 w-24 xl:w-32"
        tilt={-6}
        delay={2}
        opacity={0.5}
      />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start px-4 md:px-0">
        {/* Left column: the city, and what to do in it */}
        <div style={revealStyle(0)} className="md:col-span-6 flex flex-col items-center md:items-start text-center md:text-left">
          <Subtitle as="div" className="mb-4">
            {copy.subtitle}
          </Subtitle>
          <div className="relative w-full flex items-center justify-center md:justify-start">
            <Heading variant="h2" className="mb-6">
              {copy.title}
            </Heading>
            <Decor
              name="cupid-wine"
              className="absolute -top-10 right-0 md:-top-8 md:-right-4 w-16 md:w-20"
              tilt={10}
              flip
              opacity={0.6}
            />
          </div>
          <div className="w-12 h-[1px] bg-ink/20 mb-8 hidden md:block"></div>
          <div className="max-w-md">
            <Body
              variant="regular"
              className="text-ink-soft leading-relaxed"
              dangerouslySetInnerHTML={{ __html: copy.body }}
            />
          </div>

          <Subtitle as="div" className="mt-12 mb-5">
            {copy.placesTitle}
          </Subtitle>

          <ul className="w-full max-w-md flex flex-col divide-y divide-ink/10 text-left text-panel !py-2">
            {copy.places.map((place, idx) => {
              const open = openPlace === idx;
              return (
                <li key={place.name}>
                  <button
                    onClick={() => setOpenPlace(open ? null : idx)}
                    className="w-full flex items-center justify-between gap-4 py-4 text-left group"
                    aria-expanded={open}
                  >
                    <Heading variant="h4" as="span" className="group-hover:text-ink-soft transition-colors">
                      {place.name}
                    </Heading>
                    <span
                      className="shrink-0 text-ink-soft text-xl font-normal transition-transform duration-300"
                      style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-500 ease-in-out ${
                      open ? 'grid-rows-[1fr] opacity-100 pb-5' : 'grid-rows-[0fr] opacity-0 pb-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <Body variant="small" className="pr-8">
                        {place.desc}
                      </Body>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right column: where to stay */}
        <div style={revealStyle(200)} className="md:col-span-6 w-full flex flex-col items-center">
          <div className="relative w-full max-w-md border border-ink/15 rounded-3xl bg-white/45 backdrop-blur-[2px] px-6 md:px-8 py-10 flex flex-col items-center text-center">
            <Decor
              name="cupid-bottle"
              className="absolute -top-12 -right-4 md:-top-14 md:-right-10 w-20 md:w-24 z-10"
              tilt={-10}
              delay={1.1}
              opacity={0.65}
            />
            <Heading variant="h3" className="!text-ink mb-5">
              {copy.stay.title}
            </Heading>
            <div className="w-8 h-px bg-ink/15 mb-6" />

            <Body variant="regular" className="mb-5">
              {copy.stay.lead}
            </Body>

            <div className="w-full border-y border-ink/10 py-5 my-1">
              <Body variant="regular" className="!text-ink italic">
                {copy.stay.rate}
              </Body>
            </div>

            <Body variant="small" className="mt-5 italic">
              {copy.stay.booking}
            </Body>

            <div className="mt-10 w-full flex flex-col items-center">
              <Subtitle as="div" className="mb-3 !tracking-[0.25em]">
                {copy.stay.areaTitle}
              </Subtitle>
              <Body variant="small" className="mb-4 max-w-xs">
                {copy.stay.areaLead}
              </Body>
              <ul className="flex flex-col gap-2.5">
                {copy.stay.areas.map((area) => (
                  <li key={area} className="flex items-center justify-center gap-3">
                    <span className="text-gold text-[8px]" aria-hidden>
                      ✦
                    </span>
                    <Heading variant="h4" as="span">
                      {area}
                    </Heading>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* A postcard from the city: pin through the top-left corner, wax seal
              closing the bottom-right, sparkles scattered around the pair */}
          <div className="relative mt-10 w-full max-w-lg mx-auto md:-mr-4 lg:-mr-10">
            <img
              src="/component/travel-postcard.webp"
              alt="Postcard from Ho Chi Minh, Vietnam"
              loading="lazy"
              draggable={false}
              className="w-full h-auto select-none -rotate-2"
            />
            <img
              src="/component/blue-pin.webp"
              alt=""
              aria-hidden
              loading="lazy"
              draggable={false}
              className="absolute top-[4%] left-[6%] w-11 md:w-14 -rotate-12 select-none pointer-events-none"
            />
            <img
              src="/component/blue-seal.webp"
              alt=""
              aria-hidden
              loading="lazy"
              draggable={false}
              className="absolute bottom-[4%] right-[4%] w-12 md:w-16 -rotate-6 select-none pointer-events-none"
            />
            {POSTCARD_SPARKS.map((sp, i) => (
              <span
                key={i}
                aria-hidden
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
                style={{ left: `${sp.x}%`, top: `${sp.y}%` }}
              >
                <span
                  className={`block animate-twinkle leading-none ${sp.gold ? 'text-gold' : 'text-ink-muted'}`}
                  style={{ fontSize: sp.size, animationDelay: `${sp.delay}s` }}
                >
                  ✦
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
