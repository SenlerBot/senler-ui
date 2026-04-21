import { Root } from '@radix-ui/react-form';
import { cn } from '@/shared/lib/utils';
import * as React from 'react';

interface FormProps extends React.ComponentProps<typeof Root> {
  className?: string;
}

const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, ...props }, ref) => {
    return (
      <Root ref={ref} className={cn('flex flex-col', className)} {...props} />
    );
  }
);

Form.displayName = 'Form';

export { Form };
