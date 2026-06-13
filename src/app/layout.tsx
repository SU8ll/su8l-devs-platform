import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Particles } from "@/components/particles"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SU8L DEVs - Premium Gaming Companion Platform",
  description: "Advanced calculators, databases, and planning tools for strategy games. Hero progression, building upgrades, equipment, and more.",
  keywords: "gaming tools, calculator, hero progression, building upgrade, strategy game",
  openGraph: {
    title: "SU8L DEVs",
    description: "Premium Gaming Companion Platform",
    siteName: "SU8L DEVs",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Particles />
          <Header />
          <main className="relative z-10 min-h-screen pt-16">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
