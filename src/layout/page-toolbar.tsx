import * as React from 'react';

import { cn } from '../lib/utils';

export interface PageToolbarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  contentClassName?: string;
}

function PageToolbar({
  children,
  className,
  contentClassName,
  ...props
}: PageToolbarProps) {
  return (
    <div
      className={cn(
        'sticky top-[calc(3.5rem+env(safe-area-inset-top,0px))] z-20 -mx-3 border-b border-border bg-background px-3 py-3 md:top-14',
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          'flex min-w-0 flex-wrap items-center gap-3',
          contentClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export { PageToolbar };
