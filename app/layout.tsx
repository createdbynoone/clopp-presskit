import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { ScrollAnimationsInit } from "@/components/ui/scroll-animations-init";
import { FullpageScroll } from "@/components/ui/fullpage-scroll";
import { Preloader } from "@/components/ui/preloader";
import { LanguageProvider } from "@/contexts/LanguageContext";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="preload" href="/fonts/NeueHaasDisplayMedium.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/images/hero.webp" as="image" type="image/webp" media="(min-width: 769px)" />
        <link rel="preload" href="/images/hero-mobile.webp" as="image" type="image/webp" media="(max-width: 768px)" />
      </head>
      <body>
        <LanguageProvider>
          <Preloader />
          <ScrollAnimationsInit />
          <FullpageScroll />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
