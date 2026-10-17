import { NextResponse } from "next/server";
import { clearAdminCookie, createAdminCookie, expectedAdminPassword, isAdminAuthenticated } from "@/lib/admin-auth";

export async function GET() {
  return NextResponse.json({ authenticated: isAdminAuthenticated() });
}

export async function POST(request: Request) {
  const password = expectedAdminPassword();
  if (!password) return NextResponse.json({ error: "ADMIN_PASSWORD n'est pas configuré." }, { status: 503 });

  let submitted: unknown;
  try {
    submitted = (await request.json()).password;
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }
  if (typeof submitted !== "string" || submitted !== password) {
    return NextResponse.json({ error: "Mot de passe incorrect." }, { status: 401 });
  }

  const response = NextResponse.json({ authenticated: true });
  const cookie = createAdminCookie();
  response.cookies.set(cookie.name, cookie.value, cookie.options);
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  const cookie = clearAdminCookie();
  response.cookies.set(cookie.name, cookie.value, cookie.options);
  return response;
}
