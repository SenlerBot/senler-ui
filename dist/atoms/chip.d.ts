import { type ReactNode } from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const chipVariants: (props?: ({
    color?: "default" | "error" | "info" | "primary" | "secondary" | "success" | null | undefined;
    size?: "medium" | "small" | null | undefined;
    variant?: "filled" | "outlined" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export type ChipColor = NonNullable<VariantProps<typeof chipVariants>['color']>;
export type ChipSize = NonNullable<VariantProps<typeof chipVariants>['size']>;
export type ChipVariant = NonNullable<VariantProps<typeof chipVariants>['variant']>;
export interface ChipProps extends VariantProps<typeof chipVariants> {
    label: ReactNode;
    className?: string;
    icon?: ReactNode;
}
declare function Chip({ label, color, size, variant, className, icon, }: ChipProps): import("react").JSX.Element;
export { Chip, chipVariants };
