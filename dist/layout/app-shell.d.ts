import * as React from 'react';
export type AppShellIcon = React.ComponentType<{
    className?: string;
}>;
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
export type AppSidebarItemClassName = string | ((item: AppShellNavigationItem, state: AppSidebarNavigationItemState) => string | undefined);
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
export declare function AppSidebar({ density, width, mobileWidth, mobile, labels, ...props }: AppSidebarProps): React.JSX.Element;
export declare function AppHeader({ title, breadcrumbs, actions, renderLink, labels, onSidebarOpen, className, ...props }: AppHeaderProps): React.JSX.Element;
export declare function AppShell({ navigation, currentPath, renderLink, brand, sidebarHeaderActions, sidebarTop, sidebarFooter, headerTitle, headerBreadcrumbs, headerActions, children, closeMobileOnPathChange, mobileSidebarOpen: mobileSidebarOpenProp, defaultMobileSidebarOpen, onMobileSidebarOpenChange, renderHeader, labels, sidebarDensity, sidebarWidth, sidebarMobileWidth, sidebarHeaderClassName, sidebarTopClassName, sidebarNavigationClassName, sidebarGroupClassName, sidebarGroupLabelClassName, sidebarFooterClassName, sidebarItemClassName, sidebarGroupTriggerBehavior, sidebarClassName, headerClassName, mainClassName, className, ...props }: AppShellProps): React.JSX.Element;
