'use client';

import { useState } from 'react';
import { useLang } from '@/hooks/useLang';
import { COPY } from '@/lib/constants';
import { Heading, Subtitle, Body } from '@/components/ui/Typography';
import Button from '@/components/ui/Button';
import Toggle from '@/components/ui/Toggle';
import Decor from '@/components/ui/Decor';

// Plain form for now: it collects the answers and thanks the guest locally.
// No list lookup, no webhook — wire `handleSubmit` up to a sheet or API when ready.
export default function RSVP() {
  const { lang } = useLang();
  const copy = COPY[lang].rsvp;

  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [vegetarian, setVegetarian] = useState<'yes' | 'no'>('no');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get('name'),
      attending,
      guests: formData.get('guests') || '',
      vegetarian,
      wishes: formData.get('wishes') || '',
    };

    try {
      // TODO: Replace with your actual Google Apps Script Web App URL
      const scriptURL = 'https://script.google.com/macros/s/AKfycbxBsxxhaGGwOLDk3l2BvH1B8meVi25Iez3oNQcNh3TBgWEMcpkyyq9GEGMaWRpyVsAS/exec';

      await fetch(scriptURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(data),
      });

      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form', error);
      alert('Có lỗi xảy ra khi gửi RSVP. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass =
    'w-full bg-white/70 border border-ink/15 focus:border-ink/60 focus:bg-white outline-none px-4 py-3 font-body text-base md:text-lg text-ink placeholder:text-ink-muted font-normal transition-colors';

  return (
    <section
      id="rsvp"
      className="w-full max-w-7xl mx-auto px-5 md:px-10 section-y scroll-mt-20"
    >
      {/* Two cupids perch on the corners of the card */}
      {/* Sits on its own frosted card: the form was disappearing into the sky
          backdrop when it shared the page's transparent background. */}
      <div className="relative max-w-xl mx-auto flex flex-col items-center text-center border border-white/60 bg-white/70 backdrop-blur-md shadow-[0_24px_60px_-28px_rgba(18,48,91,0.45)] px-6 sm:px-10 md:px-14 py-14 md:py-16">
        <Decor
          name="cat-arrow"
          className="absolute -top-16 -right-1 md:-top-20 md:-right-20 w-28 md:w-40"
          tilt={6}
          flip
          delay={1.6}
          opacity={0.65}
        />

        {/* An orchid laid along the bottom-left of the card, the way a sprig sits
            on a sheet of stationery. Kept faint so the form stays the subject. */}
        <Decor
          name="orchid"
          className="absolute -bottom-14 -left-14 md:-bottom-16 md:-left-24 w-48 md:w-72"
          tilt={-4}
          delay={0.4}
          opacity={0.45}
        />

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
                  {/* Guests write the count and who they bring in the same line */}
                  <Body variant="small" as="span" className="italic">
                    {copy.guestsHint}
                  </Body>
                  <input
                    type="text"
                    name="guests"
                    placeholder={copy.guestsPlaceholder}
                    className={fieldClass}
                  />
                </label>

                <div className="flex flex-col gap-3 animate-fade-in">
                  <Subtitle as="span" className="!tracking-[0.25em]">
                    {copy.mealLabel}
                  </Subtitle>
                  <input type="hidden" name="vegetarian" value={vegetarian} />
                  <Toggle
                    variant="segmented"
                    className="self-start"
                    options={[
                      { label: copy.mealYes, value: 'yes' as const },
                      { label: copy.mealNo, value: 'no' as const },
                    ]}
                    value={vegetarian}
                    onChange={setVegetarian}
                  />
                </div>
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
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? 'ĐANG GỬI...' : copy.submitBtn}
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
