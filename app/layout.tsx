import type React from "react"
import type { Metadata } from "next";
import "./globals.css"
import { IBM_Plex_Sans, Plus_Jakarta_Sans } from "next/font/google"
import { LanguageProvider } from "@/components/LanguageProvider"
import { ThemeProvider } from "@/components/theme-provider"
import CookieConsent from "@/components/cookie-consent"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "sonner"

const ibm = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300","400","500","600"],
  variable: "--font-body",
  display: "swap",
});

const heading = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400","500","600","700","800"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ninja Infosys — Global Consulting",
  description: "A global consulting company shaping decisive outcomes in complex environments.",
  openGraph: {
    title: "Ninja Infosys — Global Consulting",
    description: "A global consulting company shaping decisive outcomes in complex environments.",
    images: ["/assets/og/og-default.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ninja Infosys — Global Consulting",
    description: "A global consulting company shaping decisive outcomes in complex environments.",
    images: ["/assets/og/og-default.jpg"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/logo.png",
  },
    generator: 'v0.app'
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${ibm.variable} ${heading.variable}`} suppressHydrationWarning>
        <ThemeProvider attribute="class" forcedTheme="dark" enableSystem={false}>
          <LanguageProvider>
            <Header />
            {children}
            <Footer />
            <CookieConsent />
          </LanguageProvider>
          <Toaster theme="dark" position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
