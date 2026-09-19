import { useEffect, useState } from 'react';
import { RELATIONSHIP_START_DATE } from '../config/site';

export interface TimeTogether {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const START_DATE = new Date(RELATIONSHIP_START_DATE);

/** Número de dias no mês (1-12) de um determinado ano — considera bissextos. */
function daysInMonth(year: number, month1to12: number): number {
  // Dia 0 do mês seguinte = último dia do mês atual.
  return new Date(year, month1to12, 0).getDate();
}

/**
 * Calcula a diferença de calendário entre `start` e `now` de forma correta:
 * anos, meses e dias "tomam emprestado" uns dos outros como faríamos ao
 * calcular a idade de alguém, em vez de dividir o total de dias por 365.
 */
function calculateTimeTogether(): TimeTogether {
  const now = new Date();

  let years = now.getFullYear() - START_DATE.getFullYear();
  let months = now.getMonth() - START_DATE.getMonth();
  let days = now.getDate() - START_DATE.getDate();
  let hours = now.getHours() - START_DATE.getHours();
  let minutes = now.getMinutes() - START_DATE.getMinutes();
  let seconds = now.getSeconds() - START_DATE.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes -= 1;
  }
  if (minutes < 0) {
    minutes += 60;
    hours -= 1;
  }
  if (hours < 0) {
    hours += 24;
    days -= 1;
  }
  if (days < 0) {
    // Pega emprestado o total de dias do mês anterior a "now".
    const prevMonthIndex = now.getMonth() === 0 ? 12 : now.getMonth();
    const prevMonthYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
    days += daysInMonth(prevMonthYear, prevMonthIndex);
    months -= 1;
  }
  if (months < 0) {
    months += 12;
    years -= 1;
  }

  // Nunca deve acontecer se a data de início é válida e no passado,
  // mas protegemos contra negativos por segurança (evita "-1 anos").
  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days),
    hours: Math.max(0, hours),
    minutes: Math.max(0, minutes),
    seconds: Math.max(0, seconds),
  };
}

/** Tempo decorrido em tempo real desde RELATIONSHIP_START_DATE. */
export function useTimeTogether(): TimeTogether {
  const [value, setValue] = useState<TimeTogether>(calculateTimeTogether);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setValue(calculateTimeTogether());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  return value;
}
