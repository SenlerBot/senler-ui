import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
export declare const badgeVariantClasses: {
    readonly default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80";
    readonly secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80";
    readonly destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80";
    readonly outline: "text-foreground";
    readonly success: "border-transparent bg-green-500/15 text-green-700 dark:text-green-400 hover:bg-green-500/25";
    readonly warning: "border-transparent bg-yellow-500/15 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-500/25";
    readonly error: "border-transparent bg-red-500/15 text-red-700 dark:text-red-400 hover:bg-red-500/25";
    readonly info: "border-transparent bg-blue-500/15 text-blue-700 dark:text-blue-400 hover:bg-blue-500/25";
    readonly purple: "border-transparent bg-purple-500/15 text-purple-700 dark:text-purple-400 hover:bg-purple-500/25";
    readonly cyan: "border-transparent bg-cyan-500/15 text-cyan-700 dark:text-cyan-400 hover:bg-cyan-500/25";
    readonly teal: "border-transparent bg-teal-500/15 text-teal-700 dark:text-teal-400 hover:bg-teal-500/25";
    readonly orange: "border-transparent bg-orange-500/15 text-orange-700 dark:text-orange-400 hover:bg-orange-500/25";
    readonly indigo: "border-transparent bg-indigo-500/15 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-500/25";
    readonly violet: "border-transparent bg-violet-500/15 text-violet-700 dark:text-violet-400 hover:bg-violet-500/25";
    readonly pink: "border-transparent bg-pink-500/15 text-pink-700 dark:text-pink-400 hover:bg-pink-500/25";
};
export declare const badgeVariantOptions: ("default" | "destructive" | "outline" | "secondary" | "error" | "success" | "warning" | "info" | "purple" | "cyan" | "teal" | "orange" | "indigo" | "violet" | "pink")[];
export type BadgeVariant = (typeof badgeVariantOptions)[number];
export declare const badgeDefaults: {
    readonly variant: "default";
};
declare const badgeVariants: (props?: ({
    variant?: "default" | "destructive" | "outline" | "secondary" | "error" | "success" | "warning" | "info" | "purple" | "cyan" | "teal" | "orange" | "indigo" | "violet" | "pink" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
    variant?: BadgeVariant;
}
declare function Badge({ className, variant, ...props }: BadgeProps): import("react/jsx-runtime").JSX.Element;
export { Badge, badgeVariants };
