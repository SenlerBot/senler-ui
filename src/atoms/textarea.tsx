import * as React from 'react';

import {
  AI_KIND,
  type AiDataAttributes,
  getAiLabelFallback,
} from '../lib/ai-auto-attributes';
import { cn } from '../lib/utils';

type TextareaProps = React.ComponentProps<'textarea'> & AiDataAttributes;

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(({ className, placeholder, 'aria-label': ariaLabel, title, name, 'data-ai-kind': dataAiKind, 'data-ai-label': dataAiLabel, ...props }, ref) => {
  const aiLabel = getAiLabelFallback(
    dataAiLabel,
    typeof ariaLabel === 'string' ? ariaLabel : undefined,
    typeof title === 'string' ? title : undefined,
    placeholder,
    name,
  );

  return (
    <textarea
      ref={ref}
      data-slot='textarea'
      data-ai-kind={dataAiKind ?? AI_KIND.field}
      data-ai-label={aiLabel}
      placeholder={placeholder}
      aria-label={ariaLabel}
      title={title}
      name={name}
      className={cn(
        'border-input resize-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 text-sm',
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

export { Textarea };
