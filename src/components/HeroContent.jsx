import { wedding } from '../data/wedding';
import { Flourish } from './Ornaments';

export default function HeroContent({ className = '' }) {
  const { bismillah, intro, couple, date } = wedding;

  return (
    <div className={`letter-hero__inner ${className}`.trim()}>
      {bismillah?.show && (
        <>
          <p className="letter-hero__bismillah" lang="ar" dir="rtl">
            {bismillah.arabic}
          </p>
          {bismillah.translation && (
            <p className="letter-hero__translation">{bismillah.translation}</p>
          )}
        </>
      )}

      {intro?.show && <p className="letter-hero__intro">{intro.text}</p>}

      <h1 className="hero-names">
        <span>{couple.groom.firstName}</span>
        <span className="amp" aria-hidden="true">
          {couple.joiner}
        </span>
        <span>{couple.bride.firstName}</span>
      </h1>

      <Flourish />

      <div className="hero-date">
        <span className="hero-date__main">{date.display}</span>
        <span className="hero-date__sub">
          {date.time} · {date.city}
        </span>
      </div>
    </div>
  );
}
