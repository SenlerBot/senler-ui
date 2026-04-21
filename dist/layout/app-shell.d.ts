import * as React from 'react';
export type AppShellIcon = React.ComponentType<{
    className?: string;
}>;
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
export declare function AppSidebar({ className, collapsed, mobile, ...props }: AppSidebarProps): import("react/jsx-runtime").JSX.Element;
export declare function AppHeader({ title, breadcrumbs, actions, renderLink, labels, onSidebarOpen, className, ...props }: AppHeaderProps): import("react/jsx-runtime").JSX.Element;
export declare function AppShell({ navigation, currentPath, renderLink, brand, brandIcon, sidebarTop, sidebarFooter, headerTitle, headerBreadcrumbs, headerActions, children, defaultSidebarCollapsed, sidebarCollapsed, onSidebarCollapsedChange, sidebarStorageKey, closeMobileOnPathChange, labels, sidebarClassName, headerClassName, mainClassName, className, ...props }: AppShellProps): import("react/jsx-runtime").JSX.Element;
