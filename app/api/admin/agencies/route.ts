import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getLocalStore, type Agency } from "@/lib/local-store";
import { getSupabase } from "@/lib/supabase";

const defaultAgencies: Agency[] = [
  { city: "Kinshasa", phone: "+243 000 000 001" },
  { city: "Lubumbashi", phone: "+243 000 000 002" },
  { city: "Nairobi", phone: "+254 700 000 003" },
  { city: "Goma", phone: "+243 000 000 004" },
];

export async function GET() {
  if (!isAdminAuthenticated()) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("settings").select("value").eq("key", "agency_numbers").maybeSingle();
    if (error) return NextResponse.json({ error: "Impossible de charger les agences." }, { status: 500 });
    return NextResponse.json(data?.value ?? defaultAgencies);
  }

  return NextResponse.json(getLocalStore().agencies);
}

export async function PUT(request: Request) {
  if (!isAdminAuthenticated()) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

  let agencies: unknown;
  try {
    agencies = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }
  if (!Array.isArray(agencies) || agencies.length !== 4 || agencies.some((item) =>
    !item || typeof item.city !== "string" || typeof item.phone !== "string" || item.city.length > 80 || item.phone.length > 40,
  )) {
    return NextResponse.json({ error: "Les quatre agences sont requises." }, { status: 400 });
  }

  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("settings").upsert({ key: "agency_numbers", value: agencies }, { onConflict: "key" });
    if (error) return NextResponse.json({ error: "Impossible d'enregistrer les agences." }, { status: 500 });
  } else {
    getLocalStore().agencies = agencies as Agency[];
  }

  return NextResponse.json(agencies);
}
