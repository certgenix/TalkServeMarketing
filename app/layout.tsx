import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DarkModeProvider } from "@/components/DarkModeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TalkServe AI - Your AI Receptionist That Never Sleeps",
  description: "TalkServe's AI receptionist answers in under two seconds, books appointments or orders, and follows up—24/7. Trusted by dental clinics, restaurants, and service businesses.",
  keywords: ["AI receptionist", "automated phone system", "appointment booking", "restaurant ordering", "dental scheduling"],
  openGraph: {
    title: "TalkServe AI - Your AI Receptionist That Never Sleeps",
    description: "Answer every call. Book more customers. TalkServe's AI receptionist works 24/7.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <DarkModeProvider>
          <Header />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
        </DarkModeProvider>
      </body>
    </html>
  );
}
