import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/motion';

/**
 * Very light canvas gold-dust drift. No dependencies, ~24 particles,
 * paused when the stage leaves the viewport or motion is reduced.
 */
export default function GoldDust({ active = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (prefersReducedMotion()) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
    const count = window.innerWidth < 520 ? 20 : 34;

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const particles = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.6 + Math.random() * 1.7,
      speed: 0.012 + Math.random() * 0.03,
      sway: 0.2 + Math.random() * 0.9,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.12 + Math.random() * 0.4,
    }));

    let last = performance.now();

    const draw = (now) => {
      if (!running) return;
      const dt = Math.min(now - last, 50) / 1000;
      last = now;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.y -= p.speed * dt;
        if (p.y < -0.04) {
          p.y = 1.04;
          p.x = Math.random();
        }
        const x = (p.x + Math.sin(p.phase + p.y * 9) * 0.006 * p.sway) * width;
        const y = p.y * height;
        const twinkle = 0.65 + Math.sin(now / 1400 + p.phase) * 0.35;

        ctx.beginPath();
        ctx.fillStyle = `rgba(176, 130, 62, ${p.alpha * twinkle})`;
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fill();

        if (p.r > 1.6) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(240, 214, 160, ${p.alpha * 0.36 * twinkle})`;
          ctx.arc(x, y, p.r * 2.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!running) {
            running = true;
            last = performance.now();
            raf = requestAnimationFrame(draw);
          }
        } else {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 180);
    };
    window.addEventListener('resize', onResize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', onResize);
      window.clearTimeout(resizeTimer);
    };
  }, [active]);

  return <canvas ref={canvasRef} className="stage__dust" aria-hidden="true" />;
}
