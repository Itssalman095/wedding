import { useEffect, useMemo, useState } from 'react';
import { wedding } from '../data/wedding';

function remaining(target) {
  const total = target - Date.now();
  if (!Number.isFinite(total) || total <= 0) return null;
  const sec = Math.floor(total / 1000);
  return {
    days: Math.floor(sec / 86400),
    hours: Math.floor((sec % 86400) / 3600),
    minutes: Math.floor((sec % 3600) / 60),
    seconds: sec % 60,
  };
}

const pad = (n) => String(n).padStart(2, '0');

export default function Countdown() {
  const labels = wedding.copy.countdown;
  const target = useMemo(() => new Date(wedding.date.iso).getTime(), []);
  const [left, setLeft] = useState(() => remaining(target));

  useEffect(() => {
    if (!Number.isFinite(target)) return;
    const tick = () => setLeft(remaining(target));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  if (!Number.isFinite(target)) return null;

  if (!left) {
    return (
      <p className="countdown is-past" role="status">
        {labels.arrived}
      </p>
    );
  }

  const cells = [
    [left.days, labels.days],
    [left.hours, labels.hours],
    [left.minutes, labels.minutes],
    [left.seconds, labels.seconds],
  ];

  return (
    <div className="countdown" role="timer" aria-label={labels.aria}>
      {cells.map(([value, label]) => (
        <div className="countdown__cell" key={label}>
          <span className="countdown__num">{pad(value)}</span>
          <span className="countdown__label">{label}</span>
        </div>
      ))}
    </div>
  );
}
