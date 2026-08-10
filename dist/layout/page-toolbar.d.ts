import * as React from 'react';
export interface PageToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
    contentClassName?: string;
}
declare function PageToolbar({ children, className, contentClassName, ...props }: PageToolbarProps): React.JSX.Element;
export { PageToolbar };
