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
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

interface SnippetCompactGridProps {
  snippets: Snippet[];
  onEdit: (snippet: Snippet) => void;
  onDelete: (id: string) => void;
  onMove?: (snippetId: string, folder: string) => void;
  className?: string;
}

export function SnippetCompactGrid({
  snippets,
  onEdit,
  onDelete,
  onMove,
  className,
}: SnippetCompactGridProps) {
  if (snippets.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3",
        className
      )}
    >
      <AnimatePresence>
        {snippets.map(snippet => (
          <motion.div
            key={snippet.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -2 }}
            className="group"
          >
            <ContextMenu>
              <ContextMenuTrigger className="w-full">
                <Card className="relative h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-sm truncate">
                          {snippet.title}
                        </CardTitle>
                        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                          <HugeiconsIcon
                            icon={FolderIcon}
                            strokeWidth={2}
                            className="size-2.5"
                          />
                          <span className="truncate">{snippet.folder}</span>
                        </div>
                      </div>
                      {/* <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(snippet)}
                      className="size-6"
                    >
                      <HugeiconsIcon icon={EditIcon} strokeWidth={2} className="size-3" />
                      <span className="sr-only">Edit snippet</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(snippet.id)}
                      className="size-6 text-destructive hover:text-destructive"
                    >
                      <HugeiconsIcon icon={DeleteIcon} strokeWidth={2} className="size-3" />
                      <span className="sr-only">Delete snippet</span>
                    </Button>
                  </div> */}
                    </div>
                  </CardHeader>

                  <CardContent className="pb-2">
                    {snippet.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                        {snippet.description}
                      </p>
                    )}
                  </CardContent>

                  <CardFooter className="flex flex-wrap gap-1.5 pt-0">
                    <Badge
                      variant="secondary"
                      className="uppercase text-[9px] px-1 py-0"
                    >
                      {snippet.language}
                    </Badge>
                    {snippet.tags.slice(0, 2).map(tag => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="gap-0.5 text-[9px] px-1 py-0"
                      >
                        <HugeiconsIcon
                          icon={TagIcon}
                          strokeWidth={2}
                          className="size-2"
                        />
                        <span className="truncate max-w-[60px]">{tag}</span>
                      </Badge>
                    ))}
                    {snippet.tags.length > 2 && (
                      <Badge variant="outline" className="text-[9px] px-1 py-0">
                        +{snippet.tags.length - 2}
                      </Badge>
                    )}
                  </CardFooter>
                </Card>
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
                      {FOLDERS.map(folder => (
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
