import type { Metadata } from "next";
import localFont from "next/font/local";
import { Fraunces, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteWidget } from "@/components/site-widget";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Chatbot SaaS — the front desk that never clocks out",
    template: "%s",
  },
  description:
    "Add an AI chatbot to your website in 2 minutes and capture more leads while you sleep.",
  openGraph: {
    title: "Chatbot SaaS — the front desk that never clocks out",
    description:
      "Add an AI chatbot to your website in 2 minutes and capture more leads while you sleep.",
    url: siteUrl,
    siteName: "Chatbot SaaS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chatbot SaaS — the front desk that never clocks out",
    description:
      "Add an AI chatbot to your website in 2 minutes and capture more leads while you sleep.",
  },
};

export const viewport = {
  themeColor: "#0B1120",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${fraunces.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
        <SiteWidget />
      </body>
    </html>
  );
}