"use client";
import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Badge } from "../../atoms/badge";
import { cn } from "../../lib/utils";
import {
  type AppSidebarDensity,
  type AppSidebarGroupTriggerBehavior,
  type AppSidebarItemClassName,
  type AppShellNavigationItem,
  type AppShellRenderLink,
  type AppShellLabels,
} from "./types";
import {
  isItemActive,
  getItemTitle,
  callNavigationHandlers,
} from "./navigation";
export function AppSidebarNavItem({
  item,
  currentPath,
  renderLink,
  onNavigate,
  density,
  itemClassName,
  labels,
  groupTriggerBehavior,
  depth = 0,
}: {
  item: AppShellNavigationItem;
  currentPath: string;
  renderLink: AppShellRenderLink;
  onNavigate?: () => void;
  density: AppSidebarDensity;
  itemClassName?: AppSidebarItemClassName;
  labels: Required<AppShellLabels>;
  groupTriggerBehavior: AppSidebarGroupTriggerBehavior;
  depth?: number;
}) {
  const active = isItemActive(item, currentPath);
  const title = getItemTitle(item);
  const Icon = item.icon;
  const hasChildren = !!item.items?.length;
  const childrenId = React.useId();
  const [uncontrolledExpanded, setUncontrolledExpanded] = React.useState(
    item.defaultOpen ?? active,
  );
  const previousActiveRef = React.useRef(active);
  const previousPathRef = React.useRef(currentPath);
  const usesToggle = hasChildren && groupTriggerBehavior === "toggle";
  const expanded =
    hasChildren &&
    (usesToggle
      ? (item.expanded ?? uncontrolledExpanded)
      : (item.expanded ?? (active || item.defaultOpen === true)));

  React.useEffect(() => {
    const becameActive = active && !previousActiveRef.current;
    const changedWithinActiveGroup =
      active && previousPathRef.current !== currentPath;
    previousActiveRef.current = active;
    previousPathRef.current = currentPath;

    if (
      usesToggle &&
      (becameActive || changedWithinActiveGroup) &&
      item.expanded === undefined
    ) {
      setUncontrolledExpanded(true);
    }
  }, [active, currentPath, item.expanded, usesToggle]);

  const state = {
    active,
    depth,
    expanded,
    hasChildren,
  };
  const resolvedItemClassName =
    typeof itemClassName === "function"
      ? itemClassName(item, state)
      : itemClassName;
  const controlClassName = cn(
    "group/app-shell-nav-item flex w-full cursor-pointer items-center text-sm outline-none transition-colors",
    "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
    "focus-visible:ring-2 focus-visible:ring-sidebar-ring disabled:pointer-events-none disabled:opacity-50",
    "aria-disabled:pointer-events-none aria-disabled:opacity-50",
    active && "bg-muted font-medium text-foreground",
    density === "comfortable"
      ? "h-9 gap-1.5 rounded-[10px] px-2.5 font-medium"
      : "h-8 gap-2 rounded-md px-2",
    depth > 0 &&
      (density === "comfortable"
        ? "h-8 text-[13px] text-sidebar-foreground/80"
        : "h-7 text-[13px] text-sidebar-foreground/80"),
    resolvedItemClassName,
    item.className,
  );
  const content = (includeDisclosure: boolean) => (
    <>
      {Icon ? (
        <Icon className="size-4 shrink-0 text-muted-foreground group-hover/app-shell-nav-item:text-inherit" />
      ) : null}
      <span className="min-w-0 flex-1 truncate">{item.label}</span>
      {item.badge !== undefined && item.badgeAppearance !== "plain" ? (
        <Badge
          variant="secondary"
          className="ml-auto max-w-16 rounded-full px-1.5 py-0 text-[11px]"
        >
          {item.badge}
        </Badge>
      ) : null}
      {item.badge !== undefined && item.badgeAppearance === "plain" ? (
        <span className="ml-auto shrink-0 text-[13px] font-medium tabular-nums text-muted-foreground">
          {item.badge}
        </span>
      ) : null}
      {item.trailing}
      {includeDisclosure ? (
        <ChevronDownIcon
          aria-hidden="true"
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform",
            expanded && "rotate-180",
          )}
        />
      ) : null}
    </>
  );

  const setExpanded = (nextExpanded: boolean) => {
    if (item.expanded === undefined) {
      setUncontrolledExpanded(nextExpanded);
    }
    item.onExpandedChange?.(nextExpanded);
  };

  const handleSelect = () => {
    if (item.disabled) {
      return;
    }
    callNavigationHandlers(item, onNavigate);
  };

  const handleToggle = () => {
    if (!item.disabled) {
      setExpanded(!expanded);
    }
  };

  const handleLinkClick: React.MouseEventHandler<HTMLAnchorElement> = (
    event,
  ) => {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    callNavigationHandlers(item, onNavigate);
  };

  let control: React.ReactNode;

  if (item.href && !item.disabled) {
    const link = renderLink({
      item,
      href: item.href,
      className: cn(controlClassName, usesToggle && "min-w-0 flex-1"),
      children: content(false),
      title,
      onClick: handleLinkClick,
      "aria-current": active ? "page" : undefined,
      ...item.attributes,
    });

    control = usesToggle ? (
      <div className="flex min-w-0 items-center gap-1">
        {link}
        <button
          type="button"
          data-slot="app-sidebar-disclosure"
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors",
            "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring",
          )}
          aria-controls={childrenId}
          aria-expanded={expanded}
          aria-label={`${expanded ? labels.collapseNavigationGroup : labels.expandNavigationGroup}: ${title}`}
          title={`${expanded ? labels.collapseNavigationGroup : labels.expandNavigationGroup}: ${title}`}
          onClick={handleToggle}
        >
          <ChevronDownIcon
            aria-hidden="true"
            className={cn(
              "size-4 transition-transform",
              expanded && "rotate-180",
            )}
          />
        </button>
      </div>
    ) : (
      link
    );
  } else {
    control = (
      <button
        type="button"
        className={controlClassName}
        disabled={item.disabled}
        aria-current={active ? "page" : undefined}
        aria-controls={usesToggle ? childrenId : undefined}
        aria-expanded={usesToggle ? expanded : undefined}
        aria-disabled={item.disabled || undefined}
        title={title}
        onClick={usesToggle ? handleToggle : handleSelect}
        {...item.attributes}
      >
        {content(usesToggle)}
      </button>
    );
  }

  return (
    <li className="min-w-0">
      {control}

      {expanded ? (
        <ul
          id={childrenId}
          className={cn(
            "mt-1 grid gap-1 border-l border-sidebar-border pl-3",
            item.childrenClassName,
          )}
        >
          {item.items?.map((child) => (
            <AppSidebarNavItem
              key={child.id}
              item={child}
              currentPath={currentPath}
              renderLink={renderLink}
              onNavigate={onNavigate}
              density={density}
              itemClassName={itemClassName}
              labels={labels}
              groupTriggerBehavior={groupTriggerBehavior}
              depth={depth + 1}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}
