import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/shared/lib/utils';

const svgVariants = cva(
  'select-none inline-flex flex-shrink-0 align-middle w-full h-full',
  {
    variants: {
      color: {
        none: 'text-inherit [&>svg]:text-inherit',
        primary: 'text-icon-primary [&>svg]:text-icon-primary',
        secondary: 'text-icon-secondary [&>svg]:text-icon-secondary',
        tertiary: 'text-icon-tertiary [&>svg]:text-icon-tertiary',
      },
      size: {
        xs: 'w-3 h-3',
        sm: 'w-4 h-4',
        md: 'w-[18px] h-[18px]',
        lg: 'w-6 h-6',
      },
    },
    defaultVariants: {
      size: 'sm',
      color: 'secondary',
    },
  }
);

export interface SvgIconProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>,
    VariantProps<typeof svgVariants> {
  children: React.ReactNode;
}

function SvgIcon({ className, color, size, children, ...props }: SvgIconProps) {
  return (
    <span
      className={cn(
        svgVariants({ color, size, className }),
        '[&>svg]:w-full [&>svg]:h-full [&>svg]:min-w-full [&>svg]:min-h-full'
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export { SvgIcon };
