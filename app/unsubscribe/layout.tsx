import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Unsubscribed | The Culinary Creative",
  description: "You have been successfully unsubscribed from The Culinary Creative email service.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function UnsubscribeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
