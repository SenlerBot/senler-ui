import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '../lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { literalKeys } from '../lib/literal-keys';

export const tabsListVariantClasses = {
  default: 'p-[2px] gap-[2px] rounded-[6px] bg-muted',
  underline: 'gap-6 border-b border-border',
} as const;

export const tabsListVariantOptions = literalKeys(tabsListVariantClasses);

export type TabsListVariant = (typeof tabsListVariantOptions)[number];

export const tabsListSizeClasses = {
  small: 'h-6',
  medium: 'h-7',
  large: 'h-8',
} as const;

export const tabsListSizeOptions = literalKeys(tabsListSizeClasses);

export type TabsListSize = (typeof tabsListSizeOptions)[number];

export const tabsListDefaults = {
  variant: 'default',
  size: 'medium',
} as const satisfies {
  variant: TabsListVariant;
  size: TabsListSize;
};

export const tabsTriggerDefaults = {
  variant: 'default',
} as const satisfies {
  variant: TabsListVariant;
};

export const tabsTriggerVariantClasses = {
  default:
    'data-[state=active]:bg-background box-border rounded-[4px] px-[6px] py-1 text-[13px] font-medium leading-4 tracking-[-0.0325px] text-foreground',
  underline:
    'relative pb-3 pt-0 px-0 text-[15px] font-normal text-muted-foreground data-[state=active]:font-semibold data-[state=active]:text-foreground data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-primary',
} as const;

const tabListVariants = cva(
  'inline-flex items-center',
  {
    variants: {
      variant: tabsListVariantClasses,
      size: tabsListSizeClasses,
    },
    defaultVariants: {
      variant: tabsListDefaults.variant,
      size: tabsListDefaults.size,
    },
  }
);

const tabTriggerVariants = cva(
  'inline-flex items-center justify-center gap-1.5 whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: tabsTriggerVariantClasses,
    },
    defaultVariants: {
      variant: tabsTriggerDefaults.variant,
    },
  }
);

// Tabs Root Component
function TabsRoot({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot='tabs'
      className={cn('flex flex-col', className)}
      {...props}
    />
  );
}

type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabListVariants> & {
    variant?: TabsListVariant;
    size?: TabsListSize;
  };

type TabsTriggerProps = React.ComponentProps<typeof TabsPrimitive.Trigger> & {
  variant?: TabsListVariant;
  count?: number;
};

function TabsTrigger({
  variant,
  count,
  className,
  children,
  ...props
}: TabsTriggerProps) {
  const listElement = React.useContext(TabsListContext);
  const effectiveVariant = variant || listElement?.variant || tabsTriggerDefaults.variant;

  return (
    <TabsPrimitive.Trigger
      data-slot='tabs-trigger'
      className={cn(tabTriggerVariants({ variant: effectiveVariant }), className)}
      {...props}
    >
      {children}
      {count !== undefined && count > 0 && (
        <span className="text-muted-foreground font-normal">{count}</span>
      )}
    </TabsPrimitive.Trigger>
  );
}

const TabsListContext = React.createContext<{ variant?: TabsListVariant } | null>(null);

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ size = tabsListDefaults.size, variant = tabsListDefaults.variant, className, children, ...props }, ref) => {
  return (
    <TabsListContext.Provider value={{ variant }}>
      <TabsPrimitive.List
        ref={ref}
        data-slot='tabs-list'
        data-variant={variant}
        className={cn(tabListVariants({ size, variant }), 'w-fit', className)}
        {...props}
      >
        {children}
      </TabsPrimitive.List>
    </TabsListContext.Provider>
  );
});
TabsList.displayName = 'TabsList';

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot='tabs-content'
      className={cn('flex-1 outline-none w-full', className)}
      {...props}
    />
  );
}

export { 
  TabsRoot, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
};
