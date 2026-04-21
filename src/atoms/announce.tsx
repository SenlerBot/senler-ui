import * as React from 'react';
import * as ReactAnnounce from '@radix-ui/react-announce';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const announceVariants = cva('rounded-md text-sm/4 font-medium', {
  variants: {
    color: {
      grey: 'bg-secondary',
      error: 'border text-destructive border-border',
    },
    size: {
      small: 'px-2 py-2',
    },
  },
  defaultVariants: {
    color: 'grey',
    size: 'small',
  },
});

function Announce({
  className,
  color,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<typeof ReactAnnounce.Root> &
  VariantProps<typeof announceVariants>) {
  return (
    <ReactAnnounce.Root
      asChild={asChild}
      data-slot='announce'
      className={cn(announceVariants({ color, size, className }))}
      {...props}
    />
  );
}

export {
  Announce,
  announceVariants,
};
