"use client";

import * as React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BookIcon,
  AiMagicIcon,
  CodeIcon,
  LayoutIcon,
  HelpCircleIcon,
  MapsIcon,
  ChartIcon,
  SentIcon,
  SettingsIcon,
  Terminal,
  FolderIcon,
  TagIcon,
  LogoutIcon,
} from "@hugeicons/core-free-icons";

// import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
import { FOLDERS, LANGUAGES } from "@/lib/types";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  selectedFolder?: string | null;
  onFolderSelect?: (folder: string | null) => void;
  selectedLang?: string | null;
  onLangSelect?: (lang: string | null) => void;
  selectedTag?: string | null;
  onTagSelect?: (tag: string | null) => void;
  allTags?: string[];
  onSignOut?: () => void;
}

export function AppSidebar({
  selectedFolder = null,
  onFolderSelect,
  selectedLang = null,
  onLangSelect,
  selectedTag = null,
  onTagSelect,
  allTags = [],
  onSignOut,
  ...props
}: AppSidebarProps) {
  // Fallback local state so the sidebar can operate standalone
  const [fallbackFolder, setFallbackFolder] = React.useState<string | null>(
    selectedFolder
  );
  const [fallbackLang, setFallbackLang] = React.useState<string | null>(
    selectedLang
  );
  const [fallbackTag, setFallbackTag] = React.useState<string | null>(
    selectedTag
  );

  const effectiveFolder = onFolderSelect ? selectedFolder : fallbackFolder;
  const effectiveLang = onLangSelect ? selectedLang : fallbackLang;
  const effectiveTag = onTagSelect ? selectedTag : fallbackTag;

  const handleFolder = (folder: string | null) => {
    setFallbackFolder(folder);
    onFolderSelect?.(folder);
  };
  const handleLang = (lang: string | null) => {
    setFallbackLang(lang);
    onLangSelect?.(lang);
  };
  const handleTag = (tag: string | null) => {
    setFallbackTag(tag);
    onTagSelect?.(tag);
  };

  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Playground",
        url: "#",
        icon: Terminal,
        isActive: true,
        items: [
          {
            title: "History",
            url: "#",
          },
          {
            title: "Starred",
            url: "#",
          },
          {
            title: "Settings",
            url: "#",
          },
        ],
      },
      {
        title: "Models",
        url: "#",
        icon: AiMagicIcon,
        items: [
          {
            title: "Genesis",
            url: "#",
          },
          {
            title: "Explorer",
            url: "#",
          },
          {
            title: "Quantum",
            url: "#",
          },
        ],
      },
      {
        title: "Documentation",
        url: "#",
        icon: BookIcon,
        items: [
          {
            title: "Introduction",
            url: "#",
          },
          {
            title: "Get Started",
            url: "#",
          },
          {
            title: "Tutorials",
            url: "#",
          },
          {
            title: "Changelog",
            url: "#",
          },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: SettingsIcon,
        items: [
          {
            title: "General",
            url: "#",
          },
          {
            title: "Team",
            url: "#",
          },
          {
            title: "Billing",
            url: "#",
          },
          {
            title: "Limits",
            url: "#",
          },
        ],
      },
    ],
    navSecondary: [
      {
        title: "Support",
        url: "#",
        icon: HelpCircleIcon,
      },
      {
        title: "Feedback",
        url: "#",
        icon: SentIcon,
      },
    ],
    projects: [
      {
        name: "Design Engineering",
        url: "#",
        icon: LayoutIcon,
      },
      {
        name: "Sales & Marketing",
        url: "#",
        icon: ChartIcon,
      },
      {
        name: "Travel",
        url: "#",
        icon: MapsIcon,
      },
    ],
  };

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<a href="#" />}>
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <HugeiconsIcon
                  icon={CodeIcon}
                  strokeWidth={2}
                  className="size-4"
                />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">CodePocket</span>
                <span className="truncate text-xs">Enterprise</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* Collections/Folders Section */}
        {
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2">
              <HugeiconsIcon
                icon={FolderIcon}
                strokeWidth={2}
                className="size-3"
              />
              Collections
            </SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<button onClick={() => handleFolder(null)} />}
                  isActive={!effectiveFolder}
                >
                  <HugeiconsIcon icon={CodeIcon} strokeWidth={2} />
                  <span>All Snippets</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {FOLDERS.map(folder => (
                <SidebarMenuItem key={folder}>
                  <SidebarMenuButton
                    render={<button onClick={() => handleFolder(folder)} />}
                    isActive={effectiveFolder === folder}
                  >
                    <HugeiconsIcon icon={FolderIcon} strokeWidth={2} />
                    <span>{folder}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        }

        {/* Languages Section */}
        {
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2">
              <HugeiconsIcon
                icon={CodeIcon}
                strokeWidth={2}
                className="size-3"
              />
              Languages
            </SidebarGroupLabel>
            <div className="flex flex-wrap gap-1 px-2 pb-2">
              <Button
                variant={!effectiveLang ? "default" : "outline"}
                size="xs"
                onClick={() => handleLang(null)}
                className="text-xs"
              >
                All
              </Button>
              {LANGUAGES.slice(0, 8).map(lang => (
                <Button
                  key={lang}
                  variant={effectiveLang === lang ? "default" : "outline"}
                  size="xs"
                  onClick={() => handleLang(lang)}
                  className="text-xs capitalize"
                >
                  {lang}
                </Button>
              ))}
            </div>
          </SidebarGroup>
        }

        {/* Tags Section */}
        {allTags.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2">
              <HugeiconsIcon
                icon={TagIcon}
                strokeWidth={2}
                className="size-3"
              />
              Popular Tags
            </SidebarGroupLabel>
            <SidebarMenu>
              {allTags.map(tag => (
                <SidebarMenuItem key={tag}>
                  <SidebarMenuButton
                    render={
                      <button
                        onClick={() =>
                          handleTag(effectiveTag === tag ? null : tag)
                        }
                      />
                    }
                    isActive={effectiveTag === tag}
                  >
                    <span>#{tag}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter>
        {onSignOut && (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                render={<button onClick={onSignOut} />}
                className="text-destructive hover:text-destructive"
              >
                <HugeiconsIcon icon={LogoutIcon} strokeWidth={2} />
                <span>Sign Out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
