"use client";
import * as React from "react";
import { cn } from "../lib/utils";
import { SidebarProvider } from "./sidebar";
import { type AppShellProps } from "./app-shell/types";
import { getLabels } from "./app-shell/navigation";
import { AppSidebarPanel } from "./app-shell/AppSidebar";
import { AppHeader } from "./app-shell/AppHeader";
export function AppShell({
  navigation,
  currentPath,
  renderLink,
  brand,
  sidebarHeaderActions,
  sidebarTop,
  sidebarFooter,
  headerTitle,
  headerBreadcrumbs,
  headerActions,
  children,
  closeMobileOnPathChange = true,
  mobileSidebarOpen: mobileSidebarOpenProp,
  defaultMobileSidebarOpen = false,
  onMobileSidebarOpenChange,
  renderHeader,
  labels,
  sidebarDensity = "standard",
  sidebarWidth,
  sidebarMobileWidth,
  sidebarHeaderClassName,
  sidebarTopClassName,
  sidebarNavigationClassName,
  sidebarGroupClassName,
  sidebarGroupLabelClassName,
  sidebarFooterClassName,
  sidebarItemClassName,
  sidebarGroupTriggerBehavior = "select",
  sidebarClassName,
  headerClassName,
  mainClassName,
  className,
  ...props
}: AppShellProps) {
  const resolvedLabels = getLabels(labels);
  const resolvedSidebarWidth =
    sidebarWidth ?? (sidebarDensity === "comfortable" ? "16.25rem" : "16rem");
  const resolvedSidebarMobileWidth =
    sidebarMobileWidth ??
    (sidebarDensity === "comfortable" ? "16.25rem" : "18rem");
  const [uncontrolledMobileOpen, setUncontrolledMobileOpen] = React.useState(
    defaultMobileSidebarOpen,
  );
  const mobileSidebarOpen = mobileSidebarOpenProp ?? uncontrolledMobileOpen;
  const setMobileSidebarOpen = React.useCallback(
    (open: boolean) => {
      if (mobileSidebarOpenProp === undefined) {
        setUncontrolledMobileOpen(open);
      }
      onMobileSidebarOpenChange?.(open);
    },
    [mobileSidebarOpenProp, onMobileSidebarOpenChange],
  );

  const previousPathRef = React.useRef(currentPath);

  React.useEffect(() => {
    if (closeMobileOnPathChange && previousPathRef.current !== currentPath) {
      setMobileSidebarOpen(false);
    }
    previousPathRef.current = currentPath;
  }, [closeMobileOnPathChange, currentPath, setMobileSidebarOpen]);

  const openMobileSidebar = React.useCallback(() => {
    setMobileSidebarOpen(true);
  }, [setMobileSidebarOpen]);
  const closeMobileSidebar = React.useCallback(() => {
    setMobileSidebarOpen(false);
  }, [setMobileSidebarOpen]);
  const toggleMobileSidebar = React.useCallback(() => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  }, [mobileSidebarOpen, setMobileSidebarOpen]);

  const sidebarProps = {
    navigation,
    currentPath,
    renderLink,
    brand,
    headerActions: sidebarHeaderActions,
    top: sidebarTop,
    footer: sidebarFooter,
    labels,
    density: sidebarDensity,
    headerClassName: sidebarHeaderClassName,
    topClassName: sidebarTopClassName,
    navigationClassName: sidebarNavigationClassName,
    groupClassName: sidebarGroupClassName,
    groupLabelClassName: sidebarGroupLabelClassName,
    footerClassName: sidebarFooterClassName,
    itemClassName: sidebarItemClassName,
    groupTriggerBehavior: sidebarGroupTriggerBehavior,
    onNavigate: closeMobileSidebar,
  };

  const headerRenderState = {
    mobileSidebarOpen,
    openMobileSidebar,
    closeMobileSidebar,
    toggleMobileSidebar,
  };

  return (
    <SidebarProvider
      open
      mobileOpen={mobileSidebarOpen}
      onMobileOpenChange={setMobileSidebarOpen}
      width={resolvedSidebarWidth}
      mobileWidth={resolvedSidebarMobileWidth}
      labels={{
        title: resolvedLabels.navigation,
        description: resolvedLabels.navigationDescription,
        toggle: resolvedLabels.openSidebar,
      }}
      data-slot="app-shell"
      className={cn(
        "flex h-dvh min-h-0 w-full overflow-hidden bg-background text-foreground",
        className,
      )}
      {...props}
    >
      <AppSidebarPanel {...sidebarProps} className={sidebarClassName} />

      <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col">
        {renderHeader ? (
          renderHeader(headerRenderState)
        ) : (
          <AppHeader
            title={headerTitle}
            breadcrumbs={headerBreadcrumbs}
            actions={headerActions}
            renderLink={renderLink}
            labels={labels}
            onSidebarOpen={headerRenderState.openMobileSidebar}
            className={headerClassName}
          />
        )}

        <main
          data-slot="app-shell-main"
          className={cn("min-h-0 flex-1 overflow-auto", mainClassName)}
        >
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
export { type AppShellIcon } from "./app-shell/types";
export { type AppSidebarDensity } from "./app-shell/types";
export { type AppSidebarGroupTriggerBehavior } from "./app-shell/types";
export { type AppShellNavigationItemAttributes } from "./app-shell/types";
export { type AppSidebarNavigationItemState } from "./app-shell/types";
export { type AppSidebarItemClassName } from "./app-shell/types";
export { type AppShellNavigationItem } from "./app-shell/types";
export { type AppShellNavigationGroup } from "./app-shell/types";
export { type AppShellBreadcrumb } from "./app-shell/types";
export { type AppShellRenderLinkProps } from "./app-shell/types";
export { type AppShellRenderLink } from "./app-shell/types";
export { type AppShellLabels } from "./app-shell/types";
export { type AppSidebarProps } from "./app-shell/types";
export { type AppShellHeaderRenderState } from "./app-shell/types";
export { type AppHeaderProps } from "./app-shell/types";
export { type AppShellProps } from "./app-shell/types";
export { AppSidebar } from "./app-shell/AppSidebar";
export { AppHeader } from "./app-shell/AppHeader";
