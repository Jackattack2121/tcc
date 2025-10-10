import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { SchemaMarkup } from "@/components/schema-markup"
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "The Culinary Creative | Private Chef Services & Gourmet Catering Adelaide",
  description:
    "Experience bespoke culinary services with Chef Jamie Carter in Adelaide. We offer private chef experiences, luxury dining, food event planning, corporate catering, and chef's table experiences for special occasions.",
  keywords:
    "private chef Adelaide, gourmet catering Adelaide, luxury dining experiences, corporate food events, chef's table experience, bespoke catering, private chef services, food event planning, culinary experiences Adelaide, wedding catering Adelaide, intimate dining Adelaide, seasonal menu development, South Australian ingredients",
  authors: [{ name: "Chef Jamie Carter" }],
  creator: "The Culinary Creative",
  publisher: "The Culinary Creative",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.theculinarycreative.com.au",
  },
  openGraph: {
    title: "The Culinary Creative | Private Chef Services & Gourmet Catering Adelaide",
    description:
      "Elevate your dining experience with Chef Jamie Carter. Private chef services, luxury dining experiences, corporate food events, and culinary storytelling in Adelaide.",
    url: "https://www.theculinarycreative.com.au",
    siteName: "The Culinary Creative",
    images: [
      {
        url: "https://afcks0sjupys5isr.public.blob.vercel-storage.com/TCC/tcc-logo-7UUpkuaagjw2CdCASy7vhDMgDnBy1h.png",
        width: 1200,
        height: 630,
        alt: "The Culinary Creative - Private Chef Services Adelaide",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Culinary Creative | Private Chef Services & Gourmet Catering Adelaide",
    description:
      "Elevate your dining experience with Chef Jamie Carter. Private chef services, luxury dining experiences, and culinary storytelling in Adelaide.",
    images: ["https://afcks0sjupys5isr.public.blob.vercel-storage.com/TCC/tcc-logo-7UUpkuaagjw2CdCASy7vhDMgDnBy1h.png"],
    creator: "@theculinarycreative",
  },
  verification: {
    google: "your-google-verification-code-here",
  },
  category: "food and dining",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SchemaMarkup />
        <Suspense>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
