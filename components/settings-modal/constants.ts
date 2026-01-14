import {
  SunIcon,
  CodeIcon,
  Terminal,
  HelpCircleIcon,
  ViewIcon,
} from "@hugeicons/core-free-icons";
import type { Tab } from "./types";

export const CODE_THEMES = [
  { value: "vs", label: "Visual Studio Light" },
  { value: "vscDarkPlus", label: "VS Code Dark+" },
  { value: "dracula", label: "Dracula" },
  { value: "atomOneDark", label: "Atom One Dark" },
  { value: "atomOneLight", label: "Atom One Light" },
  { value: "github", label: "GitHub" },
  { value: "nightOwl", label: "Night Owl" },
  { value: "oneDark", label: "One Dark" },
  { value: "oneLight", label: "One Light" },
  { value: "shadesOfPurple", label: "Shades of Purple" },
  { value: "synthwave84", label: "Synthwave '84" },
  { value: "tokyoNight", label: "Tokyo Night" },
  { value: "coldarkDark", label: "Coldark Dark" },
  { value: "coldarkCold", label: "Coldark Cold" },
  { value: "materialDark", label: "Material Dark" },
  { value: "materialLight", label: "Material Light" },
  { value: "nord", label: "Nord" },
  { value: "okaidia", label: "Okaidia" },
  { value: "prism", label: "Prism" },
  { value: "twilight", label: "Twilight" },
] as const;

export const FONT_FAMILIES = [
  { value: "monaco", label: "Monaco" },
  { value: "consolas", label: "Consolas" },
  { value: "fira-code", label: "Fira Code" },
  { value: "jetbrains-mono", label: "JetBrains Mono" },
  { value: "source-code-pro", label: "Source Code Pro" },
  { value: "courier-new", label: "Courier New" },
  { value: "monospace", label: "System Monospace" },
] as const;

export const TABS: Tab[] = [
  { id: "appearance", label: "Appearance", icon: SunIcon },
  { id: "code-viewing", label: "Code Viewing", icon: ViewIcon },
  { id: "editor", label: "Editor", icon: Terminal },
  { id: "snippets", label: "Snippets", icon: CodeIcon },
  { id: "general", label: "General", icon: HelpCircleIcon },
];

export const SELECT_INPUT_WIDTH = "w-[200px]";
