import * as React from 'react';
import { type AiDataAttributes } from '../lib/ai-auto-attributes';
type InputProps = React.ComponentProps<'input'> & AiDataAttributes;
declare const Input: React.ForwardRefExoticComponent<Omit<InputProps, "ref"> & React.RefAttributes<HTMLInputElement>>;
export { Input };
