'use client';

import { useEffect, useRef } from 'react';

// Ink and butter-gold, so the bursts read as part of the invitation's palette
const SPARK_COLORS = ['#F0D370', '#F8EAB6', '#12305B', '#2A4C7D', '#A8C4E0'];

// When each shell goes off (ms from the start), and where it opens as a
// fraction of the canvas — all in the upper half, so the fall is visible.
const SHELLS: { at: number; x: number; y: number; size: number }[] = [
  { at: 0, x: 0.5, y: 0.3, size: 1.15 },
  { at: 260, x: 0.22, y: 0.22, size: 0.85 },
  { at: 620, x: 0.78, y: 0.26, size: 0.9 },
  { at: 1050, x: 0.38, y: 0.15, size: 0.75 },
  { at: 1480, x: 0.66, y: 0.38, size: 1 },
  { at: 1950, x: 0.5, y: 0.2, size: 0.8 },
];

const GRAVITY = 0.055;
const DRAG = 0.986;
const TRAIL = 7;

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  width: number;
  trail: { x: number; y: number }[];
}

// Bursts of fireworks that open and rain back down. Fires once, the moment
// `active` turns true, then unmounts itself by going quiet.
export default function Fireworks({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const firedRef = useRef(false);

  useEffect(() => {
    if (!active || firedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    firedRef.current = true;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = canvas.clientWidth;
    let h = canvas.clientHeight;
    const size = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    window.addEventListener('resize', size);

    const sparks: Spark[] = [];

    const burst = (cx: number, cy: number, scale: number) => {
      const count = Math.round((70 + Math.random() * 40) * scale);
      // One hue per shell, with the odd contrasting spark mixed through it
      const base = SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)];
      const spread = Math.min(w, h) / 900;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.3;
        // Squared random keeps most sparks near the rim, a few in the middle
        const speed = (1.6 + Math.pow(Math.random(), 0.6) * 5.2) * scale * (0.7 + spread);
        sparks.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 80 + Math.random() * 70,
          color: Math.random() < 0.18 ? SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)] : base,
          width: 1 + Math.random() * 1.6,
          trail: [],
        });
      }
    };

    const timers = SHELLS.map((s) =>
      window.setTimeout(() => burst(w * s.x, h * s.y, s.size), s.at)
    );

    let raf = 0;
    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i];
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > TRAIL) p.trail.shift();

        p.vx *= DRAG;
        p.vy = p.vy * DRAG + GRAVITY;
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const fade = 1 - p.life / p.maxLife;
        if (fade <= 0 || p.y > h + 40) {
          sparks.splice(i, 1);
          continue;
        }

        // The tail fades along its own length as well as with the spark's life
        ctx.strokeStyle = p.color;
        ctx.lineCap = 'round';
        for (let t = 1; t < p.trail.length; t++) {
          ctx.globalAlpha = fade * (t / p.trail.length) * 0.85;
          ctx.lineWidth = p.width * (t / p.trail.length);
          ctx.beginPath();
          ctx.moveTo(p.trail[t - 1].x, p.trail[t - 1].y);
          ctx.lineTo(p.trail[t].x, p.trail[t].y);
          ctx.stroke();
        }
        ctx.globalAlpha = fade;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.width * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      const lastShell = SHELLS[SHELLS.length - 1].at;
      if (sparks.length > 0 || performance.now() - start < lastShell + 200) {
        raf = requestAnimationFrame(frame);
      } else {
        ctx.clearRect(0, 0, w, h);
      }
    };
    const start = performance.now();
    raf = requestAnimationFrame(frame);

    return () => {
      timers.forEach(window.clearTimeout);
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', size);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-x-0 top-0 h-[100svh] w-full z-20 pointer-events-none"
    />
  );
}
