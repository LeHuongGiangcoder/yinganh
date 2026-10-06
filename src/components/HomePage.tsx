'use client';

import { useState, useEffect } from 'react';
import Entrance from '@/components/interactive/Entrance';
import Fireworks from '@/components/interactive/Fireworks';
import Nav from '@/components/ui/Nav';
import Hero from '@/components/sections/Hero';
import Gallery from '@/components/sections/Gallery';
import EventDetails from '@/components/sections/EventDetails';
import Dresscode from '@/components/sections/Dresscode';
import Visa from '@/components/sections/Visa';
import Vietnam from '@/components/sections/Vietnam';
import Stay from '@/components/sections/Stay';
import Food from '@/components/sections/Food';
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
      {/* The blue sheet the whole page is printed on. Absolute, not fixed, so
          it scrolls with the content; the cream sections lay their own sheet
          over it (see .paper-sheet / .paper-tone-beige in globals.css). */}
      <div className="absolute inset-0 -z-30 overflow-hidden pointer-events-none" aria-hidden>
        <div className="paper-sheet" />
      </div>

      {!entranceDone && (
        <Entrance onDone={() => setEntranceDone(true)} onReveal={() => setRevealContent(true)} />
      )}

      {/* Shells go off over the hero the instant the entrance hands the page over */}
      <Fireworks active={revealContent} />

      {/* Everything else stays hidden until the entrance starts fading out, so the
          sketch overlay owns the whole screen (no content peeking on mobile), then
          crossfades in as the overlay fades away. */}
      <div
        className={`transition-opacity duration-1000 ${
          revealContent ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Nav />

        {/* The page is a stack of blocks, blue and cream taking turns. Each
            block is one band — a section plus the ornament that closes it —
            and owns its own sheet of paper, edge to edge. The hero opens on
            the blue sheet the whole page sits on. */}
        <Hero startAnimation={revealContent} />

        <div className="paper-block paper-block-beige">
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
        </div>

        {/* The venue and the run of the day belong together */}
        <div className="paper-block">
          <EventDetails />
        </div>

        {/* What to wear is about the guest, not the evening, so it turns the page */}
        <div className="paper-block paper-block-beige">
          <Dresscode />

          <OrnamentRow className="section-tail relative z-10">
            <img
              src="/component/gifts.png"
              alt=""
              aria-hidden
              className="w-56 md:w-80 h-auto opacity-85 mix-blend-multiply pointer-events-none select-none"
            />
          </OrnamentRow>
        </div>

        <div className="paper-block">
          <Visa />

          {/* Breather between the visa guide and the travel notes */}
          <OrnamentRow className="section-tail relative z-10">
            <Decor name="cat-heart" className="w-24 md:w-32" tilt={-7} opacity={0.6} />
          </OrnamentRow>
        </div>

        {/* Where the country is, before where to sleep in it */}
        <div className="paper-block paper-block-beige">
          <Vietnam />
        </div>

        <div className="paper-block">
          <Stay />
        </div>

        <div className="paper-block paper-block-beige">
          <Food />
        </div>

        <div className="paper-block">
          <RSVP />
        </div>

        <div className="paper-block paper-block-beige">
          <ThankYou />
        </div>
      </div>
    </main>
  );
}
