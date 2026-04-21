import * as React from 'react';
import { cn } from '@/shared/lib/utils';

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn('block font-medium text-text-primary', className)}
        {...props}
      />
    );
  }
);

Label.displayName = 'Label';

export { Label };
