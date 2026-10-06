'use client';

import { useEffect, useRef, useState } from 'react';
import { useLang } from '@/hooks/useLang';
import { COPY, HCMC_VIDEOS } from '@/lib/constants';
import { Heading, Subtitle, Body } from '@/components/ui/Typography';
import Decor from '@/components/ui/Decor';
import Photo from '@/components/ui/Photo';

type PlaceId = 'hanoi' | 'hcmc';

// Two looks at the capital, shown inside its own callout the way the city
// guides are shown inside Ho Chi Minh City's
const HANOI_PHOTOS = [
  { src: '/images/hanoi-01.webp', alt: 'A lantern-strung street in the old quarter of Hanoi', tilt: -2 },
  { src: '/images/hanoi-02.webp', alt: 'Turtle Tower on Hoan Kiem Lake, Hanoi', tilt: 2 },
];

// Where each city sits on the drawing, as % of the trimmed map box. These are
// not eyeballed: the drawing's own outline was fitted to real coordinates
// (north tip = Lung Cu 23.39N, south tip = Mui Ca Mau 8.56N, easternmost
// mainland = Mui Dai Lanh 109.46E), and each city's latitude and longitude run
// through that fit. The fit checks out to within a fifth of a degree against
// the country's narrowest point.
//
// `hside` is the side the callout hangs off from md up, `vside` whether the
// card drops below the bead or lifts above it — always the direction with more
// map left in it, so the card never runs off the drawing.
const PINS: {
  id: PlaceId;
  x: number;
  y: number;
  hside: 'left' | 'right';
  vside: 'top' | 'bottom';
}[] = [
  { id: 'hanoi', x: 39.8, y: 17.0, hside: 'left', vside: 'top' },
  { id: 'hcmc', x: 49.3, y: 82.9, hside: 'right', vside: 'bottom' },
];

// The map opens with nothing selected, so the drawing is seen whole; a tag
// over the Ho Chi Minh City bead offers the first press once the map reaches
// the middle of the screen.
export default function Vietnam() {
  const { lang } = useLang();
  const copy = COPY[lang].vietnam;
  const [active, setActive] = useState<PlaceId | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  // Whether the map is sitting in the middle of the screen right now, and
  // whether the guest has already pressed a pin (after which the tag is done)
  const [centred, setCentred] = useState(false);
  const [used, setUsed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // The notice waits until the drawing is properly on screen — not merely
  // touching it — so it arrives once the guest is actually looking at the map.
  // It latches on: the map is taller than half a phone screen, so a ratio read
  // live would cross the mark back and forth as the page scrolls and the card
  // would blink. Once it is up it stays up until a pin is pressed.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.5) {
          setCentred(true);
          observer.disconnect();
        }
      },
      { threshold: [0, 0.5, 0.75, 1] }
    );
    observer.observe(map);
    return () => observer.disconnect();
  }, []);

  const open = (id: PlaceId | null) => {
    setActive(id);
    if (id) setUsed(true);
  };

  const revealStyle = (delay: number): React.CSSProperties => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
    transition: 'opacity 1200ms var(--ease-out-quart), transform 1200ms var(--ease-out-quart)',
    transitionDelay: `${delay}ms`,
  });

  const openPin = PINS.find((p) => p.id === active);
  const place = openPin ? copy.places[openPin.id] : null;
  const hinting = centred && !used && !active;

  return (
    <section
      id="vietnam"
      ref={sectionRef}
      className="relative w-full max-w-7xl mx-auto px-5 md:px-10 scroll-mt-20"
    >
      <div style={revealStyle(0)} className="flex flex-col items-center text-center">
        <Subtitle as="div" className="mb-4">
          {copy.subtitle}
        </Subtitle>
        <div className="relative flex items-center justify-center">
          <Heading variant="h2" className="mb-6">
            {copy.title}
          </Heading>
          <Decor
            name="cupid-dive"
            className="absolute -top-12 -left-16 md:-top-14 md:-left-28 w-16 md:w-24"
            tilt={8}
            delay={0.9}
            opacity={0.6}
          />
        </div>
        <div className="w-12 h-[1px] bg-ink/20 mb-8" />
        <Body variant="regular" className="max-w-md text-ink-soft leading-relaxed">
          {copy.body}
        </Body>
      </div>

      <div style={revealStyle(120)} className="mt-12 md:mt-16 flex flex-col items-center">
        <div
          ref={mapRef}
          className={`relative w-full max-w-[19rem] md:max-w-[21rem] ${hinting ? 'is-hinting' : ''}`}
        >
          <img
            src="/component/vietnam-map.png"
            alt="A drawn map of Vietnam"
            loading="lazy"
            draggable={false}
            className="w-full h-auto select-none"
          />

          {/* Clicking the paper anywhere else puts the open card away */}
          {active && (
            <button
              type="button"
              aria-label={copy.closeLabel}
              onClick={() => open(null)}
              className="absolute inset-0 z-10 cursor-default"
            />
          )}

          {PINS.map((pin) => {
            const isOpen = pin.id === active;
            return (
              <button
                key={pin.id}
                type="button"
                onClick={() => open(isOpen ? null : pin.id)}
                aria-pressed={isOpen}
                className={`map-pin z-20 ${pin.hside === 'left' ? 'flex-row-reverse' : ''}`}
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
              >
                <span className="map-pin-bead" aria-hidden />
                {/* The name rides a paper chip, or it disappears into the line
                    art it is sitting on top of */}
                <span
                  className={`font-body text-[9px] md:text-[10px] tracking-[0.2em] uppercase px-1.5 py-0.5 border transition-colors ${
                    isOpen
                      ? 'text-ink bg-white/90 border-ink/25'
                      : 'text-ink-muted bg-white/80 border-ink/10'
                  }`}
                >
                  {copy.places[pin.id].pin}
                </span>
              </button>
            );
          })}

          {hinting && (
            <button
              type="button"
              className="map-notice"
              onClick={() => setUsed(true)}
              aria-label={copy.closeLabel}
            >
              <span className="map-pin-bead map-notice-bead" aria-hidden />
              <span className="map-notice-text">{copy.focusHint}</span>
            </button>
          )}

          {openPin && place && (
            <div
              className="map-callout"
              data-hside={openPin.hside}
              data-vside={openPin.vside}
              style={
                { '--pin-x': `${openPin.x}%`, '--pin-y': `${openPin.y}%` } as React.CSSProperties
              }
              role="dialog"
              aria-label={place.name}
            >
              <span className="map-callout-tail" aria-hidden />

              <div className="map-callout-body px-5 py-5 text-left">
                <button
                  type="button"
                  onClick={() => open(null)}
                  aria-label={copy.closeLabel}
                  className="absolute top-2.5 right-2.5 w-7 h-7 flex items-center justify-center text-ink-muted hover:text-ink transition-colors"
                >
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
                    <path
                      d="M1 1l9 9M10 1l-9 9"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>

                <Subtitle as="div" className="!tracking-[0.22em] !text-[9px] mb-1.5 pr-7">
                  {place.role}
                </Subtitle>
                <Heading variant="h3" className="!text-ink !text-[1.35rem] leading-tight mb-3">
                  {place.name}
                </Heading>
                <div className="w-8 h-px bg-ink/15 mb-3.5" />
                <Body variant="small" className="leading-relaxed">
                  {place.note}
                </Body>

                {/* A look at the capital, under its note */}
                {openPin.id === 'hanoi' && (
                  <ul className="mt-5 pt-4 border-t border-ink/10 grid grid-cols-2 gap-3">
                    {HANOI_PHOTOS.map((photo) => (
                      <li key={photo.src}>
                        <Photo src={photo.src} alt={photo.alt} ratio="3 / 2" tilt={photo.tilt} />
                      </li>
                    ))}
                  </ul>
                )}

                {/* The two city guides hang off the Ho Chi Minh City bead */}
                {openPin.id === 'hcmc' && (
                  <div className="mt-5 pt-4 border-t border-ink/10">
                    <Subtitle as="div" className="!tracking-[0.22em] !text-[9px] mb-3">
                      {copy.watchLabel}
                    </Subtitle>
                    <ul className="grid grid-cols-2 gap-3">
                      {HCMC_VIDEOS.map((video) => (
                        <li key={video.id}>
                          <a
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="video-thumb group block"
                          >
                            <span className="relative block overflow-hidden aspect-video border border-ink/15">
                              <img
                                src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                                alt=""
                                loading="lazy"
                                draggable={false}
                                className="absolute inset-0 w-full h-full object-cover select-none"
                              />
                              <span className="absolute inset-0 flex items-center justify-center">
                                <span className="w-7 h-7 rounded-full bg-white/85 border border-ink/20 flex items-center justify-center">
                                  <svg width="8" height="10" viewBox="0 0 10 12" aria-hidden>
                                    <path d="M0 0l10 6-10 6z" fill="currentColor" className="text-ink" />
                                  </svg>
                                </span>
                              </span>
                            </span>
                            <span className="mt-2 block font-body text-[10px] leading-snug text-ink-soft group-hover:text-ink transition-colors">
                              {video.title}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* The quiet standing caption. It steps aside while the notice is up,
            rather than saying the same thing twice, and keeps its space so
            nothing below it moves. */}
        <Body
          variant="small"
          className="mt-7 italic"
          style={{ opacity: hinting ? 0 : 1, transition: 'opacity 400ms var(--ease-smooth)' }}
        >
          {copy.hint}
        </Body>
      </div>
    </section>
  );
}
