-- =========================================================================
-- Seed: lista completa de presentes
-- =========================================================================
-- Todos os 36 itens da lista original, na mesma ordem, com a quantidade
-- correta (itens sem número entre parênteses recebem quantity = 1).
-- Rode isto SOMENTE UMA VEZ (ou apague as linhas de public.gifts antes de
-- rodar de novo, ou troque para "insert ... on conflict do nothing" com
-- uma constraint única em name, se preferir reexecutar com segurança).
-- image_url fica NULL propositalmente: o frontend mostra um placeholder
-- elegante enquanto as fotos reais não são cadastradas. Basta rodar um
-- UPDATE public.gifts SET image_url = '...' WHERE name = '...' depois.
-- =========================================================================

insert into public.gifts (name, image_url, quantity) values
  ('Mix (preto)', null, 1),
  ('Aparelho de jantar', null, 2),
  ('Jogo de panelas (antiaderente, preto)', null, 1),
  ('Micro-ondas (preto)', null, 1),
  ('Conjunto de frigideiras (antiaderente, preto)', null, 1),
  ('Faqueiro', null, 1),
  ('Jogo de facas inox', null, 1),
  ('Conjunto de travessas de vidro com tampas', null, 1),
  ('Cafeteira (preto)', null, 1),
  ('Conjunto de sobremesa – 13 peças', null, 1),
  ('Conjunto de taça e jarra transparente', null, 1),
  ('Kit de cama casal – 4 peças', null, 5),
  ('Kit de toalhas', null, 5),
  ('Ferro de passar', null, 1),
  ('[Item não identificado na foto]', null, 1),
  ('Cobreleito – 3 peças', null, 5),
  ('Ventilador (preto)', null, 1),
  ('Air Fryer', null, 1),
  ('Manta para sofá – medida 1,80 m', null, 1),
  ('Conjunto de almofadas (cor neutra)', null, 1),
  ('Jogos herméticos de vidro', null, 1),
  ('Jogo de xícaras – 12 peças', null, 1),
  ('Kit de sopeira', null, 1),
  ('Aspirador de pó (preto)', null, 1),
  ('Conjunto de prato fundo – 12 peças transparente', null, 1),
  ('Cobertor (Queen)', null, 1),
  ('[Item riscado na lista original]', null, 1),
  ('Kit para banheiro – recipientes', null, 1),
  ('Kit saladeira em vidro ou inox', null, 1),
  ('Torradeira de pão elétrica (preto)', null, 1),
  ('Aparador de fotos (p/ sala, cor neutra)', null, 1),
  ('Kit peneira + amoladores p/ cama casal', null, 4),
  ('Porta-temperos giratório', null, 1),
  ('Panela de pressão (preta)', null, 1),
  ('Conjunto de prato raso transparente', null, 1),
  ('Travesseiros', null, 1);
