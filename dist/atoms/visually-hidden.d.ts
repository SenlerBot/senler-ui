import * as React from 'react';
/**
 * Visually hides content while keeping it accessible to screen readers.
 * Used for accessibility when visual content is not needed but semantic content is required.
 */
declare const VisuallyHidden: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "ref"> & React.RefAttributes<HTMLSpanElement>>;
export { VisuallyHidden };
