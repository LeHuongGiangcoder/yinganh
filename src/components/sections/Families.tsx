'use client';

import { useLang } from '@/hooks/useLang';
import { COPY } from '@/lib/constants';
import { Heading, Subtitle, Body } from '@/components/ui/Typography';

// Nhà trai / nhà gái — the two families, their parents, and the rite each side holds
export default function Families() {
  const { lang } = useLang();
  const copy = COPY[lang].families;

  return (
    <section
      id="families"
      className="w-full max-w-7xl mx-auto px-5 md:px-10 py-24 md:py-32 border-t border-ink/10 scroll-mt-20"
    >
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
        <Subtitle as="div" className="mb-6">
          {copy.subtitle}
        </Subtitle>
        <Heading variant="h2" className="mb-6">
          {copy.title}
        </Heading>
        <div className="w-8 h-px bg-ink/15 mb-8" />
        <Body variant="regular" className="max-w-xl italic">
          {copy.intro}
        </Body>
      </div>

      <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 max-w-4xl mx-auto">
        <FamilyCard family={copy.groom} art="/component/7.png" />
        <FamilyCard family={copy.bride} art="/component/8.png" className="md:border-l md:border-ink/10" />
      </div>
    </section>
  );
}

function FamilyCard({
  family,
  art,
  className = '',
}: {
  family: (typeof COPY)['en']['families']['groom'];
  art: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center text-center px-4 md:px-10 ${className}`}>
      <img
        src={art}
        alt=""
        loading="lazy"
        draggable={false}
        className="h-28 md:h-32 w-auto mb-6 select-none"
      />

      <Subtitle as="div" className="mb-6">
        {family.side}
      </Subtitle>

      <div className="flex flex-col gap-1.5 font-display text-[clamp(1.1rem,2.6vw,1.4rem)] font-light text-ink leading-snug">
        <span>{family.father}</span>
        <span>{family.mother}</span>
      </div>

      <Body variant="small" className="mt-3 max-w-[16rem]">
        {family.address}
      </Body>

      <div className="w-6 h-px bg-ink/15 my-8" />

      <Subtitle as="div" className="!tracking-[0.25em] mb-2">
        {family.childLabel}
      </Subtitle>
      <span className="font-display text-[clamp(1.5rem,4vw,2.1rem)] font-light text-ink leading-tight">
        {family.childName}
      </span>
      <Body variant="small" className="mt-2 italic">
        {family.rank}
      </Body>

      <div className="mt-8 w-full max-w-xs border border-ink/15 rounded-2xl px-5 py-4 bg-white/40 backdrop-blur-[2px]">
        <span className="block font-display italic text-[clamp(1.05rem,2.6vw,1.3rem)] text-ink">
          {family.rite}
        </span>
        <Body variant="small" className="mt-1.5">
          {family.riteNote}
        </Body>
      </div>
    </div>
  );
}
