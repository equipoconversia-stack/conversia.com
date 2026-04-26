"use server"

import { z } from "zod"
import { createServerClient } from "@/lib/supabase/server"

// ─── Schema de validación server-side ────────────────────────────────────────

const LeadServerSchema = z.object({
  telefono: z.string().min(8, "Teléfono requerido"),
  email: z.string().email("Email inválido"),
  nombre: z.string().optional(),
  chats_por_dia: z.string().optional(),
  canales: z.union([z.string(), z.array(z.string())]).optional(),
  crm_actual: z.string().optional(),
  crm_otro: z.string().optional(),
  servicios: z.string().optional(),
  tiene_campanas: z.string().optional(),
})

export type FormState = { success: true } | { success: false; error: string } | null

// ─── Action ───────────────────────────────────────────────────────────────────

export async function submitLead(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // Manejar campos múltiples (checkboxes de canales)
  const raw: Record<string, unknown> = {}
  formData.forEach((value, key) => {
    if (raw[key] !== undefined) {
      raw[key] = Array.isArray(raw[key])
        ? [...(raw[key] as string[]), value as string]
        : [raw[key] as string, value as string]
    } else {
      raw[key] = value
    }
  })

  const result = LeadServerSchema.safeParse(raw)
  if (!result.success) {
    if (process.env.NODE_ENV === "development") {
      console.error("Validación fallida:", result.error.flatten())
    }
    return { success: false, error: "Revisá los campos obligatorios." }
  }

  const data = result.data

  // Normalizar canales a array
  const canales = data.canales
    ? Array.isArray(data.canales)
      ? data.canales
      : [data.canales]
    : []

  // Insertar en Supabase tabla `leads`
  try {
    const supabase = createServerClient()
    const { error } = await supabase.from("leads").insert({
      telefono:      data.telefono,
      email:         data.email,
      nombre:        data.nombre ?? null,
      chats_por_dia: data.chats_por_dia ?? null,
      canales:       canales.length > 0 ? canales : null,
      crm_actual:    data.crm_actual === "otro" ? (data.crm_otro ?? "Otro") : (data.crm_actual ?? null),
      servicios:     data.servicios ?? null,
      tiene_campanas: data.tiene_campanas ?? null,
    })

    if (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Supabase insert error:", error)
      }
      return { success: false, error: "No pudimos guardar tus datos. Intentá de nuevo." }
    }
  } catch {
    // No exponer detalles técnicos al cliente
    return { success: false, error: "No pudimos guardar tus datos. Intentá de nuevo." }
  }

  if (process.env.NODE_ENV === "development") {
    console.log("Nuevo lead ConversIA guardado:", data.email)
  }

  return { success: true }
}
