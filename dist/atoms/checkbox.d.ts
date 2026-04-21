import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
interface CheckBoxProps extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
    label?: React.ReactNode;
    tooltip?: React.ReactNode;
}
declare function CheckBox({ className, label, tooltip, id, ...props }: CheckBoxProps): import("react/jsx-runtime").JSX.Element;
export { CheckBox };
