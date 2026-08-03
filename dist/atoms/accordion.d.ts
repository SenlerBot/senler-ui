import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { type AiDataAttributes } from '../lib/ai-auto-attributes';
declare function Accordion({ ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
type AccordionItemVariant = 'list' | 'card';
type AccordionItemProps = React.ComponentProps<typeof AccordionPrimitive.Item> & {
    variant?: AccordionItemVariant;
};
declare function AccordionItem({ className, variant, children, ...props }: AccordionItemProps): import("react/jsx-runtime").JSX.Element;
declare function AccordionTrigger({ className, children, 'aria-label': ariaLabel, title, 'data-ai-kind': dataAiKind, 'data-ai-label': dataAiLabel, 'data-ai-reveals-context-id': dataAiRevealsContextId, 'data-ai-reveal-action': dataAiRevealAction, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger> & AiDataAttributes): import("react/jsx-runtime").JSX.Element;
declare function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>): import("react/jsx-runtime").JSX.Element;
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
export type { AccordionItemProps, AccordionItemVariant };
