"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  Bot,
  Brain,
  Filter,
  Calendar,
  FileImage,
  TrendingUp,
  Search,
  Settings,
  Zap,
} from "lucide-react"
import { SectionWrapper } from "@/components/ui/section-wrapper"

// ─── Beneficios con KPIs ─────────────────────────────────────────────────────

const BENEFITS = [
  {
    icon: Bot,
    title: "Atención 24/7 sin pausas",
    kpi: "+94% tasa de respuesta",
    description:
      "Tu IA responde al instante en WhatsApp, Instagram y web. Nunca más un cliente sin respuesta.",
  },
  {
    icon: Brain,
    title: "Memoria de cada cliente",
    kpi: "3x más satisfacción del cliente",
    description:
      "La IA recuerda quién es el cliente y qué hablaron antes. Cada conversación es personalizada, no genérica.",
  },
  {
    icon: Filter,
    title: "Calificación y descarte automático",
    kpi: "3x más leads calificados por semana",
    description:
      "Filtra curiosos, califica leads reales y los manda directo a tu equipo de ventas.",
  },
  {
    icon: Calendar,
    title: "Agendamiento directo",
    kpi: "-80% carga administrativa",
    description:
      "El agente agenda citas y reuniones sin que vos intervengas. La agenda se llena sola.",
  },
  {
    icon: FileImage,
    title: "Recibe audios, imágenes y texto",
    kpi: "100% de mensajes procesados",
    description:
      "Tu IA entiende mensajes de voz, fotos de productos y texto. Como un vendedor real.",
  },
  {
    icon: TrendingUp,
    title: "Ecosistema CRM automatizado",
    kpi: "-90% trabajo manual de seguimiento",
    description:
      "Actualización de estados, resúmenes automáticos y seguimiento sin trabajo manual.",
  },
]

// ─── Timeline / Cómo funciona ─────────────────────────────────────────────

const STEPS = [
  {
    icon: Search,
    title: "Analizamos tu negocio",
    description: "Entendemos tus canales, tu tono y tus clientes.",
  },
  {
    icon: Settings,
    title: "Configuramos tu IA",
    description: "Agente entrenado con tu info, integrado a tu CRM.",
  },
  {
    icon: Zap,
    title: "Tu negocio trabaja solo",
    description: "Respondé, calificá y cerrá ventas en automático.",
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
}

// ─── Component ───────────────────────────────────────────────────────────────

export function Benefits() {
  const benefitsRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const benefitsInView = useInView(benefitsRef, { once: true, margin: "-80px" })
  const timelineInView = useInView(timelineRef, { once: true, margin: "-80px" })

  return (
    <SectionWrapper className="bg-[#0A0A0F]">
      <div ref={benefitsRef} className="flex flex-col gap-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={benefitsInView ? "visible" : "hidden"}
          custom={0}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            ¿Qué hace ConversIA por tu negocio?
          </h2>
        </motion.div>

        {/* Grid de beneficios con KPIs */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {BENEFITS.map((benefit, i) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={benefit.title}
                variants={fadeUp}
                initial="hidden"
                animate={benefitsInView ? "visible" : "hidden"}
                custom={i + 1}
                className="flex flex-col gap-3 rounded-2xl border border-[#6C63FF]/20 bg-[#12121A] p-5 md:p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6C63FF]/10 text-[#6C63FF]">
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white md:text-base">{benefit.title}</h3>
                  {/* KPI */}
                  <p className="mt-1 text-xs font-semibold text-[#00F5C4]">{benefit.kpi}</p>
                </div>
                <p className="text-xs leading-relaxed text-[#8888A0] md:text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Timeline — Cómo funciona */}
        <div ref={timelineRef} className="flex flex-col gap-8">
          <motion.h3
            variants={fadeUp}
            initial="hidden"
            animate={timelineInView ? "visible" : "hidden"}
            custom={0}
            className="text-center text-2xl font-bold text-white sm:text-3xl"
          >
            Cómo funciona
          </motion.h3>

          <div className="relative flex flex-col gap-8 md:flex-row md:items-start md:gap-0">
            {STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.title}
                  variants={fadeUp}
                  initial="hidden"
                  animate={timelineInView ? "visible" : "hidden"}
                  custom={i + 1}
                  className="relative flex flex-1 flex-col items-center gap-3 text-center"
                >
                  {i < STEPS.length - 1 && (
                    <div
                      aria-hidden
                      className="absolute left-[calc(50%+40px)] top-5 hidden h-px border-t border-dashed border-[#6C63FF]/30 md:block"
                      style={{ right: "-50%" }}
                    />
                  )}
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#6C63FF]/10 text-[#6C63FF] ring-1 ring-[#6C63FF]/30">
                    <Icon size={26} />
                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#6C63FF] text-[10px] font-bold text-white">
                      {i + 1}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-bold text-white">{step.title}</p>
                    <p className="max-w-[200px] text-sm text-[#8888A0]">{step.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
