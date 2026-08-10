import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { type OverlaySurface } from '../lib/overlay-styles';
declare function Popover({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Root>): React.JSX.Element;
declare function PopoverTrigger({ className, ...props }: React.ComponentProps<typeof PopoverPrimitive.Trigger>): React.JSX.Element;
declare function PopoverContent({ className, align, sideOffset, surface, ...props }: React.ComponentProps<typeof PopoverPrimitive.Content> & {
    surface?: OverlaySurface;
}): React.JSX.Element;
declare function PopoverAnchor({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Anchor>): React.JSX.Element;
export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
