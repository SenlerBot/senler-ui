"use client";
import * as React from "react";
import { ChevronRightIcon, MenuIcon } from "lucide-react";
import { Button } from "../../atoms/button";
import { cn } from "../../lib/utils";
import {
  type AppShellBreadcrumb,
  type AppShellRenderLink,
  type AppHeaderProps,
} from "./types";
import { getLabels } from "./navigation";
function AppHeaderBreadcrumbs({
  breadcrumbs,
  renderLink,
}: {
  breadcrumbs: AppShellBreadcrumb[];
  renderLink?: AppShellRenderLink;
}) {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-1 overflow-hidden">
      {breadcrumbs.map((breadcrumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        const isClickable = !isLast && !!breadcrumb.href && !!renderLink;
        const className = cn(
          "text-[13px] font-medium leading-4 whitespace-nowrap text-foreground transition-colors",
          isClickable && "cursor-pointer hover:text-primary",
        );

        return (
          <React.Fragment key={breadcrumb.id}>
            {index > 0 ? (
              <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground" />
            ) : null}
            {isClickable && breadcrumb.href ? (
              renderLink({
                breadcrumb,
                href: breadcrumb.href,
                className,
                children: breadcrumb.label,
                title: breadcrumb.title,
                onClick: () => breadcrumb.onSelect?.(),
              })
            ) : (
              <p className={className} title={breadcrumb.title}>
                {breadcrumb.label}
              </p>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export function AppHeader({
  title,
  breadcrumbs,
  actions,
  renderLink,
  labels,
  onSidebarOpen,
  className,
  ...props
}: AppHeaderProps) {
  const resolvedLabels = getLabels(labels);

  return (
    <header
      data-slot="app-header"
      className={cn("shrink-0 border-b border-border bg-background", className)}
      {...props}
    >
      <div className="flex h-14 min-w-0 items-center gap-2 px-4 md:hidden">
        {onSidebarOpen ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={resolvedLabels.openSidebar}
            title={resolvedLabels.openSidebar}
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </Button>
        ) : null}
        {title ? (
          <span className="min-w-0 flex-1 truncate text-sm font-semibold text-foreground">
            {title}
          </span>
        ) : null}
        {actions ? (
          <div className="ml-auto flex shrink-0 items-center gap-1">
            {actions}
          </div>
        ) : null}
      </div>

      <div className="hidden h-14 min-w-0 items-center gap-2 px-4 md:flex">
        {breadcrumbs?.length ? (
          <AppHeaderBreadcrumbs
            breadcrumbs={breadcrumbs}
            renderLink={renderLink}
          />
        ) : (
          <div className="min-w-0 flex-1">
            {title ? (
              <p className="truncate text-[13px] font-medium leading-4 text-foreground">
                {title}
              </p>
            ) : null}
          </div>
        )}
        {actions ? (
          <div className="ml-auto flex shrink-0 items-center gap-2">
            {actions}
          </div>
        ) : null}
      </div>
    </header>
  );
}
