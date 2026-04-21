import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '../lib/utils';

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot='popover' {...props} />;
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot='popover-trigger' {...props} />;
}

function PopoverContent({
  className,
  align = 'center',
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot='popover-content'
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'outline-none rounded-md',
          'shadow-[0px_3px_12px_rgba(0,0,0,0.09)]',
          'border-[0.5px] border-border',
          'backdrop-blur-[6px] backdrop-saturate-[190%] backdrop-contrast-[50%] backdrop-brightness-[130%]',
          'bg-popover/50',
          'z-[99]',
          'duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]',
          'will-change-transform,opacity',

          'data-[state=open]:data-[side=top]:animate-[slideDownAndFade_400ms_cubic-bezier(0.16,1,0.3,1)]',
          'data-[state=open]:data-[side=right]:animate-[slideLeftAndFade_400ms_cubic-bezier(0.16,1,0.3,1)]',
          'data-[state=open]:data-[side=bottom]:animate-[slideUpAndFade_400ms_cubic-bezier(0.16,1,0.3,1)]',
          'data-[state=open]:data-[side=left]:animate-[slideRightAndFade_400ms_cubic-bezier(0.16,1,0.3,1)]',

          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot='popover-anchor' {...props} />;
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
