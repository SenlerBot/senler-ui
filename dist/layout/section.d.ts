import { type VariantProps } from 'class-variance-authority';
declare const sectionVariants: (props?: ({
    border?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
interface Props extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof sectionVariants> {
}
export declare function LayoutSection({ border, className, ...props }: Props): import("react/jsx-runtime").JSX.Element;
export {};
