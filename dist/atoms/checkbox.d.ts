import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { type AiDataAttributes } from '../lib/ai-auto-attributes';
interface CheckBoxProps extends React.ComponentProps<typeof CheckboxPrimitive.Root>, AiDataAttributes {
    label?: React.ReactNode;
    tooltip?: React.ReactNode;
}
declare function CheckBox({ className, label, tooltip, id, 'aria-label': ariaLabel, title, name, 'data-ai-kind': dataAiKind, 'data-ai-label': dataAiLabel, ...props }: CheckBoxProps): import("react/jsx-runtime").JSX.Element;
export { CheckBox };
