import { ComponentProps, ReactNode } from 'react';
interface Props extends ComponentProps<'div'> {
    left: ReactNode;
    children: ReactNode;
    alignHorizontal?: 'start' | 'center' | 'end';
}
export declare function LayoutField({ left, children, alignHorizontal, ...props }: Props): import("react/jsx-runtime").JSX.Element;
export {};
