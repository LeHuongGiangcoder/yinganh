'use client';

import { useEffect, useRef, useState } from 'react';
import { FLASHBACK_IMAGES } from '@/lib/constants';

// The photographs from the entrance, laid back out as a strip so guests can
// look at them properly once the montage has flown past.
const TILT = [-3, 2, -2, 3, -2.5, 2.5, -3.5];

export default function Gallery() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="w-full overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <div className="flex items-center gap-4 md:gap-6 px-5 md:px-10 py-16 md:py-20 w-max mx-auto">
        {FLASHBACK_IMAGES.map((src, i) => (
          <div
            key={src}
            className="shrink-0 bg-sky-light p-2 md:p-3 border border-ink/10 shadow-[0_10px_30px_-14px_rgba(18,48,91,0.5)]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible
                ? `translateY(0) rotate(${TILT[i % TILT.length]}deg)`
                : 'translateY(28px) rotate(0deg)',
              transition:
                'opacity 900ms var(--ease-out-quart), transform 900ms var(--ease-out-quart)',
              transitionDelay: `${i * 90}ms`,
            }}
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              draggable={false}
              className="block h-[42vh] md:h-[52vh] w-auto aspect-[2/3] object-cover object-center border border-ink/15 select-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
