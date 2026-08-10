import * as React from 'react';
interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
}
declare const Img: ({ className, alt, ...props }: ImgProps) => React.JSX.Element;
export { Img };
