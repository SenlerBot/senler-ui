import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
declare function Accordion({ ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
type AccordionItemVariant = 'list' | 'card';
type AccordionItemProps = React.ComponentProps<typeof AccordionPrimitive.Item> & {
    variant?: AccordionItemVariant;
};
declare function AccordionItem({ className, variant, ...props }: AccordionItemProps): import("react/jsx-runtime").JSX.Element;
declare function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
declare function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>): import("react/jsx-runtime").JSX.Element;
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
export type { AccordionItemProps, AccordionItemVariant };
