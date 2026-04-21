import { type ComponentProps } from 'react';
import { type VariantProps } from 'class-variance-authority';
export declare const buttonVariantClasses: {
    readonly default: "bg-primary text-primary-foreground hover:bg-primary/90";
    readonly destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60";
    readonly outline: "border bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50";
    readonly secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80";
    readonly ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50";
    readonly link: "text-primary underline-offset-4 hover:underline";
};
export declare const buttonVariantOptions: ("link" | "default" | "destructive" | "outline" | "secondary" | "ghost")[];
export type ButtonVariant = (typeof buttonVariantOptions)[number];
export declare const buttonSizeClasses: {
    readonly default: "h-7 px-2 py-2 gap-1";
    readonly sm: "h-8 rounded-md gap-1 px-2";
    readonly lg: "h-10 rounded-md px-3";
    readonly icon: "size-7";
    readonly icon_sm: "size-6";
    readonly none: "p-0 h-auto";
};
export declare const buttonSizeOptions: ("none" | "default" | "sm" | "lg" | "icon" | "icon_sm")[];
export type ButtonSize = (typeof buttonSizeOptions)[number];
export declare const buttonTypeOptions: readonly ["button", "submit", "reset"];
export type ButtonType = (typeof buttonTypeOptions)[number];
export declare const buttonDefaults: {
    readonly variant: "default";
    readonly size: "default";
    readonly type: "button";
    readonly asChild: false;
    readonly loading: false;
    readonly disabled: false;
};
declare const buttonVariants: (props?: ({
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
    size?: "none" | "default" | "sm" | "lg" | "icon" | "icon_sm" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    type?: ButtonType;
    asChild?: boolean;
    loading?: boolean;
}
declare function Button({ className, variant, size, ref, asChild, type, loading, disabled, children, ...props }: ButtonProps): import("react/jsx-runtime").JSX.Element;
export { Button, buttonVariants, };
