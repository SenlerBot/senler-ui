import * as React from 'react';
import { cn } from '../lib/utils';

/**
 * Visually hides content while keeping it accessible to screen readers.
 * Used for accessibility when visual content is not needed but semantic content is required.
 */
const VisuallyHidden = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<'span'>
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        'absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0',
        className
      )}
      style={{
        clip: 'rect(0, 0, 0, 0)',
        clipPath: 'inset(50%)',
      }}
      {...props}
    />
  );
});
VisuallyHidden.displayName = 'VisuallyHidden';

export { VisuallyHidden };
