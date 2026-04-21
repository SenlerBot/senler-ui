import { ComponentProps, ReactNode } from 'react';
interface Props extends ComponentProps<'div'> {
    children: ReactNode;
}
export declare function LayoutContainer({ children, ...props }: Props): import("react/jsx-runtime").JSX.Element;
export {};
