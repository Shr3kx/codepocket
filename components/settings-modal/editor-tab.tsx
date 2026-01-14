"use client";

import { FieldGroup } from "@/components/ui/field";
import {
  SettingField,
  SelectField,
  BooleanToggleField,
  NumberInputField,
} from "./setting-fields";
import { useSettingsContext } from "@/contexts/settings-context";
import { FONT_FAMILIES } from "./constants";

export function EditorTab() {
  const { settings, updateSetting } = useSettingsContext();

  return (
    <FieldGroup className="space-y-6">
      <SettingField
        label="Font Family"
        description="Choose the font family for the code editor"
      >
        <SelectField
          value={settings.editorFontFamily}
          onValueChange={(value) => value && updateSetting("editorFontFamily", value)}
          options={FONT_FAMILIES}
        />
      </SettingField>

      <SettingField
        label="Font Size"
        description="Adjust the font size in the code editor (in pixels)"
      >
        <NumberInputField
          value={settings.editorFontSize}
          onChange={(value) => updateSetting("editorFontSize", value || 14)}
          min={10}
          max={24}
        />
      </SettingField>

      <SettingField
        label="Tab Size"
        description="Number of spaces inserted when pressing Tab"
      >
        <NumberInputField
          value={settings.tabSize}
          onChange={(value) => updateSetting("tabSize", value || 2)}
          min={1}
          max={8}
        />
      </SettingField>

      <SettingField
        label="Insert Spaces"
        description="Insert spaces instead of tabs when indenting"
      >
        <BooleanToggleField
          value={settings.insertSpaces}
          onValueChange={(value) => updateSetting("insertSpaces", value)}
        />
      </SettingField>

      <SettingField
        label="Word Wrap"
        description="Enable word wrapping for long lines in the editor"
      >
        <SelectField
          value={settings.wordWrap}
          onValueChange={(value) => updateSetting("wordWrap", value as any)}
          options={[
            { value: "on", label: "On" },
            { value: "off", label: "Off" },
            { value: "wordWrapColumn", label: "Word Wrap Column" },
          ]}
        />
      </SettingField>

      <SettingField
        label="Auto-save"
        description="Automatically save snippets while editing"
      >
        <BooleanToggleField
          value={settings.autoSave}
          onValueChange={(value) => updateSetting("autoSave", value)}
        />
      </SettingField>

      <SettingField
        label="Auto-save Interval"
        description="Automatically save snippets after a period of inactivity (in seconds)"
      >
        <NumberInputField
          value={settings.autoSaveInterval}
          onChange={(value) => updateSetting("autoSaveInterval", value || 30)}
          min={5}
          max={300}
        />
      </SettingField>

      <SettingField
        label="Format on Save"
        description="Automatically format code when saving snippets"
      >
        <BooleanToggleField
          value={settings.formatOnSave}
          onValueChange={(value) => updateSetting("formatOnSave", value)}
        />
      </SettingField>
    </FieldGroup>
  );
}
