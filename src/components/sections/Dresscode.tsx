'use client';

import { useLang } from '@/hooks/useLang';
import { COPY } from '@/lib/constants';
import { Heading, Subtitle, Body } from '@/components/ui/Typography';

// Dresscode palette: sky and ivory, warming into gold
const PALETTE = [
  '#DCE8F5', '#A8C4E0', '#5B82B0',
  '#2A4C7D', '#12305B', '#F7FAFD',
  '#FAF0D4', '#F0DC98', '#E7C965',
];

// What to wear. It sat with the venue and the run of the day until those two
// were about the evening itself and this one is about the guest — so it has
// its own section now, and its own sheet of paper under it.
export default function Dresscode() {
  const { lang } = useLang();
  const copy = COPY[lang].eventDetails;

  return (
    <section
      id="dresscode"
      className="relative w-full max-w-7xl mx-auto px-5 md:px-10 scroll-mt-20"
    >
      <div className="max-w-xl mx-auto px-4 md:px-0 flex flex-col items-center text-center">
        <Subtitle as="div" className="mb-4">
          {copy.dresscodeSubLabel}
        </Subtitle>

        <div className="flex items-center justify-center gap-4 md:gap-6 mb-4">
          <img
            src="/component/13.png"
            alt=""
            loading="lazy"
            draggable={false}
            className="w-12 md:w-16 h-auto -scale-x-100"
          />
          <Heading variant="h2" className="text-center">
            {copy.dresscode}
          </Heading>
          <img
            src="/component/13.png"
            alt=""
            loading="lazy"
            draggable={false}
            className="w-12 md:w-16 h-auto"
          />
        </div>
        <div className="w-8 h-[1px] bg-ink/10 mb-8" />

        <div className="grid grid-cols-3 gap-3 md:gap-4 w-full max-w-[280px] md:max-w-xs">
          {PALETTE.map((color) => (
            <div
              key={color}
              className="aspect-[3/4] rounded-2xl border border-ink/10"
              style={{ backgroundColor: color }}
              aria-hidden
            />
          ))}
        </div>

        <Body variant="regular" className="mt-6 max-w-sm text-center italic">
          {copy.dresscodeNote}
        </Body>
      </div>
    </section>
  );
}
