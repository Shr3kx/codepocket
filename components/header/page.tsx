"use client";

import * as React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  SearchIcon,
  SettingsIcon,
  PlusSignIcon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { cn } from "@/lib/utils";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onMenuClick?: () => void;
  isSidebarOpen?: boolean;
  onNewSnippet: () => void;
  className?: string;
}

export function Header({
  searchQuery,
  onSearchChange,
  onMenuClick,
  isSidebarOpen,
  onNewSnippet,
  className,
}: HeaderProps) {
  const [open, setOpen] = React.useState(false);
  const isMac =
    typeof window !== "undefined" &&
    navigator.platform.toUpperCase().indexOf("MAC") >= 0;

  // Fake data for demonstration
  const fakeSnippets = [
    {
      id: "1",
      title: "React useState Hook",
      description: "Basic React useState example",
      language: "typescript",
      folder: "Personal",
    },
    {
      id: "2",
      title: "API Fetch with Error Handling",
      description: "Fetch data from API with try-catch",
      language: "javascript",
      folder: "Work",
    },
    {
      id: "3",
      title: "Python List Comprehension",
      description: "Efficient list operations in Python",
      language: "python",
      folder: "Learning",
    },
    {
      id: "4",
      title: "TypeScript Interface",
      description: "Define types for user object",
      language: "typescript",
      folder: "Personal",
    },
    {
      id: "5",
      title: "CSS Grid Layout",
      description: "Responsive grid system",
      language: "css",
      folder: "Work",
    },
    {
      id: "6",
      title: "SQL Query Optimization",
      description: "Improve database query performance",
      language: "sql",
      folder: "Work",
    },
  ];

  const filteredSnippets = React.useMemo(() => {
    if (!searchQuery.trim()) return fakeSnippets;
    const query = searchQuery.toLowerCase();
    return fakeSnippets.filter(
      snippet =>
        snippet.title.toLowerCase().includes(query) ||
        snippet.description.toLowerCase().includes(query) ||
        snippet.language.toLowerCase().includes(query) ||
        snippet.folder.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(open => !open);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header
        className={cn(
          "flex h-16 shrink-0 items-center gap-2 border-b border-border bg-background/80 backdrop-blur-md px-4",
          className,
        )}
      >
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </div>

        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-md">
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-muted-foreground h-7 bg-input/20 dark:bg-input/30 border-input hover:bg-input/40",
              )}
              onClick={() => setOpen(true)}
            >
              <HugeiconsIcon
                icon={SearchIcon}
                strokeWidth={2}
                className="size-3.5 mr-2"
              />
              <span className="text-xs/relaxed">Search snippets...</span>
              <div className="ml-auto flex items-center gap-1">
                <KbdGroup>
                  <Kbd>Ctrl</Kbd>
                  <span>+</span>
                  <Kbd>K</Kbd>
                </KbdGroup>
              </div>
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button
            onClick={onNewSnippet}
            className="hidden sm:flex items-center gap-2"
          >
            <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
            New Snippet
          </Button>
        </div>
      </header>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search snippets..."
            value={searchQuery}
            onValueChange={onSearchChange}
          />
          <CommandList>
            <CommandEmpty>No snippets found.</CommandEmpty>
            {filteredSnippets.length > 0 && (
              <CommandGroup heading="Snippets">
                {filteredSnippets.map(snippet => (
                  <CommandItem
                    key={snippet.id}
                    value={snippet.title}
                    onSelect={() => {
                      setOpen(false);
                      onSearchChange("");
                    }}
                  >
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs/relaxed font-medium truncate">
                          {snippet.title}
                        </span>
                        <span className="text-[0.625rem] text-muted-foreground uppercase tracking-wider shrink-0">
                          {snippet.language}
                        </span>
                      </div>
                      <span className="text-[0.625rem] text-muted-foreground truncate">
                        {snippet.description}
                      </span>
                    </div>
                    <span className="text-[0.625rem] text-muted-foreground ml-auto shrink-0">
                      {snippet.folder}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            <CommandGroup heading="Actions">
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  onNewSnippet();
                }}
              >
                <HugeiconsIcon
                  icon={PlusSignIcon}
                  strokeWidth={2}
                  className="size-3.5"
                />
                <span>Create new snippet</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
