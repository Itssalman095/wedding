import EnvelopeStage from './components/EnvelopeStage';
import InvitationSections from './components/InvitationSections';
import MusicToggle from './components/MusicToggle';
import StaticHero from './components/StaticHero';
import usePrefersReducedMotion from './hooks/usePrefersReducedMotion';
import useSmoothScroll from './hooks/useSmoothScroll';

export default function App() {
  const reduced = usePrefersReducedMotion();
  useSmoothScroll(!reduced);

  return (
    <main>
      {reduced ? <StaticHero /> : <EnvelopeStage />}
      <InvitationSections />
      <MusicToggle />
    </main>
  );
}
