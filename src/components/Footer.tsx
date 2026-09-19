export default function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden border-t border-sand/60 bg-linen/60 px-6 py-14 text-center">
      {/* Brilhos decorativos */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 left-1/2 h-40 w-64 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-0 h-40 w-40 rounded-full bg-blush/20 blur-3xl"
      />

      {/* Textura pontilhada */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]"
      >
        <defs>
          <pattern
            id="footer-dots"
            x="0"
            y="0"
            width="16"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="0.8" fill="#8B6F3E" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#footer-dots)" />
      </svg>

      <div className="relative">
        {/* ===== Nome do casal ===== */}
        <h3 className="font-display text-2xl italic tracking-wide text-charcoal sm:text-3xl">
          Emerson Herculano
          <span className="mx-3 text-blush"> &amp; </span>
          Evaniele Larissa
        </h3>

        {/* Mensagem */}
        <p className="mx-auto mt-4 max-w-md font-body text-sm leading-relaxed text-ink/60">
          Com carinho, obrigado por fazer parte da nossa história.
        </p>

        {/* Divisor central */}
        <div className="mx-auto mt-10 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-sand" />
          <span className="text-sm text-gold/70">✦</span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-sand" />
        </div>

        {/* ===== Assinatura do desenvolvedor em destaque ===== */}
        <div className="mt-8 flex justify-center">
          <a
            href="https://gleybsonferreiradev.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Site de Gleybson Ferreira (abre em nova aba)"
            className={[
              "group relative inline-flex items-center gap-3",
              "rounded-full border border-gold/30 bg-white/60 px-5 py-2.5",
              "shadow-[0_4px_20px_-8px_rgba(156,123,63,0.35)]",
              "backdrop-blur-sm",
              "transition-all duration-500 ease-out",
              "hover:-translate-y-0.5 hover:border-gold/60",
              "hover:bg-white hover:shadow-[0_10px_30px_-10px_rgba(156,123,63,0.55)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2",
            ].join(" ")}
          >
            {/* Ícone de código com brilho */}
            <span
              aria-hidden="true"
              className={[
                "flex h-7 w-7 items-center justify-center rounded-full",
                "bg-gold/10 text-gold",
                "transition-all duration-500",
                "group-hover:bg-gold/20 group-hover:rotate-12",
              ].join(" ")}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </span>

            {/* Texto */}
            <span className="flex flex-col items-start leading-tight">
              <span className="font-body text-[10px] uppercase tracking-widest2 text-ink/50">
                Desenvolvido por
              </span>
              <span
                className={[
                  "font-display text-base italic tracking-wide",
                  "bg-gradient-to-r from-gold via-clay to-gold bg-clip-text text-transparent",
                  "transition-all duration-500",
                  "group-hover:from-gold-dark group-hover:via-gold group-hover:to-gold-dark",
                  "sm:text-lg",
                ].join(" ")}
              >
                Gleybson Ferreira
              </span>
            </span>

            {/* Seta discreta */}
            <span
              aria-hidden="true"
              className={[
                "ml-1 text-gold/60",
                "transition-transform duration-500",
                "group-hover:translate-x-0.5 group-hover:text-gold",
              ].join(" ")}
            >
              →
            </span>

            {/* Brilho que atravessa no hover */}
            <span
              aria-hidden="true"
              className={[
                "pointer-events-none absolute inset-0 overflow-hidden rounded-full",
              ].join(" ")}
            >
              <span
                className={[
                  "absolute inset-0 -translate-x-full",
                  "bg-gradient-to-r from-transparent via-white/40 to-transparent",
                  "transition-transform duration-[1200ms] ease-out",
                  "group-hover:translate-x-full",
                ].join(" ")}
              />
            </span>
          </a>
        </div>

        {/* Assinatura alternativa minimalista (opcional, para telas muito pequenas) */}
        <p className="sr-only">
          Site desenvolvido por Gleybson Ferreira. Visite
          gleybsonferreiradev.vercel.app.
        </p>
      </div>
    </footer>
  );
}
