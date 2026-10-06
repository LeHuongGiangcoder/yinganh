'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useLang } from '@/hooks/useLang';
import { COPY } from '@/lib/constants';
import Monogram from '@/components/ui/Monogram';
import AngelLayers from '@/components/interactive/AngelLayers';

type Phase = 'idle' | 'sketching' | 'revealing' | 'morphing' | 'angels' | 'done';

// The pale sheet the guest scratches away to find the drawing underneath. It is
// the blue paper's own colour, so the part still unscratched reads as the page.
const VEIL = '#EAF5FD';
const GRID_COLS = 20;
const GRID_ROWS = 30;
// Threshold is % of full viewport cells touched. Kept low because the centered
// sketch image only occupies ~20-25% of a desktop viewport — once the user has
// scratched roughly over the image, that should be enough to advance.
const REVEAL_THRESHOLD = 0.22;
// Hard fallback: if the guest has actively drawn for this long, advance regardless.
const MAX_DRAW_MS = 6000;
const POLL_MS = 350;
const BRUSH_RADIUS_DESKTOP = 40;
const BRUSH_RADIUS_TOUCH = 52;

// The cupid holds the centre for the whole closing scene — long enough for its
// wings to beat through a few cycles (see AngelLayers).
const ANGEL_SCENE_MS = 3000;

// Sparkles and little bows scattered round the cupid, as % of its box.
// Kept off the middle so nothing lands on the drawing itself.
// Each one blinks on its own period as well as its own delay, so the ring
// never pulses in unison.
const ANGEL_DUST: { x: number; y: number; size: number; gold?: boolean; delay: number; period: number }[] = [
  { x: 14, y: 10, size: 16, gold: true, delay: 0, period: 2.4 },
  { x: 33, y: 2, size: 9, delay: 1.1, period: 3.1 },
  { x: 57, y: 4, size: 12, gold: true, delay: 0.6, period: 2.7 },
  { x: 76, y: 1, size: 8, delay: 1.9, period: 3.6 },
  { x: 93, y: 18, size: 15, gold: true, delay: 0.3, period: 2.2 },
  { x: 99, y: 44, size: 9, delay: 2.2, period: 3.3 },
  { x: 90, y: 72, size: 12, gold: true, delay: 1.4, period: 2.6 },
  { x: 72, y: 94, size: 8, delay: 0.9, period: 3.8 },
  { x: 44, y: 99, size: 14, gold: true, delay: 2.5, period: 2.9 },
  { x: 16, y: 88, size: 10, delay: 1.6, period: 3.4 },
  { x: 2, y: 62, size: 9, gold: true, delay: 2, period: 2.5 },
  { x: 5, y: 34, size: 12, delay: 0.45, period: 3 },
];

// Bows ride the corners of the ring, clear of the cupid inset inside it
const ANGEL_BOWS: { x: number; y: number; w: number; tilt: number; delay: number; period: number }[] = [
  { x: 4, y: 20, w: 3.4, tilt: -16, delay: 0, period: 4.2 },
  { x: 97, y: 60, w: 2.9, tilt: 13, delay: 1.3, period: 5.1 },
  { x: 57, y: 103, w: 2.4, tilt: -5, delay: 0.7, period: 3.6 },
];

interface EntranceProps {
  onDone: () => void;
  onSketchStart?: () => void;
  // Fired when the entrance begins its final fade-out, so the page can crossfade in
  onReveal?: () => void;
}

export default function Entrance({ onDone, onSketchStart, onReveal }: EntranceProps) {
  const { lang } = useLang();
  const copy = COPY[lang].entrance;

  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const lastPtRef = useRef<{ x: number; y: number } | null>(null);
  const touchedCellsRef = useRef<Set<number>>(new Set());
  const cellSizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const isTouchRef = useRef(false);

  const [phase, setPhase] = useState<Phase>('idle');
  const [hintVisible, setHintVisible] = useState(true);
  const [canvasReady, setCanvasReady] = useState(false);

  // ---- Canvas setup ----
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext('2d', { alpha: true })!;
    ctx.scale(dpr, dpr);
    ctx.fillStyle = VEIL;
    ctx.fillRect(0, 0, w, h);
    ctxRef.current = ctx;
    cellSizeRef.current = { w: w / GRID_COLS, h: h / GRID_ROWS };
    setCanvasReady(true);
  }, []);

  useEffect(() => {
    setupCanvas();
    const onResize = () => {
      // Preserve drawn state by re-erasing all touched cells
      setupCanvas();
      const ctx = ctxRef.current;
      if (!ctx) return;
      const { w: cw, h: ch } = cellSizeRef.current;
      ctx.globalCompositeOperation = 'destination-out';
      touchedCellsRef.current.forEach((idx) => {
        const col = idx % GRID_COLS;
        const row = Math.floor(idx / GRID_COLS);
        ctx.beginPath();
        ctx.arc(col * cw + cw / 2, row * ch + ch / 2, Math.max(cw, ch) * 0.7, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalCompositeOperation = 'source-over';
    };
    window.addEventListener('resize', onResize);
    document.body.classList.add('entrance-locked');
    return () => {
      window.removeEventListener('resize', onResize);
      document.body.classList.remove('entrance-locked');
    };
  }, [setupCanvas]);

  // Preload + decode the photos up front so they don't pop/flash when dealt
  useEffect(() => {
    [
      '/component/angel-wings.png',
      '/component/angel-bottle.png',
      '/component/angel-body.png',
      '/images/after-sketch.webp',
    ].forEach((src) => {
      const img = new Image();
      img.src = src;
      img.decode?.().catch(() => {});
    });
  }, []);

  // ---- Pointer handlers ----
  const eraseAt = (x: number, y: number, fromX: number | null, fromY: number | null) => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    const radius = isTouchRef.current ? BRUSH_RADIUS_TOUCH : BRUSH_RADIUS_DESKTOP;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = radius * 2;
    ctx.strokeStyle = '#000';
    if (fromX !== null && fromY !== null) {
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Track touched cells along the segment
    const { w: cw, h: ch } = cellSizeRef.current;
    const steps =
      fromX !== null && fromY !== null
        ? Math.max(1, Math.ceil(Math.hypot(x - fromX, y - fromY) / Math.min(cw, ch)))
        : 1;
    for (let i = 0; i <= steps; i++) {
      const t = steps === 0 ? 0 : i / steps;
      const px = fromX !== null ? fromX + (x - fromX) * t : x;
      const py = fromY !== null ? fromY + (y - fromY) * t : y;
      const col = Math.min(GRID_COLS - 1, Math.max(0, Math.floor(px / cw)));
      const row = Math.min(GRID_ROWS - 1, Math.max(0, Math.floor(py / ch)));
      touchedCellsRef.current.add(row * GRID_COLS + col);
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (phase !== 'idle' && phase !== 'sketching') return;
    isTouchRef.current = e.pointerType === 'touch';
    (e.target as Element).setPointerCapture?.(e.pointerId);
    if (hintVisible) setHintVisible(false);
    if (phase === 'idle') {
      setPhase('sketching');
      onSketchStart?.();
    }
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    eraseAt(x, y, null, null);
    lastPtRef.current = { x, y };
    checkThreshold();
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (phase !== 'sketching') return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const last = lastPtRef.current;
    eraseAt(x, y, last?.x ?? null, last?.y ?? null);
    lastPtRef.current = { x, y };
    checkThreshold();
  };

  const onPointerUp = () => {
    lastPtRef.current = null;
  };

  const checkThreshold = () => {
    if (phase !== 'sketching' && phase !== 'idle') return;
    const ratio = touchedCellsRef.current.size / (GRID_COLS * GRID_ROWS);
    if (ratio >= REVEAL_THRESHOLD) {
      setPhase('revealing');
    }
  };

  // Phase transitions
  useEffect(() => {
    if (phase === 'sketching') {
      // Poll the threshold even while the pointer is still, so the time fallback
      // fires and we don't depend purely on pointermove events.
      let elapsed = 0;
      const id = window.setInterval(() => {
        elapsed += POLL_MS;
        const ratio = touchedCellsRef.current.size / (GRID_COLS * GRID_ROWS);
        if (ratio >= REVEAL_THRESHOLD || elapsed >= MAX_DRAW_MS) {
          setPhase('revealing');
        }
      }, POLL_MS);
      return () => window.clearInterval(id);
    }

    if (phase === 'revealing') {
      // Fade the remaining veil away to fully reveal the sketch
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.style.transition = 'opacity 900ms var(--ease-out-quart)';
      requestAnimationFrame(() => {
        canvas.style.opacity = '0';
      });
      const t = setTimeout(() => setPhase('morphing'), 950);
      return () => clearTimeout(t);
    }

    if (phase === 'morphing') {
      // Hold the drawing, then crossfade with blur into the photograph it was drawn from
      const t = setTimeout(() => setPhase('angels'), 2400);
      return () => clearTimeout(t);
    }

    if (phase === 'angels') {
      const t = setTimeout(() => setPhase('done'), ANGEL_SCENE_MS);
      return () => clearTimeout(t);
    }

    if (phase === 'done') {
      const root = rootRef.current;
      if (!root) return;
      // Reveal the page now so it crossfades in as the overlay fades out
      onReveal?.();
      root.style.transition = 'opacity 1600ms var(--ease-smooth)';
      requestAnimationFrame(() => {
        root.style.opacity = '0';
      });
      const t = setTimeout(() => onDone(), 1600);
      return () => clearTimeout(t);
    }
  }, [phase, onDone, onReveal]);

  // Allow keyboard skip (dev convenience) — press Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPhase('done');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // The overlay is flat, in exactly the veil's own colour, so scratching reveals
  // only the drawing — never a seam between erased and un-erased areas.
  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-50 overflow-hidden no-select h-[100vh] w-[100vw]"
      style={{ backgroundColor: VEIL }}
      aria-label="Sketch entrance"
    >
      {/* Layer 0: the blue paper the whole entrance is printed on */}
      <div className="paper-sheet" aria-hidden />

      {/* Layer 1: the drawing of the couple */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          opacity:
            !canvasReady || phase === 'morphing' || phase === 'angels' || phase === 'done' ? 0 : 1,
          filter: phase === 'morphing' ? 'blur(12px)' : 'blur(0px)',
          transition: 'opacity 1600ms var(--ease-smooth), filter 1600ms var(--ease-smooth)',
        }}
      >
        <img
          src="/images/sketch-portrait.png"
          alt=""
          className="max-h-[78vh] max-w-[88vw] aspect-[1026/1533] object-contain"
          draggable={false}
        />
      </div>

      {/* Layer 2: the photograph the drawing came from — appears during the morph */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          opacity: phase === 'morphing' ? 1 : 0,
          filter: phase === 'morphing' || phase === 'angels' || phase === 'done' ? 'blur(0px)' : 'blur(12px)',
          // Slow to arrive, quick to leave: the cupids get the full scene to themselves
          transition:
            phase === 'morphing'
              ? 'opacity 1600ms var(--ease-smooth), filter 1600ms var(--ease-smooth)'
              : 'opacity 600ms var(--ease-smooth), filter 600ms var(--ease-smooth)',
        }}
      >
        {/* Gallery mat: pale passe-partout + thin ink keyline, lifted off the page */}
        <div className="bg-sky-light p-3 md:p-5 border border-ink/10 shadow-[0_18px_50px_-12px_rgba(18,48,91,0.35)]">
          <img
            src="/images/after-sketch.webp"
            alt=""
            className="block h-[64vh] w-auto aspect-[2/3] object-cover border border-ink/15"
            draggable={false}
          />
        </div>
      </div>

      {/* Layer 3: the two cupids, taking turns in the middle of the screen */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6"
        style={{
          opacity: phase === 'angels' || phase === 'done' ? 1 : 0,
          transition: 'opacity 700ms var(--ease-smooth)',
        }}
      >
        <div className="relative w-[58vw] max-w-[19rem] aspect-square">
          {/* The cupid sits inset, leaving the ring free for the trimmings.
              It carries its own motion — nothing is animated at this level. */}
          <div className="absolute inset-[15%]">
            <AngelLayers className="w-full h-full" />
          </div>

          {/* Blink-blink around the cupid, in the page's own sparkle style */}
          {ANGEL_DUST.map((d, i) => (
            <span
              key={i}
              aria-hidden
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
              style={{ left: `${d.x}%`, top: `${d.y}%` }}
            >
              <span
                className={`block animate-twinkle leading-none ${d.gold ? 'text-gold' : 'text-ink-muted'}`}
                style={{
                  fontSize: d.size,
                  animationDelay: `${d.delay}s`,
                  animationDuration: `${d.period}s`,
                }}
              >
                ✦
              </span>
            </span>
          ))}

          {/* Little watercolour bows, drifting on their own gentle beat */}
          {ANGEL_BOWS.map((b, i) => (
            <img
              key={i}
              src="/component/ribbon-bow.png"
              alt=""
              aria-hidden
              draggable={false}
              className="absolute -translate-x-1/2 -translate-y-1/2 h-auto select-none pointer-events-none animate-bow-drift"
              style={{
                left: `${b.x}%`,
                top: `${b.y}%`,
                width: `${b.w}rem`,
                rotate: `${b.tilt}deg`,
                animationDelay: `${b.delay}s`,
                animationDuration: `${b.period}s`,
              }}
            />
          ))}
        </div>

        <p className="mt-10 font-display italic text-ink/85 text-[clamp(1.15rem,3.6vw,1.75rem)] tracking-wide text-center max-w-md">
          {copy.angels}
        </p>
      </div>

      {/* Layer 4: Canvas (the veil the guest erases) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 touch-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{ touchAction: 'none' }}
      />

      {/* Layer 5: Hint overlay */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6"
        style={{
          opacity: hintVisible && phase === 'idle' ? 1 : 0,
          transition: 'opacity 500ms var(--ease-smooth)',
        }}
      >
        <div className="absolute top-28 md:top-40 left-1/2 -translate-x-1/2 text-ink">
          <Monogram className="w-16 h-16 md:w-20 md:h-20" />
        </div>
        <SketchHand />
        <p
          className="mt-8 font-display italic text-ink/85 text-[clamp(1.4rem,4.5vw,2.25rem)] tracking-wide text-center"
          style={{ animation: 'breathe 2.8s ease-in-out infinite' }}
        >
          {copy.hint}
        </p>
        <p className="mt-3 font-body text-[11px] md:text-xs tracking-[0.3em] uppercase text-ink-muted">
          {copy.whisper}
        </p>
      </div>

      {/* Layer 6: Subtle progress hint at corner once user starts */}
      <div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          opacity: phase === 'sketching' ? 0.4 : 0,
          transition: 'opacity 400ms var(--ease-smooth)',
        }}
      >
        <span className="font-body text-[10px] tracking-[0.4em] uppercase text-ink-muted">
          {lang === 'en' ? 'keep going...' : 'tiếp tục vẽ...'}
        </span>
      </div>

      <style>{`
        @keyframes breathe {
          0%, 100% { opacity: 0.6; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-2px); }
        }
        @keyframes bowDrift {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); opacity: 0.7; }
          50% { transform: translate(-50%, -50%) translateY(-5px); opacity: 1; }
        }
        .animate-bow-drift {
          animation: bowDrift 4.2s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-bow-drift { animation: none; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(-8deg); }
          50% { transform: translateY(-6px) rotate(-4deg); }
        }
      `}</style>
    </div>
  );
}

function SketchHand() {
  // Minimal hand-drawn pencil + squiggle, in ink colour
  return (
    <svg
      width="78"
      height="78"
      viewBox="0 0 78 78"
      fill="none"
      style={{ animation: 'float 2.8s ease-in-out infinite' }}
      className="text-ink"
      aria-hidden
    >
      {/* Pencil body */}
      <path
        d="M50 12 L62 24 L26 60 L14 64 L18 52 Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
      {/* Pencil tip */}
      <path d="M14 64 L20 58" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      {/* Eraser end */}
      <path
        d="M50 12 L54 8 L66 20 L62 24"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Sketch squiggle */}
      <path
        d="M28 70 Q34 66 38 70 T48 70 T58 70"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}
