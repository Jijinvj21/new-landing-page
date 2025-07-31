// app/layout.tsx
import "./globals.css"
import type { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
  title: "In Her Interest - Your money, your moves",
  description:
    "Money talk that feels like a group chat. No jargon. No shame. Just clarity. An initiative by Zerodha.",
  icons: {
    icon: "/FeviconlHl.svg", // Path to favicon, ideally use .ico for best support
  },
  openGraph: {
    title: "In Her Interest - Your money, your moves",
    description:
      "Money talk that feels like a group chat. No jargon. No shame. Just clarity. An initiative by Zerodha.",
    url: "https://yourdomain.com", // Replace with your actual domain
    images: [
      {
        url: "/ogimage.png",
        width: 1200,
        height: 630,
        alt: "Your App Open Graph Image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "In Her Interest - Your money, your moves",
    description:
      "Money talk that feels like a group chat. No jargon. No shame. Just clarity. An initiative by Zerodha.",
    images: ["/ogimage.png"],
  },
}

// ✅ This is the missing piece — the actual layout component
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
              <link
          href="https://fonts.googleapis.com/css2?family=League+Gothic&display=swap"
          rel="stylesheet"
        />
      <body>{children}</body>
    </html>
  )
}
