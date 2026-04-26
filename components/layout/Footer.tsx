export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[#6C63FF]/10 bg-[#0A0A0F] py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
        <span className="text-sm font-semibold text-white">
          Convers<span className="text-[#6C63FF]">IA</span>
        </span>
        <p className="text-xs text-[#8888A0]">
          © {year} ConversIA. Todos los derechos reservados.
        </p>
        <nav className="flex gap-4 text-xs" aria-label="Legal">
          <a
            href="/privacidad"
            className="text-[#8888A0] transition-colors hover:text-white"
          >
            Política de privacidad
          </a>
          <a
            href="/terminos"
            className="text-[#8888A0] transition-colors hover:text-white"
          >
            Términos y condiciones
          </a>
        </nav>
      </div>
    </footer>
  )
}
