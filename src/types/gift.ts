export interface Gift {
  id: string;
  name: string;
  image_url: string | null;
  quantity: number;
  created_at: string;
}

/** Resultado retornado pela função RPC `select_gift` no Supabase. */
export interface SelectGiftResult {
  success: boolean;
  message: string;
  remaining: number;
}
