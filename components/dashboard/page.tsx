"use client";

import * as React from "react";
import { useState } from "react";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Header } from "@/components/header/page";
import { SnippetGrid } from "@/components/snippet-grid/page";
import { EmptyState } from "@/components/empty-state/page";
import { EditorModal } from "@/components/editor-modal/page";
import { SettingsModal } from "@/components/settings-modal/page";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignIcon, LayoutIcon } from "@hugeicons/core-free-icons";
import { Snippet } from "@/lib/types";
import { useSnippets } from "@/hooks/use-snippets";
import { useFilters } from "@/hooks/use-filters";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { GlobalContextMenu } from "@/components/global-context-menu";
import { cn } from "@/lib/utils";

interface DashboardProps {
  onSignOut: () => void;
  className?: string;
}

export function Dashboard({ onSignOut, className }: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState<Snippet | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const { snippets, saveSnippet, deleteSnippet } = useSnippets();
  const { filteredSnippets, allTags } = useFilters(snippets, {
    searchQuery,
    selectedFolder,
    selectedTag,
    selectedLang,
  });

  const handleSaveSnippet = (data: Partial<Snippet>) => {
    saveSnippet(data, editingSnippet?.id);
    setIsEditorOpen(false);
    setEditingSnippet(null);
  };

  const handleEditSnippet = (snippet: Snippet) => {
    setEditingSnippet(snippet);
    setIsEditorOpen(true);
  };

  const handleNewSnippet = () => {
    setEditingSnippet(null);
    setIsEditorOpen(true);
  };

  const handleOpenLastSavedSnippet = () => {
    // TODO: Implement open last saved snippet functionality
    if (snippets.length > 0) {
      // Sort by updatedAt descending and get the most recently saved
      const lastSaved = [...snippets].sort(
        (a, b) => b.updatedAt - a.updatedAt
      )[0];
      if (lastSaved) {
        handleEditSnippet(lastSaved);
      }
    }
  };

  const handleCopyLastAddedSnippet = async () => {
    // TODO: Implement copy last added snippet functionality
    if (snippets.length > 0) {
      // Get the most recently created snippet
      const lastAdded = [...snippets].sort(
        (a, b) => b.createdAt - a.createdAt
      )[0];
      if (lastAdded?.code) {
        try {
          await navigator.clipboard.writeText(lastAdded.code);
          // You could add a toast notification here
          console.log("Copied to clipboard:", lastAdded.title);
        } catch (err) {
          console.error("Failed to copy:", err);
        }
      }
    }
  };

  const handleOpenSettings = () => {
    setIsSettingsOpen(true);
  };

  const getHeaderTitle = () => {
    if (selectedFolder) return selectedFolder;
    if (selectedTag) return `#${selectedTag}`;
    return "My Library";
  };

  return (
    <GlobalContextMenu
      actions={{
        onAddNewSnippet: handleNewSnippet,
        onOpenLastSavedSnippet: handleOpenLastSavedSnippet,
        onCopyLastAddedSnippet: handleCopyLastAddedSnippet,
        onOpenSettings: handleOpenSettings,
      }}
    >
      <SidebarProvider>
        <AppSidebar
          selectedFolder={selectedFolder}
          onFolderSelect={setSelectedFolder}
          selectedLang={selectedLang}
          onLangSelect={setSelectedLang}
          selectedTag={selectedTag}
          onTagSelect={setSelectedTag}
          allTags={allTags}
          onSignOut={onSignOut}
        />
        <SidebarInset>
          <Header
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onNewSnippet={handleNewSnippet}
          />

          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-black">{getHeaderTitle()}</h1>
                  <p className="text-muted-foreground mt-1">
                    {filteredSnippets.length} snippets found
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="shadow-sm">
                    <HugeiconsIcon icon={LayoutIcon} strokeWidth={2} />
                    <span className="sr-only">Grid view</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="shadow-sm opacity-50"
                    disabled
                  >
                    <HugeiconsIcon icon={LayoutIcon} strokeWidth={2} />
                    <span className="sr-only">List view</span>
                  </Button>
                </div>
              </div>

              {filteredSnippets.length > 0 ? (
                <SnippetGrid
                  snippets={filteredSnippets}
                  onEdit={handleEditSnippet}
                  onDelete={deleteSnippet}
                />
              ) : (
                <EmptyState onNewSnippet={handleNewSnippet} />
              )}
            </div>
          </div>

          {/* Mobile FAB */}
          <Button
            onClick={handleNewSnippet}
            size="icon"
            className="sm:hidden fixed bottom-6 right-6 size-14 rounded-full shadow-2xl z-40"
          >
            <HugeiconsIcon
              icon={PlusSignIcon}
              strokeWidth={2}
              className="size-6"
            />
            <span className="sr-only">New snippet</span>
          </Button>

          <EditorModal
            isOpen={isEditorOpen}
            snippet={editingSnippet}
            onClose={() => {
              setIsEditorOpen(false);
              setEditingSnippet(null);
            }}
            onSave={handleSaveSnippet}
          />

          <SettingsModal
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
          />
        </SidebarInset>
      </SidebarProvider>
    </GlobalContextMenu>
  );
}
