import { wedding } from '../data/wedding';
import Countdown from './Countdown';
import Reveal from './Reveal';
import { Ornament } from './Ornaments';
import {
  ArrowUpRightIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from './Icons';

function fullName(person) {
  return person.fullName || person.firstName;
}

export default function InvitationSections() {
  const { couple, date, venue, events, compliments, rsvp, closing, copy } = wedding;

  const waHref = `https://wa.me/${String(rsvp.whatsapp).replace(/\D/g, '')}?text=${encodeURIComponent(
    rsvp.message
  )}`;
  const telHref = `tel:${String(rsvp.phone).replace(/[^\d+]/g, '')}`;

  return (
    <>
      <section className="invitation" id="invitation" aria-label="Wedding details">
        <div className="invitation__inner">
          {/* ── Families ─────────────────────────────────── */}
          <Reveal className="section" as="section">
            <p className="eyebrow">{copy.families.eyebrow}</p>
            <h2 className="section-title">{copy.families.title}</h2>
            <Ornament />

            <div className="families">
              <article className="family-card">
                <p className="family-card__role">{copy.families.groomRole}</p>
                <h3 className="family-card__name">{fullName(couple.groom)}</h3>
                {couple.groom.parents?.length > 0 && (
                  <p className="family-card__parents">
                    <em>{couple.groom.relation}</em>
                    <br />
                    {couple.groom.parents.join(' & ')}
                  </p>
                )}
              </article>

              <div className="family-join" aria-hidden="true">
                &amp;
              </div>

              <article className="family-card">
                <p className="family-card__role">{copy.families.brideRole}</p>
                <h3 className="family-card__name">{fullName(couple.bride)}</h3>
                {couple.bride.parents?.length > 0 && (
                  <p className="family-card__parents">
                    <em>{couple.bride.relation}</em>
                    <br />
                    {couple.bride.parents.join(' & ')}
                  </p>
                )}
              </article>
            </div>

            <p className="section-lede" style={{ marginTop: '1.8rem' }}>
              {copy.families.lede}
            </p>
          </Reveal>

          {/* ── Date & countdown ─────────────────────────── */}
          <Reveal className="section" as="section" delay={40}>
            <p className="eyebrow">{copy.date.eyebrow}</p>
            <div className="date-block">
              <h2 className="date-block__big">
                <span>{date.weekday}</span>
                {date.day} {date.month} {date.year}
              </h2>
              <p className="date-block__meta">
                {date.time} · {date.city}
              </p>
            </div>
            <Countdown />
          </Reveal>

          {/* ── Venue ────────────────────────────────────── */}
          <Reveal className="section" as="section" delay={40}>
            <p className="eyebrow">{copy.venue.eyebrow}</p>
            <h2 className="section-title">{copy.venue.title}</h2>

            <div className="venue-card">
              <MapPinIcon />
              <h3 className="venue-card__name">{venue.name}</h3>
              <p className="venue-card__address">
                {venue.addressLines.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
              {venue.note && <p className="venue-card__note">{venue.note}</p>}
              <div className="btn-row">
                <a
                  className="btn btn--gold"
                  href={venue.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPinIcon className="btn__icon" />
                  {copy.venue.mapButton}
                  <ArrowUpRightIcon className="btn__icon" />
                </a>
              </div>
            </div>
          </Reveal>

          {/* ── Schedule ─────────────────────────────────── */}
          <Reveal className="section" as="section" delay={40}>
            <p className="eyebrow">{copy.schedule.eyebrow}</p>
            <h2 className="section-title">{copy.schedule.title}</h2>
            <Ornament />

            <div className="timeline">
              {events.map((event) => (
                <div className="timeline__item" key={`${event.name}-${event.date}`}>
                  <span className="timeline__dot" aria-hidden="true" />
                  <p className="timeline__date">{event.date}</p>
                  <h3 className="timeline__name">{event.name}</h3>
                  <p className="timeline__meta">
                    {event.time} <span>· {event.place}</span>
                  </p>
                  {event.note && <p className="timeline__note">{event.note}</p>}
                </div>
              ))}
            </div>
          </Reveal>

          {/* ── Compliments ──────────────────────────────── */}
          <Reveal className="section" as="section" delay={40}>
            <p className="eyebrow">{copy.compliments.eyebrow}</p>
            <h2 className="section-title">{compliments.title}</h2>
            <div className="compliments">
              <ul className="compliments__list">
                {compliments.families.map((family) => (
                  <li key={family}>{family}</li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* ── RSVP ─────────────────────────────────────── */}
          <Reveal className="section" as="section" delay={40}>
            <p className="eyebrow">{copy.rsvp.eyebrow}</p>
            <h2 className="section-title">{copy.rsvp.title}</h2>
            <p className="section-lede">{copy.rsvp.lede}</p>

            <div className="rsvp">
              <div className="btn-row">
                <a
                  className="btn btn--maroon"
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon />
                  {copy.rsvp.whatsappButton}
                </a>
                <a className="btn btn--ghost" href={telHref}>
                  <PhoneIcon />
                  {copy.rsvp.callButton}
                </a>
              </div>
              <p className="rsvp__deadline">{rsvp.deadline}</p>
              <p className="rsvp__note">{rsvp.note}</p>
            </div>
          </Reveal>

          {/* ── Closing ──────────────────────────────────── */}
          <Reveal className="closing" as="section">
            <p className="eyebrow">{copy.closing.eyebrow}</p>
            <p className="closing__verse">“{closing.verse}”</p>
            <p className="closing__ref">{closing.verseRef}</p>
            <p className="closing__line">{closing.line}</p>
            <p className="closing__names">
              {couple.groom.firstName} {couple.joiner} {couple.bride.firstName}
            </p>
            <Ornament />
          </Reveal>
        </div>
      </section>

      <footer className="footer">
        <div className="footer__monogram" aria-hidden="true">
          {wedding.footer.monogram}
        </div>
        <p className="footer__note">{wedding.footer.note}</p>
        <p className="footer__small">
          {wedding.footer.monogram} · {date.short}
        </p>
      </footer>
    </>
  );
}
