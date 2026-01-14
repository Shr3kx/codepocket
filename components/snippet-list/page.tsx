"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DeleteIcon,
  EditIcon,
  FolderIcon,
  TagIcon,
} from "@hugeicons/core-free-icons";

import { Snippet, FOLDERS } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "@/components/ui/context-menu";
import { cn } from "@/lib/utils";

interface SnippetListProps {
  snippets: Snippet[];
  onEdit: (snippet: Snippet) => void;
  onDelete: (id: string) => void;
  onMove?: (snippetId: string, folder: string) => void;
  className?: string;
}

export function SnippetList({
  snippets,
  onEdit,
  onDelete,
  onMove,
  className,
}: SnippetListProps) {
  if (snippets.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-1", className)}>
      <AnimatePresence>
        {snippets.map((snippet) => (
          <motion.div
            key={snippet.id}
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="group"
          >
            <ContextMenu>
              <ContextMenuTrigger className="w-full">
                <div className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
              {/* Title and Metadata */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold text-sm truncate">
                    {snippet.title}
                  </h3>
                  <Badge variant="secondary" className="uppercase text-[10px] px-1.5 py-0">
                    {snippet.language}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <HugeiconsIcon
                      icon={FolderIcon}
                      strokeWidth={2}
                      className="size-3"
                    />
                    <span>{snippet.folder}</span>
                  </div>
                  {snippet.tags.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {snippet.tags.slice(0, 3).map((tag) => (
                        <div
                          key={tag}
                          className="flex items-center gap-1 text-muted-foreground"
                        >
                          <HugeiconsIcon
                            icon={TagIcon}
                            strokeWidth={2}
                            className="size-2.5"
                          />
                          <span>{tag}</span>
                        </div>
                      ))}
                      {snippet.tags.length > 3 && (
                        <span className="text-muted-foreground">
                          +{snippet.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                  {snippet.description && (
                    <span className="truncate max-w-[200px]">
                      {snippet.description}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(snippet)}
                  className="size-7"
                >
                  <HugeiconsIcon icon={EditIcon} strokeWidth={2} />
                  <span className="sr-only">Edit snippet</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(snippet.id)}
                  className="size-7 text-destructive hover:text-destructive"
                >
                  <HugeiconsIcon icon={DeleteIcon} strokeWidth={2} />
                  <span className="sr-only">Delete snippet</span>
                </Button>
              </div>
            </div>
              </ContextMenuTrigger>
              <ContextMenuContent className="w-56">
                <ContextMenuItem
                  onClick={() => onEdit(snippet)}
                  className="cursor-pointer"
                >
                  <HugeiconsIcon
                    icon={EditIcon}
                    strokeWidth={2}
                    className="mr-2 size-4"
                  />
                  Edit Snippet
                </ContextMenuItem>

                {onMove && (
                  <ContextMenuSub>
                    <ContextMenuSubTrigger className="cursor-pointer">
                      <HugeiconsIcon
                        icon={FolderIcon}
                        strokeWidth={2}
                        className="mr-2 size-4"
                      />
                      Move Snippet to
                    </ContextMenuSubTrigger>
                    <ContextMenuSubContent>
                      {FOLDERS.map((folder) => (
                        <ContextMenuItem
                          key={folder}
                          onClick={() => onMove(snippet.id, folder)}
                          disabled={snippet.folder === folder}
                          className="cursor-pointer"
                        >
                          {folder}
                        </ContextMenuItem>
                      ))}
                    </ContextMenuSubContent>
                  </ContextMenuSub>
                )}

                <ContextMenuSeparator />

                <ContextMenuItem
                  onClick={() => onDelete(snippet.id)}
                  variant="destructive"
                  className="cursor-pointer"
                >
                  <HugeiconsIcon
                    icon={DeleteIcon}
                    strokeWidth={2}
                    className="mr-2 size-4"
                  />
                  Delete Snippet
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
