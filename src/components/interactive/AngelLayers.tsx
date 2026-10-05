'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// The cupid, drawn as three registered layers on one canvas (angel-wings /
// angel-bottle / angel-body, exported from the same crop box so they line up at
// inset-0). The whole angel drifts as one — wings and bottle are attached to the
// body, so they travel with it — and each then carries its own motion on top:
// the wings flap, the bottle tilts in the hand. Separate periods, so the parts
// never beat in unison and the figure reads as alive rather than as one block.
export default function AngelLayers({ className = '' }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // The angel's own drift, carrying all three layers with it
      gsap.to('[data-angel="figure"]', {
        y: -11,
        rotation: 1.6,
        duration: 3.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        transformOrigin: '50% 65%',
      });

      // Wings pivot where they meet the shoulder
      gsap
        .to('[data-angel="wings"]', {
          rotation: 6.5,
          duration: 1.25,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          transformOrigin: '48% 38%',
        })
        // Start part-way in, so the parts are already out of phase on frame one
        .progress(0.35);

      // The bottle swings a little around the hand holding it
      gsap
        .to('[data-angel="bottle"]', {
          rotation: 2.8,
          y: -3,
          duration: 2.1,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          transformOrigin: '64% 62%',
        })
        .progress(0.7);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <div data-angel="figure" className="absolute inset-0">
        <img
          data-angel="wings"
          src="/component/angel-wings.png"
          alt=""
          draggable={false}
          className="absolute inset-0 w-full h-full object-contain select-none"
        />
        <img
          data-angel="bottle"
          src="/component/angel-bottle.png"
          alt=""
          draggable={false}
          className="absolute inset-0 w-full h-full object-contain select-none"
        />
        <img
          data-angel="body"
          src="/component/angel-body.png"
          alt="Cupid pouring champagne"
          draggable={false}
          className="absolute inset-0 w-full h-full object-contain select-none"
        />
      </div>
    </div>
  );
}
