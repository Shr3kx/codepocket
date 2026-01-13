"use client";

import * as React from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PlusSignIcon,
  FloppyDiskIcon,
  Copy01Icon,
  SettingsIcon,
} from "@hugeicons/core-free-icons";

export interface GlobalContextMenuActions {
  onAddNewSnippet?: () => void;
  onOpenLastSavedSnippet?: () => void;
  onCopyLastAddedSnippet?: () => void;
  onOpenSettings?: () => void;
}

interface GlobalContextMenuProps {
  children: React.ReactNode;
  actions: GlobalContextMenuActions;
}

const GlobalContextMenuContext =
  React.createContext<GlobalContextMenuActions | null>(null);

export function useGlobalContextMenu() {
  const context = React.useContext(GlobalContextMenuContext);
  if (!context) {
    throw new Error(
      "useGlobalContextMenu must be used within GlobalContextMenu"
    );
  }
  return context;
}

export function GlobalContextMenu({
  children,
  actions,
}: GlobalContextMenuProps) {
  return (
    <GlobalContextMenuContext.Provider value={actions}>
      <ContextMenu>
        <ContextMenuTrigger className="h-full w-full block border-0 bg-transparent p-0">
          <div className="h-full w-full">{children}</div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-56">
          <ContextMenuItem
            onClick={actions.onAddNewSnippet}
            className="cursor-pointer"
          >
            <HugeiconsIcon
              icon={PlusSignIcon}
              strokeWidth={2}
              className="mr-2 size-4"
            />
            Add New Snippet
            {/* <ContextMenuShortcut>⌘N</ContextMenuShortcut> */}
          </ContextMenuItem>

          <ContextMenuSeparator />

          <ContextMenuItem
            onClick={actions.onOpenLastSavedSnippet}
            disabled={!actions.onOpenLastSavedSnippet}
            className="cursor-pointer"
          >
            <HugeiconsIcon
              icon={FloppyDiskIcon}
              strokeWidth={2}
              className="mr-2 size-4"
            />
            Open Last Saved Snippet
            {/* <ContextMenuShortcut>⌘O</ContextMenuShortcut> */}
          </ContextMenuItem>

          <ContextMenuItem
            onClick={actions.onCopyLastAddedSnippet}
            disabled={!actions.onCopyLastAddedSnippet}
            className="cursor-pointer"
          >
            <HugeiconsIcon
              icon={Copy01Icon}
              strokeWidth={2}
              className="mr-2 size-4"
            />
            Copy Last Added Snippet
            {/* <ContextMenuShortcut>⌘⇧C</ContextMenuShortcut> */}
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem
            onClick={actions.onOpenSettings}
            className="cursor-pointer"
          >
            <HugeiconsIcon
              icon={SettingsIcon}
              strokeWidth={2}
              className="mr-2 size-4"
            />
            Settings
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </GlobalContextMenuContext.Provider>
  );
}
