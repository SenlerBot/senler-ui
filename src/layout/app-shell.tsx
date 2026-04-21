import * as React from 'react';
import {
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  MenuIcon,
} from 'lucide-react';

import { Badge } from '../atoms/badge';
import { Button } from '../atoms/button';
import { ScrollArea } from '../atoms/scroll-area';
import { Separator } from '../atoms/separator';
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from '../atoms/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../atoms/tooltip';
import { VisuallyHidden } from '../atoms/visually-hidden';
import { cn } from '../lib/utils';

export type AppShellIcon = React.ComponentType<{ className?: string }>;

export interface AppShellNavigationItem {
  id: string;
  label: React.ReactNode;
  href?: string;
  icon?: AppShellIcon;
  badge?: React.ReactNode;
  disabled?: boolean;
  exact?: boolean;
  active?: boolean;
  match?: string | string[] | ((currentPath: string) => boolean);
  items?: AppShellNavigationItem[];
  defaultOpen?: boolean;
  onSelect?: () => void;
  title?: string;
}

export interface AppShellNavigationGroup {
  id: string;
  label?: React.ReactNode;
  items: AppShellNavigationItem[];
}

export interface AppShellBreadcrumb {
  id: string;
  label: React.ReactNode;
  href?: string;
  title?: string;
  onSelect?: () => void;
}

export interface AppShellRenderLinkProps {
  item?: AppShellNavigationItem;
  breadcrumb?: AppShellBreadcrumb;
  href: string;
  className: string;
  children: React.ReactNode;
  title?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  'aria-current'?: 'page';
}

export type AppShellRenderLink = (props: AppShellRenderLinkProps) => React.ReactNode;

export interface AppShellLabels {
  navigation?: string;
  openSidebar?: string;
  closeSidebar?: string;
  collapseSidebar?: string;
  expandSidebar?: string;
}

export interface AppSidebarProps extends React.HTMLAttributes<HTMLElement> {
  navigation: AppShellNavigationGroup[];
  currentPath: string;
  renderLink: AppShellRenderLink;
  brand: React.ReactNode;
  brandIcon?: React.ReactNode;
  top?: React.ReactNode;
  footer?: React.ReactNode;
  collapsed?: boolean;
  mobile?: boolean;
  labels?: AppShellLabels;
  onNavigate?: () => void;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export interface AppHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  title?: React.ReactNode;
  breadcrumbs?: AppShellBreadcrumb[];
  actions?: React.ReactNode;
  renderLink?: AppShellRenderLink;
  labels?: AppShellLabels;
  onSidebarOpen?: () => void;
}

export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  navigation: AppShellNavigationGroup[];
  currentPath: string;
  renderLink: AppShellRenderLink;
  brand: React.ReactNode;
  brandIcon?: React.ReactNode;
  sidebarTop?: React.ReactNode;
  sidebarFooter?: React.ReactNode;
  headerTitle?: React.ReactNode;
  headerBreadcrumbs?: AppShellBreadcrumb[];
  headerActions?: React.ReactNode;
  children: React.ReactNode;
  defaultSidebarCollapsed?: boolean;
  sidebarCollapsed?: boolean;
  onSidebarCollapsedChange?: (collapsed: boolean) => void;
  sidebarStorageKey?: string;
  closeMobileOnPathChange?: boolean;
  labels?: AppShellLabels;
  sidebarClassName?: string;
  headerClassName?: string;
  mainClassName?: string;
}

const defaultLabels = {
  navigation: 'Navigation',
  openSidebar: 'Open navigation',
  closeSidebar: 'Close navigation',
  collapseSidebar: 'Collapse navigation',
  expandSidebar: 'Expand navigation',
};

function getLabels(labels: AppShellLabels | undefined) {
  return {
    ...defaultLabels,
    ...labels,
  };
}

function isItemActive(item: AppShellNavigationItem, currentPath: string): boolean {
  if (typeof item.active === 'boolean') {
    return item.active;
  }

  if (typeof item.match === 'function') {
    return item.match(currentPath);
  }

  const matches = Array.isArray(item.match)
    ? item.match
    : item.match
      ? [item.match]
      : [];

  if (
    matches.some((match) => currentPath === match || currentPath.startsWith(`${match}/`) || currentPath.includes(match))
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

function getItemTitle(item: AppShellNavigationItem) {
  if (item.title) {
    return item.title;
  }

  if (typeof item.label === 'string') {
    return item.label;
  }

  return item.id;
}

function callNavigationHandlers(
  item: AppShellNavigationItem,
  onNavigate: (() => void) | undefined
) {
  item.onSelect?.();
  onNavigate?.();
}

function AppSidebarNavItem({
  item,
  currentPath,
  collapsed,
  renderLink,
  onNavigate,
  depth = 0,
}: {
  item: AppShellNavigationItem;
  currentPath: string;
  collapsed: boolean;
  renderLink: AppShellRenderLink;
  onNavigate?: () => void;
  depth?: number;
}) {
  const active = isItemActive(item, currentPath);
  const title = getItemTitle(item);
  const Icon = item.icon;
  const hasChildren = !!item.items?.length;
  const showChildren = !collapsed && hasChildren && (active || item.defaultOpen);
  const itemClassName = cn(
    'group/app-shell-nav-item flex h-8 w-full items-center gap-2 rounded-md text-sm outline-none transition-colors',
    'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
    'focus-visible:ring-2 focus-visible:ring-sidebar-ring disabled:pointer-events-none disabled:opacity-50',
    'aria-disabled:pointer-events-none aria-disabled:opacity-50',
    active && 'bg-muted font-medium text-foreground',
    collapsed ? 'justify-center px-2' : 'px-2',
    depth > 0 && !collapsed && 'h-7 text-[13px] text-sidebar-foreground/80'
  );
  const content = (
    <>
      {Icon ? <Icon className='size-4 shrink-0 text-muted-foreground group-hover/app-shell-nav-item:text-inherit' /> : null}
      {!collapsed ? (
        <>
          <span className='min-w-0 flex-1 truncate'>{item.label}</span>
          {item.badge !== undefined ? (
            <Badge variant='secondary' className='ml-auto max-w-16 rounded-full px-1.5 py-0 text-[11px]'>
              {item.badge}
            </Badge>
          ) : null}
        </>
      ) : null}
    </>
  );

  const handleButtonClick = () => {
    if (item.disabled) {
      return;
    }

    callNavigationHandlers(item, onNavigate);
  };

  const handleLinkClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    callNavigationHandlers(item, onNavigate);
  };

  const control = item.href && !item.disabled
    ? renderLink({
      item,
      href: item.href,
      className: itemClassName,
      children: content,
      title,
      onClick: handleLinkClick,
      'aria-current': active ? 'page' : undefined,
    })
    : (
      <button
        type='button'
        className={itemClassName}
        disabled={item.disabled}
        aria-current={active ? 'page' : undefined}
        aria-disabled={item.disabled || undefined}
        title={title}
        onClick={handleButtonClick}
      >
        {content}
      </button>
    );

  return (
    <li className='min-w-0'>
      {collapsed ? (
        <Tooltip>
          <TooltipTrigger asChild>{control}</TooltipTrigger>
          <TooltipContent side='right' align='center'>
            {title}
          </TooltipContent>
        </Tooltip>
      ) : control}

      {showChildren ? (
        <ul className='mt-1 grid gap-1 border-l border-sidebar-border pl-3'>
          {item.items?.map((child) => (
            <AppSidebarNavItem
              key={child.id}
              item={child}
              currentPath={currentPath}
              collapsed={collapsed}
              renderLink={renderLink}
              onNavigate={onNavigate}
              depth={depth + 1}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

function AppSidebarContent({
  navigation,
  currentPath,
  renderLink,
  brand,
  brandIcon,
  top,
  footer,
  collapsed = false,
  mobile = false,
  labels,
  onNavigate,
  onCollapsedChange,
}: AppSidebarProps) {
  const resolvedLabels = getLabels(labels);

  return (
    <div className='flex h-full min-h-0 w-full flex-col'>
      <div
        className={cn(
          'flex h-14 shrink-0 items-center gap-2 border-b border-sidebar-border px-3',
          collapsed && !mobile && 'justify-center px-2'
        )}
      >
        <div className='min-w-0 flex-1 overflow-hidden'>
          {collapsed && !mobile ? (
            <div className='flex size-8 items-center justify-center overflow-hidden rounded-md'>
              {brandIcon ?? brand}
            </div>
          ) : brand}
        </div>

        {!mobile && onCollapsedChange ? (
          <Button
            type='button'
            variant='ghost'
            size='icon_sm'
            aria-label={collapsed ? resolvedLabels.expandSidebar : resolvedLabels.collapseSidebar}
            title={collapsed ? resolvedLabels.expandSidebar : resolvedLabels.collapseSidebar}
            onClick={() => onCollapsedChange(!collapsed)}
          >
            {collapsed ? <ChevronsRightIcon /> : <ChevronsLeftIcon />}
          </Button>
        ) : null}
      </div>

      {top && (!collapsed || mobile) ? (
        <div className='shrink-0 border-b border-sidebar-border p-2'>{top}</div>
      ) : null}

      <ScrollArea className='min-h-0 flex-1'>
        <nav aria-label={resolvedLabels.navigation} className='grid gap-3 p-2'>
          {navigation.map((group, index) => (
            <div key={group.id} className='grid gap-1'>
              {index > 0 && !collapsed ? <Separator className='my-1 bg-sidebar-border' /> : null}
              {group.label && !collapsed ? (
                <div className='px-2 py-1 text-xs font-medium text-sidebar-foreground/70'>
                  {group.label}
                </div>
              ) : null}
              <ul className='grid gap-1'>
                {group.items.map((item) => (
                  <AppSidebarNavItem
                    key={item.id}
                    item={item}
                    currentPath={currentPath}
                    collapsed={collapsed && !mobile}
                    renderLink={renderLink}
                    onNavigate={onNavigate}
                  />
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </ScrollArea>

      {footer && (!collapsed || mobile) ? (
        <div className='shrink-0 border-t border-sidebar-border p-2'>{footer}</div>
      ) : null}
    </div>
  );
}

export function AppSidebar({
  className,
  collapsed = false,
  mobile = false,
  ...props
}: AppSidebarProps) {
  if (mobile) {
    return (
      <div
        data-slot='app-sidebar'
        data-mobile='true'
        className={cn('flex h-full bg-sidebar text-sidebar-foreground', className)}
      >
        <AppSidebarContent collapsed={false} mobile {...props} />
      </div>
    );
  }

  return (
    <aside
      data-slot='app-sidebar'
      data-state={collapsed ? 'collapsed' : 'expanded'}
      className={cn(
        'hidden h-dvh shrink-0 border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200 ease-linear md:flex',
        collapsed ? 'w-12' : 'w-64',
        className
      )}
    >
      <AppSidebarContent collapsed={collapsed} {...props} />
    </aside>
  );
}

function AppHeaderBreadcrumbs({
  breadcrumbs,
  renderLink,
}: {
  breadcrumbs: AppShellBreadcrumb[];
  renderLink?: AppShellRenderLink;
}) {
  return (
    <div className='flex min-w-0 flex-1 items-center gap-1 overflow-hidden'>
      {breadcrumbs.map((breadcrumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        const isClickable = !isLast && !!breadcrumb.href && !!renderLink;
        const className = cn(
          'text-[13px] font-medium leading-4 whitespace-nowrap text-foreground transition-colors',
          isClickable && 'hover:text-primary'
        );

        return (
          <React.Fragment key={breadcrumb.id}>
            {index > 0 ? <ChevronRightIcon className='size-4 shrink-0 text-muted-foreground' /> : null}
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
      data-slot='app-header'
      className={cn('shrink-0 border-b border-border bg-background', className)}
      {...props}
    >
      <div className='flex h-14 min-w-0 items-center gap-2 px-4 md:hidden'>
        {onSidebarOpen ? (
          <Button
            type='button'
            variant='ghost'
            size='icon'
            aria-label={resolvedLabels.openSidebar}
            title={resolvedLabels.openSidebar}
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </Button>
        ) : null}
        {title ? (
          <span className='min-w-0 flex-1 truncate text-sm font-semibold text-foreground'>
            {title}
          </span>
        ) : null}
        {actions ? <div className='ml-auto flex shrink-0 items-center gap-1'>{actions}</div> : null}
      </div>

      <div className='hidden h-14 min-w-0 items-center gap-2 px-4 md:flex'>
        {breadcrumbs?.length ? (
          <AppHeaderBreadcrumbs breadcrumbs={breadcrumbs} renderLink={renderLink} />
        ) : (
          <div className='min-w-0 flex-1'>
            {title ? (
              <p className='truncate text-[13px] font-medium leading-4 text-foreground'>
                {title}
              </p>
            ) : null}
          </div>
        )}
        {actions ? <div className='ml-auto flex shrink-0 items-center gap-2'>{actions}</div> : null}
      </div>
    </header>
  );
}

export function AppShell({
  navigation,
  currentPath,
  renderLink,
  brand,
  brandIcon,
  sidebarTop,
  sidebarFooter,
  headerTitle,
  headerBreadcrumbs,
  headerActions,
  children,
  defaultSidebarCollapsed = false,
  sidebarCollapsed,
  onSidebarCollapsedChange,
  sidebarStorageKey,
  closeMobileOnPathChange = true,
  labels,
  sidebarClassName,
  headerClassName,
  mainClassName,
  className,
  ...props
}: AppShellProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [uncontrolledCollapsed, setUncontrolledCollapsed] = React.useState(defaultSidebarCollapsed);
  const collapsed = sidebarCollapsed ?? uncontrolledCollapsed;

  React.useEffect(() => {
    if (!sidebarStorageKey || sidebarCollapsed !== undefined || typeof window === 'undefined') {
      return;
    }

    const storedState = window.localStorage.getItem(sidebarStorageKey);
    if (storedState === 'collapsed') {
      setUncontrolledCollapsed(true);
    }
    if (storedState === 'expanded') {
      setUncontrolledCollapsed(false);
    }
  }, [sidebarCollapsed, sidebarStorageKey]);

  React.useEffect(() => {
    if (closeMobileOnPathChange) {
      setMobileOpen(false);
    }
  }, [closeMobileOnPathChange, currentPath]);

  const setCollapsed = React.useCallback(
    (nextCollapsed: boolean) => {
      onSidebarCollapsedChange?.(nextCollapsed);

      if (sidebarCollapsed === undefined) {
        setUncontrolledCollapsed(nextCollapsed);
      }

      if (sidebarStorageKey && typeof window !== 'undefined') {
        window.localStorage.setItem(sidebarStorageKey, nextCollapsed ? 'collapsed' : 'expanded');
      }
    },
    [onSidebarCollapsedChange, sidebarCollapsed, sidebarStorageKey]
  );

  const sidebarProps = {
    navigation,
    currentPath,
    renderLink,
    brand,
    brandIcon,
    top: sidebarTop,
    footer: sidebarFooter,
    labels,
    onNavigate: () => setMobileOpen(false),
  };

  return (
    <div
      data-slot='app-shell'
      className={cn('flex min-h-dvh w-full bg-background text-foreground', className)}
      {...props}
    >
      <AppSidebar
        {...sidebarProps}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        className={sidebarClassName}
      />

      <div className='flex min-h-dvh min-w-0 flex-1 flex-col'>
        <AppHeader
          title={headerTitle}
          breadcrumbs={headerBreadcrumbs}
          actions={headerActions}
          renderLink={renderLink}
          labels={labels}
          onSidebarOpen={() => setMobileOpen(true)}
          className={headerClassName}
        />

        <main data-slot='app-shell-main' className={cn('min-h-0 flex-1 overflow-auto', mainClassName)}>
          {children}
        </main>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side='left'
          showCloseButton={false}
          className='w-[18rem] p-0 text-sidebar-foreground sm:max-w-none [&>button]:hidden'
        >
          <VisuallyHidden>
            <SheetTitle>{getLabels(labels).navigation}</SheetTitle>
          </VisuallyHidden>
          <AppSidebar {...sidebarProps} mobile />
        </SheetContent>
      </Sheet>
    </div>
  );
}
