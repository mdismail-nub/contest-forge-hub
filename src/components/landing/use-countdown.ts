import { useEffect, useState } from "react";

export type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  ready: boolean;
};

const EMPTY: Countdown = { days: 0, hours: 0, minutes: 0, seconds: 0, ready: false };

/** Counts down from `startsInMs` measured from first client render (SSR-safe). */
export function useCountdown(startsInMs: number): Countdown {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const target = Date.now() + startsInMs;
    const tick = () => setRemaining(Math.max(0, target - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [startsInMs]);

  if (remaining === null) return EMPTY;

  const totalSeconds = Math.floor(remaining / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    ready: true,
  };
}

export const pad = (value: number) => value.toString().padStart(2, "0");
