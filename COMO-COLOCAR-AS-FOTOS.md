# COMO COLOCAR AS FOTOS DOS PRESENTES

Agora o site está preparado para buscar automaticamente a foto de cada presente.

## Onde colocar

Coloque todas as fotos nesta pasta:

`public/images/gifts/`

Você **não precisa alterar o banco de dados** e não precisa editar o código para colocar uma foto.

## Como nomear

O nome do arquivo deve corresponder ao nome do presente. O sistema ignora acentos, transforma espaços em `-` e procura automaticamente `.jpg`, `.jpeg`, `.png` ou `.webp`.

### Lista completa

1. Mix (preto)
   `mix-preto.jpg`

2. Aparelho de jantar (2)
   `aparelho-de-jantar-2.jpg`

3. Jogo de panelas (antiaderente, preto)
   `jogo-de-panelas-antiaderente-preto.jpg`

4. Micro-ondas (preto)
   `micro-ondas-preto.jpg`

5. Conjunto de frigideiras (antiaderente, preto)
   `conjunto-de-frigideiras-antiaderente-preto.jpg`

6. Faqueiro
   `faqueiro.jpg`

7. Jogo de facas inox
   `jogo-de-facas-inox.jpg`

8. Conjunto de travessas de vidro com tampas
   `conjunto-de-travessas-de-vidro-com-tampas.jpg`

9. Cafeteira (preto)
   `cafeteira-preto.jpg`

10. Conjunto de sobremesa – 13 peças
    `conjunto-de-sobremesa-13-pecas.jpg`

11. Conjunto de taça e jarra transparente
    `conjunto-de-taca-e-jarra-transparente.jpg`

12. Kit de cama casal – 4 peças (5)
    `kit-de-cama-casal-4-pecas-5.jpg`

13. Kit de toalhas (5)
    `kit-de-toalhas-5.jpg`

14. Ferro de passar
    `ferro-de-passar.jpg`

15. [Item não identificado na foto]
    `item-nao-identificado-na-foto.jpg`

16. Cobreleito – 3 peças (5)
    `cobreleito-3-pecas-5.jpg`

17. Ventilador (preto)
    `ventilador-preto.jpg`

18. Air Fryer
    `air-fryer.jpg`

19. Manta para sofá – medida 1,80 m
    `manta-para-sofa-medida-1-80-m.jpg`

20. Conjunto de almofadas (cor neutra)
    `conjunto-de-almofadas-cor-neutra.jpg`

21. Jogos herméticos de vidro
    `jogos-hermeticos-de-vidro.jpg`

22. Jogo de xícaras – 12 peças
    `jogo-de-xicaras-12-pecas.jpg`

23. Kit de sopeira
    `kit-de-sopeira.jpg`

24. Aspirador de pó (preto)
    `aspirador-de-po-preto.jpg`

25. Conjunto de prato fundo – 12 peças transparente
    `conjunto-de-prato-fundo-12-pecas-transparente.jpg`

26. Cobertor (Queen)
    `cobertor-queen.jpg`

27. [Item riscado na lista original]
    `item-riscado-na-lista-original.jpg`

28. Kit para banheiro – recipientes
    `kit-para-banheiro-recipientes.jpg`

29. Kit saladeira em vidro ou inox
    `kit-saladeira-em-vidro-ou-inox.jpg`

30. Torradeira de pão elétrica (preto)
    `torradeira-de-pao-eletrica-preto.jpg`

31. Aparador de fotos (p/ sala, cor neutra)
    `aparador-de-fotos-p-sala-cor-neutra.jpg`

32. Kit peneira + amoladores p/ cama casal (4 peças)
    `kit-peneira-amoladores-p-cama-casal-4-pecas.jpg`

33. Porta-temperos giratório
    `porta-temperos-giratorio.jpg`

34. Panela de pressão (preta)
    `panela-de-pressao-preta.jpg`

35. Conjunto de prato raso transparente
    `conjunto-de-prato-raso-transparente.jpg`

36. Travesseiros
    `travesseiros.jpg`

## Posso usar PNG?

Sim. Por exemplo:

`air-fryer.png`

O sistema procura automaticamente JPG, JPEG, PNG e WEBP.

## Importante sobre a foto do casal

A foto do casal é diferente das fotos dos presentes e continua sendo configurada no arquivo:

`src/config/site.ts`

A configuração `COUPLE_PHOTO_URL` pode receber a imagem do casal conforme a estrutura original do projeto.

## Como testar

Depois de colocar uma foto, salve o arquivo e atualize o site no navegador.

Se o nome estiver correto, a foto aparecerá automaticamente no card do presente.

Se você ainda não colocou uma foto para determinado presente, o card continuará funcionando e mostrará o espaço reservado original.
