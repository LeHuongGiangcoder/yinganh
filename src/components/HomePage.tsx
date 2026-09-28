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

        <div className="w-full flex justify-center pb-8 pt-4 md:pb-12 md:pt-4 -mt-8 md:-mt-16 opacity-85 mix-blend-multiply pointer-events-none select-none relative z-10">
          <img src="/component/dancers.png" alt="" className="w-64 md:w-96 h-auto" />
        </div>

        <EventDetails />

        <div className="w-full flex justify-center pb-8 pt-4 md:pb-12 md:pt-4 -mt-12 md:-mt-20 opacity-85 mix-blend-multiply pointer-events-none select-none relative z-10">
          <img src="/component/gifts.png" alt="" className="w-64 md:w-96 h-auto" />
        </div>

        <Visa />
        <Travel />
        <RSVP />
        <ThankYou />
      </div>
    </main>
  );
}
