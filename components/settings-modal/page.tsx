"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { HugeiconsIcon } from "@hugeicons/react";
import { SettingsIcon } from "@hugeicons/core-free-icons";
import { useSettingsContext } from "@/contexts/settings-context";
import { TabNavigation } from "./tab-navigation";
import { AppearanceTab } from "./appearance-tab";
import { CodeViewingTab } from "./code-viewing-tab";
import { EditorTab } from "./editor-tab";
import { SnippetsTab } from "./snippets-tab";
import { GeneralTab } from "./general-tab";
import type { TabId } from "./types";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { isLoaded } = useSettingsContext();
  const [activeTab, setActiveTab] = React.useState<TabId>("appearance");

  if (!isLoaded) {
    return null;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "appearance":
        return <AppearanceTab />;
      case "code-viewing":
        return <CodeViewingTab />;
      case "editor":
        return <EditorTab />;
      case "snippets":
        return <SnippetsTab />;
      case "general":
        return <GeneralTab />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-5xl lg:max-w-6xl h-[600px] md:h-[700px] overflow-hidden flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/40 flex-shrink-0">
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <HugeiconsIcon
              icon={SettingsIcon}
              strokeWidth={2}
              className="size-5"
            />
            Settings
          </DialogTitle>
          {/* <DialogDescription className="text-sm text-muted-foreground">
            Customize your CodePocket experience - all changes apply instantly
          </DialogDescription> */}
        </DialogHeader>

        <div className="flex flex-col md:flex-row flex-1 min-h-0 overflow-hidden">
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="flex-1 min-w-0 overflow-y-auto bg-background">
            <div className="p-6 space-y-8">{renderTabContent()}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
