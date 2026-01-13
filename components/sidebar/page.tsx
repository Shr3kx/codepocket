"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  FolderIcon,
  CodeIcon,
  TagIcon,
  LogoutIcon,
} from "@hugeicons/core-free-icons";
import { FOLDERS, LANGUAGES } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFolder: string | null;
  onFolderSelect: (folder: string | null) => void;
  selectedLang: string | null;
  onLangSelect: (lang: string | null) => void;
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
  allTags: string[];
  onSignOut: () => void;
}

export function Sidebar({
  isOpen,
  onClose,
  selectedFolder,
  onFolderSelect,
  selectedLang,
  onLangSelect,
  selectedTag,
  onTagSelect,
  allTags,
  onSignOut,
}: SidebarProps) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.aside
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 280, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          className="border-r border-border bg-card overflow-hidden flex flex-col shrink-0 z-40"
        >
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <HugeiconsIcon
                  icon={CodeIcon}
                  strokeWidth={2}
                  className="w-5 h-5 text-primary-foreground"
                />
              </div>
              <span className="font-bold text-lg tracking-tight">
                CodePocket
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden size-7"
            >
              <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6">
            {/* Folders */}
            <div>
              <h4 className="px-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
                <HugeiconsIcon
                  icon={FolderIcon}
                  strokeWidth={2}
                  className="size-3"
                />
                Collections
              </h4>
              <div className="space-y-1">
                <Button
                  variant={!selectedFolder ? "secondary" : "ghost"}
                  onClick={() => onFolderSelect(null)}
                  className="w-full justify-start"
                >
                  <HugeiconsIcon
                    icon={CodeIcon}
                    strokeWidth={2}
                    className="size-4"
                  />
                  All Snippets
                </Button>
                {FOLDERS.map(f => (
                  <Button
                    key={f}
                    variant={selectedFolder === f ? "secondary" : "ghost"}
                    onClick={() => onFolderSelect(f)}
                    className="w-full justify-start"
                  >
                    <HugeiconsIcon
                      icon={FolderIcon}
                      strokeWidth={2}
                      className="size-4"
                    />
                    {f}
                  </Button>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <h4 className="px-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
                <HugeiconsIcon
                  icon={CodeIcon}
                  strokeWidth={2}
                  className="size-3"
                />
                Languages
              </h4>
              <div className="flex flex-wrap gap-1 px-2">
                <Button
                  variant={!selectedLang ? "default" : "outline"}
                  size="xs"
                  onClick={() => onLangSelect(null)}
                  className="text-xs"
                >
                  All
                </Button>
                {LANGUAGES.slice(0, 8).map(lang => (
                  <Button
                    key={lang}
                    variant={selectedLang === lang ? "default" : "outline"}
                    size="xs"
                    onClick={() => onLangSelect(lang)}
                    className="text-xs capitalize"
                  >
                    {lang}
                  </Button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h4 className="px-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
                <HugeiconsIcon
                  icon={TagIcon}
                  strokeWidth={2}
                  className="size-3"
                />
                Popular Tags
              </h4>
              <div className="space-y-1">
                {allTags.map(tag => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? "secondary" : "ghost"}
                    onClick={() =>
                      onTagSelect(selectedTag === tag ? null : tag)
                    }
                    className="w-full justify-between text-xs"
                  >
                    <span>#{tag}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-border">
            <Button
              variant="ghost"
              onClick={onSignOut}
              className="w-full justify-start text-destructive hover:text-destructive"
            >
              <HugeiconsIcon icon={LogoutIcon} strokeWidth={2} />
              Sign Out
            </Button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
