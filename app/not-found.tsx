import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#0A0A0F] px-4 text-center">
      <p className="text-6xl font-extrabold text-[#6C63FF]">404</p>
      <h1 className="text-2xl font-bold text-white">Página no encontrada</h1>
      <p className="max-w-sm text-[#8888A0]">
        La página que buscás no existe o fue movida.
      </p>
      <Link
        href="/"
        className="rounded-xl bg-[#6C63FF] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#5a52e0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C63FF]"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
