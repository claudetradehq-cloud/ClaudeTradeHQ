import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MarketTicker } from "@/components/market-ticker";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ClaudeTradeHQ — Systematic Trading Research",
    template: "%s · ClaudeTradeHQ",
  },
  description:
    "ClaudeTradeHQ sponsors VuCuBit, a joint trading corporation. Live MT5 statements and educational research from the desk.",
  metadataBase: new URL("https://claudetradehq.example"),
  openGraph: {
    title: "ClaudeTradeHQ",
    description:
      "ClaudeTradeHQ sponsors VuCuBit. Live MT5 statements from the joint trading corporation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${mono.variable} font-sans`}>
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <MarketTicker />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
