import { useEffect, useState } from "react";
import { useCountdown } from "../hooks/useCountdown";
import { WEDDING_DATE_TIME } from "../config/site";

function pad(value: number): string {
  return value.toString().padStart(2, "0");
}

const UNITS: Array<{
  key: "days" | "hours" | "minutes" | "seconds";
  label: string;
  shortLabel: string;
}> = [
  { key: "days", label: "dias", shortLabel: "d" },
  { key: "hours", label: "horas", shortLabel: "h" },
  { key: "minutes", label: "min", shortLabel: "m" },
  { key: "seconds", label: "seg", shortLabel: "s" },
];

export default function WeddingCountdown() {
  const countdown = useCountdown();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      aria-labelledby="wedding-countdown-title"
      className={[
        "relative overflow-hidden rounded-3xl",
        "border border-sand/70 bg-white/60",
        "px-6 py-10 text-center shadow-soft backdrop-blur-sm",
        "sm:px-10 sm:py-12",
        "transition-all duration-1000 ease-out",
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      ].join(" ")}
    >
      {/* ===== Brilhos decorativos ===== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-gold/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 right-0 h-48 w-48 rounded-full bg-blush/15 blur-3xl"
      />

      {/* Textura pontilhada */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]"
      >
        <defs>
          <pattern
            id="countdown-dots"
            x="0"
            y="0"
            width="16"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="0.8" fill="#8B6F3E" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#countdown-dots)" />
      </svg>

      <div className="relative">
        {/* ===== Cabeçalho ===== */}
        <p className="font-body text-[10px] uppercase tracking-widest2 text-gold sm:text-xs">
          Contagem regressiva
        </p>

        <h3
          id="wedding-countdown-title"
          className="mt-2 font-display text-2xl italic text-charcoal sm:text-3xl"
        >
          {countdown.isPast
            ? "O grande dia chegou"
            : "Faltam para o nosso grande dia"}
        </h3>

        {/* ===== Estado: já passou ===== */}
        {countdown.isPast ? (
          <div className="animate-[countdownFadeIn_700ms_ease-out_both]">
            {/* Coração com halo */}
            <div className="relative mx-auto mt-6 flex h-20 w-20 items-center justify-center">
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-blush/40 blur-2xl"
              />
              <span
                aria-hidden="true"
                className="relative text-4xl"
                style={{
                  animation: "countdownHeartbeat 1.8s ease-in-out infinite",
                }}
              >
                ❤️
              </span>
            </div>

            <p className="mt-5 font-display text-3xl italic text-charcoal sm:text-4xl">
              Hoje é o grande dia!
            </p>
            <p className="mt-3 font-body text-sm leading-relaxed text-ink/60">
              O nosso &ldquo;sim&rdquo; finalmente aconteceu.
            </p>

            <div className="mx-auto mt-8 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-blush" />
              <span className="text-sm text-gold">✦</span>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-blush" />
            </div>

            <p className="mt-5 font-body text-xs uppercase tracking-widest2 text-gold sm:text-sm">
              Obrigado por fazer parte
            </p>
          </div>
        ) : (
          <>
            {/* ===== Placar de unidades ===== */}
            <div
              className="mt-8 flex items-stretch justify-center gap-2 sm:gap-4"
              role="timer"
              aria-live="off"
              aria-label="Contagem regressiva para o casamento"
            >
              {UNITS.map((unit, index) => (
                <div key={unit.key} className="flex items-stretch">
                  <TimeCard
                    value={countdown[unit.key]}
                    label={unit.label}
                    shortLabel={unit.shortLabel}
                    delay={index * 80}
                    mounted={mounted}
                  />

                  {index < UNITS.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="mx-1 hidden self-center text-xl text-gold/40 sm:mx-2 sm:block"
                    >
                      :
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Legenda curta para leitores de tela */}
            <p className="sr-only">
              {countdown.days} dias, {countdown.hours} horas,{" "}
              {countdown.minutes} minutos e {countdown.seconds} segundos.
            </p>

            {/* ===== Data da festa ===== */}
            <div className="mt-10">
              <div className="mx-auto flex items-center justify-center gap-3">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-sand" />
                <span className="text-sm text-gold">✦</span>
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-sand" />
              </div>

              <p className="mt-5 font-body text-[10px] uppercase tracking-widest2 text-gold sm:text-xs">
                Nos encontramos em
              </p>
              <p className="mt-2 font-display text-xl italic text-charcoal sm:text-2xl">
                {formatWeddingDate(WEDDING_DATE_TIME)}
              </p>
              <p className="mt-1 font-body text-sm text-ink/60">
                {formatWeddingTime(WEDDING_DATE_TIME)}
              </p>
            </div>
          </>
        )}
      </div>

      {/* ===== Keyframes locais ===== */}
      <style>{`
        @keyframes countdownFadeIn {
          0%   { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes countdownHeartbeat {
          0%, 100% { transform: scale(1); }
          15%      { transform: scale(1.12); }
          30%      { transform: scale(1); }
          45%      { transform: scale(1.08); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="countdownHeartbeat"] { animation: none !important; }
          [class*="countdownFadeIn"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}

/* ============================================================
   Subcomponentes
   ============================================================ */

function TimeCard({
  value,
  label,
  shortLabel,
  delay,
  mounted,
}: {
  value: number;
  label: string;
  shortLabel: string;
  delay: number;
  mounted: boolean;
}) {
  const text = pad(value);

  return (
    <div
      className={[
        "relative flex w-14 flex-col items-center sm:w-20",
        "transition-all duration-700 ease-out",
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
      ].join(" ")}
      style={{ transitionDelay: mounted ? `${delay}ms` : "0ms" }}
    >
      {/* Círculo/quadrado de fundo sutil */}
      <div
        aria-hidden="true"
        className={[
          "absolute inset-x-0 top-0 h-12 sm:h-16",
          "rounded-2xl border border-sand/60 bg-white/70",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]",
        ].join(" ")}
      />

      {/* Número */}
      <span
        className={[
          "relative z-10 flex h-12 items-center justify-center sm:h-16",
          "font-display text-3xl italic tabular-nums text-charcoal sm:text-5xl",
          // Transição suave quando o número muda
          "transition-opacity duration-300",
        ].join(" ")}
      >
        {text}
      </span>

      {/* Label principal */}
      <span className="relative z-10 mt-2 font-body text-[10px] uppercase tracking-widest2 text-ink/50 sm:text-xs">
        <span className="hidden sm:inline">{label}</span>
        <span className="sm:hidden">{shortLabel}</span>
      </span>
    </div>
  );
}

/* ============================================================
   Helpers de formatação (independentes de libs externas)
   ============================================================ */

function formatWeddingDate(iso: string): string {
  const date = new Date(iso);
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  return `${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
}

function formatWeddingTime(iso: string): string {
  const date = new Date(iso);
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  return `às ${hours}h${minutes === "00" ? "" : minutes}`;
}
