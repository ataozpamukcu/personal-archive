import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Personal Literary Archive",
  description: "Writings, fragments, and collected references.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
