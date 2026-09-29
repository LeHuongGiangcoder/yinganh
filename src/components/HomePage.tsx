'use client';

import { useState, useEffect } from 'react';
import Entrance from '@/components/interactive/Entrance';
import Nav from '@/components/ui/Nav';
import Hero from '@/components/sections/Hero';
import Gallery from '@/components/sections/Gallery';
import EventDetails from '@/components/sections/EventDetails';
import Visa from '@/components/sections/Visa';
import Travel from '@/components/sections/Travel';
import RSVP from '@/components/sections/RSVP';
import ThankYou from '@/components/sections/ThankYou';
import Decor from '@/components/ui/Decor';
import OrnamentRow from '@/components/ui/OrnamentRow';

// The whole invitation page. skipIntro opens straight on the hero with no sketch entrance,
// for direct links like /schedule.
export default function HomePage({ skipIntro = false }: { skipIntro?: boolean }) {
  const [entranceDone, setEntranceDone] = useState(skipIntro);
  // Becomes true the moment the entrance starts fading out, so content crossfades in
  const [revealContent, setRevealContent] = useState(skipIntro);

  // Always start at the top on (re)load so the entrance plays from the Hero,
  // instead of the browser restoring the previous scroll position.
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative text-ink">
      {/* Sky and cloud alternate down the whole page (see .backdrop-band in
          globals.css). Absolute, not fixed, so the bands scroll with the content. */}
      <div className="absolute inset-0 -z-30 overflow-hidden pointer-events-none bg-sky" aria-hidden>
        <div className="backdrop-band backdrop-sky" />
        <div className="backdrop-band backdrop-cloud" />
        {/* Gentle wash so body copy stays legible over both */}
        <div className="absolute inset-0 bg-[#EAF1F9]/55" />
      </div>

      {!entranceDone && (
        <Entrance onDone={() => setEntranceDone(true)} onReveal={() => setRevealContent(true)} />
      )}

      {/* Everything else stays hidden until the entrance starts fading out, so the
          sketch overlay owns the whole screen (no content peeking on mobile), then
          crossfades in as the overlay fades away. */}
      <div
        className={`transition-opacity duration-1000 ${
          revealContent ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Nav />
        <Hero startAnimation={revealContent} />
        <Gallery />

        <OrnamentRow className="section-tail relative z-10">
          <div className="flex items-center justify-center gap-2 md:gap-4">
            <img
              src="/component/left.png"
              alt=""
              aria-hidden
              className="w-6 md:w-10 h-auto opacity-85 mix-blend-multiply pointer-events-none select-none"
            />
            <img
              src="/component/dancers.png"
              alt=""
              aria-hidden
              className="w-56 md:w-80 h-auto opacity-85 mix-blend-multiply pointer-events-none select-none"
            />
            <img
              src="/component/right.png"
              alt=""
              aria-hidden
              className="w-6 md:w-10 h-auto opacity-85 mix-blend-multiply pointer-events-none select-none"
            />
          </div>
        </OrnamentRow>

        <EventDetails />

        <OrnamentRow className="section-tail relative z-10">
          <img
            src="/component/gifts.png"
            alt=""
            aria-hidden
            className="w-56 md:w-80 h-auto opacity-85 mix-blend-multiply pointer-events-none select-none"
          />
        </OrnamentRow>

        <Visa />

        {/* Breather between the visa guide and the travel notes */}
        <OrnamentRow className="section-tail relative z-10">
          <Decor name="cat-heart" className="w-24 md:w-32" tilt={-7} opacity={0.6} />
        </OrnamentRow>

        <Travel />

        <RSVP />
        <ThankYou />
      </div>
    </main>
  );
}
