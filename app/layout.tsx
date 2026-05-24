import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CLOPP — Electronic Music",
  description: "CLOPP — DJ, Producer, Electronic Music Artist. Presskit, booking and contact.",
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
