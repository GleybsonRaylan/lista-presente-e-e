/** Formata uma data ISO como "27 de janeiro de 2025", no padrão brasileiro. */
export function formatLongDatePtBr(isoDate: string): string {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Sao_Paulo',
  }).format(date);
}
