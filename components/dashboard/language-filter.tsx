"use client";

import * as React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { FilterIcon, CheckmarkCircle01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface LanguageFilterProps {
  languages: string[];
  selectedLanguages: string[];
  onLanguageChange: (languages: string[]) => void;
  tooltip?: string;
}

export function LanguageFilter({
  languages,
  selectedLanguages,
  onLanguageChange,
  tooltip = "Filter by language",
}: LanguageFilterProps) {
  const hasFilter = selectedLanguages.length > 0;

  const toggleLanguage = (lang: string) => {
    if (selectedLanguages.includes(lang)) {
      onLanguageChange(selectedLanguages.filter(l => l !== lang));
    } else {
      onLanguageChange([...selectedLanguages, lang]);
    }
  };

  const clearFilters = () => {
    onLanguageChange([]);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant={hasFilter ? "default" : "outline"}
              size="icon"
              className="shadow-sm"
            >
              <HugeiconsIcon icon={FilterIcon} strokeWidth={2} />
              <span className="sr-only">{tooltip}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                Filter by Language
                {hasFilter && (
                  <span className="ml-2 text-xs font-normal text-muted-foreground">
                    ({selectedLanguages.length})
                  </span>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {languages.length > 0 && (
                <>
                  {languages.map(lang => (
                    <DropdownMenuCheckboxItem
                      key={lang}
                      checked={selectedLanguages.includes(lang)}
                      onCheckedChange={() => toggleLanguage(lang)}
                      className="capitalize"
                    >
                      {lang}
                    </DropdownMenuCheckboxItem>
                  ))}
                  {hasFilter && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem
                        onCheckedChange={clearFilters}
                        className="text-xs text-muted-foreground"
                      >
                        Clear filters
                      </DropdownMenuCheckboxItem>
                    </>
                  )}
                </>
              )}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}
