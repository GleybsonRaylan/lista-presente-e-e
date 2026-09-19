import { WHATSAPP_NUMBER } from '../config/site';

/**
 * Monta a URL do WhatsApp com o número da noiva e uma mensagem
 * pré-preenchida. O número já deve estar só com dígitos (ex: 5581996928665).
 * A mensagem é URL-encoded, então acentos e emojis funcionam normalmente.
 */
export function buildWhatsAppUrl(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

export function buildGiftMessage(guestName: string, giftName: string): string {
  // Evitamos concordância de artigo (um/uma), que varia com o gênero
  // do presente, usando dois-pontos — mantém a mensagem natural para
  // qualquer item da lista.
  return `Olá! Sou ${guestName} 😊\n\nEscolhi presentear vocês com:\n${giftName} ❤️\n\nParabéns pelo casamento! 💍❤️`;
}

export function buildOtherGiftMessage(guestName: string, description: string): string {
  return `Olá! Sou ${guestName} 😊\n\nGostaria de presentear vocês com:\n${description}\n\n❤️ Parabéns pelo casamento!`;
}
