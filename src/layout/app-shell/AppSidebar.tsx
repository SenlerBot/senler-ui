"use client";
import { ScrollArea } from "../../atoms/scroll-area";
import { cn } from "../../lib/utils";
import { Sidebar as SidebarPrimitive, SidebarProvider } from "../sidebar";
import { type AppSidebarProps, type AppSidebarPanelProps } from "./types";
import { getLabels } from "./navigation";
import { AppSidebarNavItem } from "./AppSidebarNavItem";
function AppSidebarContent({
  navigation,
  currentPath,
  renderLink,
  brand,
  headerActions,
  top,
  footer,
  labels,
  onNavigate,
  density = "standard",
  headerClassName,
  topClassName,
  navigationClassName,
  groupClassName,
  groupLabelClassName,
  footerClassName,
  itemClassName,
  groupTriggerBehavior = "select",
}: AppSidebarProps) {
  const resolvedLabels = getLabels(labels);

  return (
    <div className="flex h-full min-h-0 w-full flex-col">
      <div
        className={cn(
          "flex h-14 shrink-0 items-center gap-2 border-b border-sidebar-border px-3",
          headerClassName,
        )}
      >
        <div className="min-w-0 flex-1 overflow-hidden">{brand}</div>
        {headerActions ? (
          <div className="flex shrink-0 items-center gap-0.5">
            {headerActions}
          </div>
        ) : null}
      </div>

      {top ? (
        <div className={cn("shrink-0 p-2", topClassName)}>{top}</div>
      ) : null}

      <ScrollArea className="min-h-0 flex-1">
        <nav
          aria-label={resolvedLabels.navigation}
          className={cn("grid gap-3 p-2", navigationClassName)}
        >
          {navigation.map((group) => (
            <div
              key={group.id}
              className={cn("grid gap-1", groupClassName, group.className)}
              {...group.attributes}
            >
              {group.label ? (
                <div
                  className={cn(
                    "px-2 py-1 text-xs font-medium text-sidebar-foreground/70",
                    groupLabelClassName,
                    group.labelClassName,
                  )}
                >
                  {group.label}
                </div>
              ) : null}
              <ul className={cn("grid gap-1", group.itemsClassName)}>
                {group.items.map((item) => (
                  <AppSidebarNavItem
                    key={item.id}
                    item={item}
                    currentPath={currentPath}
                    renderLink={renderLink}
                    onNavigate={onNavigate}
                    density={density}
                    itemClassName={itemClassName}
                    labels={resolvedLabels}
                    groupTriggerBehavior={groupTriggerBehavior}
                  />
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </ScrollArea>

      {footer ? (
        <div className={cn("shrink-0 p-2", footerClassName)}>{footer}</div>
      ) : null}
    </div>
  );
}

export function AppSidebarPanel({
  navigation,
  currentPath,
  renderLink,
  brand,
  headerActions,
  top,
  footer,
  className,
  density = "standard",
  mobile = false,
  style,
  labels,
  onNavigate,
  headerClassName,
  topClassName,
  navigationClassName,
  groupClassName,
  groupLabelClassName,
  footerClassName,
  itemClassName,
  groupTriggerBehavior = "select",
  ...elementProps
}: AppSidebarPanelProps) {
  const resolvedLabels = getLabels(labels);

  return (
    <SidebarPrimitive
      {...elementProps}
      data-slot="app-sidebar"
      data-mobile={mobile || undefined}
      data-density={density}
      collapsible={mobile ? "none" : "offcanvas"}
      desktopPosition="container"
      labels={{
        title: resolvedLabels.navigation,
        description: resolvedLabels.navigationDescription,
      }}
      className={className}
      style={style}
    >
      <AppSidebarContent
        navigation={navigation}
        currentPath={currentPath}
        renderLink={renderLink}
        brand={brand}
        headerActions={headerActions}
        top={top}
        footer={footer}
        labels={labels}
        onNavigate={onNavigate}
        density={density}
        headerClassName={headerClassName}
        topClassName={topClassName}
        navigationClassName={navigationClassName}
        groupClassName={groupClassName}
        groupLabelClassName={groupLabelClassName}
        footerClassName={footerClassName}
        itemClassName={itemClassName}
        groupTriggerBehavior={groupTriggerBehavior}
      />
    </SidebarPrimitive>
  );
}

export function AppSidebar({
  density = "standard",
  width,
  mobileWidth,
  mobile = false,
  labels,
  ...props
}: AppSidebarProps) {
  const resolvedLabels = getLabels(labels);
  const resolvedWidth =
    width ?? (density === "comfortable" ? "16.25rem" : "16rem");
  const resolvedMobileWidth =
    mobileWidth ?? (density === "comfortable" ? "16.25rem" : "18rem");

  return (
    <SidebarProvider
      open
      isMobile={mobile}
      width={mobile ? resolvedMobileWidth : resolvedWidth}
      mobileWidth={resolvedMobileWidth}
      labels={{
        title: resolvedLabels.navigation,
        description: resolvedLabels.navigationDescription,
        toggle: resolvedLabels.openSidebar,
      }}
      className={cn("w-auto", mobile && "h-full")}
    >
      <AppSidebarPanel
        {...props}
        labels={labels}
        density={density}
        mobile={mobile}
      />
    </SidebarProvider>
  );
}
