import type { Gift } from "../types/gift";
import GiftCard from "./GiftCard";

interface GiftGridProps {
  gifts: Gift[];
  isLoading: boolean;
  loadError: boolean;
  onSelect: (gift: Gift) => void;
}

/* ============================================================
   Skeleton — replica o layout real do GiftCard
   ============================================================ */
function GiftCardSkeleton({ index }: { index: number }) {
  return (
    <div
      aria-hidden="true"
      className="flex flex-col overflow-hidden rounded-2xl border border-sand/40 bg-white/50"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Imagem */}
      <div className="relative aspect-square w-full overflow-hidden bg-linen">
        <div
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent"
          style={{ animation: "shimmer 1.8s ease-in-out infinite" }}
        />
      </div>

      {/* Texto */}
      <div className="flex flex-1 flex-col gap-2 px-4 py-3.5">
        <div className="h-3 w-3/4 rounded-full bg-linen/90" />
        <div className="h-3 w-1/2 rounded-full bg-linen/70" />
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="h-4 w-16 rounded-full bg-linen/80" />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Estado vazio / erro — mensagens elegantes
   ============================================================ */
function StateMessage({
  icon,
  title,
  description,
  tone = "neutral",
}: {
  icon: string;
  title: string;
  description: string;
  tone?: "neutral" | "error";
}) {
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={[
        "mx-auto flex max-w-md flex-col items-center gap-3",
        "rounded-3xl border px-8 py-10 text-center",
        "transition-all duration-700 ease-out",
        tone === "error"
          ? "border-sand/70 bg-white/60"
          : "border-sand/60 bg-white/50",
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className={[
          "flex h-12 w-12 items-center justify-center rounded-full",
          "border text-lg",
          tone === "error"
            ? "border-sand/70 bg-linen/60 text-ink/70"
            : "border-gold/30 bg-gold/10 text-gold",
        ].join(" ")}
      >
        {icon}
      </span>

      <h3 className="font-display text-lg italic text-ink">{title}</h3>

      <p className="font-body text-sm leading-relaxed text-ink/70">
        {description}
      </p>

      {/* Divisor discreto */}
      <span className="mt-1 flex items-center gap-2 text-[10px] text-ink/30">
        <span className="h-px w-8 bg-ink/20" />
        ✦
        <span className="h-px w-8 bg-ink/20" />
      </span>
    </div>
  );
}

/* ============================================================
   Grid principal
   ============================================================ */
export default function GiftGrid({
  gifts,
  isLoading,
  loadError,
  onSelect,
}: GiftGridProps) {
  /* ---------- Loading ---------- */
  if (isLoading) {
    return (
      <div
        role="status"
        aria-live="polite"
        aria-label="Carregando lista de presentes"
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <GiftCardSkeleton key={index} index={index} />
        ))}
        <span className="sr-only">Carregando presentes...</span>
      </div>
    );
  }

  /* ---------- Erro ---------- */
  if (loadError) {
    return (
      <StateMessage
        icon="✦"
        tone="error"
        title="Não conseguimos abrir a lista agora"
        description="Verifique sua conexão e recarregue a página. Se persistir, tente novamente em alguns instantes."
      />
    );
  }

  /* ---------- Vazio ---------- */
  if (gifts.length === 0) {
    return (
      <StateMessage
        icon="🎁"
        title="A lista ainda está sendo preparada"
        description="Estamos escolhendo cada detalhe com carinho. Volte em breve para ver as opções."
      />
    );
  }

  /* ---------- Grid ---------- */
  return (
    <div
      role="list"
      aria-label="Lista de presentes"
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6"
    >
      {gifts.map((gift, index) => (
        <div
          key={gift.id}
          role="listitem"
          style={{ animationDelay: `${Math.min(index, 12) * 60}ms` }}
          className="animate-[giftFadeUp_700ms_ease-out_both]"
        >
          <GiftCard gift={gift} onSelect={onSelect} />
        </div>
      ))}

      {/* Keyframes locais — não dependem do tailwind.config */}
      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes giftFadeUp {
          0%   { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[giftFadeUp_700ms_ease-out_both\\] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
