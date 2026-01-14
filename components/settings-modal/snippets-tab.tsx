"use client";

import { FieldGroup } from "@/components/ui/field";
import {
  SettingField,
  SelectField,
  BooleanToggleField,
  NumberInputField,
} from "./setting-fields";
import { Input } from "@/components/ui/input";
import { useSettingsContext } from "@/contexts/settings-context";
import { LANGUAGES, FOLDERS } from "@/lib/types";
import { SELECT_INPUT_WIDTH } from "./constants";

export function SnippetsTab() {
  const { settings, updateSetting } = useSettingsContext();

  return (
    <FieldGroup className="space-y-6">
      <SettingField
        label="Default Language"
        description="Set the default programming language for new snippets"
      >
        <SelectField
          value={settings.defaultLanguage}
          onValueChange={(value) => value && updateSetting("defaultLanguage", value)}
          options={LANGUAGES.map((lang) => ({
            value: lang,
            label: lang.charAt(0).toUpperCase() + lang.slice(1),
          }))}
        />
      </SettingField>

      <SettingField
        label="Default Folder"
        description="Choose the default folder for new snippets"
      >
        <SelectField
          value={settings.defaultFolder}
          onValueChange={(value) => updateSetting("defaultFolder", value)}
          options={FOLDERS.map((folder) => ({ value: folder, label: folder }))}
        />
      </SettingField>

      <SettingField
        label="Default Template"
        description="Default code template for new snippets (optional)"
      >
        <Input
          type="text"
          value={settings.defaultTemplate}
          onChange={(e) => updateSetting("defaultTemplate", e.target.value)}
          placeholder="Enter default template..."
          className={SELECT_INPUT_WIDTH}
        />
      </SettingField>

      <SettingField
        label="Sort By"
        description="Default sorting method for snippets"
      >
        <SelectField
          value={settings.sortBy}
          onValueChange={(value) => updateSetting("sortBy", value as any)}
          options={[
            { value: "date", label: "Date" },
            { value: "title", label: "Title" },
            { value: "language", label: "Language" },
            { value: "folder", label: "Folder" },
          ]}
        />
      </SettingField>

      <SettingField
        label="Sort Order"
        description="Default sort order (ascending or descending)"
      >
        <SelectField
          value={settings.sortOrder}
          onValueChange={(value) => updateSetting("sortOrder", value as any)}
          options={[
            { value: "asc", label: "Ascending" },
            { value: "desc", label: "Descending" },
          ]}
        />
      </SettingField>

      <SettingField
        label="Snippets per Page"
        description="Limit the number of snippets displayed per page"
      >
        <NumberInputField
          value={settings.snippetsPerPage}
          onChange={(value) => updateSetting("snippetsPerPage", value || 50)}
          min={10}
          max={200}
        />
      </SettingField>

      <SettingField
        label="Show Tags"
        description="Display tags on snippet cards"
      >
        <BooleanToggleField
          value={settings.showTags}
          onValueChange={(value) => updateSetting("showTags", value)}
        />
      </SettingField>

      <SettingField
        label="Show Language"
        description="Display language badge on snippet cards"
      >
        <BooleanToggleField
          value={settings.showLanguage}
          onValueChange={(value) => updateSetting("showLanguage", value)}
        />
      </SettingField>

      <SettingField
        label="Search Behavior"
        description="How search queries are matched against snippets"
      >
        <SelectField
          value={settings.searchBehavior}
          onValueChange={(value) => updateSetting("searchBehavior", value as any)}
          options={[
            { value: "fuzzy", label: "Fuzzy (flexible matching)" },
            { value: "exact", label: "Exact (strict matching)" },
            { value: "regex", label: "Regex (pattern matching)" },
          ]}
        />
      </SettingField>

      <SettingField
        label="Auto Tag Suggestions"
        description="Automatically suggest tags when creating snippets"
      >
        <BooleanToggleField
          value={settings.autoTagSuggestions}
          onValueChange={(value) => updateSetting("autoTagSuggestions", value)}
        />
      </SettingField>
    </FieldGroup>
  );
}
