import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '../lib/utils';

function AvatarRoot({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        'relative flex size-6 shrink-0 overflow-hidden rounded-full',
        className
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn('aspect-square size-full', className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        'flex size-full items-center justify-center rounded-full bg-muted',
        className
      )}
      {...props}
    />
  );
}

function Avatar({
  src,
  alt,
  ...props
}: React.ComponentProps<typeof AvatarRoot> & {
  src?: string;
  alt?: string;
}) {
  return (
    <AvatarRoot {...props}>
      <AvatarImage src={src} alt={alt} />
      {alt ? <AvatarFallback>{alt.charAt(0).toUpperCase()}</AvatarFallback> : null}
    </AvatarRoot>
  );
}

export { Avatar, AvatarImage, AvatarFallback, AvatarRoot };
