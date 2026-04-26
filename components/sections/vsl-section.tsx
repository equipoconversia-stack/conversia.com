"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { VideoVSL } from "./VideoVSL"
import { SectionWrapper } from "@/components/ui/section-wrapper"

const VIDEO_ID = "RR6jMwCZ7YM"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  }),
}

// ─── Testimonio ───────────────────────────────────────────────────────────────

function Testimonial() {
  return (
    <figure className="mx-auto max-w-2xl rounded-2xl border border-[#6C63FF]/20 bg-[#12121A] p-6 text-left">
      <blockquote className="text-base leading-relaxed text-white/80 italic">
        "Antes perdíamos el 60% de las consultas de Instagram porque no dábamos abasto.
        Con ConversIA, el agente responde en segundos y agenda reuniones solo.
        En el primer mes cerramos 18 ventas que antes se nos escapaban."
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6C63FF]/20 text-sm font-bold text-[#6C63FF]">
          MC
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Martina Cáceres</p>
          <p className="text-xs text-[#8888A0]">Directora Comercial — Inmobiliaria Ávila, Buenos Aires</p>
        </div>
        <div className="ml-auto flex gap-0.5" aria-label="5 estrellas">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-[#00F5C4] text-sm">★</span>
          ))}
        </div>
      </figcaption>
    </figure>
  )
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function VslSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <SectionWrapper className="bg-[#0A0A0F]">
      <div ref={ref} className="flex flex-col items-center gap-8 text-center">
        {/* Pre-headline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="text-sm font-semibold uppercase tracking-widest text-[#6C63FF]"
        >
          Mirá cómo funciona en 3 minutos
        </motion.p>

        {/* H2 */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.1}
          className="max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl"
        >
          ¿Cuántas consultas perdiste hoy por no poder responder a tiempo?
        </motion.h2>

        {/* Video */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.2}
          className="w-full max-w-3xl"
        >
          <VideoVSL videoId={VIDEO_ID} />
        </motion.div>

        {/* CTA urgente post-video */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.35}
          className="flex flex-col items-center gap-2"
        >
          <a
            href="#formulario"
            className="inline-flex items-center justify-center rounded-xl bg-[#00F5C4] px-8 py-4 text-base font-bold text-[#0A0A0F] shadow-[0_0_30px_rgba(0,245,196,0.25)] transition-all hover:shadow-[0_0_40px_rgba(0,245,196,0.4)] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F5C4] min-h-[52px]"
          >
            Quiero mi demo gratis → Quedan 3 cupos esta semana
          </a>
          <p className="text-xs text-[#8888A0]">
            Si esto resuena con lo que vivís en tu negocio, el siguiente paso es simple.
          </p>
        </motion.div>

        {/* Testimonio */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.5}
          className="w-full"
        >
          <Testimonial />
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
