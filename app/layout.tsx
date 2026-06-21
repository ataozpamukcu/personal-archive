import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Açık Defter",
  description: "Üzerinde uğraştığım şeyler.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
