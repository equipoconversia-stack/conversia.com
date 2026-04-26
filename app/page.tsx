import type { Metadata } from "next"
import { Hero } from "@/components/sections/Hero"
import { VslSection } from "@/components/sections/vsl-section"
import { Benefits } from "@/components/sections/Benefits"
import { Faq } from "@/components/sections/faq"
import { ContactForm } from "@/components/sections/contact-form"
import { Footer } from "@/components/layout/Footer"

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "ConversIA | Automatizá tu Atención al Cliente con IA",
  description:
    "Agentes de IA que responden, califican y agendan por vos en WhatsApp, Instagram y tu web. Probá gratis 15 días.",
  keywords:
    "automatización IA, agente IA WhatsApp, atención al cliente IA, CRM automatizado, chatbot Argentina",
  openGraph: {
    title: "ConversIA | Automatizá tu Atención al Cliente con IA",
    description:
      "Agentes de IA que responden, califican y agendan por vos en WhatsApp, Instagram y tu web. Probá gratis 15 días.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    url: "https://conversia.com.ar",
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "ConversIA | Automatizá tu Atención al Cliente con IA",
    description:
      "Agentes de IA que responden, califican y agendan por vos en WhatsApp, Instagram y tu web. Probá gratis 15 días.",
    images: ["/og-image.png"],
  },
}

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "ConversIA",
  description:
    "Agentes de IA que responden, califican y agendan por vos en WhatsApp, Instagram y tu web.",
  url: "https://conversia.com.ar",
  areaServed: "Argentina",
  serviceType: "Automatización con Inteligencia Artificial",
}

// ─── Funnel: Hero → VSL → Benefits → FAQ → Form ───────────────────────────────

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        {/* 1. Hero + Header sticky */}
        <Hero />

        {/* 2. VSL + CTA urgente + Testimonio */}
        <VslSection />

        {/* 3. Beneficios con KPIs + Cómo funciona */}
        <Benefits />

        {/* 4. FAQ — eliminar objeciones */}
        <Faq />

        {/* 5. Formulario 2 pasos + urgencia */}
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
