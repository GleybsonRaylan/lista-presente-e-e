import { useEffect, useState } from "react";
import { useTimeTogether } from "../hooks/useTimeTogether";
import { RELATIONSHIP_START_DATE } from "../config/site";
import { formatLongDatePtBr } from "../lib/formatDate";

function pad(value: number): string {
  return value.toString().padStart(2, "0");
}

// 📅 Data da festa: 28 de novembro de 2026 às 19h (fuso de Brasília)
const WEDDING_DATE = new Date("2026-11-28T19:00:00-03:00");

/** Calcula dias restantes até o casamento (nunca negativo). */
function daysUntilWedding(): number {
  const diff = WEDDING_DATE.getTime() - Date.now();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

export default function TimeTogether() {
  const t = useTimeTogether();
  const [daysLeft, setDaysLeft] = useState(daysUntilWedding);
  const [mounted, setMounted] = useState(false);

  // Atualiza a contagem uma vez por dia (checa a cada minuto)
  useEffect(() => {
    const id = setInterval(() => setDaysLeft(daysUntilWedding()), 60_000);
    return () => clearInterval(id);
  }, []);

  // Dispara a animação de entrada
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      aria-labelledby="time-together-title"
      className={[
        "relative overflow-hidden rounded-3xl",
        "border border-blush/60 bg-white/60",
        "px-6 py-10 text-center shadow-soft backdrop-blur-sm",
        "sm:px-10 sm:py-12",
        "transition-all duration-1000 ease-out",
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      ].join(" ")}
    >
      {/* ===== Camadas decorativas de fundo ===== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-blush/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 right-0 h-48 w-48 rounded-full bg-gold/10 blur-3xl"
      />

      {/* Textura pontilhada discreta */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]"
      >
        <defs>
          <pattern
            id="time-dots"
            x="0"
            y="0"
            width="16"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="0.8" fill="#8B6F3E" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#time-dots)" />
      </svg>

      <div className="relative">
        {/* ===== Cabeçalho emocional ===== */}
        <p className="font-body text-[10px] uppercase tracking-widest2 text-gold sm:text-xs">
          Nossa história
        </p>

        <h3
          id="time-together-title"
          className="mt-2 font-display text-2xl italic text-charcoal sm:text-3xl"
        >
          Cada segundo ao seu lado
        </h3>

        <p className="mx-auto mt-3 max-w-md font-body text-sm leading-relaxed text-ink/60 sm:text-base">
          Desde {formatLongDatePtBr(RELATIONSHIP_START_DATE)}, construímos
          memórias, superamos desafios e escolhemos um ao outro todos os dias.
        </p>

        {/* ===== Contador principal ===== */}
        <div className="mt-9 flex items-center justify-center gap-3 sm:gap-6">
          <TimeBlock value={t.years} label={t.years === 1 ? "ano" : "anos"} />
          <Divider />
          <TimeBlock
            value={t.months}
            label={t.months === 1 ? "mês" : "meses"}
          />
          <Divider />
          <TimeBlock value={t.days} label={t.days === 1 ? "dia" : "dias"} />
        </div>

        {/* ===== Tempo real (horas/min/seg) ===== */}
        <div className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-sand/60 bg-white/70 px-4 py-1.5">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold/80"
          />
          <p className="font-body text-xs tabular-nums tracking-wider text-ink/60 sm:text-sm">
            {pad(t.hours)}h {pad(t.minutes)}m {pad(t.seconds)}s
            <span className="ml-2 text-ink/40">juntos</span>
          </p>
        </div>

        {/* ===== Divisor ===== */}
        <div className="mx-auto mt-10 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-blush" />
          <span className="text-sm text-gold">✦</span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-blush" />
        </div>

        {/* ===== O grande dia ===== */}
        <div className="mt-6">
          <p className="font-body text-[10px] uppercase tracking-widest2 text-gold sm:text-xs">
            O grande dia
          </p>

          <p className="mt-2 font-display text-xl italic text-charcoal sm:text-2xl">
            28 de Novembro de 2026
          </p>

          <p className="mt-1 font-body text-sm text-ink/60">
            às 19h · Celebramos o nosso &ldquo;sim&rdquo;
          </p>

          {/* Badge de contagem regressiva */}
          <div
            className={[
              "mt-5 inline-flex items-center gap-2 rounded-full",
              "border border-gold/40 bg-gold/5 px-4 py-1.5",
              "font-body text-xs tracking-widest2 text-gold sm:text-sm",
              "transition-all duration-1000 delay-300 ease-out",
              mounted ? "opacity-100" : "opacity-0",
            ].join(" ")}
          >
            <span aria-hidden="true">💍</span>
            {daysLeft === 0 ? (
              <span>É hoje!</span>
            ) : daysLeft === 1 ? (
              <span>Falta 1 dia</span>
            ) : (
              <span>Faltam {daysLeft} dias</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Subcomponentes
   ============================================================ */

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span
        className={[
          "font-display text-3xl italic text-charcoal sm:text-4xl",
          "tabular-nums",
          // Leve brilho ao redor do número principal
          "drop-shadow-[0_1px_8px_rgba(183,154,107,0.15)]",
        ].join(" ")}
      >
        {value}
      </span>
      <span className="mt-1 font-body text-[10px] uppercase tracking-widest2 text-ink/50 sm:text-xs">
        {label}
      </span>
    </div>
  );
}

function Divider() {
  return (
    <span
      aria-hidden="true"
      className="h-8 w-px bg-gradient-to-b from-transparent via-blush/60 to-transparent sm:h-10"
    />
  );
}
