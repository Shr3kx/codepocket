"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Cancel01Icon,
  AiMagicIcon,
  LoadingIcon,
  FloppyDiskIcon,
} from "@hugeicons/core-free-icons"
import { Snippet, LANGUAGES, FOLDERS } from "@/lib/types"
// import { explainCode, suggestTags } from "@/services/geminiService"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Field, FieldLabel } from "@/components/ui/field"
import { cn } from "@/lib/utils"

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
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    code: '',
    language: 'javascript' as string,
    tags: [] as string[],
    folder: 'Personal' as string,
  })
  const [tagInput, setTagInput] = useState('')
  const [isAiLoading, setIsAiLoading] = useState(false)

  useEffect(() => {
    if (snippet) {
      setFormData({
        title: snippet.title || '',
        description: snippet.description || '',
        code: snippet.code || '',
        language: snippet.language || 'javascript',
        tags: snippet.tags || [],
        folder: snippet.folder || 'Personal',
      })
    } else {
      setFormData({
        title: '',
        description: '',
        code: '',
        language: 'javascript',
        tags: [],
        folder: 'Personal',
      })
    }
  }, [snippet])

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
      alert("AI optimization feature is not yet configured. Please set up the API key.");
    } catch (error) {
      console.error('AI optimization error:', error);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      setFormData(prev => ({
        ...prev,
        tags: [...new Set([...(prev.tags || []), tagInput.trim()])]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: (prev.tags || []).filter(t => t !== tag)
    }));
  };

  if (!isOpen) return null

  const languageItems = LANGUAGES.map((lang) => ({
    label: lang.charAt(0).toUpperCase() + lang.slice(1),
    value: lang,
  }))

  const folderItems = FOLDERS.map((folder) => ({
    label: folder,
    value: folder,
  }))

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
          onClick={(e) => e.stopPropagation()}
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
                    onChange={(e) =>
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
                    onValueChange={(value) => {
                      if (value) {
                        setFormData({ ...formData, language: value })
                      }
                    }}
                  >
                    <SelectTrigger id="snippet-language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {languageItems.map((item) => (
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
                    onValueChange={(value) => {
                      if (value) {
                        setFormData({ ...formData, folder: value })
                      }
                    }}
                  >
                    <SelectTrigger id="snippet-folder">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {folderItems.map((item) => (
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
                  <div className="flex items-center justify-between mb-1.5">
                    <FieldLabel htmlFor="snippet-description">
                      Description
                    </FieldLabel>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={handleAiOptimize}
                      disabled={isAiLoading || !formData.code}
                      className="text-xs h-auto p-1 gap-1"
                    >
                      {isAiLoading ? (
                        <HugeiconsIcon
                          icon={LoadingIcon}
                          strokeWidth={2}
                          className="size-3 animate-spin"
                        />
                      ) : (
                        <HugeiconsIcon icon={AiMagicIcon} strokeWidth={2} className="size-3" />
                      )}
                      Generate with AI
                    </Button>
                  </div>
                  <Textarea
                    id="snippet-description"
                    value={formData.description}
                    onChange={(e) =>
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
                    {formData.tags?.map((tag) => (
                      <Badge key={tag} variant="secondary" className="gap-1">
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-1"
                        >
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
                      onChange={(e) => setTagInput(e.target.value)}
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
              <Textarea
                id="snippet-code"
                value={formData.code}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
                className="h-[300px] font-mono text-xs"
                placeholder="Paste your code here..."
              />
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
  )
}