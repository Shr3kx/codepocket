import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import * as themes from "react-syntax-highlighter/dist/cjs/styles/prism";

export type ThemeName =
  | "vs"
  | "vscDarkPlus"
  | "dracula"
  | "atomOneDark"
  | "atomOneLight"
  | "github"
  | "nightOwl"
  | "oneDark"
  | "oneLight"
  | "shadesOfPurple"
  | "synthwave84"
  | "tokyoNight"
  | "coldarkDark"
  | "coldarkCold"
  | "materialDark"
  | "materialLight"
  | "nord"
  | "okaidia"
  | "prism"
  | "twilight";

// Map theme names to their corresponding theme objects
const themeMap: Record<string, any> = {
  vs: themes.vs,
  vscDarkPlus: themes.vscDarkPlus,
  dracula: themes.dracula,
  atomOneDark: themes.atomOneDark,
  atomOneLight: themes.atomOneLight,
  github: themes.github,
  nightOwl: themes.nightOwl,
  oneDark: themes.oneDark,
  oneLight: themes.oneLight,
  shadesOfPurple: themes.shadesOfPurple,
  synthwave84: themes.synthwave84,
  tokyoNight: themes.tokyoNight,
  coldarkDark: themes.coldarkDark,
  coldarkCold: themes.coldarkCold,
  materialDark: themes.materialDark,
  materialLight: themes.materialLight,
  nord: themes.nord,
  okaidia: themes.okaidia,
  prism: themes.prism,
  twilight: themes.twilight,
};

export function getTheme(themeName: string): any {
  return themeMap[themeName] || themes.vs; // Fallback to 'vs' if theme not found
}
