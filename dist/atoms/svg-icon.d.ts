import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';
declare const svgVariants: (props?: ({
    color?: "secondary" | "none" | "primary" | "tertiary" | null | undefined;
    size?: "sm" | "lg" | "md" | "xs" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface SvgIconProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>, VariantProps<typeof svgVariants> {
    children: React.ReactNode;
}
declare function SvgIcon({ className, color, size, children, ...props }: SvgIconProps): React.JSX.Element;
export { SvgIcon };
