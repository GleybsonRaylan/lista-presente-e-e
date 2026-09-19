-- =========================================================================
-- Lista de presentes de casamento — schema inicial
-- =========================================================================
-- Execute este arquivo no SQL Editor do Supabase (ou via `supabase db push`
-- se estiver usando a Supabase CLI). Depois execute 0002_seed_gifts.sql.
-- =========================================================================

create extension if not exists "pgcrypto";

-- -------------------------------------------------------------------------
-- Tabela: gifts
-- -------------------------------------------------------------------------
create table if not exists public.gifts (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  image_url   text,
  quantity    integer not null default 1 check (quantity >= 0),
  created_at  timestamptz not null default now()
);

comment on table public.gifts is 'Presentes disponíveis na lista de casamento.';
comment on column public.gifts.quantity is
  'Unidades ainda disponíveis. Chega a 0 quando todas as unidades foram escolhidas.';

-- -------------------------------------------------------------------------
-- Tabela: gift_selections
-- -------------------------------------------------------------------------
create table if not exists public.gift_selections (
  id          uuid primary key default gen_random_uuid(),
  gift_id     uuid not null references public.gifts(id) on delete cascade,
  guest_name  text not null check (char_length(trim(guest_name)) > 0),
  created_at  timestamptz not null default now()
);

comment on table public.gift_selections is
  'Registro de cada escolha de presente feita por um convidado.';

create index if not exists gift_selections_gift_id_idx
  on public.gift_selections (gift_id);

-- -------------------------------------------------------------------------
-- RLS (Row Level Security)
-- -------------------------------------------------------------------------
-- Convidados acessam o site sem login (chave anônima). Por isso:
--   * `gifts` pode ser lida por qualquer um (é a vitrine pública).
--   * `gifts` e `gift_selections` NUNCA são escritas diretamente pelo
--     cliente — toda escrita passa pela função `select_gift`, que roda
--     com privilégios elevados (SECURITY DEFINER) e contém a lógica de
--     proteção contra escolha duplicada.
-- -------------------------------------------------------------------------
alter table public.gifts enable row level security;
alter table public.gift_selections enable row level security;

drop policy if exists "gifts are publicly readable" on public.gifts;
create policy "gifts are publicly readable"
  on public.gifts
  for select
  to anon, authenticated
  using (true);

-- Nenhuma policy de insert/update/delete é criada para `anon` em nenhuma
-- das duas tabelas: sem policy = acesso negado por padrão com RLS ativo.
-- Isso garante que a única forma de alterar `quantity` ou inserir em
-- `gift_selections` é através da função abaixo.

-- -------------------------------------------------------------------------
-- Função: select_gift
-- -------------------------------------------------------------------------
-- Reserva um presente para um convidado de forma ATÔMICA.
--
-- Por que isso evita condição de corrida:
-- O UPDATE ... WHERE quantity > 0 ... RETURNING adquire um lock de linha
-- no registro do presente antes de decidir o resultado. Se duas
-- requisições chegarem "ao mesmo tempo", o Postgres serializa as duas
-- transações nessa linha: a segunda só executa seu UPDATE depois que a
-- primeira commitar, e nesse momento a condição `quantity > 0` já pode
-- ser falsa — fazendo a segunda não encontrar nenhuma linha para
-- atualizar (0 linhas afetadas) em vez de as duas decrementarem com
-- sucesso. Não há uma janela entre "verificar" e "gravar": a verificação
-- e a gravação são a mesma instrução SQL.
-- -------------------------------------------------------------------------
create or replace function public.select_gift(
  p_gift_id uuid,
  p_guest_name text
)
returns table (success boolean, message text, remaining integer)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_remaining integer;
  v_clean_name text := trim(p_guest_name);
begin
  if v_clean_name is null or char_length(v_clean_name) = 0 then
    return query select false, 'Por favor, informe seu nome.', null::integer;
    return;
  end if;

  -- Decrementa de forma atômica apenas se ainda houver unidade disponível.
  update public.gifts
     set quantity = quantity - 1
   where id = p_gift_id
     and quantity > 0
  returning quantity into v_remaining;

  if not found then
    return query select
      false,
      '❤️ Este presente já foi escolhido! Obrigado por participar desse momento.',
      0;
    return;
  end if;

  insert into public.gift_selections (gift_id, guest_name)
  values (p_gift_id, v_clean_name);

  return query select true, 'Presente reservado com sucesso!', v_remaining;
end;
$$;

comment on function public.select_gift is
  'Reserva atômica de um presente: decrementa quantity e registra a escolha em uma única transação, evitando escolhas duplicadas em condição de corrida.';

-- Permite que o site (papel anon, sem login) chame a função, mas não
-- escreva diretamente nas tabelas.
revoke all on function public.select_gift(uuid, text) from public;
grant execute on function public.select_gift(uuid, text) to anon, authenticated;

-- -------------------------------------------------------------------------
-- Realtime (opcional, mas recomendado)
-- -------------------------------------------------------------------------
-- Permite que o frontend receba atualizações ao vivo quando `quantity`
-- muda (ex: outro convidado escolheu o mesmo presente enquanto a página
-- estava aberta). Se o projeto já tiver essa tabela na publicação, o
-- bloco abaixo simplesmente ignora o erro de "já existe".
do $$
begin
  alter publication supabase_realtime add table public.gifts;
exception
  when duplicate_object then
    null;
end $$;

