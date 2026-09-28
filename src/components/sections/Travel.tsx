'use client';

import { useEffect, useState, useRef } from 'react';
import { useLang } from '@/hooks/useLang';
import { COPY } from '@/lib/constants';
import { Heading, Subtitle, Body } from '@/components/ui/Typography';

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
      className="w-full max-w-7xl mx-auto px-5 md:px-10 py-24 md:py-32 overflow-hidden border-t border-ink/10 scroll-mt-20"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start px-4 md:px-0">
        {/* Left column: the city, and what to do in it */}
        <div style={revealStyle(0)} className="md:col-span-6 flex flex-col items-center md:items-start text-center md:text-left">
          <Subtitle as="div" className="mb-4">
            {copy.subtitle}
          </Subtitle>
          <Heading variant="h2" className="mb-6">
            {copy.title}
          </Heading>
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

          <ul className="w-full max-w-md flex flex-col divide-y divide-ink/10 border-y border-ink/10 text-left">
            {copy.places.map((place, idx) => {
              const open = openPlace === idx;
              return (
                <li key={place.name}>
                  <button
                    onClick={() => setOpenPlace(open ? null : idx)}
                    className="w-full flex items-center justify-between gap-4 py-4 text-left group"
                    aria-expanded={open}
                  >
                    <span className="font-display text-[clamp(1.05rem,2.6vw,1.25rem)] font-light text-ink group-hover:text-ink-soft transition-colors">
                      {place.name}
                    </span>
                    <span
                      className="shrink-0 text-ink-muted text-lg font-light transition-transform duration-300"
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
            <img
              src="/component/16.png"
              alt=""
              loading="lazy"
              draggable={false}
              className="w-16 md:w-20 h-auto mb-6 select-none"
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
                    <span className="font-display text-[clamp(1rem,2.4vw,1.15rem)] font-light text-ink">
                      {area}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <img
            src="/images/portrait-hug.webp"
            alt=""
            loading="lazy"
            draggable={false}
            className="mt-10 w-full max-w-md aspect-[4/5] object-cover rounded-3xl border border-ink/10 select-none"
          />
        </div>
      </div>
    </section>
  );
}
