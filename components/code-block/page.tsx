"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/cjs/styles/prism"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language: string
  className?: string
}

export function CodeBlock({ code, language, className }: CodeBlockProps) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Use light theme as default during SSR to prevent hydration mismatch
  const isDark = mounted ? (resolvedTheme === "dark" || theme === "dark") : false

  return (
    <div
      data-slot="code-block"
      className={cn(
        "ring-foreground/10 bg-card text-card-foreground overflow-hidden rounded-lg border border-border ring-1",
        className
      )}
    >
      <SyntaxHighlighter
        language={language}
        style={isDark ? vscDarkPlus : vs}
        customStyle={{
          margin: 0,
          padding: "1rem",
          fontSize: "0.75rem",
          lineHeight: "1.5",
        }}
        PreTag="div"
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}