import * as React from 'react';

import { cn } from '../lib/utils';
import { PageToolbar } from './page-toolbar';

export interface PageListLayoutProps
  extends React.HTMLAttributes<HTMLDivElement> {
  toolbar?: React.ReactNode;
  toolbarClassName?: string;
  toolbarContentClassName?: string;
  contentClassName?: string;
}

function PageListLayout({
  toolbar,
  toolbarClassName,
  toolbarContentClassName,
  contentClassName,
  className,
  children,
  ...props
}: PageListLayoutProps) {
  const hasToolbar =
    toolbar !== undefined && toolbar !== null && toolbar !== false;

  return (
    <div
      className={cn(
        'flex min-w-0 max-w-full flex-1 flex-col px-3 pb-4 pt-4',
        className,
      )}
      {...props}
    >
      {hasToolbar ? (
        <PageToolbar
          className={toolbarClassName}
          contentClassName={toolbarContentClassName}
        >
          {toolbar}
        </PageToolbar>
      ) : null}
      <div
        className={cn(
          'min-w-0 flex-1',
          hasToolbar && 'mt-4',
          contentClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export { PageListLayout };
