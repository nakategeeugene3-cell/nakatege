import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KING SHIPPING",
  description: "Le luxe livré chez vous, au prix du roi.",
  manifest: "/manifest.json",
  themeColor: "#FFD700",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FFD700" />
      </head>
      <body>
        {children}
        <script dangerouslySetInnerHTML={{__html:`
          if('serviceWorker' in navigator){
            window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js').catch(()=>{});});
          }
        `}} />
      </body>
    </html>
  );
}
