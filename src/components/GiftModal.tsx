import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import type { Gift, SelectGiftResult } from "../types/gift";
import { supabase } from "../lib/supabase";
import { buildGiftMessage, buildWhatsAppUrl } from "../lib/whatsapp";

interface GiftModalProps {
  gift: Gift;
  onClose: () => void;
  onGiftReserved: (giftId: string, remaining: number) => void;
}

type Status = "idle" | "submitting" | "success" | "taken" | "error";

export default function GiftModal({
  gift,
  onClose,
  onGiftReserved,
}: GiftModalProps) {
  const [guestName, setGuestName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [visible, setVisible] = useState(false); // animação de entrada

  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  /* ---------- Animação de entrada ---------- */
  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  /* ---------- Fechar com animação ---------- */
  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 260); // aguarda o fade-out
  }, [onClose]);

  /* ---------- ESC para fechar ---------- */
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") handleClose();
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleClose]);

  /* ---------- Bloquear scroll do body ---------- */
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  /* ---------- Foco inicial ---------- */
  useEffect(() => {
    // Pequeno delay para a animação começar antes de focar
    const t = setTimeout(() => inputRef.current?.focus(), 120);
    return () => clearTimeout(t);
  }, []);

  /* ---------- Focus trap simples ---------- */
  useEffect(() => {
    function handleTab(event: KeyboardEvent) {
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, []);

  /* ---------- Confirmar ---------- */
  async function handleConfirm(event: FormEvent) {
    event.preventDefault();

    const trimmedName = guestName.trim();
    if (!trimmedName) {
      setFeedback("Por favor, digite seu nome para continuar.");
      inputRef.current?.focus();
      return;
    }

    setStatus("submitting");
    setFeedback(null);

    const { data, error } = await supabase.rpc("select_gift", {
      p_gift_id: gift.id,
      p_guest_name: trimmedName,
    });

    if (error) {
      setStatus("error");
      setFeedback(
        "Algo deu errado ao registrar sua escolha. Tente novamente em instantes.",
      );
      return;
    }

    const result = (Array.isArray(data) ? data[0] : data) as
      | SelectGiftResult
      | undefined;

    if (!result?.success) {
      setStatus("taken");
      setFeedback(result?.message ?? "❤️ Este presente já foi escolhido!");
      return;
    }

    onGiftReserved(gift.id, result.remaining);
    setStatus("success");
    setFeedback(result.message);
  }

  const whatsappUrl = buildWhatsAppUrl(
    buildGiftMessage(guestName.trim() || "um convidado", gift.name),
  );

  const isForm =
    status === "idle" || status === "submitting" || status === "error";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="gift-modal-title"
      onClick={handleClose}
      className={[
        "fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4",
        "transition-all duration-300 ease-out",
        visible ? "opacity-100" : "opacity-0",
      ].join(" ")}
      style={{
        backgroundColor: visible
          ? "rgba(30, 26, 22, 0.55)"
          : "rgba(30, 26, 22, 0)",
        backdropFilter: visible ? "blur(4px)" : "blur(0px)",
      }}
    >
      <div
        ref={dialogRef}
        onClick={(event) => event.stopPropagation()}
        className={[
          "relative w-full max-w-md overflow-hidden",
          "rounded-t-3xl bg-ivory shadow-[0_-10px_60px_-15px_rgba(0,0,0,0.5)]",
          "sm:rounded-3xl sm:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)]",
          "px-6 py-7 sm:px-8 sm:py-8",
          "transition-all duration-300 ease-out",
          visible
            ? "translate-y-0 opacity-100 sm:scale-100"
            : "translate-y-6 opacity-0 sm:translate-y-0 sm:scale-95",
        ].join(" ")}
      >
        {/* Barra de arrasto (visual mobile) */}
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-sand/70 sm:hidden" />

        {/* Botão fechar (X) */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Fechar"
          className={[
            "absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full",
            "text-ink/50 transition-all duration-300",
            "hover:bg-sand/40 hover:text-ink/80",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60",
          ].join(" ")}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 1L13 13M13 1L1 13"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* ================= FORM ================= */}
        {isForm && (
          <form onSubmit={handleConfirm}>
            {/* Ícone do presente */}
            <div className="mb-4 flex justify-center">
              <span
                aria-hidden="true"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 text-2xl"
              >
                🎁
              </span>
            </div>

            <h2
              id="gift-modal-title"
              className="text-center font-display text-2xl italic text-charcoal sm:text-3xl"
            >
              {gift.name}
            </h2>

            <p className="mt-2 text-center font-body text-sm leading-relaxed text-ink/60">
              Deixe seu nome para que saibamos quem escolheu este presente. 💛
            </p>

            {/* Divisor */}
            <div className="my-6 flex items-center justify-center gap-2 text-[10px] text-ink/30">
              <span className="h-px w-10 bg-ink/20" />
              ✦
              <span className="h-px w-10 bg-ink/20" />
            </div>

            <label
              htmlFor="guest-name"
              className="block font-body text-xs uppercase tracking-widest2 text-ink/70"
            >
              Seu nome
            </label>
            <input
              ref={inputRef}
              id="guest-name"
              type="text"
              value={guestName}
              onChange={(event) => {
                setGuestName(event.target.value);
                if (feedback) setFeedback(null);
              }}
              placeholder="Como devemos te chamar?"
              autoComplete="name"
              maxLength={80}
              disabled={status === "submitting"}
              aria-invalid={!!feedback && !guestName.trim()}
              aria-describedby={feedback ? "gift-modal-feedback" : undefined}
              className={[
                "mt-2 w-full rounded-xl border bg-white px-4 py-3",
                "font-body text-ink outline-none",
                "transition-all duration-300",
                "focus:border-gold focus:ring-2 focus:ring-gold/20",
                "disabled:opacity-60",
                feedback && !guestName.trim()
                  ? "border-red-300/70"
                  : "border-sand",
              ].join(" ")}
            />

            {/* Feedback */}
            {feedback && (
              <p
                id="gift-modal-feedback"
                role="alert"
                className={[
                  "mt-3 flex items-start gap-2 rounded-xl px-3 py-2",
                  "font-body text-xs leading-relaxed",
                  status === "error" || (!guestName.trim() && !status)
                    ? "bg-red-50 text-red-700/90"
                    : "bg-sand/40 text-ink/80",
                ].join(" ")}
              >
                <span aria-hidden="true">⚠️</span>
                <span>{feedback}</span>
              </p>
            )}

            {/* Botões */}
            <div className="mt-7 flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                disabled={status === "submitting"}
                className={[
                  "flex-1 rounded-full border border-sand py-3",
                  "font-body text-sm text-ink/70",
                  "transition-all duration-300",
                  "hover:border-ink/40 hover:bg-sand/30 hover:text-ink",
                  "disabled:opacity-50",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60",
                ].join(" ")}
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={status === "submitting"}
                className={[
                  "group relative flex-1 overflow-hidden rounded-full",
                  "bg-gold py-3 font-body text-sm text-ivory",
                  "transition-all duration-300",
                  "hover:bg-gold/90 hover:shadow-[0_10px_30px_-10px_rgba(200,160,80,0.6)]",
                  "disabled:opacity-70 disabled:hover:shadow-none",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2",
                ].join(" ")}
              >
                <span className="inline-flex items-center justify-center gap-2">
                  {status === "submitting" ? (
                    <>
                      {/* Spinner sutil */}
                      <span
                        aria-hidden="true"
                        className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-ivory/40 border-t-ivory"
                      />
                      Confirmando…
                    </>
                  ) : (
                    <>
                      Confirmar escolha
                      <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                        →
                      </span>
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>
        )}

        {/* ================= SUCESSO ================= */}
        {status === "success" && (
          <div className="text-center">
            <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
              {/* Brilho ao redor */}
              <span className="absolute inset-0 rounded-full bg-gold/20 blur-xl" />
              <span className="relative text-4xl">🎁</span>
            </div>

            <h2 className="mt-5 font-display text-2xl italic text-charcoal sm:text-3xl">
              Presente reservado!
            </h2>

            <p className="mt-3 font-body text-sm leading-relaxed text-ink/70">
              Obrigado, <span className="text-ink">{guestName.trim()}</span>!
              Você escolheu{" "}
              <span className="italic text-gold">{gift.name}</span> com muito
              carinho. 💛
            </p>

            <div className="my-6 flex items-center justify-center gap-2 text-[10px] text-ink/30">
              <span className="h-px w-10 bg-ink/20" />
              ✦
              <span className="h-px w-10 bg-ink/20" />
            </div>

            <p className="font-body text-xs uppercase tracking-widest2 text-ink/50">
              Envie o aviso à noiva
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={[
                "group mt-3 flex items-center justify-center gap-2",
                "rounded-full bg-[#25D366] py-3",
                "font-body text-sm text-white",
                "transition-all duration-300",
                "hover:bg-[#1ebe5d] hover:shadow-[0_10px_30px_-10px_rgba(37,211,102,0.7)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/60 focus-visible:ring-offset-2",
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
            </a>

            <button
              type="button"
              onClick={handleClose}
              className={[
                "mt-3 w-full rounded-full border border-sand py-3",
                "font-body text-sm text-ink/70",
                "transition-all duration-300",
                "hover:border-ink/40 hover:bg-sand/30 hover:text-ink",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60",
              ].join(" ")}
            >
              Ver outros presentes
            </button>
          </div>
        )}

        {/* ================= TAKEN ================= */}
        {status === "taken" && (
          <div className="text-center">
            <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-red-200/40 blur-xl" />
              <span className="relative text-4xl">❤️</span>
            </div>

            <h2 className="mt-5 font-display text-2xl italic text-charcoal sm:text-3xl">
              Já foi escolhido
            </h2>

            <p className="mt-3 font-body text-sm leading-relaxed text-ink/70">
              {feedback ??
                "Este presente já foi escolhido por outro convidado, mas ainda há muitas opções esperando por você. 💛"}
            </p>

            <div className="my-6 flex items-center justify-center gap-2 text-[10px] text-ink/30">
              <span className="h-px w-10 bg-ink/20" />
              ✦
              <span className="h-px w-10 bg-ink/20" />
            </div>

            <button
              type="button"
              onClick={handleClose}
              className={[
                "w-full rounded-full bg-gold py-3",
                "font-body text-sm text-ivory",
                "transition-all duration-300",
                "hover:bg-gold/90 hover:shadow-[0_10px_30px_-10px_rgba(200,160,80,0.6)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2",
              ].join(" ")}
            >
              Ver outros presentes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
