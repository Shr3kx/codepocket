"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  vs,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { HugeiconsIcon } from "@hugeicons/react";
import { Copy01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSettingsContext } from "@/contexts/settings-context";
import { getTheme } from "@/lib/syntax-themes";

interface CodeBlockProps {
  code: string;
  language: string;
  className?: string;
  onCopy?: () => void;
}

export function CodeBlock({
  code,
  language,
  className,
  onCopy,
}: CodeBlockProps) {
  const { settings } = useSettingsContext();
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Use light theme as default during SSR to prevent hydration mismatch
  const isDark = mounted ? resolvedTheme === "dark" || theme === "dark" : false;
  const selectedTheme = mounted
    ? isDark
      ? getTheme(settings.codeThemeDark)
      : getTheme(settings.codeThemeLight)
    : getTheme(settings.codeThemeLight);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    if (onCopy) {
      onCopy();
    } else {
      alert("Code copied to clipboard!");
    }
  };

  // Determine wrap lines based on codeWrapping setting
  const wrapLines =
    settings.codeWrapping === "on" ||
    settings.codeWrapping === "wordWrapColumn";

  return (
    <div
    // data-slot="code-block"
    // className={cn(
    //   "ring-foreground/10 bg-card text-card-foreground overflow-hidden rounded-lg border border-border ring-1 relative group",
    //   settings.highlightActiveLine && "highlight-active-line",
    //   className,
    // )}
    >
      <SyntaxHighlighter
        language={language}
        style={selectedTheme}
        showLineNumbers={settings.showLineNumbers}
        startingLineNumber={settings.lineNumberStart}
        wrapLines={wrapLines}
        wrapLongLines={wrapLines}
        customStyle={{
          margin: 0,
          padding: "1rem",
          paddingTop: "1rem",
          paddingRight: "2.5rem",
          fontSize: `${settings.fontSizeCode}px`,
          lineHeight: "1.5",
        }}
        lineNumberStyle={{
          minWidth: "3em",
          paddingRight: "1em",
          textAlign: "right",
          userSelect: "none",
        }}
        PreTag="div"
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
