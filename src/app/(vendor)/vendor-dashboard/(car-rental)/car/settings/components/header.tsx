interface HeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
}

export function Header({
  heading,
  text,
  children,
}: HeaderProps) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight md:text-4xl">
          {heading}
        </h1>
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  )
}
