import { sileo } from "sileo";

export type ToastVariant = "success" | "error" | "warning" | "info";

interface ToastOptions {
  title: string;
  description?: string;
}

function getBackgroundColor(): string {
  if (typeof window === "undefined") {
    return "#fafafa";
  }

  const isDark = document.documentElement.classList.contains("dark");

  return isDark ? "#2d2d2d" : "#f1f0ef";
}

export function showSuccessToast({ title, description }: ToastOptions) {
  sileo.success({
    title,
    description,
    fill: getBackgroundColor(),
    styles: {
      title: "text-green-600 dark:text-green-400",
      description: "text-muted-foreground",
      badge: "bg-green-500",
    },
  });
}

export function showErrorToast({ title, description }: ToastOptions) {
  sileo.error({
    title,
    description,
    fill: getBackgroundColor(),
    styles: {
      title: "text-red-600 dark:text-red-400",
      description: "text-muted-foreground",
      badge: "bg-red-500",
    },
  });
}

export function showWarningToast({ title, description }: ToastOptions) {
  sileo.warning({
    title,
    description,
    fill: getBackgroundColor(),
    styles: {
      title: "text-yellow-600 dark:text-yellow-400",
      description: "text-muted-foreground",
      badge: "bg-yellow-500",
    },
  });
}

export function showInfoToast({ title, description }: ToastOptions) {
  sileo.info({
    title,
    description,
    fill: getBackgroundColor(),
    styles: {
      title: "text-blue-600 dark:text-blue-400",
      description: "text-muted-foreground",
      badge: "bg-blue-500",
    },
  });
}

export function showToast(
  variant: ToastVariant,
  { title, description }: ToastOptions,
) {
  switch (variant) {
    case "success":
      showSuccessToast({ title, description });
      break;
    case "error":
      showErrorToast({ title, description });
      break;
    case "warning":
      showWarningToast({ title, description });
      break;
    case "info":
      showInfoToast({ title, description });
      break;
  }
}
