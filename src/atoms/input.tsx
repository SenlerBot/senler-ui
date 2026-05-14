import * as React from 'react';
import {
  AI_KIND,
  type AiDataAttributes,
  getAiLabelFallback,
} from '../lib/ai-auto-attributes';
import { cn } from '../lib/utils';

type InputProps = React.ComponentProps<'input'> & AiDataAttributes;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      placeholder,
      'aria-label': ariaLabel,
      title,
      name,
      'data-ai-kind': dataAiKind,
      'data-ai-label': dataAiLabel,
      ...props
    },
    ref,
  ) => {
    const aiLabel = getAiLabelFallback(
      dataAiLabel,
      typeof ariaLabel === 'string' ? ariaLabel : undefined,
      typeof title === 'string' ? title : undefined,
      placeholder,
      name,
    );

    return (
      <input
        ref={ref}
        type={type}
        data-slot='input'
        data-ai-kind={dataAiKind ?? AI_KIND.field}
        data-ai-label={aiLabel}
        placeholder={placeholder}
        aria-label={ariaLabel}
        title={title}
        name={name}
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-10 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-primary',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
export { Input };
