"use client";

import { type AppShellNavigationItem, type AppShellLabels } from "./types";
const defaultLabels = {
  navigation: "Navigation",
  navigationDescription: "Displays the application navigation.",
  openSidebar: "Open navigation",
  expandNavigationGroup: "Expand navigation group",
  collapseNavigationGroup: "Collapse navigation group",
};

export function getLabels(labels: AppShellLabels | undefined) {
  return {
    ...defaultLabels,
    ...labels,
  };
}

export function isItemActive(
  item: AppShellNavigationItem,
  currentPath: string,
): boolean {
  if (typeof item.active === "boolean") {
    return item.active;
  }

  if (typeof item.match === "function") {
    return item.match(currentPath);
  }

  const matches = Array.isArray(item.match)
    ? item.match
    : item.match
      ? [item.match]
      : [];

  if (
    matches.some(
      (match) => currentPath === match || currentPath.startsWith(`${match}/`),
    )
  ) {
    return true;
  }

  if (item.href) {
    if (item.exact) {
      return currentPath === item.href;
    }

    return currentPath === item.href || currentPath.startsWith(`${item.href}/`);
  }

  return item.items?.some((child) => isItemActive(child, currentPath)) ?? false;
}

export function getItemTitle(item: AppShellNavigationItem) {
  if (item.title) {
    return item.title;
  }

  if (typeof item.label === "string") {
    return item.label;
  }

  return item.id;
}

export function callNavigationHandlers(
  item: AppShellNavigationItem,
  onNavigate: (() => void) | undefined,
) {
  item.onSelect?.();
  onNavigate?.();
}
