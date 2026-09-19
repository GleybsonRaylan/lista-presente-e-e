import { useEffect, useState } from 'react';
import { WEDDING_DATE_TIME } from '../config/site';

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

const WEDDING_TIMESTAMP = new Date(WEDDING_DATE_TIME).getTime();

function calculateCountdown(): Countdown {
  const diff = WEDDING_TIMESTAMP - Date.now();

  if (Number.isNaN(diff) || diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, isPast: false };
}

/**
 * Contagem regressiva em tempo real até WEDDING_DATE_TIME.
 * Usa Date.now() a cada tick, então nunca depende de um valor
 * "congelado" no primeiro render, e nunca produz NaN ou negativos.
 */
export function useCountdown(): Countdown {
  const [countdown, setCountdown] = useState<Countdown>(calculateCountdown);

  useEffect(() => {
    // Garante um único timer, mesmo que o componente re-renderize.
    const intervalId = window.setInterval(() => {
      setCountdown(calculateCountdown());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  return countdown;
}
