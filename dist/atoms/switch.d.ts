import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
export declare const switchSizeClasses: {
    readonly xs: "h-3.5 w-5.5 p-0.5";
    readonly tiny: "h-4 w-[26px] p-0.5";
    readonly small: "h-5 w-7.5 p-0.75";
};
export declare const switchSizeOptions: ("small" | "xs" | "tiny")[];
export type SwitchSize = (typeof switchSizeOptions)[number];
export declare const switchDefaults: {
    readonly size: "small";
    readonly value: "on";
};
export declare const switchThumbSizeClasses: {
    readonly xs: "size-2.5 data-[state=checked]:translate-x-2";
    readonly tiny: "size-3 data-[state=checked]:translate-x-2.5";
    readonly small: "size-4 data-[state=checked]:translate-x-2";
};
declare const switchRootVariants: (props?: ({
    size?: "small" | "xs" | "tiny" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type BaseButtonProps = Omit<React.ComponentPropsWithoutRef<'button'>, 'defaultValue' | 'onChange' | 'type' | 'value'>;
interface SwitchProps extends BaseButtonProps, VariantProps<typeof switchRootVariants> {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    required?: boolean;
    name?: string;
    value?: string;
    form?: string;
    size?: SwitchSize;
}
export declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLButtonElement>>;
export type { SwitchProps };
