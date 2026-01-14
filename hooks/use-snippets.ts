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

const DEMO_SNIPPET_2: Snippet = {
  id: "2",
  title: "TypeScript Debounce Function",
  description: "A reusable debounce utility function with TypeScript generics.",
  code: `function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

// Usage
const debouncedSearch = debounce((query: string) => {
  console.log("Searching for:", query);
}, 300);`,
  language: "typescript",
  tags: ["typescript", "utility", "performance"],
  folder: "Work",
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

const DEMO_SNIPPET_3: Snippet = {
  id: "3",
  title: "Python Context Manager",
  description: "A custom context manager for file operations with error handling.",
  code: `from contextlib import contextmanager
from typing import Generator

@contextmanager
def safe_file_operation(filepath: str, mode: str = 'r') -> Generator:
    """Context manager for safe file operations."""
    file = None
    try:
        file = open(filepath, mode)
        yield file
    except FileNotFoundError:
        print(f"File {filepath} not found")
        raise
    except IOError as e:
        print(f"IO error: {e}")
        raise
    finally:
        if file:
            file.close()

# Usage
with safe_file_operation('data.txt', 'r') as f:
    content = f.read()
    print(content)`,
  language: "python",
  tags: ["python", "context-manager", "file-handling"],
  folder: "Learning",
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
          const parsed = JSON.parse(saved);
          // If parsed data is empty array or invalid, use demo snippets
          if (Array.isArray(parsed) && parsed.length > 0) {
            setSnippets(parsed);
          } else {
            setSnippets([DEMO_SNIPPET, DEMO_SNIPPET_2, DEMO_SNIPPET_3]);
          }
        } catch {
          setSnippets([DEMO_SNIPPET, DEMO_SNIPPET_2, DEMO_SNIPPET_3]);
        }
      } else {
        setSnippets([DEMO_SNIPPET, DEMO_SNIPPET_2, DEMO_SNIPPET_3]);
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
