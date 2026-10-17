import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KING SHIPPING",
  description: "Le luxe livré chez vous, au prix du roi.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
