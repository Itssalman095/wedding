/**
 * One place to read the motion preference.
 * `?motion=full` / `?motion=reduced` force a mode for previewing/QA.
 */
export function motionOverride() {
  if (typeof window === 'undefined') return null;
  const value = new URLSearchParams(window.location.search).get('motion');
  if (value === 'full' || value === 'reduced') return value;
  return null;
}

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  const forced = motionOverride();
  if (forced) return forced === 'reduced';
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
