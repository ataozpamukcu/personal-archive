import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Açık Defter",
  description: "Yazılar, şiirler, notlar ve dağınık parçalar.",
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
