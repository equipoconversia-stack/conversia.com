import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { WhatsAppButton } from "@/components/ui/whatsapp-button"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://conversia.com.ar"),
  title: "ConversIA | Automatizá tu Atención al Cliente con IA",
  description:
    "Agentes de IA que atienden, califican y cierran ventas por vos, las 24hs.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0A0A0F] text-white">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  )
}
