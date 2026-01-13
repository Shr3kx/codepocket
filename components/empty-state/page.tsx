"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { SearchIcon, PlusSignIcon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  onNewSnippet: () => void
  className?: string
}

export function EmptyState({ onNewSnippet, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-20 opacity-40",
        className
      )}
    >
      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
        <HugeiconsIcon icon={SearchIcon} strokeWidth={2} className="size-10" />
      </div>
      <h3 className="text-xl font-bold">No snippets found</h3>
      <p className="max-w-xs text-center mt-2 text-muted-foreground">
        Try adjusting your filters or search keywords to find what you&apos;re
        looking for.
      </p>
      <Button
        variant="link"
        onClick={onNewSnippet}
        className="mt-6 gap-2"
      >
        <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
        Create first snippet
      </Button>
    </div>
  )
}
