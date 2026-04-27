import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
declare function AvatarRoot({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
declare function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>): import("react/jsx-runtime").JSX.Element;
declare function AvatarFallback({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>): import("react/jsx-runtime").JSX.Element;
declare function Avatar({ src, alt, ...props }: React.ComponentProps<typeof AvatarRoot> & {
    src?: string;
    alt?: string;
}): import("react/jsx-runtime").JSX.Element;
export { Avatar, AvatarImage, AvatarFallback, AvatarRoot };
