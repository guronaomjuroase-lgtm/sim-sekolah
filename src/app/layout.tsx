import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google"; // Using Outfit for headings, Plus Jakarta for body
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: '--font-body',
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: "SIM Sekolah",
  description: "Sistem Informasi Manajemen Sekolah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${plusJakarta.variable} ${outfit.variable} font-sans bg-background`}>
        <div className="flex min-h-screen flex-col">
          {/* Add a subtle background pattern */}
          <div className="fixed inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
