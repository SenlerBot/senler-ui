import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDownIcon } from 'lucide-react';

import {
  AI_KIND,
  type AiDataAttributes,
  getAiLabelFallback,
} from '../lib/ai-auto-attributes';
import {
  AiRevealContextProvider,
  useAiRevealAttributes,
} from '../lib/ai-reveal-context';
import { cn } from '../lib/utils';

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot='accordion' {...props} />;
}

type AccordionItemVariant = 'list' | 'card';

type AccordionItemProps = React.ComponentProps<typeof AccordionPrimitive.Item> & {
  variant?: AccordionItemVariant;
};

function AccordionItem({
  className,
  variant = 'list',
  children,
  ...props
}: AccordionItemProps) {
  return (
    <AiRevealContextProvider>
      <AccordionPrimitive.Item
        data-slot='accordion-item'
        className={cn(
          variant === 'card' ? 'rounded-lg border' : 'border-b last:border-b-0',
          className
        )}
        {...props}
      >
        {children}
      </AccordionPrimitive.Item>
    </AiRevealContextProvider>
  );
}

function AccordionTrigger({
  className,
  children,
  'aria-label': ariaLabel,
  title,
  'data-ai-kind': dataAiKind,
  'data-ai-label': dataAiLabel,
  'data-ai-reveals-context-id': dataAiRevealsContextId,
  'data-ai-reveal-action': dataAiRevealAction,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger> & AiDataAttributes) {
  const revealAttributes = useAiRevealAttributes(
    dataAiRevealsContextId,
    dataAiRevealAction,
  );
  const aiLabel = getAiLabelFallback(
    dataAiLabel,
    typeof ariaLabel === 'string' ? ariaLabel : undefined,
    typeof title === 'string' ? title : undefined,
    undefined,
    undefined,
    children,
  );

  return (
    <AccordionPrimitive.Header className='flex'>
      <AccordionPrimitive.Trigger
        data-slot='accordion-trigger'
        data-ai-kind={dataAiKind ?? AI_KIND.button}
        data-ai-label={aiLabel}
        aria-label={ariaLabel}
        title={title}
        {...revealAttributes}
        className={cn(
          'focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 cursor-pointer items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className='text-muted-foreground pointer-events-none size-4 shrink-0 self-center transition-transform duration-200' />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot='accordion-content'
      className='data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm'
      {...props}
    >
      <div className={cn('pt-0 pb-4', className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
export type { AccordionItemProps, AccordionItemVariant };
