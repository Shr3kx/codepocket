export type TabId = "appearance" | "code-viewing" | "editor" | "snippets" | "general";

export interface Tab {
  id: TabId;
  label: string;
  icon: any;
}

export interface SettingFieldProps {
  label: string;
  description: string;
  children: React.ReactNode;
}
