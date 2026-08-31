import type { Metadata } from "next";
import "./app.css";

export const metadata: Metadata = {
  title: "For You <3",
  description: "Cute webpage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}