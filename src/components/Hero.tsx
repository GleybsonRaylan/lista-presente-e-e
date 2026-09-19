import { useEffect, useState } from "react";
import { COUPLE_NAMES, COUPLE_PHOTO_URL, HERO_QUOTE } from "../config/site";

// 🔁 SUBSTITUA esta URL pela foto real dos noivos
const PLACEHOLDER_PHOTO = "/images/e.png";

export default function Hero() {
  const photoUrl = COUPLE_PHOTO_URL || PLACEHOLDER_PHOTO;
  const [mounted, setMounted] = useState(false);
  const [photoLoaded, setPhotoLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  // ✅ COUPLE_NAMES é um objeto { bride, groom }
  const nameA = COUPLE_NAMES?.bride ?? "Evaniele Larissa";
  const nameB = COUPLE_NAMES?.groom ?? "Emerson Herculano";

  return (
    <section className="relative flex min-h-[100svh] w-full items-end justify-center overflow-hidden bg-charcoal">
      {/* ===== Foto do casal (recíproca: mobile cobre, desktop emoldura) ===== */}
      <div className="absolute inset-0">
        {/* Fundo desfocado — preenche as laterais no desktop */}
        <img
          src={photoUrl}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-110 object-cover object-center opacity-40 blur-2xl"
        />

        {/* Foto principal — centralizada */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={photoUrl}
            alt={`${nameA} e ${nameB}`}
            onLoad={() => setPhotoLoaded(true)}
            className={[
              // Mobile/tablet: cobre tudo, foco nos rostos
              "h-full w-full object-cover object-[50%_45%] sm:object-[50%_40%]",
              // Desktop: cabe inteira, sem cortar nem esticar
              "lg:max-h-[85vh] lg:max-w-[90vw] lg:object-contain",
              "lg:rounded-sm lg:shadow-[0_25px_80px_-15px_rgba(0,0,0,0.75)]",
              // Animações
              "transition-all duration-[8000ms] ease-out",
              photoLoaded ? "opacity-100" : "opacity-0",
              mounted ? "scale-105" : "scale-100",
            ].join(" ")}
          />
        </div>

        {/* Overlays — legibilidade sem apagar a foto */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/55 to-charcoal/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-charcoal/15" />

        {/* Luz ambiente respirando */}
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[120%] -translate-x-1/2 rounded-full bg-ivory/5 blur-3xl"
          style={{ animation: "heroBreathe 8s ease-in-out infinite" }}
        />

        {/* Vinheta inferior para ancorar o texto */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-charcoal to-transparent" />
      </div>

      {/* ===== Molduras decorativas ===== */}
      <div
        className={[
          "pointer-events-none absolute inset-3 z-10 hidden border border-ivory/25 sm:inset-5 sm:block",
          "transition-all duration-1000 ease-out",
          mounted ? "opacity-100 scale-100" : "opacity-0 scale-95",
        ].join(" ")}
      />
      <div
        className={[
          "pointer-events-none absolute inset-5 z-10 hidden border border-ivory/10 sm:inset-7 sm:block",
          "transition-all duration-1000 delay-150 ease-out",
          mounted ? "opacity-100 scale-100" : "opacity-0 scale-95",
        ].join(" ")}
      />

      {/* Cantos ornamentais */}
      {[
        "top-3 left-3 sm:top-5 sm:left-5",
        "top-3 right-3 sm:top-5 sm:right-5",
        "bottom-3 left-3 sm:bottom-5 sm:left-5",
        "bottom-3 right-3 sm:bottom-5 sm:right-5",
      ].map((pos, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={[
            "pointer-events-none absolute z-10 hidden text-[10px] text-ivory/60 sm:block",
            pos,
            "transition-all duration-1000 ease-out",
            mounted ? "opacity-100 scale-100" : "opacity-0 scale-75",
          ].join(" ")}
          style={{ transitionDelay: `${300 + i * 80}ms` }}
        >
          ✦
        </span>
      ))}

      {/* ===== Conteúdo ===== */}
      <div className="relative z-20 flex w-full flex-col items-center gap-4 px-6 pb-16 text-center sm:gap-5 sm:pb-20">
        {/* Aliança com brilho */}
        <span
          aria-hidden="true"
          className={[
            "relative text-2xl sm:text-3xl",
            "transition-all duration-1000 ease-out",
            mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          ].join(" ")}
        >
          <span className="absolute inset-0 blur-md opacity-60">💍</span>
          <span className="relative"></span>
        </span>

        {/* Nomes */}
        <h1
          className={[
            "font-display text-[2.6rem] leading-[1.05] italic tracking-wide text-ivory",
            "drop-shadow-[0_2px_16px_rgba(0,0,0,0.65)]",
            "sm:text-6xl lg:text-7xl",
            "transition-all duration-1000 delay-100 ease-out",
            mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          ].join(" ")}
        >
          {nameA} <span className="not-italic text-ivory/70">&amp;</span>{" "}
          {nameB}
        </h1>

        {/* Subtítulo com linhas laterais */}
        <div
          className={[
            "flex items-center gap-3",
            "transition-all duration-1000 delay-200 ease-out",
            mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          ].join(" ")}
        >
          <span className="h-px w-6 bg-ivory/40 sm:w-8" />
          <p className="font-body text-[0.7rem] uppercase tracking-widest2 text-ivory/85 sm:text-sm">
            Nossa lista de presentes
          </p>
          <span className="h-px w-6 bg-ivory/40 sm:w-8" />
        </div>

        {/* Divisor elegante */}
        <div
          className={[
            "flex items-center gap-3",
            "transition-all duration-1000 delay-300 ease-out",
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
          ].join(" ")}
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent via-ivory/50 to-ivory/50 sm:w-14" />
          <span className="text-xs text-ivory/70">✦</span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent via-ivory/50 to-ivory/50 sm:w-14" />
        </div>

        {/* Citação */}
        <p
          className={[
            "max-w-sm font-display text-lg italic leading-relaxed text-ivory/95 sm:max-w-md sm:text-2xl",
            "drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]",
            "transition-all duration-1000 delay-400 ease-out",
            mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          ].join(" ")}
        >
          &ldquo;{HERO_QUOTE}&rdquo;
        </p>

        {/* CTA */}
        <a
          href="#presentes"
          className={[
            "group mt-3 inline-flex items-center gap-2 rounded-full",
            "border border-ivory/50 bg-ivory/5 px-7 py-2.5",
            "font-body text-sm text-ivory/95 backdrop-blur-sm",
            "transition-all duration-500 ease-out",
            "hover:border-ivory hover:bg-ivory/15 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.35)]",
            mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          ].join(" ")}
          style={{ transitionDelay: mounted ? "500ms" : "0ms" }}
        >
          <span>Ver lista de presentes</span>
          <span className="transition-transform duration-500 group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>

      {/* Indicador de scroll */}
      <div
        className={[
          "pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2",
          "hidden sm:flex flex-col items-center gap-1",
          "transition-opacity duration-1000 delay-[900ms]",
          mounted ? "opacity-70" : "opacity-0",
        ].join(" ")}
      >
        <span className="font-body text-[0.6rem] uppercase tracking-widest2 text-ivory/70"></span>
        <span className="h-8 w-px animate-pulse bg-gradient-to-b from-ivory/70 to-transparent" />
      </div>

      {/* Keyframes da luz ambiente */}
      <style>{`
        @keyframes heroBreathe {
          0%, 100% { opacity: 0.4; transform: translateX(-50%) scale(1); }
          50%      { opacity: 0.75; transform: translateX(-50%) scale(1.08); }
        }
      `}</style>
    </section>
  );
}
