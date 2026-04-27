import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { type OverlaySurface } from '../lib/overlay-styles';
declare function Popover({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
declare function PopoverTrigger({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
declare function PopoverContent({ className, align, sideOffset, surface, ...props }: React.ComponentProps<typeof PopoverPrimitive.Content> & {
    surface?: OverlaySurface;
}): import("react/jsx-runtime").JSX.Element;
declare function PopoverAnchor({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Anchor>): import("react/jsx-runtime").JSX.Element;
export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
