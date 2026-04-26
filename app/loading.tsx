export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#0A0A0F]">
      <span className="text-xl font-bold tracking-tight text-white">
        Convers<span className="text-[#6C63FF]">IA</span>
      </span>
      <div
        className="h-6 w-6 animate-spin rounded-full border-2 border-[#6C63FF]/20 border-t-[#6C63FF]"
        aria-label="Cargando"
      />
    </div>
  )
}
