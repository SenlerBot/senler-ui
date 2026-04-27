import * as React from 'react';
interface TextFieldBaseProps {
    label?: string;
    error?: boolean;
    helperText?: string;
    fullWidth?: boolean;
    size?: 'small' | 'medium';
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
    maxRows?: number;
}
type InputTextFieldProps = TextFieldBaseProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
    multiline?: false;
    rows?: never;
};
type MultilineTextFieldProps = TextFieldBaseProps & React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    multiline: true;
    rows?: number;
};
export type TextFieldProps = InputTextFieldProps | MultilineTextFieldProps;
declare const TextField: React.ForwardRefExoticComponent<TextFieldProps & React.RefAttributes<HTMLInputElement | HTMLTextAreaElement>>;
export { TextField };
