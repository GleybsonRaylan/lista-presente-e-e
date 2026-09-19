/**
 * Lista de referência dos presentes cadastrados no Supabase (ver
 * supabase/migrations/0002_seed_gifts.sql). Este arquivo NÃO é usado
 * para buscar os presentes em produção — a fonte de verdade é o banco
 * de dados — mas serve de documentação e para manter os dois em sincronia
 * caso a lista precise ser recriada.
 */
export const GIFT_NAMES: Array<{ name: string; quantity: number }> = [
  { name: 'Mix (preto)', quantity: 1 },
  { name: 'Aparelho de jantar', quantity: 2 },
  { name: 'Jogo de panelas (antiaderente, preto)', quantity: 1 },
  { name: 'Micro-ondas (preto)', quantity: 1 },
  { name: 'Conjunto de frigideiras (antiaderente, preto)', quantity: 1 },
  { name: 'Faqueiro', quantity: 1 },
  { name: 'Jogo de facas inox', quantity: 1 },
  { name: 'Conjunto de travessas de vidro com tampas', quantity: 1 },
  { name: 'Cafeteira (preto)', quantity: 1 },
  { name: 'Conjunto de sobremesa – 13 peças', quantity: 1 },
  { name: 'Conjunto de taça e jarra transparente', quantity: 1 },
  { name: 'Kit de cama casal – 4 peças', quantity: 5 },
  { name: 'Kit de toalhas', quantity: 5 },
  { name: 'Ferro de passar', quantity: 1 },
  { name: '[Item não identificado na foto]', quantity: 1 },
  { name: 'Cobreleito – 3 peças', quantity: 5 },
  { name: 'Ventilador (preto)', quantity: 1 },
  { name: 'Air Fryer', quantity: 1 },
  { name: 'Manta para sofá – medida 1,80 m', quantity: 1 },
  { name: 'Conjunto de almofadas (cor neutra)', quantity: 1 },
  { name: 'Jogos herméticos de vidro', quantity: 1 },
  { name: 'Jogo de xícaras – 12 peças', quantity: 1 },
  { name: 'Kit de sopeira', quantity: 1 },
  { name: 'Aspirador de pó (preto)', quantity: 1 },
  { name: 'Conjunto de prato fundo – 12 peças transparente', quantity: 1 },
  { name: 'Cobertor (Queen)', quantity: 1 },
  { name: '[Item riscado na lista original]', quantity: 1 },
  { name: 'Kit para banheiro – recipientes', quantity: 1 },
  { name: 'Kit saladeira em vidro ou inox', quantity: 1 },
  { name: 'Torradeira de pão elétrica (preto)', quantity: 1 },
  { name: 'Aparador de fotos (p/ sala, cor neutra)', quantity: 1 },
  { name: 'Kit peneira + amoladores p/ cama casal', quantity: 4 },
  { name: 'Porta-temperos giratório', quantity: 1 },
  { name: 'Panela de pressão (preta)', quantity: 1 },
  { name: 'Conjunto de prato raso transparente', quantity: 1 },
  { name: 'Travesseiros', quantity: 1 },
];
