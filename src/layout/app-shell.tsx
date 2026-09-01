import * as React from 'react';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  MenuIcon,
} from 'lucide-react';

import { Badge } from '../atoms/badge';
import { Button } from '../atoms/button';
import { ScrollArea } from '../atoms/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from '../atoms/sheet';
import { VisuallyHidden } from '../atoms/visually-hidden';
import { cn } from '../lib/utils';

export type AppShellIcon = React.ComponentType<{ className?: string }>;

export type AppSidebarDensity = 'standard' | 'comfortable';
export type AppSidebarDisclosureBehavior = 'legacy' | 'interactive';

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
  'aria-expanded'?: boolean;
  [attribute: `data-${string}`]: string | number | boolean | undefined;
}

export type AppShellRenderLink = (props: AppShellRenderLinkProps) => React.ReactNode;

export interface AppShellLabels {
  navigation?: string;
  openSidebar?: string;
}

export interface AppSidebarProps extends React.HTMLAttributes<HTMLElement> {
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
  showDisclosureIcons?: boolean;
  disclosureBehavior?: AppSidebarDisclosureBehavior;
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
  sidebarShowDisclosureIcons?: boolean;
  sidebarDisclosureBehavior?: AppSidebarDisclosureBehavior;
  sidebarClassName?: string;
  headerClassName?: string;
  mainClassName?: string;
}

const defaultLabels = {
  navigation: 'Navigation',
  openSidebar: 'Open navigation',
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
  renderLink,
  onNavigate,
  density,
  itemClassName,
  showDisclosureIcons,
  disclosureBehavior,
  depth = 0,
}: {
  item: AppShellNavigationItem;
  currentPath: string;
  renderLink: AppShellRenderLink;
  onNavigate?: () => void;
  density: AppSidebarDensity;
  itemClassName?: AppSidebarItemClassName;
  showDisclosureIcons: boolean;
  disclosureBehavior: AppSidebarDisclosureBehavior;
  depth?: number;
}) {
  const active = isItemActive(item, currentPath);
  const title = getItemTitle(item);
  const Icon = item.icon;
  const hasChildren = !!item.items?.length;
  const [uncontrolledExpanded, setUncontrolledExpanded] = React.useState(
    item.defaultOpen ?? active
  );
  const usesInteractiveDisclosure =
    disclosureBehavior === 'interactive' ||
    item.expanded !== undefined ||
    item.onExpandedChange !== undefined;
  const expanded = hasChildren && (
    usesInteractiveDisclosure
      ? item.expanded ?? (active || uncontrolledExpanded)
      : active || item.defaultOpen === true
  );
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
  const content = (
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
      {hasChildren && showDisclosureIcons ? (
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

  const handleButtonClick = () => {
    if (item.disabled) {
      return;
    }

    if (usesInteractiveDisclosure && hasChildren && !item.href) {
      setExpanded(!expanded);
      item.onSelect?.();
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
      className: controlClassName,
      children: content,
      title,
      onClick: handleLinkClick,
      'aria-current': active ? 'page' : undefined,
      'aria-expanded': hasChildren ? expanded : undefined,
      ...item.attributes,
    })
    : (
      <button
        type='button'
        className={controlClassName}
        disabled={item.disabled}
        aria-current={active ? 'page' : undefined}
        aria-expanded={hasChildren ? expanded : undefined}
        aria-disabled={item.disabled || undefined}
        title={title}
        onClick={handleButtonClick}
        {...item.attributes}
      >
        {content}
      </button>
    );

  return (
    <li className='min-w-0'>
      {control}

      {expanded ? (
        <ul className={cn('mt-1 grid gap-1 border-l border-sidebar-border pl-3', item.childrenClassName)}>
          {item.items?.map((child) => (
            <AppSidebarNavItem
              key={child.id}
              item={child}
              currentPath={currentPath}
              renderLink={renderLink}
              onNavigate={onNavigate}
              density={density}
              itemClassName={itemClassName}
              showDisclosureIcons={showDisclosureIcons}
              disclosureBehavior={disclosureBehavior}
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
  disclosureBehavior = 'legacy',
  showDisclosureIcons = disclosureBehavior === 'interactive',
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
                    showDisclosureIcons={showDisclosureIcons}
                    disclosureBehavior={disclosureBehavior}
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

export function AppSidebar({
  className,
  mobile = false,
  density = 'standard',
  width,
  mobileWidth,
  style,
  ...props
}: AppSidebarProps) {
  if (mobile) {
    return (
      <div
        data-slot='app-sidebar'
        data-mobile='true'
        data-density={density}
        className={cn(
          'flex h-full bg-sidebar text-sidebar-foreground',
          mobileWidth && 'w-(--app-sidebar-mobile-width)',
          className,
        )}
        style={{ ...style, '--app-sidebar-mobile-width': mobileWidth } as React.CSSProperties}
      >
        <AppSidebarContent {...props} density={density} />
      </div>
    );
  }

  return (
    <aside
      data-slot='app-sidebar'
      data-state='expanded'
      data-density={density}
      className={cn(
        'hidden h-dvh shrink-0 border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex',
        width ? 'w-(--app-sidebar-width)' : density === 'comfortable' ? 'w-[16.25rem]' : 'w-64',
        className
      )}
      style={{ ...style, '--app-sidebar-width': width } as React.CSSProperties}
    >
      <AppSidebarContent {...props} density={density} />
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
  sidebarShowDisclosureIcons,
  sidebarDisclosureBehavior = 'legacy',
  sidebarClassName,
  headerClassName,
  mainClassName,
  className,
  ...props
}: AppShellProps) {
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
    width: sidebarWidth,
    mobileWidth: sidebarMobileWidth,
    headerClassName: sidebarHeaderClassName,
    topClassName: sidebarTopClassName,
    navigationClassName: sidebarNavigationClassName,
    groupClassName: sidebarGroupClassName,
    groupLabelClassName: sidebarGroupLabelClassName,
    footerClassName: sidebarFooterClassName,
    itemClassName: sidebarItemClassName,
    showDisclosureIcons: sidebarShowDisclosureIcons,
    disclosureBehavior: sidebarDisclosureBehavior,
    onNavigate: closeMobileSidebar,
  };

  const headerRenderState = {
    mobileSidebarOpen,
    openMobileSidebar,
    closeMobileSidebar,
    toggleMobileSidebar,
  };

  return (
    <div
      data-slot='app-shell'
      className={cn('flex h-dvh min-h-0 w-full overflow-hidden bg-background text-foreground', className)}
      {...props}
    >
      <AppSidebar
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

      <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
        <SheetContent
          side='left'
          showCloseButton={false}
          className={cn(
            'p-0 text-sidebar-foreground sm:max-w-none [&>button]:hidden',
            sidebarMobileWidth
              ? 'w-(--app-sidebar-mobile-width)'
              : sidebarDensity === 'comfortable'
                ? 'w-[16.25rem]'
                : 'w-[18rem]'
          )}
          style={{ '--app-sidebar-mobile-width': sidebarMobileWidth } as React.CSSProperties}
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
