import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface CheckBoxProps
  extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  label?: React.ReactNode;
  tooltip?: React.ReactNode;
}

function CheckBox({ className, label, tooltip, id, ...props }: CheckBoxProps) {
  const generatedId = React.useId();
  const checkboxId = id || generatedId;

  return (
    <div className='flex items-center'>
      <div className='flex'>
        <CheckboxPrimitive.Root
          id={checkboxId}
          data-slot='checkbox'
          className={cn(
            'peer size-4 shrink-0 rounded border shadow-xs transition-all outline-none cursor-pointer',
            'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary',
            'data-[state=unchecked]:bg-muted data-[state=unchecked]:border-border',
            'hover:border-primary',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          {...props}
        >
          <CheckboxPrimitive.Indicator
            data-slot='checkbox-indicator'
            className='flex items-center justify-center text-current'
          >
            <Check className='size-3.5 stroke-[3]' />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>

        {label && (
          <label
            htmlFor={checkboxId}
            className='ml-2 text-sm leading-4 cursor-pointer select-none'
          >
            {label}
          </label>
        )}
      </div>

      {tooltip && <div className='ml-2'>{tooltip}</div>}
    </div>
  );
}

export { CheckBox };
