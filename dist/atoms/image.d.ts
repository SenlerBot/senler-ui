import * as React from 'react';
interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
}
declare const Img: ({ className, alt, ...props }: ImgProps) => import("react/jsx-runtime").JSX.Element;
export { Img };
