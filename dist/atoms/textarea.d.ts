import * as React from 'react';
import { type AiDataAttributes } from '../lib/ai-auto-attributes';
type TextareaProps = React.ComponentProps<'textarea'> & AiDataAttributes;
declare const Textarea: React.ForwardRefExoticComponent<Omit<TextareaProps, "ref"> & React.RefAttributes<HTMLTextAreaElement>>;
export { Textarea };
