'use client';

import { useStepper, StepperControls } from '@/components/ui/Stepper';

// The three screenshots, and where the button to press sits on each one.
// Positions are % of the image box, measured off the screenshots themselves, so
// they track the artwork at any width. `label` stays in English on purpose —
// it is what Google Maps itself prints on the button. `shape` follows what is
// being ringed: a pill round Google's own pill buttons, a rectangle round a
// block of rows, where a pill would read as sloppy.
type Marker = {
  left: number;
  top: number;
  width: number;
  height: number;
  label: string;
  shape?: 'pill' | 'rect';
};

const SLIDES: { src: string; markers: Marker[] }[] = [
  {
    src: '/guide/step-1.png',
    markers: [{ left: 8.4, top: 34.8, width: 21.2, height: 11.2, label: 'Save' }],
  },
  {
    src: '/guide/step-2.png',
    markers: [{ left: 2.5, top: 33.5, width: 28, height: 9.5, label: 'Saved' }],
  },
  {
    src: '/guide/step-3.png',
    markers: [
      { left: 5.5, top: 70.5, width: 64, height: 24, label: 'Lists you saved', shape: 'rect' },
    ],
  },
];

// All three screenshots are cropped to one box, so flipping between steps never
// changes the card's height.
const SLIDE_RATIO = '438 / 400';

export default function MapGuide({ steps }: { steps: string[] }) {
  const { index, setIndex, go, swipeHandlers } = useStepper(SLIDES.length);

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* The screenshot, with the button to press ringed on it */}
      <div className="stepper-frame" {...swipeHandlers}>
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className={i === index ? 'relative' : 'hidden'}
            style={{ aspectRatio: SLIDE_RATIO }}
          >
            <img
              src={slide.src}
              alt=""
              loading="lazy"
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover object-top select-none"
            />
            {slide.markers.map((m) => (
              <span
                key={m.label}
                className={`absolute border-[2.5px] border-gold animate-marker-pulse pointer-events-none ${
                  m.shape === 'rect' ? 'rounded-[3px]' : 'rounded-full'
                }`}
                style={{
                  left: `${m.left}%`,
                  top: `${m.top}%`,
                  width: `${m.width}%`,
                  height: `${m.height}%`,
                }}
              >
                <span className="absolute left-1/2 -translate-x-1/2 -top-2 -translate-y-full whitespace-nowrap bg-ink text-white font-body text-[10px] tracking-[0.18em] uppercase px-2 py-1">
                  {m.label}
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>

      <StepperControls
        index={index}
        count={SLIDES.length}
        go={go}
        setIndex={setIndex}
        caption={steps[index]}
        label="Step"
      />
    </div>
  );
}
