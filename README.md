# Ying & Anh — 20 December 2026

Wedding invitation site for **Liao Ying-Chuan & Nguyễn Trần Minh Anh**,
Saigon, 20 December 2026. Built on the `tung-trang` invitation template,
re-dressed in the couple's blue-and-gold moodboard.

## Running it

```bash
npm install
npm run dev
```

- `/` — the full invitation, opening on the sketch entrance
- `/schedule` — the same page with the entrance skipped, for direct links

## How it's put together

| Path | What's in it |
| --- | --- |
| `src/lib/constants.ts` | Every word on the site, in English and Vietnamese. Edit here, not in the components. |
| `src/components/sections/` | One file per section: Hero, Gallery, EventDetails (venue + schedule + dresscode), Families, Visa, Travel, RSVP, ThankYou. |
| `src/components/interactive/Entrance.tsx` | The scratch-to-reveal opening: veil → drawing → photograph → montage. |
| `src/components/ui/` | Buttons, headings, the language toggle, the nav and the Y&A monogram. |
| `scripts/build-assets.py` | Turns the originals in `assets-source/` into what `public/` serves. |

## Artwork

The couple's originals live in `assets-source/` and are **not committed** —
they are full-size camera files. `scripts/build-assets.py` re-inks the pencil
line art in navy on a transparent background (reds become gold), trims it to
the drawing, and downscales the photographs to webp:

```bash
python3 scripts/build-assets.py
```

Run it again after adding or swapping an original.

## Still to do

- The RSVP form is deliberately plain: it collects answers and thanks the
  guest in the browser. Wire `handleSubmit` in `src/components/sections/RSVP.tsx`
  up to a sheet or API when the guest list is ready.
- The lunar (âm lịch) dates were left blank on the invitation form, so they are
  not on the site yet.
- Reception times after 19:00 (dinner, after party) are placeholders.
