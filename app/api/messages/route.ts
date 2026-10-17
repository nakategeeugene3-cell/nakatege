import { NextResponse } from "next/server";
import { getLocalStore, type ChatMessage } from "@/lib/local-store";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: { name?: string; phone?: string; message?: string };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Données invalides." }, { status: 400 });
  }

  const name = payload.name?.trim();
  const phone = payload.phone?.trim();
  const message = payload.message?.trim();
  if (!name || !phone || !message || name.length > 90 || phone.length > 40 || message.length > 1200) {
    return NextResponse.json({ error: "Veuillez remplir les champs requis." }, { status: 400 });
  }

  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("messages")
      .insert({ name, phone, message })
      .select("id,name,phone,message,created_at")
      .single();
    if (error) return NextResponse.json({ error: "Impossible d'enregistrer le message." }, { status: 500 });
    return NextResponse.json(data, { status: 201 });
  }

  const record: ChatMessage = {
    id: crypto.randomUUID(),
    name,
    phone,
    message,
    created_at: new Date().toISOString(),
  };
  getLocalStore().messages.unshift(record);
  return NextResponse.json(record, { status: 201 });
}
