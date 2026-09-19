import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Não lançamos um erro aqui para não quebrar o build, mas avisamos
  // claramente no console — o app mostrará uma mensagem amigável na tela.
  console.error(
    '[Supabase] VITE_SUPABASE_URL e/ou VITE_SUPABASE_ANON_KEY não configuradas. ' +
      'Copie .env.example para .env e preencha os valores do seu projeto Supabase.'
  );
}

export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '');

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
