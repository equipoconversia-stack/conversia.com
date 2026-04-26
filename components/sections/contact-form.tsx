"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2, ArrowRight, ArrowLeft } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { submitLead } from "@/app/actions/submit-lead"
import { SectionWrapper } from "@/components/ui/section-wrapper"

// ─── Schema ──────────────────────────────────────────────────────────────────

const step1Schema = z.object({
  telefono: z.string().min(8, "Ingresá un número de WhatsApp válido"),
  email: z.string().email("Ingresá un email válido"),
})

const fullSchema = step1Schema.extend({
  nombre: z.string().optional(),
  chats_por_dia: z.string().optional(),
  canales: z.array(z.string()).optional(),
  crm_actual: z.string().optional(),
  crm_otro: z.string().optional(),
  servicios: z.string().optional(),
  tiene_campanas: z.string().optional(),
})

type FormData = z.infer<typeof fullSchema>

// ─── Opciones ────────────────────────────────────────────────────────────────

const CANALES = ["WhatsApp", "Instagram", "Web", "Email", "Otro"]
const CHATS_OPTIONS = [
  { value: "menos-20", label: "Menos de 20" },
  { value: "20-50", label: "20 a 50" },
  { value: "50-100", label: "50 a 100" },
  { value: "mas-100", label: "Más de 100" },
]
const CRM_OPTIONS = [
  { value: "ninguno", label: "No uso CRM" },
  { value: "hubspot", label: "HubSpot" },
  { value: "salesforce", label: "Salesforce" },
  { value: "zoho", label: "Zoho" },
  { value: "kommo", label: "Kommo" },
  { value: "otro", label: "Otro" },
]

// ─── Estilos ─────────────────────────────────────────────────────────────────

const inputClass =
  "w-full rounded-xl border border-[#6C63FF]/20 bg-[#0A0A0F] px-4 py-3 text-sm text-white placeholder-[#8888A0] outline-none transition focus:border-[#6C63FF] focus:ring-1 focus:ring-[#6C63FF] min-h-[48px]"

const labelClass = "block text-sm font-medium text-[#8888A0] mb-1"

const slideVariants = {
  enter: (dir: number) => ({ x: dir * 40, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" as const } },
  exit: (dir: number) => ({ x: dir * -40, opacity: 0, transition: { duration: 0.2, ease: "easeIn" as const } }),
}

// ─── Componente ──────────────────────────────────────────────────────────────

type SubmitStatus = "idle" | "loading" | "success" | "error"

export function ContactForm() {
  const [step, setStep] = useState<1 | 2>(1)
  const [direction, setDirection] = useState(1)
  const [status, setStatus] = useState<SubmitStatus>("idle")

  const {
    register,
    handleSubmit,
    watch,
    control,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(fullSchema),
    defaultValues: { canales: [] },
  })

  const watchCrm = watch("crm_actual")

  const goToStep2 = async () => {
    const valid = await trigger(["telefono", "email"])
    if (!valid) return
    setDirection(1)
    setStep(2)
  }

  const goBack = () => {
    setDirection(-1)
    setStep(1)
  }

  const onSubmit = async (data: FormData) => {
    setStatus("loading")
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, val]) => {
        if (val === undefined || val === null) return
        if (Array.isArray(val)) val.forEach((v) => formData.append(key, v))
        else formData.append(key, String(val))
      })
      const result = await submitLead(null, formData)
      setStatus(result?.success ? "success" : "error")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <SectionWrapper id="formulario" className="bg-[#12121A]">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#00F5C4]/10">
            <svg className="h-8 w-8 text-[#00F5C4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white">
            ¡Listo! En menos de 24hs te contactamos para coordinar tu demo. 🎉
          </h3>
          <p className="text-[#8888A0]">Revisá tu email y WhatsApp.</p>
        </div>
      </SectionWrapper>
    )
  }

  return (
    <SectionWrapper id="formulario" className="bg-[#12121A]">
      <div className="flex flex-col gap-8">

        {/* Titular + urgencia */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Probá ConversIA gratis durante 15 días
          </h2>
          <p className="mt-3 text-[#8888A0]">
            Completá el formulario y te armamos una demo personalizada para tu negocio.
          </p>
          {/* Urgencia / cupos */}
          <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full border border-[#6C63FF]/25 bg-[#6C63FF]/10 px-4 py-2 text-sm font-semibold text-[#A99BFF]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00F5C4] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00F5C4]" />
            </span>
            Solo hacemos 6 demos por semana para garantizar calidad
          </div>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-3">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  s === step
                    ? "bg-[#6C63FF] text-white"
                    : s < step
                    ? "bg-[#00F5C4] text-[#0A0A0F]"
                    : "bg-[#0A0A0F] border border-[#6C63FF]/30 text-[#8888A0]"
                }`}
              >
                {s < step ? "✓" : s}
              </div>
              <span className={`text-xs font-medium ${s === step ? "text-white" : "text-[#8888A0]"}`}>
                {s === 1 ? "Tus datos" : "Tu negocio"}
              </span>
              {s < 2 && <div className="w-8 h-px bg-[#6C63FF]/20" />}
            </div>
          ))}
        </div>

        {/* Form con animación entre pasos */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              {step === 1 ? (
                <motion.div
                  key="step1"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col gap-5"
                >
                  {/* Teléfono */}
                  <div>
                    <label htmlFor="telefono" className={labelClass}>
                      Teléfono / WhatsApp <span className="text-[#00F5C4]">*</span>
                    </label>
                    <div className="flex">
                      <span className="flex items-center rounded-l-xl border border-r-0 border-[#6C63FF]/20 bg-[#12121A] px-3 text-sm text-[#8888A0]">
                        +54
                      </span>
                      <input
                        id="telefono"
                        type="tel"
                        autoComplete="tel"
                        placeholder="9 11 1234-5678"
                        {...register("telefono")}
                        className={`${inputClass} rounded-l-none`}
                      />
                    </div>
                    {errors.telefono && (
                      <p className="mt-1 text-xs text-red-400">{errors.telefono.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email <span className="text-[#00F5C4]">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="tu@empresa.com"
                      {...register("email")}
                      className={inputClass}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={goToStep2}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#6C63FF] px-8 py-4 text-base font-bold text-white transition-all hover:bg-[#5a52e0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C63FF] min-h-[52px]"
                  >
                    Siguiente <ArrowRight size={18} />
                  </button>

                  <p className="text-center text-xs text-[#8888A0]">
                    Solo lleva 30 segundos · Sin compromiso · Cancelás cuando quieras
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col gap-5"
                >
                  {/* Nombre */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="nombre" className={labelClass}>Nombre completo</label>
                      <input id="nombre" type="text" autoComplete="name" placeholder="Tu nombre"
                        {...register("nombre")} className={inputClass} />
                    </div>

                    {/* Chats por día */}
                    <div>
                      <label htmlFor="chats_por_dia" className={labelClass}>¿Cuántos chats recibís por día?</label>
                      <select id="chats_por_dia" {...register("chats_por_dia")} className={`${inputClass} cursor-pointer`}>
                        <option value="">Seleccioná una opción</option>
                        {CHATS_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Canales */}
                  <div>
                    <p className={labelClass}>Principales canales de comunicación</p>
                    <div className="flex flex-wrap gap-3">
                      <Controller name="canales" control={control} render={({ field }) => (
                        <>
                          {CANALES.map((canal) => {
                            const checked = field.value?.includes(canal) ?? false
                            return (
                              <label key={canal} className={`cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                                checked
                                  ? "border-[#6C63FF] bg-[#6C63FF]/10 text-[#6C63FF]"
                                  : "border-[#6C63FF]/20 text-[#8888A0] hover:border-[#6C63FF]/40"
                              }`}>
                                <input type="checkbox" className="sr-only" checked={checked}
                                  onChange={(e) => {
                                    const current = field.value ?? []
                                    field.onChange(e.target.checked ? [...current, canal] : current.filter((c) => c !== canal))
                                  }} />
                                {canal}
                              </label>
                            )
                          })}
                        </>
                      )} />
                    </div>
                  </div>

                  {/* CRM */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="crm_actual" className={labelClass}>¿Usás CRM?</label>
                      <select id="crm_actual" {...register("crm_actual")} className={`${inputClass} cursor-pointer`}>
                        <option value="">Seleccioná una opción</option>
                        {CRM_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                    {watchCrm === "otro" && (
                      <div>
                        <label htmlFor="crm_otro" className={labelClass}>¿Cuál CRM usás?</label>
                        <input id="crm_otro" type="text" placeholder="Nombre del CRM"
                          {...register("crm_otro")} className={inputClass} />
                      </div>
                    )}
                  </div>

                  {/* Servicios */}
                  <div>
                    <label htmlFor="servicios" className={labelClass}>¿Qué productos o servicios ofrecés?</label>
                    <textarea id="servicios" rows={2} placeholder="Describí brevemente tu negocio..."
                      {...register("servicios")} className={`${inputClass} resize-none`} />
                  </div>

                  {/* Campañas */}
                  <div>
                    <p className={labelClass}>¿Tenés campañas publicitarias activas?</p>
                    <div className="flex flex-wrap gap-4">
                      {[{ value: "si", label: "Sí" }, { value: "no", label: "No" }, { value: "por-lanzar", label: "Estoy por lanzar" }].map((opt) => (
                        <label key={opt.value} className="flex cursor-pointer items-center gap-2 text-sm text-[#8888A0]">
                          <input type="radio" value={opt.value} {...register("tiene_campanas")} className="accent-[#6C63FF]" />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  </div>

                  {status === "error" && (
                    <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                      Hubo un problema. Intentá de nuevo o escribinos por WhatsApp.
                    </p>
                  )}

                  <div className="flex flex-col gap-3">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#00F5C4] px-8 py-4 text-base font-bold text-[#0A0A0F] shadow-[0_0_30px_rgba(0,245,196,0.2)] transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F5C4] disabled:opacity-60 min-h-[52px]"
                    >
                      {status === "loading" ? (
                        <><Loader2 size={18} className="animate-spin" /> Enviando...</>
                      ) : (
                        "Quiero mi demo gratis de 15 días →"
                      )}
                    </button>

                    <p className="text-center text-xs text-[#8888A0]">
                      🔒 Sin compromisos · Setup en 48hs · Cancelás cuando quieras
                    </p>

                    <button type="button" onClick={goBack}
                      className="flex items-center justify-center gap-1 text-xs text-[#8888A0] hover:text-white transition-colors mx-auto">
                      <ArrowLeft size={14} /> Volver al paso anterior
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </form>
      </div>
    </SectionWrapper>
  )
}
