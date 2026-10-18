import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "KING SHIPPING", description: "Luxe livré chez vous" };
export default function RootLayout({ children }: { children: React.ReactNode }) { return (<html lang="fr"><body>{children}</body></html>); }
