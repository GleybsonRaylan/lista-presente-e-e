import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { buildOtherGiftMessage, buildWhatsAppUrl } from "../lib/whatsapp";

/* ============================================================
   🔁 TROQUE AQUI pela URL do seu logo/foto
   Pode ser:
   - caminho local:  "/images/logo-other-gift.png"
   - URL externa:    "https://..."
   Se ficar vazio (""), mostra um ícone SVG padrão.
   ============================================================ */
const OTHER_GIFT_LOGO_URL = "/images/logo-other-gift.png";

export default function OtherGiftSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [description, setDescription] = useState("");
  const [sent, setSent] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const formId = useId();

  const nameRef = useRef<HTMLInputElement>(null);

  // Foca o primeiro campo quando abre
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => nameRef.current?.focus(), 180);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const canSubmit =
    guestName.trim().length > 0 && description.trim().length > 0;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!canSubmit) return;

    const url = buildWhatsAppUrl(
      buildOtherGiftMessage(guestName.trim(), description.trim()),
    );
    window.open(url, "_blank", "noopener,noreferrer");

    setSent(true);
    setTimeout(() => {
      setSent(false);
      setIsOpen(false);
      setGuestName("");
      setDescription("");
    }, 3500);
  }

  const showLogo = OTHER_GIFT_LOGO_URL && !logoError;

  return (
    <section
      aria-labelledby={`${formId}-title`}
      className={[
        "relative mx-auto max-w-2xl overflow-hidden",
        "rounded-3xl border border-sand/70 bg-white/60",
        "px-6 py-8 text-center shadow-soft sm:px-10 sm:py-10",
        "transition-all duration-500",
      ].join(" ")}
    >
      {/* Brilho decorativo no topo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 left-1/2 h-40 w-64 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl"
      />

      {/* Textura pontilhada discreta */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.03]"
      >
        <defs>
          <pattern
            id={`${formId}-dots`}
            x="0"
            y="0"
            width="16"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="0.8" fill="#8B6F3E" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${formId}-dots)`} />
      </svg>

      {/* ===== Logo / foto em destaque ===== */}
      <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center">
        {/* Halo dourado suave atrás */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-gold/15 blur-lg"
        />

        {/* Anel externo decorativo (borda fina dourada) */}
        <span
          aria-hidden="true"
          className={[
            "absolute inset-0 rounded-full",
            "border border-gold/30",
            "transition-transform duration-700",
            "group-hover:scale-105",
          ].join(" ")}
        />

        {/* Moldura interna que segura a imagem */}
        <div
          className={[
            "relative h-16 w-16 overflow-hidden rounded-full",
            "border border-gold/40 bg-white",
            "shadow-[0_8px_20px_-10px_rgba(156,123,63,0.5)]",
            "transition-transform duration-500 ease-out",
            "hover:scale-[1.06]",
          ].join(" ")}
        >
          {showLogo ? (
            <img
              src={OTHER_GIFT_LOGO_URL}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              draggable={false}
              onError={() => setLogoError(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            // Fallback elegante: ícone SVG de presente
            <span
              aria-hidden="true"
              className="flex h-full w-full items-center justify-center bg-gradient-to-br from-linen to-sand/40 text-gold"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 48 48"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="7" y="18" width="34" height="22" rx="1.8" />
                <path d="M7 25h34" />
                <path d="M24 18v22" />
                <path d="M24 18c-3.5 0-7-2-7-5.5S19.5 7 22 7c2.8 0 3.6 3 2 5.5-1.6 2.5-.9 5.5 0 5.5Z" />
                <path d="M24 18c3.5 0 7-2 7-5.5S28.5 7 26 7c-2.8 0-3.6 3-2 5.5 1.6 2.5.9 5.5 0 5.5Z" />
              </svg>
            </span>
          )}
        </div>

        {/* Brilho diagonal que passa no hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
        >
          <span
            className={[
              "absolute inset-0 -translate-x-full",
              "bg-gradient-to-r from-transparent via-white/50 to-transparent",
              "transition-transform duration-[1400ms] ease-out",
              "group-hover:translate-x-full",
            ].join(" ")}
          />
        </span>
      </div>

      <h2
        id={`${formId}-title`}
        className="font-display text-xl italic text-charcoal sm:text-2xl"
      >
        Quer dar outro presente?
      </h2>
      <p className="mx-auto mt-2 max-w-md font-body text-sm leading-relaxed text-ink/60">
        Sem problema — conte pra gente pelo WhatsApp. Vai ser uma alegria
        receber sua sugestão. 💛
      </p>

      {/* Divisor */}
      <div className="my-6 flex items-center justify-center gap-2 text-[10px] text-ink/30">
        <span className="h-px w-10 bg-ink/20" />
        ✦
        <span className="h-px w-10 bg-ink/20" />
      </div>

      {/* ================= FECHADO ================= */}
      {!isOpen && !sent && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={[
            "group inline-flex items-center gap-2 rounded-full",
            "border border-gold bg-transparent px-7 py-3",
            "font-body text-sm text-gold",
            "transition-all duration-300",
            "hover:bg-gold hover:text-ivory",
            "hover:shadow-[0_10px_30px_-10px_rgba(200,160,80,0.6)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2",
          ].join(" ")}
        >
          <span>Quero dar outro presente</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </button>
      )}

      {/* ================= ABERTO ================= */}
      {isOpen && !sent && (
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-2 max-w-sm text-left animate-[otherGiftFadeIn_400ms_ease-out_both]"
        >
          <label
            htmlFor={`${formId}-name`}
            className="block font-body text-xs uppercase tracking-widest2 text-ink/70"
          >
            Seu nome
          </label>
          <input
            ref={nameRef}
            id={`${formId}-name`}
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="Como devemos te chamar?"
            autoComplete="name"
            maxLength={80}
            className={[
              "mt-2 w-full rounded-xl border bg-white px-4 py-3",
              "font-body text-ink outline-none",
              "transition-all duration-300",
              "focus:border-gold focus:ring-2 focus:ring-gold/20",
              "border-sand",
            ].join(" ")}
          />

          <label
            htmlFor={`${formId}-description`}
            className="mt-4 block font-body text-xs uppercase tracking-widest2 text-ink/70"
          >
            O que você gostaria de dar
          </label>
          <textarea
            id={`${formId}-description`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex.: Jogo de copos, air fryer, conjunto de toalhas…"
            rows={3}
            maxLength={280}
            className={[
              "mt-2 w-full resize-none rounded-xl border bg-white px-4 py-3",
              "font-body text-ink outline-none",
              "transition-all duration-300",
              "focus:border-gold focus:ring-2 focus:ring-gold/20",
              "border-sand",
            ].join(" ")}
          />

          <p className="mt-1.5 text-right font-body text-[10px] text-ink/40">
            {description.length}/280
          </p>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:gap-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className={[
                "order-2 flex-1 rounded-full border border-sand py-3",
                "font-body text-sm text-ink/70",
                "transition-all duration-300",
                "hover:border-ink/40 hover:bg-sand/30 hover:text-ink",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60",
                "sm:order-1",
              ].join(" ")}
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={!canSubmit}
              className={[
                "group order-1 flex flex-1 items-center justify-center gap-2",
                "rounded-full bg-[#25D366] py-3",
                "font-body text-sm text-white",
                "transition-all duration-300",
                "hover:bg-[#1ebe5d] hover:shadow-[0_10px_30px_-10px_rgba(37,211,102,0.7)]",
                "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/60 focus-visible:ring-offset-2",
                "sm:order-2",
              ].join(" ")}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
              Enviar pelo WhatsApp
            </button>
          </div>
        </form>
      )}

      {/* ================= ENVIADO ================= */}
      {sent && (
        <div className="animate-[otherGiftFadeIn_400ms_ease-out_both] py-2">
          <p className="font-display text-lg italic text-charcoal">
            Que gesto lindo, {guestName.trim() || "obrigado"}! 💛
          </p>
          <p className="mt-2 font-body text-sm text-ink/70">
            O WhatsApp foi aberto em outra aba. É só enviar a mensagem para
            confirmarmos sua sugestão.
          </p>
          <button
            type="button"
            onClick={() => {
              setSent(false);
              setIsOpen(false);
              setGuestName("");
              setDescription("");
            }}
            className={[
              "mt-5 rounded-full border border-sand px-6 py-2.5",
              "font-body text-sm text-ink/70",
              "transition-all duration-300",
              "hover:border-ink/40 hover:bg-sand/30 hover:text-ink",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60",
            ].join(" ")}
          >
            Fechar
          </button>
        </div>
      )}

      <style>{`
        @keyframes otherGiftFadeIn {
          0%   { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [class*="otherGiftFadeIn"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
