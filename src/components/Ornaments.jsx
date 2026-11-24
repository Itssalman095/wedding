export function Flourish({ className = 'hero-flourish', ...rest }) {
  return (
    <svg
      className={className}
      viewBox="0 0 320 34"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        data-draw
        d="M4 17c26-9 54-9 80 0 21 7 43 7 64 0"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        data-draw
        d="M316 17c-26-9-54-9-80 0-21 7-43 7-64 0"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path data-draw d="M150 17h20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path
        data-draw
        d="M160 10.5 166 17l-6 6.5L154 17l6-6.5Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <circle cx="143" cy="17" r="1.15" fill="currentColor" />
      <circle cx="177" cy="17" r="1.15" fill="currentColor" />
    </svg>
  );
}

export function Ornament({ className = 'ornament' }) {
  return (
    <svg className={className} viewBox="0 0 120 24" fill="none" aria-hidden="true">
      <path d="M4 12h38M78 12h38" stroke="currentColor" strokeWidth="0.8" opacity=".65" />
      <path d="M60 4.5 67.5 12 60 19.5 52.5 12 60 4.5Z" stroke="currentColor" strokeWidth="0.9" />
      <path d="M60 8.6 63.4 12 60 15.4 56.6 12 60 8.6Z" fill="currentColor" opacity=".55" />
      <circle cx="46" cy="12" r="1" fill="currentColor" opacity=".7" />
      <circle cx="74" cy="12" r="1" fill="currentColor" opacity=".7" />
    </svg>
  );
}

export function StaticEnvelope() {
  return (
    <svg className="static-envelope" viewBox="0 0 220 146" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="envBody" x1="110" y1="0" x2="110" y2="146" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fbf2e1" />
          <stop offset="1" stopColor="#ecd9b9" />
        </linearGradient>
        <linearGradient id="envFlap" x1="110" y1="0" x2="110" y2="82" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f7ecd8" />
          <stop offset="1" stopColor="#e9d4ae" />
        </linearGradient>
      </defs>
      <rect x="4" y="14" width="212" height="128" rx="6" fill="url(#envBody)" stroke="#c8a061" strokeOpacity=".4" />
      <path d="M4 14 110 88 216 14" fill="url(#envFlap)" stroke="#c8a061" strokeOpacity=".45" />
      <path d="M4 142 81 84M216 142 139 84" stroke="#c8a061" strokeOpacity=".3" />
      <circle cx="110" cy="92" r="19" fill="#5a1622" stroke="#e6cd98" strokeOpacity=".6" />
      <text x="110" y="97.5" textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" fill="#ecd29c" letterSpacing=".5">
        I&amp;S
      </text>
    </svg>
  );
}
