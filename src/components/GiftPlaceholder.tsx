import { useId } from "react";

interface GiftPlaceholderProps {
  /** Texto opcional exibido abaixo do ícone (ex.: nome do presente) */
  label?: string;
  /** Tamanho do ícone principal */
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function GiftPlaceholder({
  label,
  size = "md",
  className,
}: GiftPlaceholderProps) {
  const gradientId = useId();

  const iconSize = {
    sm: 32,
    md: 44,
    lg: 64,
  }[size];

  return (
    <div
      className={[
        "relative flex h-full w-full flex-col items-center justify-center gap-2",
        "overflow-hidden",
        // Fundo com gradiente diagonal sutil
        "bg-[radial-gradient(circle_at_30%_20%,#F5EFE4_0%,#EFE6D6_55%,#E7DBC5_100%)]",
        className ?? "",
      ].join(" ")}
    >
      {/* Textura pontilhada discreta (SVG inline, sem requisição) */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]"
      >
        <defs>
          <pattern
            id={`${gradientId}-dots`}
            x="0"
            y="0"
            width="14"
            height="14"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="0.8" fill="#8B6F3E" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${gradientId}-dots)`} />
      </svg>

      {/* Halo suave atrás do ícone */}
      <span
        aria-hidden="true"
        className={[
          "absolute rounded-full bg-gold/20 blur-2xl",
          size === "sm"
            ? "h-16 w-16"
            : size === "lg"
              ? "h-32 w-32"
              : "h-24 w-24",
        ].join(" ")}
        style={{ animation: "giftPlaceholderPulse 4s ease-in-out infinite" }}
      />

      {/* Ícone do presente */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 48 48"
        fill="none"
        stroke="#B79A6B"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="relative drop-shadow-[0_2px_6px_rgba(183,154,107,0.25)]"
      >
        {/* Caixa */}
        <rect x="7" y="18" width="34" height="22" rx="1.8" />

        {/* Tampa */}
        <path d="M7 25h34" />

        {/* Fita vertical */}
        <path d="M24 18v22" />

        {/* Laço esquerdo */}
        <path d="M24 18c-3.5 0-7-2-7-5.5S19.5 7 22 7c2.8 0 3.6 3 2 5.5-1.6 2.5-.9 5.5 0 5.5Z" />

        {/* Laço direito */}
        <path d="M24 18c3.5 0 7-2 7-5.5S28.5 7 26 7c-2.8 0-3.6 3-2 5.5 1.6 2.5.9 5.5 0 5.5Z" />

        {/* Brilho no canto da caixa (detalhe sutil) */}
        <path d="M11 21.5h4" stroke="#D9C29A" strokeWidth="1" opacity="0.85" />
      </svg>

      {/* Label opcional */}
      {label && (
        <span
          className={[
            "relative z-10 max-w-[80%] truncate text-center",
            "font-body uppercase tracking-widest2 text-ink/40",
            size === "sm"
              ? "text-[9px]"
              : size === "lg"
                ? "text-xs"
                : "text-[10px]",
          ].join(" ")}
          title={label}
        >
          {label}
        </span>
      )}

      {/* Keyframes locais */}
      <style>{`
        @keyframes giftPlaceholderPulse {
          0%, 100% { opacity: 0.45; transform: scale(1); }
          50%      { opacity: 0.75; transform: scale(1.08); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="giftPlaceholderPulse"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
