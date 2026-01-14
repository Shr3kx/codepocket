"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DeleteIcon,
  EditIcon,
  FolderIcon,
  TagIcon,
} from "@hugeicons/core-free-icons";

import { Snippet, FOLDERS } from "@/lib/types";
import { CodeBlock } from "../code-block/page";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
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

interface SnippetCardProps {
  snippet: Snippet;
  onEdit: (snippet: Snippet) => void;
  onDelete: (id: string) => void;
  onMove?: (snippetId: string, folder: string) => void;
  className?: string;
}

export function SnippetCard({
  snippet,
  onEdit,
  onDelete,
  onMove,
  className,
}: SnippetCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      className={cn("group", className)}
    >
      <ContextMenu>
        <ContextMenuTrigger className="w-full">
          <Card className="relative">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0">
              <CardTitle className="truncate max-w-[200px]">
                {snippet.title}
              </CardTitle>
              <CardDescription className="mt-1 flex items-center gap-1">
                <HugeiconsIcon
                  icon={FolderIcon}
                  strokeWidth={2}
                  className="size-3"
                />
                {snippet.folder}
              </CardDescription>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
        </CardHeader>

        <CardContent>
          <p className="text-xs/relaxed text-muted-foreground mb-4 line-clamp-2 min-h-[40px]">
            {snippet.description || "No description provided."}
          </p>

          <div className="relative mb-4 max-h-[160px] overflow-hidden rounded-lg">
            <CodeBlock code={snippet.code} language={snippet.language} />
            <div className="absolute inset-0 bg-gradient-to-t from-background/5 to-transparent pointer-events-none" />
          </div>
        </CardContent>

        <CardFooter className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="uppercase tracking-wider">
            {snippet.language}
          </Badge>
          {snippet.tags.map(tag => (
            <Badge key={tag} variant="outline" className="gap-1">
              <HugeiconsIcon
                icon={TagIcon}
                strokeWidth={2}
                className="size-2.5"
              />
              {tag}
            </Badge>
          ))}
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
  );
}
