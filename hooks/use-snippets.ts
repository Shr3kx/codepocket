"use client";

import { useState, useEffect } from "react";
import { Snippet } from "@/lib/types";

const STORAGE_KEY = "CodePocket_data";

const DEMO_SNIPPET: Snippet = {
  id: "1",
  title: "React useLocalStorage Hook",
  description: "A custom hook for persisting state to localStorage.",
  code: `function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = value => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
}`,
  language: "javascript",
  tags: ["react", "hook", "storage"],
  folder: "Personal",
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

export function useSnippets() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);

  // Initialize data
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          setSnippets(JSON.parse(saved));
        } catch {
          setSnippets([DEMO_SNIPPET]);
        }
      } else {
        setSnippets([DEMO_SNIPPET]);
      }
    }
  }, []);

  // Save data
  useEffect(() => {
    if (typeof window !== "undefined" && snippets.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets));
    }
  }, [snippets]);

  const saveSnippet = (data: Partial<Snippet>, editingId?: string) => {
    if (editingId) {
      setSnippets(prev =>
        prev.map(s =>
          s.id === editingId
            ? ({ ...s, ...data, updatedAt: Date.now() } as Snippet)
            : s
        )
      );
    } else {
      const newSnippet: Snippet = {
        id: Math.random().toString(36).substr(2, 9),
        title: data.title || "Untitled",
        description: data.description || "",
        code: data.code || "",
        language: data.language || "javascript",
        tags: data.tags || [],
        folder: data.folder || "Personal",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      setSnippets(prev => [newSnippet, ...prev]);
    }
  };

  const deleteSnippet = (id: string) => {
    if (
      typeof window !== "undefined" &&
      confirm("Are you sure you want to delete this snippet?")
    ) {
      setSnippets(prev => prev.filter(s => s.id !== id));
    }
  };

  return {
    snippets,
    saveSnippet,
    deleteSnippet,
  };
}
