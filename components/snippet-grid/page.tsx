"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Snippet } from "@/lib/types"
import { SnippetCard } from "@/components/snippet-card/page"

interface SnippetGridProps {
  snippets: Snippet[]
  onEdit: (snippet: Snippet) => void
  onDelete: (id: string) => void
  onMove?: (snippetId: string, folder: string) => void
  className?: string
}

export function SnippetGrid({
  snippets,
  onEdit,
  onDelete,
  onMove,
  className,
}: SnippetGridProps) {
  if (snippets.length === 0) {
    return null
  }

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className || ""}`}
    >
      <AnimatePresence>
        {snippets.map((snippet) => (
          <SnippetCard
            key={snippet.id}
            snippet={snippet}
            onEdit={onEdit}
            onDelete={onDelete}
            onMove={onMove}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
