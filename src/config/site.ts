/**
 * CONFIGURAÇÃO CENTRAL DO SITE
 * ----------------------------
 * Este é o único arquivo que você deve editar para alterar datas,
 * nomes ou o número de WhatsApp. Nenhum outro componente guarda
 * essas informações "espalhadas" pelo código.
 */

/**
 * Data e hora do casamento.
 *
 * Formato ISO 8601 com o offset fixo de Brasília (-03:00), para que o
 * contador NUNCA dependa do fuso horário do navegador do visitante.
 * O Brasil não usa mais horário de verão (abolido em 2019), então
 * -03:00 é o offset correto para São Paulo/Recife/Brasília o ano todo.
 */
export const WEDDING_DATE_TIME = "2026-11-28T19:00:00-03:00";

/** Data em que o relacionamento começou (mesmo padrão de fuso acima). */
export const RELATIONSHIP_START_DATE = "2025-01-27T00:00:00-03:00";

/** Nomes exibidos no site. */
export const COUPLE_NAMES = {
  bride: "Evaniele Larissa",
  groom: "Emerson Herculano",
};

/** Frase de destaque na hero section. */
export const HERO_QUOTE = "Sua presença já é o nosso maior presente.";

/**
 * Número de WhatsApp da noiva, já no formato internacional usado pelo
 * WhatsApp (somente dígitos, com código do país 55): 55 81 99692-8665.
 *
 * Pode ser sobrescrito pela variável de ambiente VITE_WHATSAPP_NUMBER
 * (veja .env.example), mas já vem preenchido com o valor correto para
 * que o projeto funcione mesmo sem configuração adicional.
 */
export const WHATSAPP_NUMBER =
  (import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined)?.trim() ||
  "5581996928665";

/** URL de uma imagem do casal para a hero section (pode ficar vazio). */
export const COUPLE_PHOTO_URL = "";
