import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { Button } from '../atoms/button';
import { Input } from '../atoms/input';
import { Separator } from '../atoms/separator';
import { TooltipContent } from '../atoms/tooltip';
type SidebarStateSetter = React.Dispatch<React.SetStateAction<boolean>>;
type SidebarState = 'expanded' | 'collapsed';
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
export declare function useSidebar(): SidebarContextValue;
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
export declare function SidebarProvider({ defaultOpen, open: openProp, onOpenChange, defaultMobileOpen, mobileOpen: mobileOpenProp, onMobileOpenChange, isMobile: isMobileOverride, width, mobileWidth, iconWidth, persistenceCookie, persistenceMaxAge, keyboardShortcut, tooltipDelayDuration, labels, className, style, children, ...props }: SidebarProviderProps): React.JSX.Element;
export interface SidebarProps extends React.ComponentProps<'div'> {
    side?: 'left' | 'right';
    variant?: 'sidebar' | 'floating' | 'inset';
    collapsible?: 'offcanvas' | 'icon' | 'none';
    desktopPosition?: 'viewport' | 'container';
    innerClassName?: string;
    mobileForceMount?: true;
    labels?: Pick<SidebarLabels, 'title' | 'description'>;
}
export declare function Sidebar({ side, variant, collapsible, desktopPosition, innerClassName, mobileForceMount, labels, className, children, ...props }: SidebarProps): React.JSX.Element;
export declare function SidebarTrigger({ className, onClick, children, type, 'aria-label': ariaLabel, title, ...props }: React.ComponentProps<typeof Button>): React.JSX.Element;
export declare function SidebarRail({ className, type, 'aria-label': ariaLabel, title, onClick, ...props }: React.ComponentProps<typeof Button>): React.JSX.Element;
export declare function SidebarInset({ className, ...props }: React.ComponentProps<'main'>): React.JSX.Element;
export declare function SidebarInput({ className, ...props }: React.ComponentProps<typeof Input>): React.JSX.Element;
export declare function SidebarHeader({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
export declare function SidebarFooter({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
export declare function SidebarSeparator({ className, ...props }: React.ComponentProps<typeof Separator>): React.JSX.Element;
export declare function SidebarContent({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
export declare function SidebarGroup({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
export declare function SidebarGroupLabel({ className, asChild, ...props }: React.ComponentProps<'div'> & {
    asChild?: boolean;
}): React.JSX.Element;
export declare function SidebarGroupAction({ className, asChild, type, ...props }: React.ComponentProps<'button'> & {
    asChild?: boolean;
}): React.JSX.Element;
export declare function SidebarGroupContent({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
export declare function SidebarMenu({ className, ...props }: React.ComponentProps<'ul'>): React.JSX.Element;
export declare function SidebarMenuItem({ className, ...props }: React.ComponentProps<'li'>): React.JSX.Element;
declare const sidebarMenuButtonVariants: (props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare function SidebarMenuButton({ asChild, isActive, variant, size, tooltip, className, onClick, type, ...props }: React.ComponentProps<'button'> & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | React.ComponentProps<typeof TooltipContent>;
} & VariantProps<typeof sidebarMenuButtonVariants>): React.JSX.Element;
export declare function SidebarMenuAction({ className, asChild, showOnHover, type, ...props }: React.ComponentProps<'button'> & {
    asChild?: boolean;
    showOnHover?: boolean;
}): React.JSX.Element;
export declare function SidebarMenuBadge({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
export declare function SidebarMenuSkeleton({ className, showIcon, width, ...props }: React.ComponentProps<'div'> & {
    showIcon?: boolean;
    width?: string;
}): React.JSX.Element;
export declare function SidebarMenuSub({ className, ...props }: React.ComponentProps<'ul'>): React.JSX.Element;
export declare function SidebarMenuSubItem({ className, ...props }: React.ComponentProps<'li'>): React.JSX.Element;
export declare function SidebarMenuSubButton({ asChild, size, isActive, className, ...props }: React.ComponentProps<'a'> & {
    asChild?: boolean;
    size?: 'sm' | 'md';
    isActive?: boolean;
}): React.JSX.Element;
export { sidebarMenuButtonVariants };
