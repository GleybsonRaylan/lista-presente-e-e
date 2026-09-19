/**
 * Resolve automaticamente a foto de um presente.
 *
 * Coloque as imagens em:
 *   public/images/gifts/
 *
 * Exemplos:
 *   Air Fryer       -> /images/gifts/air-fryer.jpg
 *   Cafeteira       -> /images/gifts/cafeteira.jpg
 *   Travesseiros    -> /images/gifts/travesseiros.jpg
 *
 * O código tenta JPG, JPEG, PNG e WEBP.
 */
export function normalizeGiftImageName(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " e ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getGiftImageCandidates(name: string): string[] {
  const base = normalizeGiftImageName(name);
  return [
    `/images/gifts/${base}.jpg`,
    `/images/gifts/${base}.jpeg`,
    `/images/gifts/${base}.png`,
    `/images/gifts/${base}.webp`,
  ];
}

/**
 * Use esta função como fallback quando uma imagem não estiver disponível.
 * O navegador tenta cada extensão em sequência através de GiftImage.
 */
export function getGiftImageBase(name: string): string {
  return `/images/gifts/${normalizeGiftImageName(name)}`;
}
