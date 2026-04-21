import { ComponentProps, ReactNode } from 'react';
import { cn } from '../lib/utils';

interface Props extends ComponentProps<'div'> {
  left: ReactNode;
  children: ReactNode;
  alignHorizontal?: 'start' | 'center' | 'end';
}

export function LayoutField({
  left,
  children,
  alignHorizontal = 'start',
  ...props
}: Props) {
  const { className, ...rest } = props;
  return (
    <div
      className={cn(
        `flex flex-col gap-3 sm:flex-row sm:justify-between ${
          alignHorizontal === 'start'
            ? 'sm:items-start'
            : alignHorizontal === 'center'
              ? 'sm:items-center'
              : 'sm:items-end'
        }`,
        className
      )}
      {...rest}
    >
      <div className='sm:basis-[35%] sm:min-w-[35%]'>{left}</div>

      <div className='flex grow h-fit sm:justify-end'>{children}</div>
    </div>
  );
}
