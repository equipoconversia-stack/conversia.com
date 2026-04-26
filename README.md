# ConversIA — Landing Page VSL

Landing page de alta conversión para **ConversIA**, agencia de automatización con IA para empresas argentinas.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui · Framer Motion · Supabase

---

## Requisitos previos

- Node.js 18+
- npm 9+
- Cuenta en [Supabase](https://supabase.com) (gratis)

---

## Setup local

### 1. Clonar e instalar dependencias

```bash
git clone <repo-url>
cd goclick-web
npm install
```

### 2. Configurar variables de entorno

```bash
cp .env.local.example .env.local
```

Completá los valores en `.env.local`:

| Variable | Dónde encontrarla |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Settings → API → Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Settings → API → service_role key |

### 3. Correr migraciones en Supabase

En el [Dashboard de Supabase](https://supabase.com/dashboard):

1. Ir a **SQL Editor**
2. Crear nueva query
3. Pegar el contenido de `supabase/migrations/001_create_leads.sql`
4. Ejecutar

### 4. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

---

## Reemplazar el video VSL

En [components/sections/vsl-section.tsx](components/sections/vsl-section.tsx), reemplazá:

```ts
const VIDEO_ID = "REEMPLAZAR_CON_ID"
```

Por el ID de tu video de YouTube (la parte después de `?v=` en la URL).

---

## Build de producción

```bash
npm run build
npm run start
```

---

## Deploy en Vercel

1. Importar el repo en [vercel.com/new](https://vercel.com/new)
2. Configurar variables de entorno en **Settings → Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Deploy automático en cada push a `main`

Los headers de seguridad están configurados en `vercel.json`.

---

## Estructura del proyecto

```
app/
  layout.tsx          # Fuentes, metadata global
  page.tsx            # Composición de secciones + metadata SEO
  loading.tsx         # Loading state
  not-found.tsx       # Página 404
  actions/
    submit-lead.ts    # Server Action: validación + insert Supabase

components/
  layout/
    Footer.tsx
  sections/
    Hero.tsx          # Header sticky + Hero VSL
    vsl-section.tsx   # Video con facade pattern
    Benefits.tsx      # Grid de beneficios + timeline "Cómo funciona"
    contact-form.tsx  # Formulario de leads con react-hook-form + zod
  ui/
    section-wrapper.tsx

lib/
  supabase/
    server.ts         # Cliente Supabase para Server Actions
  validations.ts

supabase/
  migrations/
    001_create_leads.sql
```
