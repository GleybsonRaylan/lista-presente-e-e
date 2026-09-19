/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      /* ============================================================
         CORES — paleta principal + variações de apoio
         ============================================================ */
      colors: {
        // Base (mantidas)
        ivory: "#FBF7F0",
        linen: "#F3ECE1",
        sand: "#E4D8C4",
        clay: "#B79A6B",
        gold: "#9C7B3F",
        charcoal: "#2E2A26",
        ink: "#3F3A34",
        blush: "#E7D3CE",

        // Variações tonais (úteis para hover / estados)
        gold: {
          DEFAULT: "#9C7B3F",
          light: "#B79A6B", // = clay (alias semântico)
          dark: "#7A5F2E", // hover em botões gold
          soft: "#D9C29A", // bordas sutis / brilhos
        },
        blush: {
          DEFAULT: "#E7D3CE",
          soft: "#F0E1DC", // fundos delicados
          deep: "#D4B8B1", // hover
        },
        sand: {
          DEFAULT: "#E4D8C4",
          soft: "#EFE6D6", // fundos de card
          deep: "#D3C4A8", // hover / bordas
        },
        charcoal: {
          DEFAULT: "#2E2A26",
          soft: "#3F3A34", // = ink (alias semântico)
          mute: "#5A544C", // textos secundários
        },
      },

      /* ============================================================
         TIPOGRAFIA — famílias + tamanhos extras
         ============================================================ */
      fontFamily: {
        display: ['"Cormorant Garamond"', "serif"],
        body: ['"Jost"', "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }], // 10px
        "3xs": ["0.5625rem", { lineHeight: "0.875rem" }], // 9px
      },

      /* ============================================================
         LETTER SPACING
         ============================================================ */
      letterSpacing: {
        widest2: "0.28em",
        widest3: "0.38em", // uso em títulos muito espaçados
      },

      /* ============================================================
         SOMBRAS — em camadas, para dar profundidade sem pesar
         ============================================================ */
      boxShadow: {
        soft: "0 12px 32px -16px rgba(46, 42, 38, 0.25)",
        card: "0 8px 24px -14px rgba(46, 42, 38, 0.18), 0 2px 6px -3px rgba(46, 42, 38, 0.08)",
        lift: "0 18px 40px -18px rgba(46, 42, 38, 0.35)",
        glow: "0 0 30px -5px rgba(255, 255, 255, 0.35)",
        "gold-glow": "0 10px 30px -10px rgba(156, 123, 63, 0.55)",
        "inset-soft":
          "inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(46, 42, 38, 0.04)",
      },

      /* ============================================================
         BORDER RADIUS
         ============================================================ */
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },

      /* ============================================================
         ANIMAÇÕES NOMEADAS — reaproveitáveis em qualquer componente
         ============================================================ */
      keyframes: {
        // Respiração do brilho de fundo (Hero)
        breathe: {
          "0%, 100%": {
            opacity: "0.4",
            transform: "translateX(-50%) scale(1)",
          },
          "50%": { opacity: "0.75", transform: "translateX(-50%) scale(1.08)" },
        },
        // Fade-in suave de baixo para cima
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Fade simples
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        // Shimmer dos skeletons
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        // Batida de coração (estado "é hoje")
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "15%": { transform: "scale(1.12)" },
          "30%": { transform: "scale(1)" },
          "45%": { transform: "scale(1.08)" },
        },
        // Brilho deslizante que atravessa cards no hover
        shine: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        breathe: "breathe 8s ease-in-out infinite",
        "fade-up": "fadeUp 700ms ease-out both",
        "fade-in": "fadeIn 700ms ease-out both",
        shimmer: "shimmer 1.8s ease-in-out infinite",
        heartbeat: "heartbeat 1.8s ease-in-out infinite",
        shine: "shine 1.4s ease-out",
      },

      /* ============================================================
         TRANSIÇÕES
         ============================================================ */
      transitionDuration: {
        2000: "2000ms",
        3000: "3000ms",
        8000: "8000ms",
      },
      transitionTimingFunction: {
        "out-soft": "cubic-bezier(0.22, 1, 0.36, 1)",
      },

      /* ============================================================
         SPACING extras
         ============================================================ */
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
      },

      /* ============================================================
         BACKGROUND IMAGES — gradientes reutilizáveis
         ============================================================ */
      backgroundImage: {
        "radial-soft":
          "radial-gradient(circle at 30% 20%, #F5EFE4 0%, #EFE6D6 55%, #E7DBC5 100%)",
        "radial-gold":
          "radial-gradient(circle at 50% 0%, rgba(156,123,63,0.15) 0%, transparent 70%)",
        "divider-fade-x":
          "linear-gradient(to right, transparent, rgba(228,216,196,0.7), transparent)",
      },

      /* ============================================================
         Z-INDEX
         ============================================================ */
      zIndex: {
        60: "60",
        70: "70",
        80: "80",
      },
    },
  },
  plugins: [],
};
