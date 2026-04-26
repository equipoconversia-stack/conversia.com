import { cn } from "@/lib/utils"

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function SectionWrapper({ children, className, id }: SectionWrapperProps) {
  return (
    <section id={id} className={cn("w-full px-4 py-20", className)}>
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  )
}
