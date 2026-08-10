import * as React from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
declare function HoverCardRoot({ ...props }: React.ComponentProps<typeof HoverCardPrimitive.Root>): React.JSX.Element;
declare function HoverCardTrigger({ ...props }: React.ComponentProps<typeof HoverCardPrimitive.Trigger>): React.JSX.Element;
declare function HoverCardContent({ className, align, sideOffset, ...props }: React.ComponentProps<typeof HoverCardPrimitive.Content>): React.JSX.Element;
export { HoverCardRoot, HoverCardTrigger, HoverCardContent };
