import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const imagePreviewVariants: (props?: ({
    variant?: "banner" | "icon" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
interface ImagePreviewProps extends React.ComponentProps<'div'>, VariantProps<typeof imagePreviewVariants> {
    src?: string;
}
declare const ImagePreview: React.ForwardRefExoticComponent<Omit<ImagePreviewProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
export { ImagePreview, imagePreviewVariants, };
