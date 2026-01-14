"use client";

import * as React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";
import { TABS } from "./constants";
import type { TabId } from "./types";

interface TabNavigationProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-border/40 bg-muted/20 flex-shrink-0 overflow-hidden">
      <nav className="p-2 md:p-3 h-full">
        <div className="flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible md:overflow-y-auto">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
                  "hover:bg-secondary/30 cursor-pointer",
                  isActive
                    ? "bg-secondary text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <HugeiconsIcon
                  icon={Icon}
                  strokeWidth={2}
                  className="size-4 flex-shrink-0"
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
