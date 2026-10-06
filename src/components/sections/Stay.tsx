'use client';

import { useEffect, useState, useRef } from 'react';
import { useLang } from '@/hooks/useLang';
import { COPY, WEDDING } from '@/lib/constants';
import { Heading, Subtitle, Body } from '@/components/ui/Typography';
import Button from '@/components/ui/Button';
import Decor from '@/components/ui/Decor';
import { useStepper, StepperControls } from '@/components/ui/Stepper';

// Where guests sleep. Both answers live in one card the guest pages through:
// the venue's own wedding rate first, the streets to look along if they would
// rather book elsewhere second.
export default function Stay() {
  const { lang } = useLang();
  const copy = COPY[lang].stay;
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { index, setIndex, go, swipeHandlers } = useStepper(2);

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
      id="stay"
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
            name="cupid-bottle"
            className="absolute -top-12 -right-14 md:-top-14 md:-right-24 w-16 md:w-24"
            tilt={-10}
            delay={1.1}
            opacity={0.65}
          />
        </div>
        <div className="w-12 h-[1px] bg-ink/20 mb-10"></div>
      </div>

      {/* One card, two pages: the venue, then everywhere else */}
      <div style={revealStyle(120)} className="w-full max-w-lg mx-auto px-4 md:px-0">
        <div className="stepper-frame" {...swipeHandlers}>
          <div className="stepper-stack px-6 md:px-10 py-10">
            {/* Page 1 — the venue's own rooms, at the wedding rate */}
            <div className={`stepper-page flex flex-col items-center justify-center text-center ${index === 0 ? 'is-active' : ''}`}>
              <Heading variant="h3" className="!text-ink mb-5">
                {WEDDING.venue}
              </Heading>
              <div className="w-8 h-px bg-ink/15 mb-6" />

              <Body variant="regular" className="mb-5">
                {copy.lead}
              </Body>

              <div className="w-full border-y border-ink/10 py-5 my-1">
                <Body variant="regular" className="!text-ink italic">
                  {copy.rate}
                </Body>
              </div>

              <Body variant="small" className="mt-5 italic">
                {copy.booking}
              </Body>

              <a
                href={WEDDING.stayBookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6"
                tabIndex={index === 0 ? undefined : -1}
              >
                <Button variant="primary">{copy.bookBtn}</Button>
              </a>
            </div>

            {/* Page 2 — somewhere else in District 1 */}
            <div className={`stepper-page flex flex-col items-center justify-center text-center ${index === 1 ? 'is-active' : ''}`}>
              <Heading variant="h3" className="!text-ink mb-5 max-w-xs">
                {copy.areaTitle}
              </Heading>
              <div className="w-8 h-px bg-ink/15 mb-6" />
              <Body variant="regular" className="mb-8 max-w-xs">
                {copy.areaLead}
              </Body>
              <ul className="flex flex-col gap-3.5">
                {copy.areas.map((area) => (
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
        </div>

        <StepperControls
          index={index}
          count={2}
          go={go}
          setIndex={setIndex}
          label="Option"
        />
      </div>

    </section>
  );
}
