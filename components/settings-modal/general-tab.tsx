"use client";

import { FieldGroup } from "@/components/ui/field";
import { SettingField, SelectField } from "./setting-fields";
import { Button } from "@/components/ui/button";
import { useSettingsContext } from "@/contexts/settings-context";

export function GeneralTab() {
  const { settings, updateSetting } = useSettingsContext();

  return (
    <FieldGroup className="space-y-6">
      <SettingField
        label="Interface Language"
        description="Select your preferred language for the interface"
      >
        <SelectField
          value={settings.interfaceLanguage}
          onValueChange={value =>
            updateSetting("interfaceLanguage", value as any)
          }
          options={[
            { value: "en", label: "English" },
            { value: "es", label: "Spanish" },
            { value: "fr", label: "French" },
            { value: "de", label: "German" },
          ]}
        />
      </SettingField>

      <SettingField
        label="Keyboard Shortcuts"
        description="Enable or disable keyboard shortcuts"
      >
        <SelectField
          value={settings.keyboardShortcuts}
          onValueChange={value =>
            updateSetting("keyboardShortcuts", value as any)
          }
          options={[
            { value: "enabled", label: "Enabled" },
            { value: "disabled", label: "Disabled" },
          ]}
        />
      </SettingField>

      <SettingField
        label="Notifications"
        description="Control notification preferences"
      >
        <SelectField
          value={settings.notifications}
          onValueChange={value => updateSetting("notifications", value as any)}
          options={[
            { value: "enabled", label: "Enabled" },
            { value: "disabled", label: "Disabled" },
          ]}
        />
      </SettingField>

      <SettingField label="Sounds" description="Play Sounds on Interactions">
        <SelectField
          value={settings.soundsEnabled}
          onValueChange={value => updateSetting("soundsEnabled", value as any)}
          options={[
            { value: "enabled", label: "Enabled" },
            { value: "disabled", label: "Disabled" },
          ]}
        />
      </SettingField>

      <SettingField
        label="Data Export"
        description="Export your snippets and settings as a backup"
        showSeparator={false}
      >
        <div className="w-50">
          <Button variant="outline" size="sm" disabled>
            Export Data
          </Button>
          <p className="text-xs text-muted-foreground italic mt-2">
            Export functionality coming soon
          </p>
        </div>
      </SettingField>
    </FieldGroup>
  );
}
