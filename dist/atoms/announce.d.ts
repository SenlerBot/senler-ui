import * as React from 'react';
import * as ReactAnnounce from '@radix-ui/react-announce';
import { type VariantProps } from 'class-variance-authority';
declare const announceVariants: (props?: ({
    color?: "grey" | "error" | null | undefined;
    size?: "small" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare function Announce({ className, color, size, asChild, ...props }: React.ComponentProps<typeof ReactAnnounce.Root> & VariantProps<typeof announceVariants>): import("react/jsx-runtime").JSX.Element;
export { Announce, announceVariants, };
