export interface Snippet {
  id: string
  title: string
  description: string
  code: string
  language: string
  tags: string[]
  folder: string
  createdAt: number
  updatedAt: number
}

export interface EditorSettings {
  fontSize: number
  lineHeight: number
  tabSize: number
}

export type Theme = "light" | "dark"

export const LANGUAGES = [
  "javascript",
  "typescript",
  "python",
  "go",
  "rust",
  "java",
  "cpp",
  "html",
  "css",
  "json",
  "markdown",
  "sql",
  "shell",
] as const

export const FOLDERS = [
  "Personal",
  "Work",
  "Open Source",
  "Learning",
  "Archived",
] as const