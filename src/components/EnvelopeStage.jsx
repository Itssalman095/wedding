import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import anime from 'animejs/lib/anime.es.js';

import { wedding } from '../data/wedding';
import { prefersReducedMotion } from '../lib/motion';
import HeroContent from './HeroContent';
import GoldDust from './GoldDust';
import { Flourish } from './Ornaments';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const SPARKS = [0, 1, 2, 3, 4, 5];

export default function EnvelopeStage() {
  const stageRef = useRef(null);
  const envWrapRef = useRef(null);
  const flapRef = useRef(null);
  const sealRef = useRef(null);
  const letterRef = useRef(null);
  const coverRef = useRef(null);
  const heroRef = useRef(null);
  const heroScrollRef = useRef(null);
  const hintRef = useRef(null);
  const fogRef = useRef(null);

  /* ── Intro (not scroll-linked) + Lenis/ScrollTrigger glue ── */
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.set(envWrapRef.current, { autoAlpha: 0, y: 26, scale: 0.975 });
      gsap.to(envWrapRef.current, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 1.15,
        ease: 'power3.out',
        delay: 0.18,
      });
    });

    return () => ctx.revert();
  }, []);

  /* ── Ambient Vanta fog (lazy, cancelled on low-power devices) ── */
  useEffect(() => {
    const conn = navigator.connection || {};
    const cores = navigator.hardwareConcurrency || 8;
    const memory = navigator.deviceMemory || 8;

    if (prefersReducedMotion() || conn.saveData || cores <= 4 || memory <= 4) return;

    let cancelled = false;
    let effect = null;
    let idleId = 0;

    const start = async () => {
      try {
        const THREE = await import('three');
        window.THREE = THREE;
        const mod = await import('vanta/dist/vanta.fog.min.js');
        const FOG = mod?.default || mod;
        if (cancelled || typeof FOG !== 'function' || !fogRef.current) return;

        effect = FOG({
          el: fogRef.current,
          THREE,
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          highlightColor: 0xd9b877,
          midtoneColor: 0xc09a63,
          lowlightColor: 0xe9d8bb,
          baseColor: 0xf7efe1,
          blurFactor: 0.58,
          speed: 0.85,
          zoom: 0.72,
          scale: 1,
          scaleMobile: 1,
        });

        fogRef.current?.classList.add('is-ready');
      } catch (err) {
        // Non-fatal: the CSS backdrop is the fallback.
        console.warn('[vanta] ambient layer skipped:', err);
      }
    };

    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(start, { timeout: 2200 });
    } else {
      idleId = window.setTimeout(start, 1600);
    }

    return () => {
      cancelled = true;
      if ('cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
      window.clearTimeout(idleId);
      try {
        effect?.destroy();
      } catch {
        /* noop */
      }
    };
  }, []);

  /* ── The pinned, scroll-scrubbed envelope scene ─────────── */
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const stage = stageRef.current;
    const env = envWrapRef.current;
    const flap = flapRef.current;
    const letter = letterRef.current;
    const seal = sealRef.current;
    const cover = coverRef.current;
    const hero = heroRef.current;
    const veil = letter.querySelector('.letter__veil');
    const hint = hintRef.current;

    if (!stage || !env || !flap || !letter) return;

    const metrics = () => {
      const envW = env.offsetWidth;
      const envH = env.offsetHeight;
      return {
        lw: envW * 0.83,
        lh: envH * 0.64,
        baseX: envW * 0.085,
        baseY: envH * 0.3,
        envLeft: env.offsetLeft,
        envTop: env.offsetTop,
        stageW: stage.clientWidth,
        stageH: stage.clientHeight,
      };
    };

    const setBase = (m) =>
      gsap.set(letter, {
        x: m.baseX,
        y: m.baseY,
        width: m.lw,
        height: m.lh,
        borderRadius: 9,
        visibility: 'visible',
      });

    setBase(metrics());

    const fadeParts = stage.querySelectorAll('.js-env-fade');
    const sparkEls = seal.querySelectorAll('.seal__spark');

    let flapBack = false;
    let letterUp = false;
    let sparkled = false;
    let heroDrawn = false;

    const burst = () => {
      if (!sparkEls.length) return;
      anime({
        targets: sparkEls,
        translateX: () => anime.random(-34, 34),
        translateY: () => anime.random(-30, 16),
        scale: [
          { value: 0.3, duration: 0 },
          { value: 1.5, duration: 380 },
          { value: 0, duration: 520 },
        ],
        opacity: [
          { value: 0, duration: 0 },
          { value: 1, duration: 120 },
          { value: 0, duration: 760 },
        ],
        easing: 'easeOutQuad',
        delay: anime.stagger(45),
      });
    };

    const drawHero = () => {
      const paths = hero?.querySelectorAll('[data-draw]');
      if (!paths?.length) return;
      anime({
        targets: paths,
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: 1350,
        easing: 'easeInOutSine',
        delay: anime.stagger(120),
      });
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: () => `+=${Math.round(window.innerHeight * 4.2)}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: (self) => {
            if (self.progress < 0.001) setBase(metrics());
          },
          onUpdate: (self) => {
            const p = self.progress;

            const wantFlapBack = p > 0.2;
            if (wantFlapBack !== flapBack) {
              flapBack = wantFlapBack;
              flap.style.zIndex = wantFlapBack ? '2' : '6';
            }

            const wantLetterUp = p > 0.53;
            if (wantLetterUp !== letterUp) {
              letterUp = wantLetterUp;
              letter.style.zIndex = wantLetterUp ? '12' : '3';
            }

            hint.style.opacity = p > 0.012 ? '0' : '1';

            if (p > 0.09 && !sparkled) {
              sparkled = true;
              burst();
            }
            if (p > 0.87 && !heroDrawn) {
              heroDrawn = true;
              drawHero();
            }
            if (p < 0.04) {
              sparkled = false;
              heroDrawn = false;
            }
          },
        },
      });

      /* 0.02 – 0.07 : the seal breathes before it gives way */
      tl.to(seal, { scale: 1.08, duration: 0.05, ease: 'power1.out' }, 0.02);

      /* 0.07 – 0.33 : the flap swings open in 3D */
      tl.fromTo(
        flap,
        { rotationX: 0 },
        { rotationX: -176, duration: 0.26, ease: 'power2.inOut', immediateRender: false },
        0.07
      );

      /* 0.09 – 0.19 : wax seal softens away */
      tl.to(seal, { autoAlpha: 0, scale: 0.8, y: 10, duration: 0.1, ease: 'power1.in' }, 0.09);

      /* once the flap is past vertical it sits behind the envelope — hide it
         so its mirrored corners never peek out beside the rising card */
      tl.to(flap, { autoAlpha: 0, duration: 0.08, ease: 'power1.in' }, 0.24);

      /* 0.26 – 0.56 : the letter rises out of the envelope */
      tl.fromTo(
        letter,
        {
          x: () => metrics().baseX,
          y: () => metrics().baseY,
          width: () => metrics().lw,
          height: () => metrics().lh,
        },
        {
          y: () => -(metrics().lh + 18),
          duration: 0.3,
          ease: 'power2.out',
          immediateRender: false,
        },
        0.26
      );

      /* 0.55 – 0.71 : the envelope sinks away */
      tl.to(
        fadeParts,
        { y: 96, autoAlpha: 0, duration: 0.16, stagger: 0.008, ease: 'power1.in' },
        0.55
      );

      /* 0.56 – 0.86 : the little cover grows with the paper, then lets go */
      tl.to(cover, { scale: 1.68, duration: 0.3, ease: 'power2.inOut' }, 0.56);
      tl.to(cover, { autoAlpha: 0, duration: 0.03, ease: 'power1.out' }, 0.775);

      /* a clean sheet of paper passes over the old cover before the hero */
      tl.fromTo(
        veil,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.05, ease: 'power1.inOut', immediateRender: false },
        0.74
      );

      /* 0.56 – 0.88 : …and grows into the full invitation */
      tl.fromTo(
        letter,
        {
          x: () => metrics().baseX,
          y: () => -(metrics().lh + 18),
          width: () => metrics().lw,
          height: () => metrics().lh,
          borderRadius: 9,
        },
        {
          x: () => -metrics().envLeft,
          y: () => -metrics().envTop,
          width: () => metrics().stageW,
          height: () => metrics().stageH,
          borderRadius: 0,
          duration: 0.32,
          ease: 'power2.inOut',
          immediateRender: false,
        },
        0.56
      );

      /* 0.80 – 0.87 : the hero blooms once the paper is almost home */
      tl.fromTo(
        hero,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.07, ease: 'power1.out', immediateRender: false },
        0.8
      );
      tl.fromTo(
        hero.querySelector('.letter-hero__inner'),
        { y: 22 },
        { y: 0, duration: 0.1, ease: 'power2.out', immediateRender: false },
        0.8
      );

      /* 0.92 – 0.99 : a quiet nudge to keep going */
      tl.fromTo(
        heroScrollRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.07, ease: 'power1.out', immediateRender: false },
        0.92
      );

      if (import.meta.env.DEV) {
        window.__scene = { tl, trigger: tl.scrollTrigger, metrics };
      }
    }, stage);

    const onFonts = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) document.fonts.ready.then(onFonts).catch(() => {});

    return () => ctx.revert();
  }, []);

  return (
    <section className="stage" ref={stageRef} aria-label="Wedding invitation">
      <div className="stage__fog" ref={fogRef} aria-hidden="true" />
      <GoldDust />
      <div className="stage__glow" aria-hidden="true" />
      <div className="stage__vignette" aria-hidden="true" />
      <div className="stage__grain" aria-hidden="true" />

      <div className="scene">
        <div className="envelope-wrap" ref={envWrapRef}>
          <div className="envelope">
            <div className="envelope__back js-env-fade" aria-hidden="true" />

            <div className="letter" ref={letterRef}>
              <span className="letter__frame" aria-hidden="true" />

              <div className="letter-cover" ref={coverRef} aria-hidden="true">
                <p className="letter-cover__monogram">I &nbsp;&amp;&nbsp; S</p>
                <p className="letter-cover__eyebrow">{wedding.copy.cover.eyebrow}</p>
                <p className="letter-cover__names">
                  {wedding.couple.groom.firstName} <em>{wedding.couple.joiner}</em>{' '}
                  {wedding.couple.bride.firstName}
                </p>
                <Flourish className="letter-cover__rule" />
                <p className="letter-cover__date">{wedding.date.short}</p>
              </div>

              <div className="letter-hero" ref={heroRef}>
                <HeroContent />
              </div>

              <span className="letter__veil" aria-hidden="true" />

              <div className="hero-scroll" ref={heroScrollRef} aria-hidden="true">
                <span>{wedding.copy.hero.scrollCelebrate}</span>
                <span className="hero-scroll__line" />
              </div>
            </div>

            <div className="envelope__front js-env-fade" aria-hidden="true">
              <span className="env-panel env-panel--left" />
              <span className="env-panel env-panel--right" />
              <span className="env-panel env-panel--bottom" />
              <svg
                className="envelope__folds"
                viewBox="0 0 100 60"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M0 0 50 23.4 100 0M0 0 50 23.4 0 60M100 0 50 23.4 100 60"
                  stroke="#a67c33"
                  strokeOpacity=".18"
                  strokeWidth=".35"
                  fill="none"
                />
              </svg>
              <span className="envelope__mark">
                {wedding.couple.groom.firstName} &amp; {wedding.couple.bride.firstName}
              </span>
            </div>

            <div className="envelope__flap" ref={flapRef} aria-hidden="true">
              <div className="flap-face flap-face--out" />
              <div className="flap-face flap-face--in">
                <svg className="flap-face__edge" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path
                    d="M1 1H99L50 98"
                    fill="none"
                    stroke="#a67c33"
                    strokeOpacity=".45"
                    strokeWidth=".4"
                  />
                  <path
                    d="M4 3H96L50 92"
                    fill="none"
                    stroke="#a67c33"
                    strokeOpacity=".14"
                    strokeWidth=".3"
                  />
                </svg>
              </div>
            </div>

            <div className="seal" ref={sealRef} aria-hidden="true">
              <span className="seal__monogram">I &amp; S</span>
              {SPARKS.map((i) => (
                <span className="seal__spark" key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-hint" ref={hintRef} aria-hidden="true">
        <span className="scroll-hint__text">{wedding.copy.hero.scrollHint}</span>
        <span className="scroll-hint__arrow" />
      </div>
    </section>
  );
}
