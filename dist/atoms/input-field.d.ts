import { ComponentProps, ReactNode } from 'react';
import { Input } from './input';
interface Props extends ComponentProps<typeof Input> {
    label?: string;
    error?: boolean;
    helperText?: string;
    startAdornment?: ReactNode;
    endAdornment?: ReactNode;
}
export declare const InputField: import("react").ForwardRefExoticComponent<Omit<Props, "ref"> & import("react").RefAttributes<HTMLInputElement>>;
export {};
