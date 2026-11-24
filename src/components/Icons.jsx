export function WhatsAppIcon({ className = 'btn__icon' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.23.25-.86.85-.86 2.06 0 1.22.89 2.39 1.01 2.56.12.16 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}

export function PhoneIcon({ className = 'btn__icon' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path
        d="M6.6 3.5h-.9A2.2 2.2 0 0 0 3.5 5.7c0 8.2 6.6 14.8 14.8 14.8a2.2 2.2 0 0 0 2.2-2.2v-.9c0-.5-.3-.9-.8-1l-3.2-1.1c-.4-.1-.9 0-1.2.4l-.9 1.2a12.6 12.6 0 0 1-5.4-5.4l1.2-.9c.4-.3.5-.7.4-1.2L9.5 6.2c-.1-.5-.5-.8-1-.8Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MapPinIcon({ className = 'venue-card__pin' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function ArrowUpRightIcon({ className = 'btn__icon' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MusicIcon({ playing }) {
  return (
    <svg className="music-toggle__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      {playing ? (
        <>
          <path d="M8 6v12M16 6v12" strokeLinecap="round" />
          <path d="M5.5 9v6M18.5 9v6" strokeLinecap="round" opacity=".55" />
        </>
      ) : (
        <>
          <path d="M9 18V6.5l9-2v11.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="6.8" cy="18" r="2.3" />
          <circle cx="15.8" cy="15.7" r="2.3" />
        </>
      )}
    </svg>
  );
}
