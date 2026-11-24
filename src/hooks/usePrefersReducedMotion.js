import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../lib/motion';

/** Tracks prefers-reduced-motion (with ?motion=full / ?motion=reduced preview). */
export default function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => prefersReducedMotion());

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(prefersReducedMotion());
    setReduced(prefersReducedMotion());
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
