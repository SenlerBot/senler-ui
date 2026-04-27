import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import {
  type OverlaySurface,
  overlayGlassSurfaceClassName,
  overlayLayerClassName,
  overlayMotionClassName,
  overlaySideAnimationClassName,
  overlaySolidSurfaceClassName,
  overlayStateAnimationClassName,
} from '../lib/overlay-styles';
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
  surface = 'solid',
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content> & {
  surface?: OverlaySurface;
}) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot='popover-content'
        align={align}
        sideOffset={sideOffset}
        className={cn(
          surface === 'glass'
            ? overlayGlassSurfaceClassName
            : overlaySolidSurfaceClassName,
          overlayLayerClassName,
          'origin-(--radix-popover-content-transform-origin)',
          overlayStateAnimationClassName,
          overlaySideAnimationClassName,
          overlayMotionClassName,
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
