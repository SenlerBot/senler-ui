import { type ComponentProps } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2Icon } from 'lucide-react';

import { literalKeys } from '../lib/literal-keys';
import { cn } from '../lib/utils';

export const buttonVariantClasses = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  destructive:
    'bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
  outline:
    'border bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
  link: 'text-primary underline-offset-4 hover:underline',
} as const;

export const buttonVariantOptions = literalKeys(buttonVariantClasses);

export type ButtonVariant = (typeof buttonVariantOptions)[number];

export const buttonSizeClasses = {
  default: 'h-7 px-2 py-2 gap-1',
  sm: 'h-8 rounded-md gap-1 px-2',
  lg: 'h-10 rounded-md px-3',
  icon: 'size-7',
  icon_sm: 'size-6',
  none: 'p-0 h-auto',
} as const;

export const buttonSizeOptions = literalKeys(buttonSizeClasses);

export type ButtonSize = (typeof buttonSizeOptions)[number];

export const buttonTypeOptions = ['button', 'submit', 'reset'] as const;

export type ButtonType = (typeof buttonTypeOptions)[number];

export const buttonDefaults = {
  variant: 'default',
  size: 'default',
  type: 'button',
  asChild: false,
  loading: false,
  disabled: false,
} as const satisfies {
  variant: ButtonVariant;
  size: ButtonSize;
  type: ButtonType;
  asChild: boolean;
  loading: boolean;
  disabled: boolean;
};

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: buttonVariantClasses,
      size: buttonSizeClasses,
    },
    defaultVariants: {
      variant: buttonDefaults.variant,
      size: buttonDefaults.size,
    },
  }
);

export interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: ButtonType;
  asChild?: boolean;
  loading?: boolean;
}

function Button({
  className,
  variant,
  size,
  ref,
  asChild = buttonDefaults.asChild,
  type = buttonDefaults.type,
  loading,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      ref={ref}
      type={type}
      data-slot="button"
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {loading && !asChild ? <Loader2Icon className="size-4 animate-spin" /> : children}
    </Comp>
  );
}

export {
  Button,
  buttonVariants,
};
