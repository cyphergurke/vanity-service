import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navigation/NavBar";
import Footer from "@/components/navigation/Footer";
import { Toaster } from "@/components/ui/sonner";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vanity Bitcoin Address Generator",
  description: "Generates trustless Bitcoin vanity addresses by using split Keys. Vanity Addresses contain a custom prefix or word.",
};

export default async function LocaleLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
      </head>
      <body className={inter.className}>
        <main className="flex  flex-col min-h-screen bg-main">
          <NextIntlClientProvider messages={messages} locale={locale}>
            <NavBar />
            <div className="flex-grow">
              {children}
            </div>
            <CookieConsent />
            <Toaster />
            <Footer />
          </NextIntlClientProvider>
        </main>
      </body>
    </html>
  );
}
