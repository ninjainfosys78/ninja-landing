import { Metadata } from "next";
import SolutionsClient from "@/components/SolutionsClient";

export const metadata: Metadata = {
  title: "Solutions — NinjaInfosys | Custom Web & App Development",
  description:
    "NinjaInfosys delivers custom web, mobile and e-governance solutions — product development, integration, and cloud migration to scale digital services.",
  keywords: [
    "ninjainfosys",
    "web development",
    "mobile app development",
    "e-governance solutions",
    "digital transformation",
  ],
  alternates: {
    canonical: "https://ninjainfosys.com/solutions",
  },
  openGraph: {
    title: "Solutions — NinjaInfosys",
    description:
      "Custom web, mobile and e-governance solutions from NinjaInfosys.",
    url: "https://ninjainfosys.com/solutions",
    siteName: "ninjainfosys.com",
    locale: "en_US",
    images: [
      {
        url: "https://ninjainfosys.com/assets/seo/solutions-hero-1200x630.webp",
        width: 1200,
        height: 630,
        alt: "NinjaInfosys Solutions — Custom web and mobile apps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solutions — NinjaInfosys",
    description: "Custom web, mobile and e-governance solutions.",
    creator: "@ninjainfosys",
    site: "@ninjainfosys",
    images: [
      "https://ninjainfosys.com/assets/seo/solutions-hero-1200x630.webp",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  authors: [{ name: "NinjaInfosys", url: "https://ninjainfosys.com" }],
};

export default function SolutionsPage() {
  return <SolutionsClient />;
}
