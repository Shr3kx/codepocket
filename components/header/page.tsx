"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  MenuIcon,
  SearchIcon,
  SettingsIcon,
  PlusSignIcon,
} from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

interface HeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  onMenuClick: () => void
  isSidebarOpen: boolean
  onNewSnippet: () => void
  className?: string
}

export function Header({
  searchQuery,
  onSearchChange,
  onMenuClick,
  isSidebarOpen,
  onNewSnippet,
  className,
}: HeaderProps) {
  return (
    <header
      className={cn(
        "h-16 border-b border-border bg-background/80 backdrop-blur-md px-6 flex items-center justify-between z-30 sticky top-0",
        className
      )}
    >
      <div className="flex items-center gap-4 flex-1">
        {!isSidebarOpen && (
          <Button variant="ghost" size="icon" onClick={onMenuClick}>
            <HugeiconsIcon icon={MenuIcon} strokeWidth={2} />
            <span className="sr-only">Open sidebar</span>
          </Button>
        )}
        <div className="relative max-w-md w-full">
          <HugeiconsIcon
            icon={SearchIcon}
            strokeWidth={2}
            className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
          />
          <Input
            type="text"
            placeholder="Search snippets..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Button variant="ghost" size="icon">
          <HugeiconsIcon icon={SettingsIcon} strokeWidth={2} />
          <span className="sr-only">Settings</span>
        </Button>
        <Button
          onClick={onNewSnippet}
          className="hidden sm:flex items-center gap-2"
        >
          <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
          New Snippet
        </Button>
      </div>
    </header>
  )
}
