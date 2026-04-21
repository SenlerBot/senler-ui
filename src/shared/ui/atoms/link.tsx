import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';

const linkVariants = cva(
  'flex items-center gap-1.5 leading-normal cursor-default text-main text-sm transition-colors',
  {
    variants: {
      hover: {
        text: 'hover:text-accent-foreground',
        block: 'hover:bg-accent hover:text-accent-foreground rounded-md',
        none: '',
      },
      disabled: {
        true: 'text-text-secondary pointer-events-none opacity-70 [&_svg]:text-text-secondary',
      },
      underline: {
        true: 'underline',
      },
      color: {
        main: 'text-main [&_svg]:text-main',
        none: 'text-inherit',
      },
    },
    defaultVariants: {
      color: 'main',
      hover: 'text',
    },
  }
);

export interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'color'>,
    VariantProps<typeof linkVariants> {}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, hover, disabled, underline, color, ...props }, ref) => {
    return (
      <a
        className={cn(
          linkVariants({ hover, disabled, underline, color, className })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Link.displayName = 'Link';

export {
  Link,
  linkVariants,
};
