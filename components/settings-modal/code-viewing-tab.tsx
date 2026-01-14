"use client";

import { FieldGroup } from "@/components/ui/field";
import {
  SettingField,
  SelectField,
  BooleanToggleField,
  NumberInputField,
} from "./setting-fields";
import { useSettingsContext } from "@/contexts/settings-context";
import { CODE_THEMES } from "./constants";

export function CodeViewingTab() {
  const { settings, updateSetting } = useSettingsContext();

  return (
    <FieldGroup className="space-y-6">
      <SettingField
        label="Code Theme (Light)"
        description="Syntax highlighting theme for code highlighter in light mode"
      >
        <SelectField
          value={settings.codeThemeLight}
          onValueChange={value =>
            value && updateSetting("codeThemeLight", value)
          }
          options={CODE_THEMES}
        />
      </SettingField>
      <SettingField
        label="Code Theme (Dark)"
        description="Syntax highlighting theme for code highlighter in dark mode"
      >
        <SelectField
          value={settings.codeThemeDark}
          onValueChange={value =>
            value && updateSetting("codeThemeDark", value)
          }
          options={CODE_THEMES}
        />
      </SettingField>
      <SettingField
        label="Show Line Numbers"
        description="Display line numbers in code blocks"
      >
        <BooleanToggleField
          value={settings.showLineNumbers}
          onValueChange={value => updateSetting("showLineNumbers", value)}
        />
      </SettingField>
      <SettingField
        label="Line Number Start"
        description="Starting number for line numbering"
      >
        <NumberInputField
          value={settings.lineNumberStart}
          onChange={value => updateSetting("lineNumberStart", value || 1)}
          min={1}
          max={1000}
        />
      </SettingField>
      <SettingField
        label="Code Wrapping"
        description="Control how long lines are wrapped in code blocks"
      >
        <SelectField
          value={settings.codeWrapping}
          onValueChange={value => updateSetting("codeWrapping", value as any)}
          options={[
            { value: "on", label: "On" },
            { value: "off", label: "Off" },
            { value: "wordWrapColumn", label: "Word Wrap Column" },
          ]}
        />
      </SettingField>
      <SettingField
        label="Highlight Active Line"
        description="Highlight the line where the cursor is positioned"
      >
        <BooleanToggleField
          value={settings.highlightActiveLine}
          onValueChange={value => updateSetting("highlightActiveLine", value)}
        />
      </SettingField>
      <SettingField
        label="Code Font Size"
        description="Font size for code blocks (in pixels)"
      >
        <NumberInputField
          value={settings.fontSizeCode}
          onChange={value => updateSetting("fontSizeCode", value || 12)}
          min={8}
          max={24}
        />
      </SettingField>
    </FieldGroup>
  );
}
