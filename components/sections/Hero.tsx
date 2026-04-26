"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

// ─── Header ────────────────────────────────────────────────────────────────

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [showCta, setShowCta] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10)
      setShowCta(window.scrollY > 400)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-[#6C63FF]/20 bg-[#0A0A0F]/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <span className="text-xl font-bold tracking-tight text-white">
          Convers<span className="text-[#6C63FF]">IA</span>
        </span>

        {/* CTA aparece al scrollear 400px */}
        <motion.a
          href="#formulario"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={showCta ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="inline-flex items-center justify-center rounded-lg bg-[#00F5C4] px-4 py-2 text-sm font-bold text-[#0A0A0F] transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F5C4] pointer-events-auto"
          style={{ pointerEvents: showCta ? "auto" : "none" }}
        >
          Quiero mi demo →
        </motion.a>
      </div>
    </header>
  )
}

// ─── Logos de clientes ──────────────────────────────────────────────────────

const LOGOS = [
  "Inmobiliaria Ávila",
  "FitLife Studio",
  "MediTurno",
  "LogísticaRed",
  "EduPro AR",
]

// ─── Animation variants ─────────────────────────────────────────────────────

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  }),
}

// ─── Hero ───────────────────────────────────────────────────────────────────

export function Hero() {
  return (
    <>
      <Header />

      <section className="relative flex min-h-[calc(100vh-64px)] flex-col items-center justify-center bg-[#0A0A0F] px-4 pb-16 pt-12 text-center">
        {/* Glow de fondo */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#6C63FF]/10 blur-[120px]" />
        </div>

        <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6">
          {/* Badge animado */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 rounded-full border border-[#6C63FF]/30 bg-[#6C63FF]/10 px-4 py-1.5 text-sm font-medium text-[#6C63FF]"
          >
            ⚡ Atención al cliente que nunca duerme
          </motion.div>

          {/* H1 — stagger por línea */}
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            <motion.span
              className="block"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              custom={0.15}
            >
              Tu negocio pierde ventas
            </motion.span>
            <motion.span
              className="block text-[#6C63FF]"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              custom={0.3}
            >
              cada vez que no respondés a tiempo.
            </motion.span>
          </h1>

          {/* Subtítulo */}
          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={0.5}
            className="max-w-2xl text-lg leading-relaxed text-[#8888A0] sm:text-xl"
          >
            ConversIA implementa Agentes de IA que responden, califican y agendan
            por vos — en WhatsApp, Instagram y tu web — las 24hs, los 7 días.
          </motion.p>

          {/* Métricas de impacto */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={0.6}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm"
          >
            {[
              { num: "24/7", label: "sin interrupciones" },
              { num: "+94%", label: "tasa de respuesta" },
              { num: "48hs", label: "setup completo" },
            ].map((m) => (
              <div key={m.label} className="flex items-center gap-1.5">
                <span className="font-bold text-[#00F5C4]">{m.num}</span>
                <span className="text-[#8888A0]">{m.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA con pulse */}
          <motion.a
            href="#formulario"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={0.7}
            className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-[#00F5C4] px-8 py-4 text-base font-bold text-[#0A0A0F] shadow-[0_0_30px_rgba(0,245,196,0.25)] transition-all hover:shadow-[0_0_40px_rgba(0,245,196,0.4)] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F5C4] sm:w-auto sm:min-w-[320px] min-h-[52px]"
          >
            Quiero mi demo gratis de 15 días →
          </motion.a>

          {/* Logos de clientes */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={0.85}
            className="flex flex-col items-center gap-3"
          >
            <p className="text-xs text-[#8888A0]">Empresas que ya automatizaron su atención</p>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {LOGOS.map((name) => (
                <span
                  key={name}
                  className="rounded-md border border-[#6C63FF]/15 bg-[#12121A] px-3 py-1.5 text-xs font-semibold text-[#8888A0]"
                >
                  {name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator con bounce */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#8888A0]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown size={28} />
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}
