import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
export declare const avatarSizeClasses: {
    readonly xs: "size-5 text-[10px]";
    readonly sm: "size-6 text-xs";
    readonly md: "size-8 text-sm";
    readonly lg: "size-10 text-base";
    readonly xl: "size-11 text-base";
    readonly '2xl': "size-16 text-xl";
    readonly '3xl': "size-20 text-2xl";
};
export type AvatarSize = keyof typeof avatarSizeClasses;
export declare const avatarShapeClasses: {
    readonly circle: "rounded-full";
    readonly rounded: "rounded-md";
};
export type AvatarShape = keyof typeof avatarShapeClasses;
export declare const avatarFallbackColorClasses: readonly ["bg-blue-500 text-white", "bg-violet-500 text-white", "bg-pink-500 text-white", "bg-rose-500 text-white", "bg-orange-500 text-white", "bg-amber-400 text-amber-950", "bg-emerald-500 text-white", "bg-teal-500 text-white", "bg-cyan-400 text-cyan-950", "bg-indigo-500 text-white"];
export type AvatarFallbackColorClass = (typeof avatarFallbackColorClasses)[number];
export declare const avatarBadgePositionClasses: {
    readonly 'top-left': "-top-0.5 -left-0.5";
    readonly 'top-right': "-top-0.5 -right-0.5";
    readonly 'bottom-left': "-bottom-0.5 -left-0.5";
    readonly 'bottom-right': "-right-0.5 -bottom-0.5";
};
export type AvatarBadgePosition = keyof typeof avatarBadgePositionClasses;
export declare const avatarBadgeSizeClasses: {
    readonly xs: "size-2.5";
    readonly sm: "size-3";
    readonly md: "size-4";
    readonly lg: "size-4";
    readonly xl: "size-4";
    readonly '2xl': "size-5";
    readonly '3xl': "size-6";
};
export declare function getAvatarColorClassName(value: string | null | undefined): AvatarFallbackColorClass | 'bg-muted text-muted-foreground';
export declare function getAvatarInitial(value: string | null | undefined): string;
export type AvatarRootProps = React.ComponentProps<typeof AvatarPrimitive.Root> & {
    size?: AvatarSize;
    shape?: AvatarShape;
};
declare function AvatarRoot({ className, size, shape, ...props }: AvatarRootProps): import("react/jsx-runtime").JSX.Element;
export type AvatarImageProps = Omit<React.ComponentProps<typeof AvatarPrimitive.Image>, 'src'> & {
    src?: string | null;
};
declare function AvatarImage({ className, src, alt, referrerPolicy, loading, ...props }: AvatarImageProps): import("react/jsx-runtime").JSX.Element;
declare function AvatarFallback({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>): import("react/jsx-runtime").JSX.Element;
export interface AvatarProps extends Omit<AvatarRootProps, 'children'> {
    src?: string | null;
    alt?: string | null;
    name?: string | null;
    colorKey?: string | null;
    fallback?: React.ReactNode;
    fallbackIcon?: React.ReactNode;
    imageClassName?: string;
    fallbackClassName?: string;
    wrapperClassName?: string;
    badge?: React.ReactNode;
    badgeClassName?: string;
    badgePosition?: AvatarBadgePosition;
}
declare function Avatar({ src, alt, name, colorKey, fallback, fallbackIcon, imageClassName, fallbackClassName, wrapperClassName, badge, badgeClassName, badgePosition, size, shape, className, title, ...props }: AvatarProps): import("react/jsx-runtime").JSX.Element;
export { Avatar, AvatarImage, AvatarFallback, AvatarRoot };
