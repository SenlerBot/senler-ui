import { ComponentProps, forwardRef, ReactNode, useId } from 'react';
import { Input } from './input';
import {
  Field,
  FieldError,
  FieldLabel,
  FieldDescription,
} from './field';
import { cn } from '../../lib/utils/cn';

interface Props extends ComponentProps<typeof Input> {
  label?: string;
  error?: boolean;
  helperText?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
}

export const InputField = forwardRef<HTMLInputElement, Props>(
  (
    { label, startAdornment, endAdornment, error, helperText, ...props },
    ref
  ) => {
    const id = useId();

    return (
      <Field className='gap-1'>
        {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
        <div className='relative'>
          <Input
            id={id}
            ref={ref}
            {...props}
            className={cn(
              {
                'ps-9': startAdornment,
                'pe-9': endAdornment,
              },
              props.className
            )}
          />

          {startAdornment && (
            <span className='pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50'>
              {startAdornment}
            </span>
          )}

          {endAdornment && (
            <span className='pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm text-muted-foreground peer-disabled:opacity-50'>
              {endAdornment}
            </span>
          )}
        </div>

        {error && helperText && <FieldError>{helperText}</FieldError>}
        {!error && helperText && (
          <FieldDescription>{helperText}</FieldDescription>
        )}
      </Field>
    );
  }
);

InputField.displayName = 'InputField';
