"use client";

import * as React from "react";
import { useSettings, CodePocketSettings } from "@/hooks/use-settings";

interface SettingsContextType {
  settings: CodePocketSettings;
  updateSetting: <K extends keyof CodePocketSettings>(
    key: K,
    value: CodePocketSettings[K]
  ) => void;
  updateSettings: (updates: Partial<CodePocketSettings>) => void;
  resetSettings: () => void;
  isLoaded: boolean;
}

const SettingsContext = React.createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const settings = useSettings();

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettingsContext() {
  const context = React.useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettingsContext must be used within SettingsProvider");
  }
  return context;
}
