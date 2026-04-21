import { cn } from '@/shared/lib/utils';
import * as React from 'react';

interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

const Img = ({ className, alt, ...props }: ImgProps) => {
  return (
    <img
      alt={alt || 'image'}
      className={cn('max-w-full', className)}
      {...props}
    />
  );
};

export { Img };
