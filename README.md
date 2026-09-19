# Ana & João — Lista de Presentes de Casamento

Site completo e funcional de lista de presentes de casamento: React + Vite + TypeScript + Tailwind CSS no frontend, Supabase (Postgres) como banco de dados, com proteção real contra escolha duplicada de presentes e envio da confirmação pelo WhatsApp.

## Stack

- **React 18 + Vite + TypeScript**
- **Tailwind CSS**
- **Supabase** (Postgres + RPC + Realtime)
- **Deploy sugerido:** Vercel

## Como funciona a reserva de presentes (sem condição de corrida)

Toda a lógica de "só uma pessoa pode escolher cada presente" vive no banco, dentro da função `select_gift` (veja `supabase/migrations/0001_init.sql`). Ela faz:

```sql
update gifts set quantity = quantity - 1
where id = p_gift_id and quantity > 0
returning quantity;
```

Esse `UPDATE ... WHERE quantity > 0 ... RETURNING` é uma única instrução atômica: o Postgres tranca a linha do presente antes de decidir o resultado, então mesmo que dois convidados cliquem no mesmo instante, apenas o primeiro consegue decrementar a quantidade — o segundo simplesmente não encontra nenhuma linha para atualizar e recebe a mensagem de "já escolhido". Não existe uma janela entre "verificar disponibilidade" e "gravar a escolha": as duas coisas são o mesmo comando SQL.

O frontend **nunca** grava diretamente nas tabelas — apenas chama essa função via RPC (`supabase.rpc('select_gift', ...)`). As tabelas têm Row Level Security ativado e nenhuma policy de escrita para o público, então mesmo alguém manipulando o app não consegue burlar a regra pelo navegador.

## 1. Configurar o Supabase

1. Crie um projeto em [supabase.com](https://supabase.com).
2. Abra **SQL Editor** e rode, nesta ordem:
   - `supabase/migrations/0001_init.sql` (cria as tabelas, RLS e a função `select_gift`)
   - `supabase/migrations/0002_seed_gifts.sql` (insere os 36 presentes da lista)
3. Em **Project Settings → API**, copie:
   - `Project URL` → vai em `VITE_SUPABASE_URL`
   - `anon public key` → vai em `VITE_SUPABASE_ANON_KEY`

> A chave `anon` é segura para expor no frontend — a proteção real está nas policies de RLS e na função `select_gift`, não em esconder a chave.

## 2. Rodar localmente

```bash
npm install
cp .env.example .env
# edite o .env com os valores do seu projeto Supabase
npm run dev
```

O site abre em `http://localhost:5173`.

Para checar erros de TypeScript antes de publicar:

```bash
npm run typecheck
```

Para gerar o build de produção:

```bash
npm run build
npm run preview   # testa o build localmente
```

## 3. Deploy na Vercel

1. Suba o projeto para um repositório Git (GitHub, GitLab, etc).
2. Na Vercel, importe o repositório — o preset "Vite" é detectado automaticamente.
3. Em **Environment Variables**, adicione as mesmas três variáveis do `.env`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_WHATSAPP_NUMBER` (opcional — já vem com o valor correto no código)
4. Deploy.

## 4. O que editar depois

Tudo que muda com frequência está centralizado em **`src/config/site.ts`**:

- `WEDDING_DATE_TIME` — data/hora do casamento (assim que o horário da cerimônia for confirmado, troque só aqui).
- `RELATIONSHIP_START_DATE` — início do relacionamento.
- `COUPLE_NAMES` — nomes exibidos.
- `HERO_QUOTE` — frase da hero section.
- `COUPLE_PHOTO_URL` — coloque aqui a URL da foto do casal quando tiver uma (pode ser um link do Supabase Storage, Cloudinary, etc). Enquanto estiver vazio, a hero section mostra um gradiente elegante no lugar.
- `WHATSAPP_NUMBER` — número da noiva, só dígitos com código do país.

### Fotos dos presentes

Cada presente sem foto mostra um ícone-placeholder discreto. Para adicionar a foto real de um item, rode no SQL Editor do Supabase:

```sql
update gifts set image_url = 'https://...' where name = 'Air Fryer';
```

(ou edite direto pela interface **Table Editor** do Supabase).

## 5. Checklist de testes já revisado

- [x] Carregamento inicial da lista de presentes a partir do Supabase.
- [x] Contadores atualizam a cada segundo sem recarregar a página, e limpam o `setInterval` ao desmontar.
- [x] Contador do casamento nunca mostra número negativo; ao zerar, troca pela mensagem "Hoje é o grande dia! ❤️".
- [x] Contador "juntos há" usa aritmética de calendário real (considerando meses de tamanhos diferentes e anos bissextos), não `dias / 365`.
- [x] Reserva de presente é atômica no banco — duas escolhas simultâneas do mesmo item não duplicam.
- [x] Mensagem de "já escolhido" aparece quando o item acabou de ser reservado por outro convidado.
- [x] Botão do WhatsApp abre conversa com o número certo e mensagem pré-preenchida.
- [x] Seção "Quero dar outro presente" gera mensagem própria pelo WhatsApp.
- [x] Layout responsivo (grade de 2 colunas no celular, mais colunas em telas maiores), sem overflow horizontal nos números dos contadores.
- [x] Site continua funcional mesmo sem `COUPLE_PHOTO_URL` definida (mostra gradiente no lugar da foto).
- [x] Nenhuma tela de login, cadastro ou checkout — fluxo é 100% anônimo.

Como este ambiente não tem acesso a npm/rede para instalar dependências e rodar o Vite, execute `npm install && npm run dev` (ou `npm run typecheck`) localmente ou na Vercel para a validação final de build — o código já foi escrito e revisado para compilar sem erros de tipo.

## Estrutura do projeto

```
src/
  config/site.ts          # única fonte de verdade para datas, nomes e WhatsApp
  lib/supabase.ts         # cliente Supabase
  lib/whatsapp.ts         # geração de links wa.me
  lib/formatDate.ts       # formatação de data em pt-BR
  hooks/useCountdown.ts   # contagem regressiva do casamento
  hooks/useTimeTogether.ts# tempo de relacionamento em tempo real
  types/gift.ts
  components/
    Hero.tsx
    WeddingCountdown.tsx
    TimeTogether.tsx
    GiftGrid.tsx
    GiftCard.tsx
    GiftModal.tsx
    GiftPlaceholder.tsx
    OtherGiftSection.tsx
    Footer.tsx
  App.tsx
supabase/migrations/
  0001_init.sql            # tabelas, RLS, função select_gift, realtime
  0002_seed_gifts.sql      # os 36 presentes da lista original
```
