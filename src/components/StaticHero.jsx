import { wedding } from '../data/wedding';
import HeroContent from './HeroContent';
import { StaticEnvelope } from './Ornaments';

export default function StaticHero() {
  return (
    <section className="static-hero" aria-label="Wedding invitation">
      <div className="static-hero__grain" aria-hidden="true" />
      <div className="static-hero__inner">
        <StaticEnvelope />
        <HeroContent />
        <a className="btn btn--ghost" href="#invitation" style={{ marginTop: '1.8rem' }}>
          {wedding.copy.hero.viewInvitation}
        </a>
      </div>
    </section>
  );
}
