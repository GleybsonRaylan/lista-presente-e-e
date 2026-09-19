import { useEffect, useRef, useState, type ReactNode } from "react";
import { getGiftImageCandidates } from "../lib/giftImage";

type Props = {
  name: string;
  alt?: string;
  className?: string;
  fallback?: ReactNode;
  /** Quando true, prioriza o carregamento (usado em cards acima da dobra) */
  eager?: boolean;
};

export default function GiftImage({
  name,
  alt,
  className,
  fallback,
  eager = false,
}: Props) {
  const candidates = getGiftImageCandidates(name);
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Se o nome mudar (ex.: reuso em listas com keys dinâmicas), reinicia
  useEffect(() => {
    setIndex(0);
    setLoaded(false);
  }, [name]);

  // Se a imagem já estiver em cache, marca como carregada imediatamente
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (img.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [index]);

  /* ---------- Fallback (todas as tentativas falharam) ---------- */
  if (index >= candidates.length) {
    return (
      <>
        {fallback ?? (
          <div
            role="img"
            aria-label={`Foto não cadastrada: ${name}`}
            className={[
              "flex items-center justify-center bg-gradient-to-br from-linen to-sand/40",
              "text-2xl text-ink/40",
              className ?? "",
            ].join(" ")}
          >
            <span aria-hidden="true">📷</span>
          </div>
        )}
      </>
    );
  }

  /* ---------- Imagem com skeleton + fade-in ---------- */
  return (
    <div className="relative h-full w-full">
      {/* Skeleton — só aparece enquanto não carregou */}
      {!loaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden bg-linen"
        >
          <div
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent"
            style={{ animation: "giftImgShimmer 1.6s ease-in-out infinite" }}
          />
        </div>
      )}

      <img
        ref={imgRef}
        src={candidates[index]}
        alt={alt ?? name}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setLoaded(false);
          setIndex((i) => i + 1);
        }}
        className={[
          className ?? "",
          // Fade-in suave ao carregar
          "transition-opacity duration-700 ease-out",
          loaded ? "opacity-100" : "opacity-0",
        ].join(" ")}
      />

      {/* Keyframes locais — não dependem do tailwind.config */}
      <style>{`
        @keyframes giftImgShimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="giftImgShimmer"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
