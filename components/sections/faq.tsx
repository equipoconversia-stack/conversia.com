"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"
import { SectionWrapper } from "@/components/ui/section-wrapper"

const FAQS = [
  {
    q: "¿Cuánto tiempo tarda el setup?",
    a: "En 48 horas hábiles tu agente de IA ya está operando. Nuestro equipo se encarga de todo: configuración, entrenamiento y conexión con tus canales. Vos solo aprobás el tono y los flujos antes de salir en vivo.",
  },
  {
    q: "¿Necesito saber programar o tener equipo técnico?",
    a: "No. ConversIA es un servicio gestionado: armamos, entrenamos y mantenemos el agente por vos. Si en algún momento querés cambiar algo (respuestas, flujos, canales), nos lo decís y lo actualizamos.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "El precio depende del volumen de conversaciones y los canales que quieras integrar. Por eso pedimos una demo primero: así te damos un precio a medida. No hay plan genérico que no te sirva.",
  },
  {
    q: "¿Los clientes van a notar que hablan con una IA?",
    a: "Depende de cómo lo configuremos. Podés elegir que el agente se presente como asistente virtual o que use el nombre de un empleado. El tono es tuyo: entrenamos al agente con tus respuestas, tu vocabulario y tus valores.",
  },
]

function FaqItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-[#6C63FF]/15 last:border-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C63FF] rounded"
        aria-expanded={isOpen}
      >
        <span className={`text-sm font-semibold leading-snug md:text-base transition-colors ${isOpen ? "text-white" : "text-white/80"}`}>
          {q}
        </span>
        <span className="flex-shrink-0 rounded-lg bg-[#6C63FF]/10 p-1 text-[#6C63FF]">
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-[#8888A0]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <SectionWrapper className="bg-[#0A0A0F]">
      <div ref={ref} className="flex flex-col gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#6C63FF]">
            Preguntas frecuentes
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Todo lo que querés saber antes de empezar
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="mx-auto w-full max-w-2xl rounded-2xl border border-[#6C63FF]/20 bg-[#12121A] px-6"
        >
          {FAQS.map((faq, i) => (
            <FaqItem
              key={i}
              q={faq.q}
              a={faq.a}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
