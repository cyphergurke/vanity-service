import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navigation/NavBar";
import Footer from "@/components/navigation/Footer"; 
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vanity Bitcoin Address Generator",
  description: "Generates trustless Bitcoin vanity addresses by using split Keys. Vanity Addresses contain a custom prefix or word.",
};

export default function LocaleLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <main className="flex  flex-col min-h-screen bg-main">
          <NavBar /> 
            <div className="flex-grow">
              {children}
            </div>
          <Footer />
          <Toaster />
        </main>
      </body>
    </html>
  );
}
