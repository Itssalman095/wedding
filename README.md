# Imran &amp; Samra — Wedding Invitation

A mobile-first, single-page wedding invitation. The story opens on a wax-sealed envelope: scroll and the flap swings open, the card rises out, and the invitation grows to fill the screen before the details follow.

Built with **React + Vite**, **GSAP / ScrollTrigger** (the pinned envelope scene), **Lenis** (smooth scroll), **Anime.js** (small flourishes) and an optional **Vanta.js** fog layer.

---

## Quick start

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build     # production build → dist/
npm run preview   # serve the built site locally
```

Requires Node 18+.

---

## Edit everything in one file

**All wording lives in [`src/data/wedding.js`](src/data/wedding.js).** Nothing else needs to be touched to personalise the invitation.

| Block | What it controls |
| --- | --- |
| `bismillah` | Arabic line + translation. Set `show: false` to remove it. |
| `intro` | "Together with their families" line. Set `show: false` to remove it. |
| `couple` | Groom/bride names, parents, "son of" / "daughter of", and the joiner (`&`). |
| `date` | Countdown target (`iso`), display date, time and city. |
| `venue` | Name, address lines, note, Google Maps link. |
| `events` | Mehndi / Nikah / Walima (or any events) — rendered as a timeline in order. |
| `compliments` | "With best compliments from" family list. |
| `rsvp` | WhatsApp number, phone number, prefilled message, deadline, note. |
| `closing` | Closing verse, reference and final line. |
| `footer` | Monogram and closing note. |
| `music` | Optional background track (see below). |
| `copy` | Section headings, eyebrows, button labels and the scroll hints. |
| `og` | Title/description used in share previews (also set in `index.html`). |

### Placeholders to replace before sending

- `couple.groom.fullName`, `couple.bride.fullName`
- `couple.groom.parents`, `couple.bride.parents`
- `venue.name`, `venue.addressLines`, `venue.mapUrl`
- `events[*]` dates, times and places
- `compliments.families`
- `rsvp.whatsapp` (digits only, international format) and `rsvp.phone`
- `date.iso` (used by the countdown) **and** `date.weekday/day/month/year/display/short`
- `date.time`, `date.city`

> Tip: the countdown reads `date.iso`, while the visible date is written out by hand. Update both.

---

## Share preview (WhatsApp / Open Graph)

1. Set your real domain in [`.env`](.env):

   ```env
   VITE_SITE_URL=https://your-domain.com
   ```

   It is injected into `index.html` at build time for `og:url`, `og:image`, `twitter:image` and the canonical link. Rebuild after changing it.

2. Replace [`public/og-image.jpg`](public/og-image.jpg) if you want a different preview picture. Keep it **1200 × 630** (JPEG or PNG). The current one is a cream/gold card with the monogram and names.

3. After deploying, test the preview with the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) or by sending the link to yourself on WhatsApp. Some apps cache aggressively — append `?v=2` to the link while testing.

---

## Music (optional, off by default)

Drop a track at `public/audio/wedding-theme.mp3` (or point `music.src` in `wedding.js` somewhere else). The button appears only when the file exists and has an audio content type — if it is missing, nothing renders. Playback starts only after a tap, so it never fights mobile autoplay rules.

---

## Deploying

The build is a static site: deploy the `dist/` folder anywhere.

**Vercel** — import the repo, framework preset **Vite**, build `npm run build`, output `dist`. Add `VITE_SITE_URL` in Project → Settings → Environment Variables if you prefer not to commit `.env`.

**Netlify** — build `npm run build`, publish `dist`.

**GitHub Pages** — build, then publish `dist/`. If the site lives under a sub-path, set `base` in [`vite.config.js`](vite.config.js) to that path and rebuild.

---

## Motion & accessibility

- **Reduced motion**: if the visitor's OS asks for reduced motion, the site skips the pinned envelope scene entirely and renders a static hero + the content sections. No scroll hijacking, no pinning.
- **QA override**: append `?motion=full` to force the full animation, or `?motion=reduced` to preview the fallback.
- **Performance**: only `transform` / `opacity` are animated; the Vanta fog layer is lazy-loaded after first paint and skipped on low-power devices (≤ 4 cores, ≤ 4 GB memory, data-saver, reduced motion). A lightweight canvas gold-dust layer and a CSS gradient remain as the fallback. `three` and Vanta are code-split, so the first view does not download them.
- Layout uses `100svh` / `100dvh` so mobile browser chrome does not break the pinned scene.

---

## Project map

```
index.html                  meta tags, fonts, OG data
src/main.jsx                entry, motion override, scroll restoration
src/App.jsx                 chooses animated stage vs. static hero
src/data/wedding.js         ← all editable content
src/components/
  EnvelopeStage.jsx         pinned envelope + scrub timeline
  StaticHero.jsx            reduced-motion hero
  HeroContent.jsx           names / date block used in both heroes
  InvitationSections.jsx    families, date, venue, schedule, RSVP, closing
  Countdown.jsx             live countdown
  GoldDust.jsx              canvas particles
  MusicToggle.jsx           optional audio button
  Reveal.jsx                on-scroll fade for sections
  Ornaments.jsx / Icons.jsx SVG decorations and icons
src/hooks/                  smooth scroll + reduced-motion hook
src/lib/motion.js           motion preference / ?motion= override
src/styles/                 global.css (hero/scene) + content.css (sections)
public/                     favicon, og-image, (optional) audio
```

---

With love and prayers — I &amp; S
