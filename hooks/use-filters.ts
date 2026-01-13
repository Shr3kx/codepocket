"use client"

import { useMemo } from "react"
import { Snippet, LANGUAGES } from "@/lib/types"

interface FilterState {
  searchQuery: string
  selectedFolder: string | null
  selectedTag: string | null
  selectedLang: string | null
}

export function useFilters(snippets: Snippet[], filters: FilterState) {
  const filteredSnippets = useMemo(() => {
    return snippets.filter((s) => {
      const matchesSearch =
        s.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(filters.searchQuery.toLowerCase())
      const matchesFolder = !filters.selectedFolder || s.folder === filters.selectedFolder
      const matchesTag = !filters.selectedTag || s.tags.includes(filters.selectedTag)
      const matchesLang = !filters.selectedLang || s.language === filters.selectedLang
      return matchesSearch && matchesFolder && matchesTag && matchesLang
    })
  }, [snippets, filters.searchQuery, filters.selectedFolder, filters.selectedTag, filters.selectedLang])

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    snippets.forEach((s) => s.tags.forEach((t) => tags.add(t)))
    return Array.from(tags)
  }, [snippets])

  return {
    filteredSnippets,
    allTags,
  }
}
