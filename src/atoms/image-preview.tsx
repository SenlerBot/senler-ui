import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { Img } from './image';
import { ImageIcon } from 'lucide-react';

const imagePreviewVariants = cva(
  'flex justify-center items-center overflow-hidden bg-muted border border-border rounded-md',
  {
    variants: {
      variant: {
        banner: 'min-h-[140px] w-full',
        icon: 'w-20 h-20',
      },
    },
    defaultVariants: {
      variant: 'banner',
    },
  }
);

interface ImagePreviewProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof imagePreviewVariants> {
  src?: string;
}

const ImagePreview = React.forwardRef<HTMLDivElement, ImagePreviewProps>(
  ({ className, variant, src, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(imagePreviewVariants({ variant, className }))}
        {...props}
      >
        {src ? (
          <Img src={src} className='h-full w-full object-cover' alt='Preview' />
        ) : (
          <ImageIcon className='h-6 w-6 text-muted-foreground' />
        )}
      </div>
    );
  }
);

ImagePreview.displayName = 'ImagePreview';

export {
  ImagePreview,
  imagePreviewVariants,
};
