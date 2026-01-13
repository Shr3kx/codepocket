"use client";

import * as React from "react";
import { useState } from "react";
import { LandingPage } from "@/components/landing/page";
import { Dashboard } from "@/components/dashboard/page";
import { AppSidebar } from "../sidebar/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
export function MainPage() {
  const [view, setView] = useState<"landing" | "dashboard">("landing");

  if (view === "landing") {
    return <LandingPage onGetStarted={() => setView("dashboard")} />;
  }
  // <Dashboard onSignOut={() => setView("landing")} />;

  return (
    <>
      <Dashboard onSignOut={() => setView("landing")} />
    </>
  );
}
