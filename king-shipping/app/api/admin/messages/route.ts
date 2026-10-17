import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getLocalStore } from "@/lib/local-store";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";

export async function GET() {
  if (!isAdminAuthenticated()) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("messages")
      .select("id,name,phone,message,created_at")
      .order("created_at", { ascending: false });
    if (error) return NextResponse.json({ error: "Impossible de charger les messages." }, { status: 500 });
    return NextResponse.json(data);
  }

  return NextResponse.json(getLocalStore().messages);
}
