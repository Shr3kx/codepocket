"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldGroup,
} from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  SettingsIcon,
  SunIcon,
  CodeIcon,
  Terminal,
  HelpCircleIcon,
  ViewIcon,
} from "@hugeicons/core-free-icons";
import { useSettings } from "@/hooks/use-settings";
import { LANGUAGES, FOLDERS } from "@/lib/types";
import { useTheme } from "next-themes";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Available syntax highlighting themes
const CODE_THEMES = [
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
];

const FONT_FAMILIES = [
  { value: "monaco", label: "Monaco" },
  { value: "consolas", label: "Consolas" },
  { value: "fira-code", label: "Fira Code" },
  { value: "jetbrains-mono", label: "JetBrains Mono" },
  { value: "source-code-pro", label: "Source Code Pro" },
  { value: "courier-new", label: "Courier New" },
  { value: "monospace", label: "System Monospace" },
];

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { settings, updateSetting, isLoaded } = useSettings();
  const { setTheme } = useTheme();

  // Handle theme change
  const handleThemeChange = (value: string | null) => {
    if (!value) return;
    updateSetting("theme", value as "light" | "dark" | "system");
    if (value !== "system") {
      setTheme(value);
    } else {
      setTheme("system");
    }
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <HugeiconsIcon
              icon={SettingsIcon}
              strokeWidth={2}
              className="size-5"
            />
            Settings
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Customize your CodePocket experience - all changes apply instantly
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <Tabs
            defaultValue="appearance"
            orientation="horizontal"
            className="w-full"
          >
            <div className="border-b px-6 overflow-x-auto bg-muted/30">
              <TabsList
                variant="line"
                className="w-full sm:w-auto justify-start h-auto bg-transparent p-0 min-w-fit"
              >
                <TabsTrigger
                  value="appearance"
                  className="px-4 py-3 gap-1.5 whitespace-nowrap"
                >
                  <HugeiconsIcon
                    icon={SunIcon}
                    strokeWidth={2}
                    className="size-4"
                  />
                  Appearance
                </TabsTrigger>
                <TabsTrigger
                  value="code-viewing"
                  className="px-4 py-3 gap-1.5 whitespace-nowrap"
                >
                  <HugeiconsIcon
                    icon={ViewIcon}
                    strokeWidth={2}
                    className="size-4"
                  />
                  Code Viewing
                </TabsTrigger>
                <TabsTrigger
                  value="editor"
                  className="px-4 py-3 gap-1.5 whitespace-nowrap"
                >
                  <HugeiconsIcon
                    icon={Terminal}
                    strokeWidth={2}
                    className="size-4"
                  />
                  Editor
                </TabsTrigger>
                <TabsTrigger
                  value="snippets"
                  className="px-4 py-3 gap-1.5 whitespace-nowrap"
                >
                  <HugeiconsIcon
                    icon={CodeIcon}
                    strokeWidth={2}
                    className="size-4"
                  />
                  Snippets
                </TabsTrigger>
                <TabsTrigger
                  value="general"
                  className="px-4 py-3 gap-1.5 whitespace-nowrap"
                >
                  <HugeiconsIcon
                    icon={HelpCircleIcon}
                    strokeWidth={2}
                    className="size-4"
                  />
                  General
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6">
              {/* Appearance Tab */}
              <TabsContent value="appearance" className="mt-0 space-y-6">
                <FieldGroup>
                  <Field orientation="vertical">
                    <FieldLabel>Theme</FieldLabel>
                    <FieldDescription>
                      Choose your preferred color theme for the interface
                    </FieldDescription>
                    <Select
                      value={settings.theme}
                      onValueChange={handleThemeChange}
                    >
                      <SelectTrigger className="w-full sm:w-[280px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Separator className="my-6" />

                  <Field orientation="vertical">
                    <FieldLabel>Accent Color</FieldLabel>
                    <FieldDescription>
                      Customize the accent color used throughout the interface
                    </FieldDescription>
                    <Select
                      value={settings.accentColor}
                      onValueChange={value =>
                        updateSetting("accentColor", value as any)
                      }
                    >
                      <SelectTrigger className="w-full sm:w-[280px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blue">Blue</SelectItem>
                        <SelectItem value="green">Green</SelectItem>
                        <SelectItem value="purple">Purple</SelectItem>
                        <SelectItem value="orange">Orange</SelectItem>
                        <SelectItem value="red">Red</SelectItem>
                        <SelectItem value="pink">Pink</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Separator className="my-6" />

                  <Field orientation="vertical">
                    <FieldLabel>Font Size</FieldLabel>
                    <FieldDescription>
                      Adjust the base font size for better readability
                    </FieldDescription>
                    <Select
                      value={settings.fontSize}
                      onValueChange={value =>
                        updateSetting("fontSize", value as any)
                      }
                    >
                      <SelectTrigger className="w-full sm:w-[280px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                </FieldGroup>
              </TabsContent>

              {/* Code Viewing Tab */}
              <TabsContent value="code-viewing" className="mt-0 space-y-6">
                <FieldGroup>
                  <Field orientation="vertical">
                    <FieldLabel>Light Theme</FieldLabel>
                    <FieldDescription>
                      Syntax highlighting theme for light mode
                    </FieldDescription>
                    <Select
                      value={settings.codeThemeLight}
                      onValueChange={value =>
                        value && updateSetting("codeThemeLight", value)
                      }
                    >
                      <SelectTrigger className="w-full sm:w-[280px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CODE_THEMES.map(theme => (
                          <SelectItem key={theme.value} value={theme.value}>
                            {theme.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>

                  <Separator className="my-6" />

                  <Field orientation="vertical">
                    <FieldLabel>Dark Theme</FieldLabel>
                    <FieldDescription>
                      Syntax highlighting theme for dark mode
                    </FieldDescription>
                    <Select
                      value={settings.codeThemeDark}
                      onValueChange={value =>
                        value && updateSetting("codeThemeDark", value)
                      }
                    >
                      <SelectTrigger className="w-full sm:w-[280px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CODE_THEMES.map(theme => (
                          <SelectItem key={theme.value} value={theme.value}>
                            {theme.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>

                  <Separator className="my-6" />

                  <Field orientation="vertical">
                    <FieldLabel>Show Line Numbers</FieldLabel>
                    <FieldDescription>
                      Display line numbers in code blocks
                    </FieldDescription>
                    <Select
                      value={settings.showLineNumbers ? "on" : "off"}
                      onValueChange={value =>
                        updateSetting("showLineNumbers", value === "on")
                      }
                    >
                      <SelectTrigger className="w-full sm:w-[280px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="on">On</SelectItem>
                        <SelectItem value="off">Off</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Separator className="my-6" />

                  <Field orientation="vertical">
                    <FieldLabel>Line Number Start</FieldLabel>
                    <FieldDescription>
                      Starting number for line numbering
                    </FieldDescription>
                    <Input
                      type="number"
                      value={settings.lineNumberStart}
                      onChange={e =>
                        updateSetting(
                          "lineNumberStart",
                          parseInt(e.target.value) || 1
                        )
                      }
                      min="1"
                      max="1000"
                      className="w-full sm:w-[280px]"
                    />
                  </Field>

                  <Separator className="my-6" />

                  <Field orientation="vertical">
                    <FieldLabel>Code Wrapping</FieldLabel>
                    <FieldDescription>
                      Control how long lines are wrapped in code blocks
                    </FieldDescription>
                    <Select
                      value={settings.codeWrapping}
                      onValueChange={value =>
                        updateSetting("codeWrapping", value as any)
                      }
                    >
                      <SelectTrigger className="w-full sm:w-[280px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="on">On</SelectItem>
                        <SelectItem value="off">Off</SelectItem>
                        <SelectItem value="wordWrapColumn">
                          Word Wrap Column
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Separator className="my-6" />

                  <Field orientation="vertical">
                    <FieldLabel>Highlight Active Line</FieldLabel>
                    <FieldDescription>
                      Highlight the line where the cursor is positioned
                    </FieldDescription>
                    <Select
                      value={settings.highlightActiveLine ? "on" : "off"}
                      onValueChange={value =>
                        updateSetting("highlightActiveLine", value === "on")
                      }
                    >
                      <SelectTrigger className="w-full sm:w-[280px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="on">On</SelectItem>
                        <SelectItem value="off">Off</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Separator className="my-6" />

                  <Field orientation="vertical">
                    <FieldLabel>Code Font Size</FieldLabel>
                    <FieldDescription>
                      Font size for code blocks (in pixels)
                    </FieldDescription>
                    <Input
                      type="number"
                      value={settings.fontSizeCode}
                      onChange={e =>
                        updateSetting(
                          "fontSizeCode",
                          parseInt(e.target.value) || 12
                        )
                      }
                      min="8"
                      max="24"
                      className="w-full sm:w-[280px]"
                    />
                  </Field>
                </FieldGroup>
              </TabsContent>

              {/* Editor Tab */}
              <TabsContent value="editor" className="mt-0 space-y-6">
                <FieldGroup>
                  <Field orientation="vertical">
                    <FieldLabel>Font Family</FieldLabel>
                    <FieldDescription>
                      Choose the font family for the code editor
                    </FieldDescription>
                    <Select
                      value={settings.editorFontFamily}
                      onValueChange={value =>
                        value && updateSetting("editorFontFamily", value)
                      }
                    >
                      <SelectTrigger className="w-full sm:w-[280px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {FONT_FAMILIES.map(font => (
                          <SelectItem key={font.value} value={font.value}>
                            {font.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>

                  <Separator className="my-6" />

                  <Field orientation="vertical">
                    <FieldLabel>Font Size</FieldLabel>
                    <FieldDescription>
                      Adjust the font size in the code editor (in pixels)
                    </FieldDescription>
                    <Input
                      type="number"
                      value={settings.editorFontSize}
                      onChange={e =>
                        updateSetting(
                          "editorFontSize",
                          parseInt(e.target.value) || 14
                        )
                      }
                      min="10"
                      max="24"
                      className="w-full sm:w-[280px]"
                    />
                  </Field>

                  <Separator className="my-6" />

                  <Field orientation="vertical">
                    <FieldLabel>Tab Size</FieldLabel>
                    <FieldDescription>
                      Number of spaces inserted when pressing Tab
                    </FieldDescription>
                    <Input
                      type="number"
                      value={settings.tabSize}
                      onChange={e =>
                        updateSetting(
                          "tabSize",
                          parseInt(e.target.value) || 2
                        )
                      }
                      min="1"
                      max="8"
                      className="w-full sm:w-[280px]"
                    />
                  </Field>

                  <Separator className="my-6" />

                  <Field orientation="vertical">
                    <FieldLabel>Insert Spaces</FieldLabel>
                    <FieldDescription>
                      Insert spaces instead of tabs when indenting
                    </FieldDescription>
                    <Select
                      value={settings.insertSpaces ? "on" : "off"}
                      onValueChange={value =>
                        updateSetting("insertSpaces", value === "on")
                      }
                    >
                      <SelectTrigger className="w-full sm:w-[280px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="on">On</SelectItem>
                        <SelectItem value="off">Off</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Separator className="my-6" />

                  <Field orientation="vertical">
                    <FieldLabel>Word Wrap</FieldLabel>
                    <FieldDescription>
                      Enable word wrapping for long lines in the editor
                    </FieldDescription>
                    <Select
                      value={settings.wordWrap}
                      onValueChange={value =>
                        updateSetting("wordWrap", value as any)
                      }
                    >
                      <SelectTrigger className="w-full sm:w-[280px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="on">On</SelectItem>
                        <SelectItem value="off">Off</SelectItem>
                        <SelectItem value="wordWrapColumn">
                          Word Wrap Column
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Separator className="my-6" />

                  <Field orientation="vertical">
                    <FieldLabel>Auto-save</FieldLabel>
                    <FieldDescription>
                      Automatically save snippets while editing
                    </FieldDescription>
                    <Select
                      value={settings.autoSave ? "on" : "off"}
                      onValueChange={value =>
                        updateSetting("autoSave", value === "on")
                      }
                    >
                      <SelectTrigger className="w-full sm:w-[280px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="on">On</SelectItem>
                        <SelectItem value="off">Off</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Separator className="my-6" />

                  <Field orientation="vertical">
                    <FieldLabel>Auto-save Interval</FieldLabel>
                    <FieldDescription>
                      Automatically save snippets after a period of inactivity
                      (in seconds)
                    </FieldDescription>
                    <Input
                      type="number"
                      value={settings.autoSaveInterval}
                      onChange={e =>
                        updateSetting(
                          "autoSaveInterval",
                          parseInt(e.target.value) || 30
                        )
                      }
                      min="5"
                      max="300"
                      className="w-full sm:w-[280px]"
                    />
                  </Field>

                  <Separator className="my-6" />

                  <Field orientation="vertical">
                    <FieldLabel>Format on Save</FieldLabel>
                    <FieldDescription>
                      Automatically format code when saving snippets
                    </FieldDescription>
                    <Select
                      value={settings.formatOnSave ? "on" : "off"}
                      onValueChange={value =>
                        updateSetting("formatOnSave", value === "on")
                      }
                    >
                      <SelectTrigger className="w-full sm:w-[280px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="on">On</SelectItem>
                        <SelectItem value="off">Off</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                </FieldGroup>
              </TabsContent>

              {/* Snippets Tab */}
              <TabsContent value="snippets" className="mt-0 space-y-6">
                <FieldGroup>
                  <Field orientation="vertical">
                    <FieldLabel>Default Language</FieldLabel>
                    <FieldDescription>
                      Set the default programming language for new snippets
                    </FieldDescription>
                    <Select
                      value={settings.defaultLanguage}
                      onValueChange={value =>
                        value && updateSetting("defaultLanguage", value)
                      }
                    >
                      <SelectTrigger className="w-full sm:w-[280px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {LANGUAGES.map(lang => (
                          <SelectItem key={lang} value={lang}>
                            {lang.charAt(0).toUpperCase() + lang.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>

                  <Separator className="my-6" />

                  <Field orientation="vertical">
                    <FieldLabel>Default Folder</FieldLabel>
                    <FieldDescription>
                      Choose the default folder for new snippets
                    </FieldDescription>
                    <Select
                      value={settings.defaultFolder}
                      onValueChange={value =>
                        value && updateSetting("defaultFolder", value)
                      }
                    >
                      <SelectTrigger className="w-full sm:w-[280px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {FOLDERS.map(folder => (
                          <SelectItem key={folder} value={folder}>
                            {folder}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>

                  <Separator className="my-6" />

                  <Field orientation="vertical">
                    <FieldLabel>Default Template</FieldLabel>
                    <FieldDescription>
                      Default code template for new snippets (optional)
                    </FieldDescription>
                    <Input
                      type="text"
                      value={settings.defaultTemplate}
                      onChange={e =>
                        updateSetting("defaultTemplate", e.target.value)
                      }
                      placeholder="Enter default template..."
                      className="w-full sm:w-[280px]"
                    />
                  </Field>

                  <Separator className="my-6" />

                  <Field orientation="vertical">
                    <FieldLabel>Sort By</FieldLabel>
                    <FieldDescription>
                      Default sorting method for snippets
                    </FieldDescription>
                    <Select
                      value={settings.sortBy}
                      onValueChange={value =>
                        updateSetting("sortBy", value as any)
                      }
                    >
                      <SelectTrigger className="w-full sm:w-[280px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="date">Date</SelectItem>
                        <SelectItem value="title">Title</SelectItem>
                        <SelectItem value="language">Language</SelectItem>
                        <SelectItem value="folder">Folder</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Separator className="my-6" />

                  <Field orientation="vertical">
                    <FieldLabel>Sort Order</FieldLabel>
                    <FieldDescription>
                      Default sort order (ascending or descending)
                    </FieldDescription>
                    <Select
                      value={settings.sortOrder}
                      onValueChange={value =>
                        updateSetting("sortOrder", value as any)
                      }
                    >
                      <SelectTrigger className="w-full sm:w-[280px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asc">Ascending</SelectItem>
                        <SelectItem value="desc">Descending</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Separator className="my-6" />

                  <Field orientation="vertical">
                    <FieldLabel>Snippets per Page</FieldLabel>
                    <FieldDescription>
                      Limit the number of snippets displayed per page
                    </FieldDescription>
                    <Input
                      type="number"
                      value={settings.snippetsPerPage}
                      onChange={e =>
                        updateSetting(
                          "snippetsPerPage",
                          parseInt(e.target.value) || 50
                        )
                      }
                      min="10"
                      max="200"
                      className="w-full sm:w-[280px]"
                    />
                  </Field>

                  <Separator className="my-6" />

                  <Field orientation="vertical">
                    <FieldLabel>Show Tags</FieldLabel>
                    <FieldDescription>
                      Display tags on snippet cards
                    </FieldDescription>
                    <Select
                      value={settings.showTags ? "on" : "off"}
                      onValueChange={value =>
                        updateSetting("showTags", value === "on")
                      }
                    >
                      <SelectTrigger className="w-full sm:w-[280px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="on">On</SelectItem>
                        <SelectItem value="off">Off</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Separator className="my-6" />

                  <Field orientation="vertical">
                    <FieldLabel>Show Language</FieldLabel>
                    <FieldDescription>
                      Display language badge on snippet cards
                    </FieldDescription>
                    <Select
                      value={settings.showLanguage ? "on" : "off"}
                      onValueChange={value =>
                        updateSetting("showLanguage", value === "on")
                      }
                    >
                      <SelectTrigger className="w-full sm:w-[280px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="on">On</SelectItem>
                        <SelectItem value="off">Off</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Separator className="my-6" />

                  <Field orientation="vertical">
                    <FieldLabel>Search Behavior</FieldLabel>
                    <FieldDescription>
                      How search queries are matched against snippets
                    </FieldDescription>
                    <Select
                      value={settings.searchBehavior}
                      onValueChange={value =>
                        updateSetting("searchBehavior", value as any)
                      }
                    >
                      <SelectTrigger className="w-full sm:w-[280px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fuzzy">Fuzzy (flexible matching)</SelectItem>
                        <SelectItem value="exact">Exact (strict matching)</SelectItem>
                        <SelectItem value="regex">Regex (pattern matching)</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Separator className="my-6" />

                  <Field orientation="vertical">
                    <FieldLabel>Auto Tag Suggestions</FieldLabel>
                    <FieldDescription>
                      Automatically suggest tags when creating snippets
                    </FieldDescription>
                    <Select
                      value={settings.autoTagSuggestions ? "on" : "off"}
                      onValueChange={value =>
                        updateSetting("autoTagSuggestions", value === "on")
                      }
                    >
                      <SelectTrigger className="w-full sm:w-[280px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="on">On</SelectItem>
                        <SelectItem value="off">Off</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                </FieldGroup>
              </TabsContent>

              {/* General Tab */}
              <TabsContent value="general" className="mt-0 space-y-6">
                <FieldGroup>
                  <Field orientation="vertical">
                    <FieldLabel>Interface Language</FieldLabel>
                    <FieldDescription>
                      Select your preferred language for the interface
                    </FieldDescription>
                    <Select defaultValue="en">
                      <SelectTrigger className="w-full sm:w-[280px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Separator className="my-6" />

                  <Field orientation="vertical">
                    <FieldLabel>Keyboard Shortcuts</FieldLabel>
                    <FieldDescription>
                      Enable or disable keyboard shortcuts
                    </FieldDescription>
                    <Select defaultValue="enabled">
                      <SelectTrigger className="w-full sm:w-[280px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="enabled">Enabled</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Separator className="my-6" />

                  <Field orientation="vertical">
                    <FieldLabel>Notifications</FieldLabel>
                    <FieldDescription>
                      Control notification preferences
                    </FieldDescription>
                    <Select defaultValue="enabled">
                      <SelectTrigger className="w-full sm:w-[280px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="enabled">Enabled</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Separator className="my-6" />

                  <Field orientation="vertical">
                    <FieldLabel>Data Export</FieldLabel>
                    <FieldDescription>
                      Export your snippets and settings as a backup
                    </FieldDescription>
                    <div className="w-full sm:w-[280px]">
                      <Button variant="outline" size="sm" disabled>
                        Export Data
                      </Button>
                      <p className="text-xs text-muted-foreground italic mt-2">
                        Export functionality coming soon
                      </p>
                    </div>
                  </Field>
                </FieldGroup>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
