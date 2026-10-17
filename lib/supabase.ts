import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type Database = {
  public: {
    Tables: {
      messages: {
        Row: { id: string; name: string; phone: string; message: string; created_at: string };
        Insert: { id?: string; name: string; phone: string; message: string; created_at?: string };
        Update: Partial<{ name: string; phone: string; message: string }>;
        Relationships: [];
      };
      settings: {
        Row: { key: string; value: unknown };
        Insert: { key: string; value: unknown };
        Update: { value?: unknown };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

let supabase: SupabaseClient<Database> | null = null;

export function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;

  if (!supabase) {
    supabase = createClient<Database>(url, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }
  return supabase;
}
