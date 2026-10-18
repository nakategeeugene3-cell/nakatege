import "./globals.css";
export const metadata = { title: "KING SHIPPING" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="fr"><body style={{margin:0}}>{children}</body></html>);
}
