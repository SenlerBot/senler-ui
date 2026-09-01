'use client';

import * as React from 'react';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  MenuIcon,
} from 'lucide-react';

import { Badge } from '../atoms/badge';
import { Button } from '../atoms/button';
import { ScrollArea } from '../atoms/scroll-area';
import { cn } from '../lib/utils';
import {
  Sidebar as SidebarPrimitive,
  SidebarProvider,
} from './sidebar';

export type AppShellIcon = React.ComponentType<{ className?: string }>;

export type AppSidebarDensity = 'standard' | 'comfortable';
export type AppSidebarGroupTriggerBehavior = 'select' | 'toggle';

export interface AppShellNavigationItemAttributes {
  'aria-label'?: string;
  [attribute: `data-${string}`]: string | number | boolean | undefined;
}

export interface AppSidebarNavigationItemState {
  active: boolean;
  depth: number;
  expanded: boolean;
  hasChildren: boolean;
}

export type AppSidebarItemClassName =
  | string
  | ((item: AppShellNavigationItem, state: AppSidebarNavigationItemState) => string | undefined);

export interface AppShellNavigationItem {
  id: string;
  label: React.ReactNode;
  href?: string;
  icon?: AppShellIcon;
  badge?: React.ReactNode;
  badgeAppearance?: 'badge' | 'plain';
  trailing?: React.ReactNode;
  disabled?: boolean;
  exact?: boolean;
  active?: boolean;
  match?: string | string[] | ((currentPath: string) => boolean);
  items?: AppShellNavigationItem[];
  defaultOpen?: boolean;
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  onSelect?: () => void;
  title?: string;
  attributes?: AppShellNavigationItemAttributes;
  className?: string;
  childrenClassName?: string;
}

export interface AppShellNavigationGroup {
  id: string;
  label?: React.ReactNode;
  items: AppShellNavigationItem[];
  attributes?: AppShellNavigationItemAttributes;
  className?: string;
  labelClassName?: string;
  itemsClassName?: string;
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
  [attribute: `data-${string}`]: string | number | boolean | undefined;
}

export type AppShellRenderLink = (props: AppShellRenderLinkProps) => React.ReactNode;

export interface AppShellLabels {
  navigation?: string;
  navigationDescription?: string;
  openSidebar?: string;
  expandNavigationGroup?: string;
  collapseNavigationGroup?: string;
}

export interface AppSidebarProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  'children' | 'dangerouslySetInnerHTML'
> {
  navigation: AppShellNavigationGroup[];
  currentPath: string;
  renderLink: AppShellRenderLink;
  brand: React.ReactNode;
  headerActions?: React.ReactNode;
  top?: React.ReactNode;
  footer?: React.ReactNode;
  mobile?: boolean;
  labels?: AppShellLabels;
  onNavigate?: () => void;
  density?: AppSidebarDensity;
  width?: string;
  mobileWidth?: string;
  headerClassName?: string;
  topClassName?: string;
  navigationClassName?: string;
  groupClassName?: string;
  groupLabelClassName?: string;
  footerClassName?: string;
  itemClassName?: AppSidebarItemClassName;
  groupTriggerBehavior?: AppSidebarGroupTriggerBehavior;
}

export interface AppShellHeaderRenderState {
  mobileSidebarOpen: boolean;
  openMobileSidebar: () => void;
  closeMobileSidebar: () => void;
  toggleMobileSidebar: () => void;
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
  sidebarHeaderActions?: React.ReactNode;
  sidebarTop?: React.ReactNode;
  sidebarFooter?: React.ReactNode;
  headerTitle?: React.ReactNode;
  headerBreadcrumbs?: AppShellBreadcrumb[];
  headerActions?: React.ReactNode;
  children: React.ReactNode;
  closeMobileOnPathChange?: boolean;
  mobileSidebarOpen?: boolean;
  defaultMobileSidebarOpen?: boolean;
  onMobileSidebarOpenChange?: (open: boolean) => void;
  renderHeader?: (state: AppShellHeaderRenderState) => React.ReactNode;
  labels?: AppShellLabels;
  sidebarDensity?: AppSidebarDensity;
  sidebarWidth?: string;
  sidebarMobileWidth?: string;
  sidebarHeaderClassName?: string;
  sidebarTopClassName?: string;
  sidebarNavigationClassName?: string;
  sidebarGroupClassName?: string;
  sidebarGroupLabelClassName?: string;
  sidebarFooterClassName?: string;
  sidebarItemClassName?: AppSidebarItemClassName;
  sidebarGroupTriggerBehavior?: AppSidebarGroupTriggerBehavior;
  sidebarClassName?: string;
  headerClassName?: string;
  mainClassName?: string;
}

const defaultLabels = {
  navigation: 'Navigation',
  navigationDescription: 'Displays the application navigation.',
  openSidebar: 'Open navigation',
  expandNavigationGroup: 'Expand navigation group',
  collapseNavigationGroup: 'Collapse navigation group',
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
    matches.some((match) => currentPath === match || currentPath.startsWith(`${match}/`))
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
    item.defaultOpen ?? active
  );
  const previousActiveRef = React.useRef(active);
  const previousPathRef = React.useRef(currentPath);
  const usesToggle = hasChildren && groupTriggerBehavior === 'toggle';
  const expanded = hasChildren && (
    usesToggle
      ? item.expanded ?? uncontrolledExpanded
      : item.expanded ?? (active || item.defaultOpen === true)
  );

  React.useEffect(() => {
    const becameActive = active && !previousActiveRef.current;
    const changedWithinActiveGroup = active && previousPathRef.current !== currentPath;
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
  const resolvedItemClassName = typeof itemClassName === 'function'
    ? itemClassName(item, state)
    : itemClassName;
  const controlClassName = cn(
    'group/app-shell-nav-item flex w-full cursor-pointer items-center text-sm outline-none transition-colors',
    'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
    'focus-visible:ring-2 focus-visible:ring-sidebar-ring disabled:pointer-events-none disabled:opacity-50',
    'aria-disabled:pointer-events-none aria-disabled:opacity-50',
    active && 'bg-muted font-medium text-foreground',
    density === 'comfortable'
      ? 'h-9 gap-1.5 rounded-[10px] px-2.5 font-medium'
      : 'h-8 gap-2 rounded-md px-2',
    depth > 0 && (
      density === 'comfortable'
        ? 'h-8 text-[13px] text-sidebar-foreground/80'
        : 'h-7 text-[13px] text-sidebar-foreground/80'
    ),
    resolvedItemClassName,
    item.className
  );
  const content = (includeDisclosure: boolean) => (
    <>
      {Icon ? <Icon className='size-4 shrink-0 text-muted-foreground group-hover/app-shell-nav-item:text-inherit' /> : null}
      <span className='min-w-0 flex-1 truncate'>{item.label}</span>
      {item.badge !== undefined && item.badgeAppearance !== 'plain' ? (
        <Badge variant='secondary' className='ml-auto max-w-16 rounded-full px-1.5 py-0 text-[11px]'>
          {item.badge}
        </Badge>
      ) : null}
      {item.badge !== undefined && item.badgeAppearance === 'plain' ? (
        <span className='ml-auto shrink-0 text-[13px] font-medium tabular-nums text-muted-foreground'>
          {item.badge}
        </span>
      ) : null}
      {item.trailing}
      {includeDisclosure ? (
        <ChevronDownIcon
          aria-hidden='true'
          className={cn('size-4 shrink-0 text-muted-foreground transition-transform', expanded && 'rotate-180')}
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

  const handleLinkClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
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
      className: cn(controlClassName, usesToggle && 'min-w-0 flex-1'),
      children: content(false),
      title,
      onClick: handleLinkClick,
      'aria-current': active ? 'page' : undefined,
      ...item.attributes,
    });

    control = usesToggle ? (
      <div className='flex min-w-0 items-center gap-1'>
        {link}
        <button
          type='button'
          data-slot='app-sidebar-disclosure'
          className={cn(
            'flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors',
            'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring',
          )}
          aria-controls={childrenId}
          aria-expanded={expanded}
          aria-label={`${expanded ? labels.collapseNavigationGroup : labels.expandNavigationGroup}: ${title}`}
          title={`${expanded ? labels.collapseNavigationGroup : labels.expandNavigationGroup}: ${title}`}
          onClick={handleToggle}
        >
          <ChevronDownIcon
            aria-hidden='true'
            className={cn('size-4 transition-transform', expanded && 'rotate-180')}
          />
        </button>
      </div>
    ) : link;
  } else {
    control = (
      <button
        type='button'
        className={controlClassName}
        disabled={item.disabled}
        aria-current={active ? 'page' : undefined}
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
    <li className='min-w-0'>
      {control}

      {expanded ? (
        <ul id={childrenId} className={cn('mt-1 grid gap-1 border-l border-sidebar-border pl-3', item.childrenClassName)}>
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
  density = 'standard',
  headerClassName,
  topClassName,
  navigationClassName,
  groupClassName,
  groupLabelClassName,
  footerClassName,
  itemClassName,
  groupTriggerBehavior = 'select',
}: AppSidebarProps) {
  const resolvedLabels = getLabels(labels);

  return (
    <div className='flex h-full min-h-0 w-full flex-col'>
      <div className={cn('flex h-14 shrink-0 items-center gap-2 border-b border-sidebar-border px-3', headerClassName)}>
        <div className='min-w-0 flex-1 overflow-hidden'>
          {brand}
        </div>
        {headerActions ? <div className='flex shrink-0 items-center gap-0.5'>{headerActions}</div> : null}
      </div>

      {top ? (
        <div className={cn('shrink-0 p-2', topClassName)}>{top}</div>
      ) : null}

      <ScrollArea className='min-h-0 flex-1'>
        <nav aria-label={resolvedLabels.navigation} className={cn('grid gap-3 p-2', navigationClassName)}>
          {navigation.map((group) => (
            <div
              key={group.id}
              className={cn('grid gap-1', groupClassName, group.className)}
              {...group.attributes}
            >
              {group.label ? (
                <div
                  className={cn(
                    'px-2 py-1 text-xs font-medium text-sidebar-foreground/70',
                    groupLabelClassName,
                    group.labelClassName,
                  )}
                >
                  {group.label}
                </div>
              ) : null}
              <ul className={cn('grid gap-1', group.itemsClassName)}>
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
        <div className={cn('shrink-0 p-2', footerClassName)}>{footer}</div>
      ) : null}
    </div>
  );
}

type AppSidebarPanelProps = Omit<AppSidebarProps, 'width' | 'mobileWidth'>;

function AppSidebarPanel({
  navigation,
  currentPath,
  renderLink,
  brand,
  headerActions,
  top,
  footer,
  className,
  density = 'standard',
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
  groupTriggerBehavior = 'select',
  ...elementProps
}: AppSidebarPanelProps) {
  const resolvedLabels = getLabels(labels);

  return (
    <SidebarPrimitive
      {...elementProps}
      data-slot='app-sidebar'
      data-mobile={mobile || undefined}
      data-density={density}
      collapsible={mobile ? 'none' : 'offcanvas'}
      desktopPosition='container'
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
  density = 'standard',
  width,
  mobileWidth,
  mobile = false,
  labels,
  ...props
}: AppSidebarProps) {
  const resolvedLabels = getLabels(labels);
  const resolvedWidth = width ?? (density === 'comfortable' ? '16.25rem' : '16rem');
  const resolvedMobileWidth = mobileWidth ?? (density === 'comfortable' ? '16.25rem' : '18rem');

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
      className={cn('w-auto', mobile && 'h-full')}
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
          isClickable && 'cursor-pointer hover:text-primary'
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
  sidebarDensity = 'standard',
  sidebarWidth,
  sidebarMobileWidth,
  sidebarHeaderClassName,
  sidebarTopClassName,
  sidebarNavigationClassName,
  sidebarGroupClassName,
  sidebarGroupLabelClassName,
  sidebarFooterClassName,
  sidebarItemClassName,
  sidebarGroupTriggerBehavior = 'select',
  sidebarClassName,
  headerClassName,
  mainClassName,
  className,
  ...props
}: AppShellProps) {
  const resolvedLabels = getLabels(labels);
  const resolvedSidebarWidth = sidebarWidth ?? (
    sidebarDensity === 'comfortable' ? '16.25rem' : '16rem'
  );
  const resolvedSidebarMobileWidth = sidebarMobileWidth ?? (
    sidebarDensity === 'comfortable' ? '16.25rem' : '18rem'
  );
  const [uncontrolledMobileOpen, setUncontrolledMobileOpen] = React.useState(
    defaultMobileSidebarOpen
  );
  const mobileSidebarOpen = mobileSidebarOpenProp ?? uncontrolledMobileOpen;
  const setMobileSidebarOpen = React.useCallback((open: boolean) => {
    if (mobileSidebarOpenProp === undefined) {
      setUncontrolledMobileOpen(open);
    }
    onMobileSidebarOpenChange?.(open);
  }, [mobileSidebarOpenProp, onMobileSidebarOpenChange]);

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
      data-slot='app-shell'
      className={cn('flex h-dvh min-h-0 w-full overflow-hidden bg-background text-foreground', className)}
      {...props}
    >
      <AppSidebarPanel
        {...sidebarProps}
        className={sidebarClassName}
      />

      <div className='flex h-full min-h-0 min-w-0 flex-1 flex-col'>
        {renderHeader ? renderHeader(headerRenderState) : (
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

        <main data-slot='app-shell-main' className={cn('min-h-0 flex-1 overflow-auto', mainClassName)}>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
