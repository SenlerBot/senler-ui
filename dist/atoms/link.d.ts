import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const linkVariants: (props?: ({
    hover?: "text" | "none" | "block" | null | undefined;
    disabled?: boolean | null | undefined;
    underline?: boolean | null | undefined;
    color?: "main" | "none" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'color'>, VariantProps<typeof linkVariants> {
}
declare const Link: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>;
export { Link, linkVariants, };
