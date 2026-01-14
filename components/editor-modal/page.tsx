"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  AiMagicIcon,
  LoadingIcon,
  FloppyDiskIcon,
} from "@hugeicons/core-free-icons";
import { Snippet, LANGUAGES, FOLDERS } from "@/lib/types";
// import { explainCode, suggestTags } from "@/services/geminiService"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useSettingsContext } from "@/contexts/settings-context";
import { getTheme } from "@/lib/syntax-themes";
import {
  vscDarkPlus,
  vs,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useTheme } from "next-themes";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Field, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";

interface EditorModalProps {
  snippet?: Snippet | null;
  onSave: (snippet: Partial<Snippet>) => void;
  onClose: () => void;
  isOpen: boolean;
}

export function EditorModal({
  snippet,
  onSave,
  onClose,
  isOpen,
}: EditorModalProps) {
  const { settings } = useSettingsContext();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    code: "",
    language: "javascript" as string,
    tags: [] as string[],
    folder: "Personal" as string,
  });
  const [tagInput, setTagInput] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (snippet) {
      setFormData({
        title: snippet.title || "",
        description: snippet.description || "",
        code: snippet.code || "",
        language: snippet.language || "javascript",
        tags: snippet.tags || [],
        folder: snippet.folder || "Personal",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        code: "",
        language: "javascript",
        tags: [],
        folder: "Personal",
      });
    }
  }, [snippet]);

  const handleAiOptimize = async () => {
    if (!formData.code) return;
    setIsAiLoading(true);
    try {
      // TODO: Implement AI optimization when API key is configured
      // const [explanation, tags] = await Promise.all([
      //   explainCode(formData.code, formData.language || 'javascript'),
      //   suggestTags(formData.code)
      // ]);
      // setFormData(prev => ({
      //   ...prev,
      //   description: explanation || prev.description,
      //   tags: [...new Set([...(prev.tags || []), ...tags])]
      // }));

      // Placeholder for now
      await new Promise(resolve => setTimeout(resolve, 500));
      alert(
        "AI optimization feature is not yet configured. Please set up the API key."
      );
    } catch (error) {
      console.error("AI optimization error:", error);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      setFormData(prev => ({
        ...prev,
        tags: [...new Set([...(prev.tags || []), tagInput.trim()])],
      }));
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: (prev.tags || []).filter(t => t !== tag),
    }));
  };

  if (!isOpen) return null;

  const languageItems = LANGUAGES.map(lang => ({
    label: lang.charAt(0).toUpperCase() + lang.slice(1),
    value: lang,
  }));

  const folderItems = FOLDERS.map(folder => ({
    label: folder,
    value: folder,
  }));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-xs"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={e => e.stopPropagation()}
          className={cn(
            "ring-foreground/10 bg-background text-foreground relative w-full max-w-4xl rounded-xl shadow-2xl border border-border ring-1 overflow-hidden flex flex-col max-h-[90vh]"
          )}
        >
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-sm font-medium">
              {snippet ? "Edit Snippet" : "New Snippet"}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="size-7"
            >
              <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          <div className="p-6 overflow-y-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Field>
                  <FieldLabel htmlFor="snippet-title">Title</FieldLabel>
                  <Input
                    id="snippet-title"
                    type="text"
                    value={formData.title}
                    onChange={e =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="E.g. React useFetch Hook"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="snippet-language">Language</FieldLabel>
                  <Select
                    items={languageItems}
                    value={formData.language}
                    onValueChange={value => {
                      if (value) {
                        setFormData({ ...formData, language: value });
                      }
                    }}
                  >
                    <SelectTrigger id="snippet-language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {languageItems.map(item => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="snippet-folder">Folder</FieldLabel>
                  <Select
                    items={folderItems}
                    value={formData.folder}
                    onValueChange={value => {
                      if (value) {
                        setFormData({ ...formData, folder: value });
                      }
                    }}
                  >
                    <SelectTrigger id="snippet-folder">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {folderItems.map(item => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              <div className="space-y-4">
                <Field>
                  <FieldLabel
                    htmlFor="snippet-description"
                    className="flex items-center justify-between w-full"
                  >
                    <span>Description</span>
                    <button
                      className="cursor-pointer"
                      onClick={handleAiOptimize}
                      disabled={isAiLoading || !formData.code}
                    >
                      Generate with AI
                    </button>
                  </FieldLabel>
                  <Textarea
                    id="snippet-description"
                    value={formData.description}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    rows={4}
                    placeholder="Short description of what this does..."
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="snippet-tags">Tags</FieldLabel>
                  <div className="flex flex-wrap gap-2 p-2 border border-border rounded-md bg-input/20 dark:bg-input/30 min-h-7">
                    {formData.tags?.map(tag => (
                      <Badge key={tag} variant="secondary" className="gap-1">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="ml-1">
                          <HugeiconsIcon
                            icon={Cancel01Icon}
                            strokeWidth={2}
                            className="size-2.5"
                          />
                          <span className="sr-only">Remove tag</span>
                        </button>
                      </Badge>
                    ))}
                    <Input
                      id="snippet-tags"
                      value={tagInput}
                      onChange={e => setTagInput(e.target.value)}
                      onKeyDown={handleAddTag}
                      className="bg-transparent border-0 focus-visible:ring-0 h-auto p-0 text-xs min-w-[80px] flex-1"
                      placeholder="Add tag..."
                    />
                  </div>
                </Field>
              </div>
            </div>

            <Field>
              <FieldLabel htmlFor="snippet-code">Code Content</FieldLabel>
              <div className={cn(
                "relative h-[300px] rounded-md border border-border overflow-hidden bg-background",
                settings.highlightActiveLine && "highlight-active-line"
              )}>
                <div className="absolute inset-0 overflow-auto [&>pre]:!bg-transparent">
                  <SyntaxHighlighter
                    language={formData.language || "javascript"}
                    style={
                      mounted
                        ? resolvedTheme === "dark" || theme === "dark"
                          ? getTheme(settings.codeThemeDark)
                          : getTheme(settings.codeThemeLight)
                        : getTheme(settings.codeThemeLight)
                    }
                    showLineNumbers={settings.showLineNumbers}
                    startingLineNumber={settings.lineNumberStart}
                    wrapLines={settings.codeWrapping === "on" || settings.codeWrapping === "wordWrapColumn"}
                    wrapLongLines={settings.codeWrapping === "on" || settings.codeWrapping === "wordWrapColumn"}
                    customStyle={{
                      margin: 0,
                      padding: "0.75rem",
                      fontSize: `${settings.fontSizeCode}px`,
                      lineHeight: "1.5",
                      background: "transparent",
                      minHeight: "100%",
                    }}
                    lineNumberStyle={{
                      minWidth: "3em",
                      paddingRight: "1em",
                      textAlign: "right",
                      userSelect: "none",
                    }}
                    PreTag="div"
                    codeTagProps={{
                      style: {
                        fontFamily:
                          "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                      },
                    }}
                  >
                    {formData.code || " "}
                  </SyntaxHighlighter>
                </div>
                <Textarea
                  id="snippet-code"
                  value={formData.code}
                  onChange={e =>
                    setFormData({ ...formData, code: e.target.value })
                  }
                  onScroll={e => {
                    const target = e.target as HTMLTextAreaElement;
                    const highlightDiv = target.parentElement?.querySelector(
                      'div[class*="overflow-auto"]'
                    ) as HTMLElement;
                    if (highlightDiv) {
                      highlightDiv.scrollTop = target.scrollTop;
                      highlightDiv.scrollLeft = target.scrollLeft;
                    }
                  }}
                  className="relative h-full w-full font-mono text-xs bg-transparent text-transparent caret-foreground resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-transparent"
                  placeholder="Paste your code here..."
                  style={{
                    color: "transparent",
                    WebkitTextFillColor: "transparent",
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                    fontSize: "0.75rem",
                    lineHeight: "1.5",
                    padding: "0.75rem",
                  }}
                />
              </div>
            </Field>
          </div>

          <div className="p-6 border-t border-border flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={() => onSave(formData)}>
              <HugeiconsIcon icon={FloppyDiskIcon} strokeWidth={2} />
              Save Snippet
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
