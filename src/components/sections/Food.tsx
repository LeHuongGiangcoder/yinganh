'use client';

import { useEffect, useState, useRef } from 'react';
import { useLang } from '@/hooks/useLang';
import { COPY } from '@/lib/constants';
import { Heading, Subtitle, Body } from '@/components/ui/Typography';
import Decor from '@/components/ui/Decor';
import MapGuide from '@/components/interactive/MapGuide';

// The three dishes the couple sends people out for, knocked out of their
// backgrounds and laid as a cluster rather than a row: two across the top and
// the third slung underneath, overlapping both. They are cut-outs, not prints,
// so they hang with no frame — a soft shadow is all that lifts them off the
// paper. Each one is placed as a % of the cluster box so the arrangement holds
// at every width. `w` is the share of the box the dish spans.
const PLATES = [
  { src: '/images/food-01.webp', alt: 'Banh mi from Huynh Hoa, cut in half', x: 0, y: 0, w: 56, tilt: -4, z: 1 },
  { src: '/images/food-02.webp', alt: 'Banh xeo on a bamboo tray with herbs', x: 44, y: 6, w: 56, tilt: 3, z: 1 },
  { src: '/images/food-03.webp', alt: 'A bowl of hu tieu with prawns and pork', x: 22, y: 38, w: 52, tilt: -2, z: 2 },
];
// Height of the cluster box as a % of its width, so the bottom dish has room
const PLATES_RATIO = 92;

// Sparkles around the postcard, as % of its box — kept to the empty corners
const POSTCARD_SPARKS = [
  { x: 4, y: 16, size: 12, gold: true, delay: 0 },
  { x: 14, y: 34, size: 7, delay: 1.4 },
  { x: 86, y: 14, size: 8, delay: 2.1 },
  { x: 95, y: 34, size: 11, gold: true, delay: 0.8 },
  { x: 8, y: 82, size: 9, delay: 1.7 },
  { x: 20, y: 94, size: 6, gold: true, delay: 2.5 },
];

// The couple's own eating list for Ho Chi Minh City
export default function Food() {
  const { lang } = useLang();
  const copy = COPY[lang].food;
  const [isVisible, setIsVisible] = useState(false);
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
      id="food"
      ref={sectionRef}
      className="relative w-full max-w-7xl mx-auto px-5 md:px-10 scroll-mt-20"
    >
      <Decor
        name="cat-heart"
        className="hidden lg:block absolute bottom-24 left-0 xl:left-6 w-24 xl:w-32"
        tilt={-6}
        delay={2}
        opacity={0.5}
      />
      {/* Centred header */}
      <div style={revealStyle(0)} className="flex flex-col items-center text-center">
        <Subtitle as="div" className="mb-4">
          {copy.subtitle}
        </Subtitle>
        <div className="relative flex items-center justify-center">
          <Heading variant="h2" className="mb-6">
            {copy.title}
          </Heading>
          <Decor
            name="cupid-wine"
            className="absolute -top-12 -right-14 md:-top-10 md:-right-24 w-16 md:w-20"
            tilt={10}
            flip
            opacity={0.6}
          />
        </div>
        <div className="w-12 h-[1px] bg-ink/20 mb-8"></div>
        <Body variant="regular" className="max-w-md text-ink-soft leading-relaxed">
          {copy.body}
        </Body>
      </div>

      {/* What that actually looks like, before the lists themselves */}
      <div
        className="relative mt-10 md:mt-12 w-full max-w-[200px] sm:max-w-[260px] md:max-w-xs mx-auto"
        style={{ aspectRatio: `100 / ${PLATES_RATIO}` }}
      >
        {PLATES.map((plate, i) => (
          <img
            key={plate.src}
            src={plate.src}
            alt={plate.alt}
            loading="lazy"
            draggable={false}
            className="absolute select-none h-auto"
            style={{
              ...revealStyle(120 + i * 110),
              left: `${plate.x}%`,
              top: `${plate.y}%`,
              width: `${plate.w}%`,
              zIndex: plate.z,
              // The reveal already drives transform, so the resting tilt rides
              // along with it rather than fighting it for the property.
              transform: `${isVisible ? 'translateY(0)' : 'translateY(24px)'} rotate(${plate.tilt}deg)`,
            }}
          />
        ))}
      </div>

      <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start px-4 md:px-0">
        {/* Left: how to save the lists, walked through step by step */}
        <div style={revealStyle(120)} className="md:col-span-6 w-full">
          <div className="w-full max-w-md mx-auto border border-ink/15 bg-white/45 backdrop-blur-[2px] px-6 md:px-8 py-10 flex flex-col items-center text-center">
            <Heading variant="h3" className="!text-ink mb-4">
              {copy.guideTitle}
            </Heading>
            <div className="w-8 h-px bg-ink/15 mb-6" />
            <Body variant="small" className="mb-8 max-w-xs">
              {copy.guideLead}
            </Body>
            <MapGuide steps={copy.steps} />
          </div>
        </div>

        {/* Right: a postcard from the city, pinned and sealed */}
        <div style={revealStyle(240)} className="md:col-span-6 w-full flex flex-col items-center">
          <div className="relative w-full max-w-lg mx-auto md:-mr-4 lg:-mr-10">
            <img
              src="/component/travel-postcard.webp"
              alt="Postcard from Ho Chi Minh City, Vietnam"
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
                  className={`block animate-twinkle leading-none ${
                    sp.gold ? 'text-gold' : 'text-ink-muted'
                  }`}
                  style={{ fontSize: sp.size, animationDelay: `${sp.delay}s` }}
                >
                  ✦
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* The lists themselves, below the walkthrough */}
      <div style={revealStyle(320)} className="mt-12 flex flex-col items-center">
        <Subtitle as="div" className="mb-8">
          {copy.listsTitle}
        </Subtitle>

        <ul className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {copy.lists.map((list) => (
            <li key={list.url}>
              <a
                href={list.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group h-full border border-ink/15 bg-white/45 backdrop-blur-[2px] px-6 py-8 flex flex-col items-center text-center hover:border-ink/40 hover:bg-white/65 transition-colors"
              >
                <span className="text-gold text-[10px] mb-3" aria-hidden>
                  ✦
                </span>
                <Heading variant="h4" as="span" className="group-hover:text-ink-soft transition-colors">
                  {list.name}
                </Heading>
                <Body variant="small" as="span" className="mt-3">
                  {list.desc}
                </Body>
              </a>
            </li>
          ))}
        </ul>

        <Body variant="regular" className="mt-12 italic text-center max-w-sm">
          {copy.outro}
        </Body>
      </div>
    </section>
  );
}
