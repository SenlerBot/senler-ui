import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const linkVariants = cva(
  'flex items-center gap-1.5 leading-normal cursor-default text-primary text-sm transition-colors',
  {
    variants: {
      hover: {
        text: 'hover:text-accent-foreground',
        block: 'hover:bg-accent hover:text-accent-foreground rounded-md',
        none: '',
      },
      disabled: {
        true: 'text-muted-foreground pointer-events-none opacity-70 [&_svg]:text-muted-foreground',
      },
      underline: {
        true: 'underline',
      },
      color: {
        main: 'text-primary [&_svg]:text-primary',
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
