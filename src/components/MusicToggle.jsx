import { useEffect, useRef, useState } from 'react';
import { wedding } from '../data/wedding';
import { MusicIcon } from './Icons';

export default function MusicToggle() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [hidden, setHidden] = useState(false);
  const src = wedding.music?.src;

  // Hide gracefully when there is no track file behind the configured path.
  useEffect(() => {
    if (!src) return;
    let cancelled = false;
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 4000);

    fetch(src, { method: 'HEAD', signal: controller.signal })
      .then((res) => {
        const type = res.headers.get('content-type') || '';
        // SPA hosts answer missing files with index.html — treat that as "no track".
        if (!cancelled && (!res.ok || !type.startsWith('audio'))) setHidden(true);
      })
      .catch(() => {
        if (!cancelled) setHidden(true);
      })
      .finally(() => window.clearTimeout(timer));

    return () => {
      cancelled = true;
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnd = () => setPlaying(false);
    const onError = () => {
      setPlaying(false);
      setHidden(true);
    };
    audio.addEventListener('pause', onEnd);
    audio.addEventListener('error', onError);
    return () => {
      audio.removeEventListener('pause', onEnd);
      audio.removeEventListener('error', onError);
      audio.pause();
    };
  }, [hidden]);

  if (!src || hidden) return null;

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (audio.paused) {
        await audio.play();
        setPlaying(true);
      } else {
        audio.pause();
        setPlaying(false);
      }
    } catch {
      setPlaying(false);
      setHidden(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="none" />
      <button
        type="button"
        className="music-toggle"
        onClick={toggle}
        data-playing={playing}
        aria-pressed={playing}
        aria-label={playing ? 'Pause music' : wedding.music.label}
        title={playing ? 'Pause music' : wedding.music.label}
      >
        <MusicIcon playing={playing} />
      </button>
    </>
  );
}
