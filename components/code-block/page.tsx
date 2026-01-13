"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/cjs/styles/prism"
import { HugeiconsIcon } from "@hugeicons/react"
import { Copy01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language: string
  className?: string
  onCopy?: () => void
}

export function CodeBlock({ code, language, className, onCopy }: CodeBlockProps) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Use light theme as default during SSR to prevent hydration mismatch
  const isDark = mounted ? (resolvedTheme === "dark" || theme === "dark") : false

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    if (onCopy) {
      onCopy()
    } else {
      alert("Code copied to clipboard!")
    }
  }

  return (
    <div
      data-slot="code-block"
      className={cn(
        "ring-foreground/10 bg-card text-card-foreground overflow-hidden rounded-lg border border-border ring-1 relative group",
        className
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCopy}
        className="absolute top-2 right-2 size-7 opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-background/80 hover:bg-background"
      >
        <HugeiconsIcon icon={Copy01Icon} strokeWidth={2} className="size-4" />
        <span className="sr-only">Copy code</span>
      </Button>
      <SyntaxHighlighter
        language={language}
        style={isDark ? vscDarkPlus : vs}
        customStyle={{
          margin: 0,
          padding: "1rem",
          paddingTop: "2.5rem",
          paddingRight: "2.5rem",
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