import { Root } from '@radix-ui/react-form';
import * as React from 'react';
interface FormProps extends React.ComponentProps<typeof Root> {
    className?: string;
}
declare const Form: React.ForwardRefExoticComponent<Omit<FormProps, "ref"> & React.RefAttributes<HTMLFormElement>>;
export { Form };
