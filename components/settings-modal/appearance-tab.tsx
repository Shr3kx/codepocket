"use client";

import { FieldGroup } from "@/components/ui/field";
import { SettingField, SelectField, BooleanToggleField } from "./setting-fields";
import { useSettingsContext } from "@/contexts/settings-context";
import { useTheme } from "next-themes";

export function AppearanceTab() {
  const { settings, updateSetting } = useSettingsContext();
  const { setTheme } = useTheme();

  const handleThemeChange = (value: string) => {
    updateSetting("theme", value as "light" | "dark" | "system");
    setTheme(value as "light" | "dark" | "system");
  };

  return (
    <FieldGroup className="space-y-6">
      <SettingField
        label="Theme"
        description="Choose your preferred color theme for the interface"
      >
        <SelectField
          value={settings.theme}
          onValueChange={handleThemeChange}
          options={[
            { value: "light", label: "Light" },
            { value: "dark", label: "Dark" },
            { value: "system", label: "System" },
          ]}
        />
      </SettingField>

      <SettingField
        label="Accent Color"
        description="Customize the accent color used throughout the interface"
      >
        <SelectField
          value={settings.accentColor}
          onValueChange={(value) => updateSetting("accentColor", value as any)}
          options={[
            { value: "blue", label: "Blue" },
            { value: "green", label: "Green" },
            { value: "purple", label: "Purple" },
            { value: "orange", label: "Orange" },
            { value: "red", label: "Red" },
            { value: "pink", label: "Pink" },
          ]}
        />
      </SettingField>

      <SettingField
        label="Font Size"
        description="Adjust the base font size for better readability"
      >
        <SelectField
          value={settings.fontSize}
          onValueChange={(value) => updateSetting("fontSize", value as any)}
          options={[
            { value: "small", label: "Small" },
            { value: "medium", label: "Medium" },
            { value: "large", label: "Large" },
          ]}
        />
      </SettingField>
    </FieldGroup>
  );
}
