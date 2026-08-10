import * as React from 'react';
export interface PageListLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
    toolbar?: React.ReactNode;
    toolbarClassName?: string;
    toolbarContentClassName?: string;
    contentClassName?: string;
}
declare function PageListLayout({ toolbar, toolbarClassName, toolbarContentClassName, contentClassName, className, children, ...props }: PageListLayoutProps): React.JSX.Element;
export { PageListLayout };
