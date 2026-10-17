import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const cookieName = "king_admin_session";
const sessionDurationSeconds = 60 * 60 * 12;

function signingKey() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "";
}

export function expectedAdminPassword() {
  return process.env.ADMIN_PASSWORD || (process.env.NODE_ENV === "development" ? "King2026" : "");
}

function signature(expiresAt: string) {
  return createHmac("sha256", signingKey()).update(expiresAt).digest("hex");
}

export function isAdminAuthenticated() {
  const key = signingKey();
  const value = cookies().get(cookieName)?.value;
  if (!key || !value) return false;

  const [expiresAt, providedSignature] = value.split(".");
  if (!expiresAt || !providedSignature || Number(expiresAt) <= Date.now()) return false;
  const expected = signature(expiresAt);
  const provided = Buffer.from(providedSignature);
  const valid = Buffer.from(expected);
  return provided.length === valid.length && timingSafeEqual(provided, valid);
}

export function createAdminCookie() {
  const expiresAt = String(Date.now() + sessionDurationSeconds * 1000);
  return {
    name: cookieName,
    value: `${expiresAt}.${signature(expiresAt)}`,
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
      path: "/",
      maxAge: sessionDurationSeconds,
    },
  };
}

export function clearAdminCookie() {
  return {
    name: cookieName,
    value: "",
    options: { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict" as const, path: "/", maxAge: 0 },
  };
}
