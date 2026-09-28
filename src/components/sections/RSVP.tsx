'use client';

import { useState } from 'react';
import { useLang } from '@/hooks/useLang';
import { COPY } from '@/lib/constants';
import { Heading, Subtitle, Body } from '@/components/ui/Typography';
import Button from '@/components/ui/Button';
import Toggle from '@/components/ui/Toggle';

// Plain form for now: it collects the answers and thanks the guest locally.
// No list lookup, no webhook — wire `handleSubmit` up to a sheet or API when ready.
export default function RSVP() {
  const { lang } = useLang();
  const copy = COPY[lang].rsvp;

  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const fieldClass =
    'w-full bg-transparent border-b border-ink/25 focus:border-ink outline-none py-2.5 font-body text-sm md:text-base text-ink placeholder:text-ink-muted/60 font-light transition-colors';

  return (
    <section
      id="rsvp"
      className="w-full max-w-7xl mx-auto px-5 md:px-10 py-24 md:py-32 border-t border-ink/10 scroll-mt-20"
    >
      <div className="max-w-xl mx-auto flex flex-col items-center text-center">
        <Subtitle as="div" className="mb-6">
          {copy.subtitle}
        </Subtitle>
        <Heading variant="h2" className="mb-6">
          {copy.title}
        </Heading>
        <div className="w-8 h-px bg-ink/15 mb-8" />
        <Body variant="regular" className="max-w-md">
          {copy.description}
        </Body>

        {submitted ? (
          <div className="mt-14 w-full flex flex-col items-center animate-fade-in">
            <img
              src="/component/champagne.png"
              alt=""
              draggable={false}
              className="w-40 md:w-48 h-auto mb-6 select-none"
            />
            <Body variant="large" className="max-w-sm italic">
              {copy.successMsg}
            </Body>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-14 w-full flex flex-col gap-10 text-left">
            <label className="flex flex-col gap-2">
              <Subtitle as="span" className="!tracking-[0.25em]">
                {copy.nameLabel}
              </Subtitle>
              <input
                type="text"
                name="name"
                required
                placeholder={copy.namePlaceholder}
                className={fieldClass}
              />
            </label>

            <div className="flex flex-col gap-3">
              <Subtitle as="span" className="!tracking-[0.25em]">
                {copy.attendingLabel}
              </Subtitle>
              <Toggle
                variant="segmented"
                className="self-start"
                options={[
                  { label: copy.attendingYes, value: 'yes' as const },
                  { label: copy.attendingNo, value: 'no' as const },
                ]}
                value={attending}
                onChange={setAttending}
              />
            </div>

            {attending === 'yes' && (
              <>
                <label className="flex flex-col gap-2 animate-fade-in">
                  <Subtitle as="span" className="!tracking-[0.25em]">
                    {copy.guestsLabel}
                  </Subtitle>
                  <input
                    type="number"
                    name="guests"
                    min={1}
                    max={10}
                    defaultValue={1}
                    placeholder={copy.guestsPlaceholder}
                    className={fieldClass}
                  />
                </label>

                <label className="flex flex-col gap-2 animate-fade-in">
                  <Subtitle as="span" className="!tracking-[0.25em]">
                    {copy.mealLabel}
                  </Subtitle>
                  <input
                    type="text"
                    name="meal"
                    placeholder={copy.mealPlaceholder}
                    className={fieldClass}
                  />
                </label>
              </>
            )}

            <label className="flex flex-col gap-2">
              <Subtitle as="span" className="!tracking-[0.25em]">
                {copy.wishesLabel}
              </Subtitle>
              <textarea
                name="wishes"
                rows={3}
                placeholder={copy.wishesPlaceholder}
                className={`${fieldClass} resize-none`}
              />
            </label>

            <div className="flex flex-col items-center gap-4 mt-2">
              <Button type="submit" variant="primary">
                {copy.submitBtn}
              </Button>
              <Body variant="small" className="italic">
                {copy.note}
              </Body>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
