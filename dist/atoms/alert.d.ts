import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
export declare const alertVariantClasses: {
    readonly default: "bg-card text-card-foreground";
    readonly destructive: "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90";
};
export declare const alertVariantOptions: ("default" | "destructive")[];
export type AlertVariant = (typeof alertVariantOptions)[number];
export declare const alertDefaults: {
    readonly variant: "default";
};
declare const alertVariants: (props?: ({
    variant?: "default" | "destructive" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare function Alert({ className, variant, ...props }: React.ComponentProps<'div'> & VariantProps<typeof alertVariants> & {
    variant?: AlertVariant;
}): import("react/jsx-runtime").JSX.Element;
declare function AlertTitle({ className, ...props }: React.ComponentProps<'div'>): import("react/jsx-runtime").JSX.Element;
declare function AlertDescription({ className, ...props }: React.ComponentProps<'div'>): import("react/jsx-runtime").JSX.Element;
export { Alert, AlertTitle, AlertDescription };
