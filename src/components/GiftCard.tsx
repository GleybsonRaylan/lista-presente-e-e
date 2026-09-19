import type { Gift } from "../types/gift";
import GiftPlaceholder from "./GiftPlaceholder";
import GiftImage from "./GiftImage";

interface GiftCardProps {
  gift: Gift;
  onSelect: (gift: Gift) => void;
}

export default function GiftCard({ gift, onSelect }: GiftCardProps) {
  const isAvailable = gift.quantity > 0;
  const hasMultiple = isAvailable && gift.quantity > 1;

  // Preço opcional (caso seu tipo Gift tenha `price`)
  const price =
    "price" in gift && typeof (gift as { price?: number }).price === "number"
      ? (gift as { price: number }).price
      : null;

  return (
    <button
      type="button"
      onClick={() => isAvailable && onSelect(gift)}
      disabled={!isAvailable}
      aria-disabled={!isAvailable}
      className={[
        "group relative flex flex-col overflow-hidden rounded-2xl border text-left",
        "transition-all duration-500 ease-out",
        isAvailable
          ? [
              "border-sand/70 bg-white/70",
              "hover:-translate-y-1 hover:border-gold/60",
              "hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.35)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory",
            ].join(" ")
          : "cursor-not-allowed border-sand/40 bg-white/40 opacity-70",
      ].join(" ")}
    >
      {/* ===== Imagem ===== */}
      <div className="relative aspect-square w-full overflow-hidden bg-sand/20">
        {gift.image_url ? (
          <img
            src={gift.image_url}
            alt={gift.name}
            loading="lazy"
            className={[
              "h-full w-full object-cover",
              "transition-transform duration-[1200ms] ease-out",
              isAvailable ? "group-hover:scale-[1.07]" : "grayscale-[35%]",
            ].join(" ")}
          />
        ) : (
          <GiftImage
            name={gift.name}
            alt={gift.name}
            className={[
              "h-full w-full object-cover",
              "transition-transform duration-[1200ms] ease-out",
              isAvailable ? "group-hover:scale-[1.07]" : "grayscale-[35%]",
            ].join(" ")}
            fallback={<GiftPlaceholder />}
          />
        )}

        {/* Brilho suave que atravessa no hover (só em disponíveis) */}
        {isAvailable && (
          <span
            aria-hidden="true"
            className={[
              "pointer-events-none absolute inset-0 -translate-x-full",
              "bg-gradient-to-r from-transparent via-white/25 to-transparent",
              "transition-transform duration-[1400ms] ease-out",
              "group-hover:translate-x-full",
            ].join(" ")}
          />
        )}

        {/* Gradiente inferior sutil para ancorar badges */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-charcoal/25 to-transparent" />

        {/* Badge de quantidade */}
        {hasMultiple && (
          <span
            className={[
              "absolute right-2.5 top-2.5 z-10",
              "inline-flex items-center gap-1 rounded-full",
              "border border-ivory/40 bg-ivory/90 px-2.5 py-1",
              "font-body text-[11px] tracking-wide text-gold shadow-sm",
              "backdrop-blur-sm",
            ].join(" ")}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold/80" />
            {gift.quantity} disponíveis
          </span>
        )}

        {/* Overlay "Já escolhido" */}
        {!isAvailable && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-charcoal/55 backdrop-blur-[2px]">
            <span
              className={[
                "inline-flex items-center gap-1.5 rounded-full",
                "border border-ivory/40 bg-ivory/95 px-3.5 py-1.5",
                "font-body text-xs tracking-wide text-charcoal shadow-sm",
              ].join(" ")}
            >
              <span aria-hidden="true">✓</span>
              Já escolhido
            </span>
          </div>
        )}
      </div>

      {/* ===== Conteúdo ===== */}
      <div className="flex flex-1 flex-col gap-2 px-4 py-3.5">
        <p
          className={[
            "font-body text-sm leading-snug",
            isAvailable ? "text-ink" : "text-ink/70",
          ].join(" ")}
        >
          {gift.name}
        </p>

        {/* Preço + CTA (opcional) */}
        <div className="mt-auto flex items-end justify-between gap-2">
          {price !== null && (
            <span className="font-display text-base italic text-gold/90">
              R$ {price.toFixed(2).replace(".", ",")}
            </span>
          )}

          {isAvailable && (
            <span
              aria-hidden="true"
              className={[
                "ml-auto inline-flex items-center gap-1",
                "font-body text-[11px] uppercase tracking-widest2 text-gold/80",
                "opacity-0 translate-x-1",
                "transition-all duration-500 ease-out",
                "group-hover:opacity-100 group-hover:translate-x-0",
              ].join(" ")}
            >
              Escolher
              <span className="transition-transform duration-500 group-hover:translate-x-0.5">
                →
              </span>
            </span>
          )}
        </div>
      </div>

      {/* Linha dourada sutil que cresce no hover (detalhe refinado) */}
      {isAvailable && (
        <span
          aria-hidden="true"
          className={[
            "pointer-events-none absolute bottom-0 left-0 h-px w-0",
            "bg-gradient-to-r from-transparent via-gold/70 to-transparent",
            "transition-all duration-700 ease-out",
            "group-hover:w-full",
          ].join(" ")}
        />
      )}
    </button>
  );
}
