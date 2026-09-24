'use client';

import { useEffect, useState } from 'react';

type TimeParts = { years: number; months: number; days: number; hours: number; minutes: number };

function difference(startDate: string): TimeParts | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate)) return null;
  const start = new Date(`${startDate}T00:00:00`);
  if (Number.isNaN(start.getTime()) || start > new Date()) return null;
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();
  if (days < 0) {
    months -= 1;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  if (months < 0) { years -= 1; months += 12; }
  return { years, months, days, hours: now.getHours(), minutes: now.getMinutes() };
}

export function TimeTogether({ startDate }: { startDate: string }) {
  const [time, setTime] = useState<TimeParts | null>(() => difference(startDate));
  useEffect(() => {
    const tick = () => setTime(difference(startDate));
    const timer = window.setInterval(tick, 60_000);
    return () => window.clearInterval(timer);
  }, [startDate]);

  const values = time ?? { years: 5, months: 0, days: 0, hours: 0, minutes: 0 };
  const labels: [keyof TimeParts, string][] = [['years', 'años'], ['months', 'meses'], ['days', 'días'], ['hours', 'horas'], ['minutes', 'min']];
  return (
    <div className="time-grid" aria-label={time ? 'Tiempo que llevamos juntos' : 'Tiempo de ejemplo; configura la fecha de inicio'}>
      {labels.map(([key, label]) => <div className="time-unit" key={key}><strong>{String(values[key]).padStart(2, '0')}</strong><span>{label}</span></div>)}
    </div>
  );
}
