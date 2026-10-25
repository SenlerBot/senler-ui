import { Loader2Icon } from 'lucide-react';

import { cn } from '../lib/utils';

function Spinner({ className, 'aria-label': ariaLabel = 'Loading', ...props }: React.ComponentProps<'svg'>) {
  return (
    <Loader2Icon
      role='status'
      aria-label={ariaLabel}
      className={cn('size-4 animate-spin text-primary', className)}
      {...props}
    />
  );
}

export { Spinner };
