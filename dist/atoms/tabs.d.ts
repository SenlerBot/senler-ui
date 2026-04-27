import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { type VariantProps } from 'class-variance-authority';
export declare const tabsListVariantClasses: {
    readonly default: "p-[2px] gap-[2px] rounded-[6px] bg-muted";
    readonly underline: "gap-6 border-b border-border";
};
export declare const tabsListVariantOptions: ("default" | "underline")[];
export type TabsListVariant = (typeof tabsListVariantOptions)[number];
export declare const tabsListSizeClasses: {
    readonly small: "h-6";
    readonly medium: "h-7";
    readonly large: "h-8";
};
export declare const tabsListSizeOptions: ("small" | "medium" | "large")[];
export type TabsListSize = (typeof tabsListSizeOptions)[number];
export declare const tabsListDefaults: {
    readonly variant: "default";
    readonly size: "medium";
};
export declare const tabsTriggerDefaults: {
    readonly variant: "default";
};
export declare const tabsTriggerVariantClasses: {
    readonly default: "data-[state=active]:bg-background box-border rounded-[4px] px-[6px] py-1 text-[13px] font-medium leading-4 tracking-[-0.0325px] text-foreground";
    readonly underline: "relative pb-3 pt-0 px-0 text-[15px] font-normal text-muted-foreground data-[state=active]:font-semibold data-[state=active]:text-foreground data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-primary";
};
declare const tabListVariants: (props?: ({
    variant?: "default" | "underline" | null | undefined;
    size?: "small" | "medium" | "large" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare function TabsRoot({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List> & VariantProps<typeof tabListVariants> & {
    variant?: TabsListVariant;
    size?: TabsListSize;
};
type TabsTriggerProps = React.ComponentProps<typeof TabsPrimitive.Trigger> & {
    variant?: TabsListVariant;
    count?: number;
};
declare function TabsTrigger({ variant, count, className, children, ...props }: TabsTriggerProps): import("react/jsx-runtime").JSX.Element;
declare const TabsList: React.ForwardRefExoticComponent<Omit<TabsListProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>): import("react/jsx-runtime").JSX.Element;
export { TabsRoot, TabsList, TabsTrigger, TabsContent };
