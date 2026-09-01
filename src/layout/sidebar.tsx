'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { PanelLeftIcon } from 'lucide-react';

import { Button } from '../atoms/button';
import { Input } from '../atoms/input';
import { Separator } from '../atoms/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../atoms/sheet';
import { Skeleton } from '../atoms/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../atoms/tooltip';
import { cn } from '../lib/utils';

type SidebarStateSetter = React.Dispatch<React.SetStateAction<boolean>>;
type SidebarState = 'expanded' | 'collapsed';

interface SidebarCssProperties extends React.CSSProperties {
  '--sidebar-width'?: string;
  '--sidebar-width-icon'?: string;
  '--sidebar-width-mobile'?: string;
  '--skeleton-width'?: string;
}

export interface SidebarContextValue {
  state: SidebarState;
  open: boolean;
  setOpen: SidebarStateSetter;
  openMobile: boolean;
  setOpenMobile: SidebarStateSetter;
  isMobile: boolean;
  toggleSidebar: () => void;
  labels: Required<SidebarLabels>;
}

export interface SidebarLabels {
  title?: string;
  description?: string;
  toggle?: string;
}

const defaultSidebarLabels: Required<SidebarLabels> = {
  title: 'Sidebar',
  description: 'Displays the mobile sidebar.',
  toggle: 'Toggle sidebar',
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const context = React.useContext(SidebarContext);

  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }

  return context;
}

function useSidebarMobileState(isMobileOverride: boolean | undefined) {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    if (isMobileOverride !== undefined) {
      return;
    }

    const mediaQuery = window.matchMedia('(max-width: 767.98px)');
    const updateMatches = () => setMatches(mediaQuery.matches);
    updateMatches();
    mediaQuery.addEventListener('change', updateMatches);
    return () => mediaQuery.removeEventListener('change', updateMatches);
  }, [isMobileOverride]);

  return isMobileOverride ?? matches;
}

export interface SidebarProviderProps extends React.ComponentProps<'div'> {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultMobileOpen?: boolean;
  mobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
  isMobile?: boolean;
  width?: string;
  mobileWidth?: string;
  iconWidth?: string;
  persistenceCookie?: string | false;
  persistenceMaxAge?: number;
  keyboardShortcut?: string | false;
  tooltipDelayDuration?: number;
  labels?: SidebarLabels;
}

export function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange,
  defaultMobileOpen = false,
  mobileOpen: mobileOpenProp,
  onMobileOpenChange,
  isMobile: isMobileOverride,
  width = '16.25rem',
  mobileWidth = '16.25rem',
  iconWidth = '3rem',
  persistenceCookie = false,
  persistenceMaxAge = 60 * 60 * 24 * 7,
  keyboardShortcut = false,
  tooltipDelayDuration = 0,
  labels,
  className,
  style,
  children,
  ...props
}: SidebarProviderProps) {
  const isMobile = useSidebarMobileState(isMobileOverride);
  const resolvedLabels = React.useMemo(() => ({
    ...defaultSidebarLabels,
    ...labels,
  }), [labels]);
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const [uncontrolledMobileOpen, setUncontrolledMobileOpen] = React.useState(
    defaultMobileOpen,
  );
  const open = openProp ?? uncontrolledOpen;
  const openMobile = mobileOpenProp ?? uncontrolledMobileOpen;
  const openRef = React.useRef(open);
  const openMobileRef = React.useRef(openMobile);
  openRef.current = open;
  openMobileRef.current = openMobile;

  const setOpen = React.useCallback<SidebarStateSetter>((value) => {
    const nextOpen = typeof value === 'function' ? value(openRef.current) : value;
    openRef.current = nextOpen;
    if (openProp === undefined) {
      setUncontrolledOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
    if (persistenceCookie && typeof document !== 'undefined') {
      document.cookie = `${persistenceCookie}=${nextOpen}; path=/; max-age=${persistenceMaxAge}`;
    }
  }, [onOpenChange, openProp, persistenceCookie, persistenceMaxAge]);

  const setOpenMobile = React.useCallback<SidebarStateSetter>((value) => {
    const nextOpen = typeof value === 'function' ? value(openMobileRef.current) : value;
    openMobileRef.current = nextOpen;
    if (mobileOpenProp === undefined) {
      setUncontrolledMobileOpen(nextOpen);
    }
    onMobileOpenChange?.(nextOpen);
  }, [mobileOpenProp, onMobileOpenChange]);

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      setOpenMobile((currentOpen) => !currentOpen);
      return;
    }
    setOpen((currentOpen) => !currentOpen);
  }, [isMobile, setOpen, setOpenMobile]);

  React.useEffect(() => {
    if (!keyboardShortcut) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (
        event.defaultPrevented ||
        event.repeat ||
        (target instanceof window.HTMLElement && (
          target.isContentEditable ||
          target.matches('input, textarea, select')
        ))
      ) {
        return;
      }

      if (
        event.key.toLowerCase() === keyboardShortcut.toLowerCase() &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keyboardShortcut, toggleSidebar]);

  const state = open ? 'expanded' : 'collapsed';
  const contextValue = React.useMemo<SidebarContextValue>(() => ({
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
    labels: resolvedLabels,
  }), [isMobile, open, openMobile, resolvedLabels, setOpen, setOpenMobile, state, toggleSidebar]);
  const sidebarStyle: SidebarCssProperties = {
    ...style,
    '--sidebar-width': width,
    '--sidebar-width-mobile': mobileWidth,
    '--sidebar-width-icon': iconWidth,
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={tooltipDelayDuration}>
        <div
          data-slot='sidebar-wrapper'
          style={sidebarStyle}
          className={cn(
            'group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex h-dvh w-full',
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
}

export interface SidebarProps extends React.ComponentProps<'div'> {
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'offcanvas' | 'icon' | 'none';
  desktopPosition?: 'viewport' | 'container';
  innerClassName?: string;
  mobileForceMount?: true;
  labels?: Pick<SidebarLabels, 'title' | 'description'>;
}

export function Sidebar({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'offcanvas',
  desktopPosition = 'viewport',
  innerClassName,
  mobileForceMount,
  labels,
  className,
  children,
  ...props
}: SidebarProps) {
  const {
    isMobile,
    state,
    openMobile,
    setOpenMobile,
    labels: providerLabels,
  } = useSidebar();
  const resolvedLabels = { ...providerLabels, ...labels };

  if (collapsible === 'none') {
    return (
      <div
        data-slot='sidebar'
        className={cn(
          'flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground',
          innerClassName,
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent
          data-sidebar='sidebar'
          data-slot='sidebar'
          data-mobile='true'
          forceMount={mobileForceMount}
          className={cn(
            'w-(--sidebar-width-mobile) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden',
            innerClassName,
            className,
          )}
          side={side}
          {...props}
        >
          <SheetHeader className='sr-only'>
            <SheetTitle>{resolvedLabels.title}</SheetTitle>
            <SheetDescription>{resolvedLabels.description}</SheetDescription>
          </SheetHeader>
          <div className='flex h-full w-full flex-col'>{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  if (desktopPosition === 'container') {
    return (
      <div
        data-sidebar='sidebar'
        data-slot='sidebar'
        data-state={state}
        data-collapsible={state === 'collapsed' ? collapsible : ''}
        data-variant={variant}
        data-side={side}
        className={cn(
          'group peer hidden h-full w-(--sidebar-width) shrink-0 flex-col bg-sidebar text-sidebar-foreground transition-[width] duration-200 ease-linear md:flex',
          'data-[collapsible=offcanvas]:w-0 data-[collapsible=offcanvas]:overflow-hidden',
          'data-[collapsible=icon]:w-(--sidebar-width-icon)',
          variant === 'floating' || variant === 'inset'
            ? 'm-2 rounded-lg border border-sidebar-border shadow-sm'
            : side === 'left'
              ? 'border-r border-sidebar-border'
              : 'border-l border-sidebar-border',
          className,
        )}
        {...props}
      >
        <div
          data-slot='sidebar-inner'
          className={cn('flex h-full w-full flex-col', innerClassName)}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className='group peer hidden text-sidebar-foreground md:block'
      data-state={state}
      data-collapsible={state === 'collapsed' ? collapsible : ''}
      data-variant={variant}
      data-side={side}
      data-slot='sidebar'
    >
      <div
        data-slot='sidebar-gap'
        className={cn(
          'relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear',
          'group-data-[collapsible=offcanvas]:w-0',
          'group-data-[side=right]:rotate-180',
          variant === 'floating' || variant === 'inset'
            ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
            : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon)',
        )}
      />
      <div
        data-slot='sidebar-container'
        className={cn(
          'fixed inset-y-0 z-10 hidden h-dvh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex',
          side === 'left'
            ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
            : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
          variant === 'floating' || variant === 'inset'
            ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]'
            : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l',
          className,
        )}
        {...props}
      >
        <div
          data-sidebar='sidebar'
          data-slot='sidebar-inner'
          className={cn(
            'flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow-sm',
            innerClassName,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export function SidebarTrigger({
  className,
  onClick,
  children,
  type = 'button',
  'aria-label': ariaLabel,
  title,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { labels, toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar='trigger'
      data-slot='sidebar-trigger'
      variant='ghost'
      size='icon'
      type={type}
      aria-label={ariaLabel ?? labels.toggle}
      title={title ?? labels.toggle}
      className={cn('size-7', className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          toggleSidebar();
        }
      }}
      {...props}
    >
      {children ?? <PanelLeftIcon />}
    </Button>
  );
}

export function SidebarRail({
  className,
  type = 'button',
  'aria-label': ariaLabel,
  title,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { labels, toggleSidebar } = useSidebar();

  return (
    <Button
      type={type}
      variant='ghost'
      size='none'
      data-sidebar='rail'
      data-slot='sidebar-rail'
      aria-label={ariaLabel ?? labels.toggle}
      tabIndex={-1}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          toggleSidebar();
        }
      }}
      title={title ?? labels.toggle}
      className={cn(
        'absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border sm:flex',
        'hover:bg-transparent hover:text-inherit dark:hover:bg-transparent',
        'in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize',
        '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
        'group-data-[side=left]:-right-4 group-data-[side=right]:left-0',
        'hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full',
        '[[data-side=left][data-collapsible=offcanvas]_&]:-right-2',
        '[[data-side=right][data-collapsible=offcanvas]_&]:-left-2',
        className,
      )}
      {...props}
    />
  );
}

export function SidebarInset({ className, ...props }: React.ComponentProps<'main'>) {
  return (
    <main
      data-slot='sidebar-inset'
      className={cn(
        'relative flex min-h-0 w-full flex-1 flex-col bg-background',
        'md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2',
        className,
      )}
      {...props}
    />
  );
}

export function SidebarInput({ className, ...props }: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot='sidebar-input'
      data-sidebar='input'
      className={cn('h-8 w-full bg-background shadow-none', className)}
      {...props}
    />
  );
}

export function SidebarHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='sidebar-header' data-sidebar='header' className={cn('flex flex-col gap-2 p-2', className)} {...props} />;
}

export function SidebarFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='sidebar-footer' data-sidebar='footer' className={cn('flex flex-col gap-2 p-2', className)} {...props} />;
}

export function SidebarSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot='sidebar-separator'
      data-sidebar='separator'
      className={cn('mx-2 bg-sidebar-border data-[orientation=horizontal]:w-auto', className)}
      {...props}
    />
  );
}

export function SidebarContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='sidebar-content'
      data-sidebar='content'
      className={cn('flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden', className)}
      {...props}
    />
  );
}

export function SidebarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='sidebar-group' data-sidebar='group' className={cn('relative flex w-full min-w-0 flex-col p-2', className)} {...props} />;
}

export function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'div'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      data-slot='sidebar-group-label'
      data-sidebar='group-label'
      className={cn(
        'flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        'group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0',
        className,
      )}
      {...props}
    />
  );
}

export function SidebarGroupAction({
  className,
  asChild = false,
  type,
  ...props
}: React.ComponentProps<'button'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      data-slot='sidebar-group-action'
      data-sidebar='group-action'
      type={asChild ? undefined : type ?? 'button'}
      className={cn(
        'absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        'after:absolute after:-inset-2 md:after:hidden',
        'group-data-[collapsible=icon]:hidden',
        className,
      )}
      {...props}
    />
  );
}

export function SidebarGroupContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='sidebar-group-content' data-sidebar='group-content' className={cn('w-full text-sm', className)} {...props} />;
}

export function SidebarMenu({ className, ...props }: React.ComponentProps<'ul'>) {
  return <ul data-slot='sidebar-menu' data-sidebar='menu' className={cn('flex w-full min-w-0 flex-col gap-1', className)} {...props} />;
}

export function SidebarMenuItem({ className, ...props }: React.ComponentProps<'li'>) {
  return <li data-slot='sidebar-menu-item' data-sidebar='menu-item' className={cn('group/menu-item relative', className)} {...props} />;
}

const sidebarMenuButtonVariants = cva(
  'peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm font-normal text-foreground outline-none ring-sidebar-ring transition-[width,height,padding] [&>svg]:text-muted-foreground hover:bg-accent hover:text-foreground hover:[&>svg]:text-foreground focus-visible:ring-2 active:bg-accent/90 active:text-foreground active:[&>svg]:text-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-muted data-[active=true]:font-medium data-[active=true]:text-foreground data-[active=true]:[&>svg]:text-foreground data-[state=open]:hover:bg-accent data-[state=open]:hover:text-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
  {
    variants: {
      variant: {
        default: '',
        outline: 'bg-background text-foreground shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-accent hover:shadow-[0_0_0_1px_var(--border)]',
      },
      size: {
        default: 'h-8 text-sm',
        sm: 'h-7 text-xs',
        lg: 'h-12 text-sm group-data-[collapsible=icon]:p-0!',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

export function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = 'default',
  size = 'default',
  tooltip,
  className,
  onClick,
  type,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot : 'button';
  const { isMobile, state, setOpenMobile } = useSidebar();
  const handleClick = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (asChild && isMobile && !event.defaultPrevented) {
      setOpenMobile(false);
    }
  }, [asChild, isMobile, onClick, setOpenMobile]);
  const button = (
    <Comp
      data-slot='sidebar-menu-button'
      data-sidebar='menu-button'
      data-size={size}
      data-active={isActive}
      type={asChild ? undefined : type ?? 'button'}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      onClick={handleClick}
      {...props}
    />
  );

  if (!tooltip) {
    return button;
  }

  const tooltipProps = typeof tooltip === 'string' ? { children: tooltip } : tooltip;
  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side='right'
        align='center'
        hidden={state !== 'collapsed' || isMobile}
        {...tooltipProps}
      />
    </Tooltip>
  );
}

export function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  type,
  ...props
}: React.ComponentProps<'button'> & { asChild?: boolean; showOnHover?: boolean }) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      data-slot='sidebar-menu-action'
      data-sidebar='menu-action'
      type={asChild ? undefined : type ?? 'button'}
      className={cn(
        'absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        'after:absolute after:-inset-2 md:after:hidden',
        'peer-data-[size=sm]/menu-button:top-1 peer-data-[size=lg]/menu-button:top-2.5',
        'group-data-[collapsible=icon]:hidden',
        showOnHover && 'group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0',
        className,
      )}
      {...props}
    />
  );
}

export function SidebarMenuBadge({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='sidebar-menu-badge'
      data-sidebar='menu-badge'
      className={cn(
        'pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground select-none',
        'peer-data-[size=sm]/menu-button:top-1 peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5',
        'group-data-[collapsible=icon]:hidden',
        className,
      )}
      {...props}
    />
  );
}

export function SidebarMenuSkeleton({
  className,
  showIcon = false,
  width = '70%',
  ...props
}: React.ComponentProps<'div'> & { showIcon?: boolean; width?: string }) {
  const skeletonStyle: SidebarCssProperties = { '--skeleton-width': width };
  return (
    <div data-slot='sidebar-menu-skeleton' data-sidebar='menu-skeleton' className={cn('flex h-8 items-center gap-2 rounded-md px-2', className)} {...props}>
      {showIcon ? <Skeleton className='size-4 rounded-md' data-sidebar='menu-skeleton-icon' /> : null}
      <Skeleton className='h-4 max-w-(--skeleton-width) flex-1' data-sidebar='menu-skeleton-text' style={skeletonStyle} />
    </div>
  );
}

export function SidebarMenuSub({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot='sidebar-menu-sub'
      data-sidebar='menu-sub'
      className={cn('mx-2 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5 group-data-[collapsible=icon]:hidden', className)}
      {...props}
    />
  );
}

export function SidebarMenuSubItem({ className, ...props }: React.ComponentProps<'li'>) {
  return <li data-slot='sidebar-menu-sub-item' data-sidebar='menu-sub-item' className={cn('group/menu-sub-item relative', className)} {...props} />;
}

export function SidebarMenuSubButton({
  asChild = false,
  size = 'md',
  isActive = false,
  className,
  ...props
}: React.ComponentProps<'a'> & { asChild?: boolean; size?: 'sm' | 'md'; isActive?: boolean }) {
  const Comp = asChild ? Slot : 'a';
  return (
    <Comp
      data-slot='sidebar-menu-sub-button'
      data-sidebar='menu-sub-button'
      data-size={size}
      data-active={isActive}
      className={cn(
        'flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
        'data-[active=true]:bg-muted data-[active=true]:font-medium data-[active=true]:text-foreground',
        size === 'sm' ? 'text-xs' : 'text-sm',
        'group-data-[collapsible=icon]:hidden',
        className,
      )}
      {...props}
    />
  );
}

export { sidebarMenuButtonVariants };
