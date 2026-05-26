import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { ScrollAnimationsInit } from "@/components/ui/scroll-animations-init";
import { FullpageScroll } from "@/components/ui/fullpage-scroll";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
});

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
    <html lang="en" className={jetbrainsMono.variable}>
      <body>
        <ScrollAnimationsInit />
        <FullpageScroll />
        {children}
      </body>
    </html>
  );
}
