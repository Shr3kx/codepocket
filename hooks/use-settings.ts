"use client";

import { useState, useEffect, useCallback } from "react";

export interface CodePocketSettings {
  // Appearance
  theme: "light" | "dark" | "system";
  accentColor: "blue" | "green" | "purple" | "orange" | "red" | "pink";
  fontSize: "small" | "medium" | "large";

  // Syntax Highlighting
  codeThemeLight: string;
  codeThemeDark: string;
  showLineNumbers: boolean;
  lineNumberStart: number;
  codeWrapping: "on" | "off" | "wordWrapColumn";
  highlightActiveLine: boolean;
  fontSizeCode: number;

  // Editor Preferences
  editorFontFamily: string;
  editorFontSize: number;
  tabSize: number;
  insertSpaces: boolean;
  wordWrap: "on" | "off" | "wordWrapColumn";
  autoSave: boolean;
  autoSaveInterval: number;
  formatOnSave: boolean;
  defaultLanguage: string;
  defaultFolder: string;
  defaultTemplate: string;

  // Snippet Organization
  sortBy: "date" | "title" | "language" | "folder";
  sortOrder: "asc" | "desc";
  snippetsPerPage: number;
  showTags: boolean;
  showLanguage: boolean;
  searchBehavior: "fuzzy" | "exact" | "regex";
  autoTagSuggestions: boolean;
}

const DEFAULT_SETTINGS: CodePocketSettings = {
  theme: "system",
  accentColor: "blue",
  fontSize: "medium",
  codeThemeLight: "vs",
  codeThemeDark: "vscDarkPlus",
  showLineNumbers: true,
  lineNumberStart: 1,
  codeWrapping: "off",
  highlightActiveLine: false,
  fontSizeCode: 12,
  editorFontFamily: "monaco",
  editorFontSize: 14,
  tabSize: 2,
  insertSpaces: true,
  wordWrap: "off",
  autoSave: true,
  autoSaveInterval: 30,
  formatOnSave: false,
  defaultLanguage: "javascript",
  defaultFolder: "Personal",
  defaultTemplate: "",
  sortBy: "date",
  sortOrder: "desc",
  snippetsPerPage: 50,
  showTags: true,
  showLanguage: true,
  searchBehavior: "fuzzy",
  autoTagSuggestions: true,
};

const STORAGE_KEY = "CodePocket_settings";

export function useSettings() {
  const [settings, setSettings] = useState<CodePocketSettings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load settings from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setSettings({ ...DEFAULT_SETTINGS, ...parsed });
        } catch {
          setSettings(DEFAULT_SETTINGS);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }
  }, [settings, isLoaded]);

  const updateSetting = useCallback(
    <K extends keyof CodePocketSettings>(
      key: K,
      value: CodePocketSettings[K]
    ) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const updateSettings = useCallback((updates: Partial<CodePocketSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, []);

  return {
    settings,
    updateSetting,
    updateSettings,
    resetSettings,
    isLoaded,
  };
}
