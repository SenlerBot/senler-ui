import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '../lib/utils';

export const avatarSizeClasses = {
  xs: 'size-5 text-[10px]',
  sm: 'size-6 text-xs',
  md: 'size-8 text-sm',
  lg: 'size-10 text-base',
  xl: 'size-11 text-base',
  '2xl': 'size-16 text-xl',
  '3xl': 'size-20 text-2xl',
} as const;

export type AvatarSize = keyof typeof avatarSizeClasses;

export const avatarShapeClasses = {
  circle: 'rounded-full',
  rounded: 'rounded-md',
} as const;

export type AvatarShape = keyof typeof avatarShapeClasses;

export const avatarFallbackColorClasses = [
  'bg-blue-500 text-white',
  'bg-violet-500 text-white',
  'bg-pink-500 text-white',
  'bg-rose-500 text-white',
  'bg-orange-500 text-white',
  'bg-amber-400 text-amber-950',
  'bg-emerald-500 text-white',
  'bg-teal-500 text-white',
  'bg-cyan-400 text-cyan-950',
  'bg-indigo-500 text-white',
] as const;

export type AvatarFallbackColorClass =
  (typeof avatarFallbackColorClasses)[number];

export const avatarBadgePositionClasses = {
  'top-left': '-top-0.5 -left-0.5',
  'top-right': '-top-0.5 -right-0.5',
  'bottom-left': '-bottom-0.5 -left-0.5',
  'bottom-right': '-right-0.5 -bottom-0.5',
} as const;

export type AvatarBadgePosition = keyof typeof avatarBadgePositionClasses;

export const avatarBadgeSizeClasses = {
  xs: 'size-2.5',
  sm: 'size-3',
  md: 'size-4',
  lg: 'size-4',
  xl: 'size-4',
  '2xl': 'size-5',
  '3xl': 'size-6',
} as const satisfies Record<AvatarSize, string>;

function getHash(value: string): number {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = value.charCodeAt(index) + ((hash << 5) - hash);
    hash |= 0;
  }

  return Math.abs(hash);
}

export function getAvatarColorClassName(
  value: string | null | undefined
): AvatarFallbackColorClass | 'bg-muted text-muted-foreground' {
  const seed = value?.trim();

  if (!seed) {
    return 'bg-muted text-muted-foreground';
  }

  return avatarFallbackColorClasses[
    getHash(seed) % avatarFallbackColorClasses.length
  ];
}

export function getAvatarInitial(value: string | null | undefined): string {
  const normalized = value?.trim();

  if (!normalized) {
    return '?';
  }

  return Array.from(normalized)[0]?.toLocaleUpperCase() ?? '?';
}

export type AvatarRootProps = React.ComponentProps<
  typeof AvatarPrimitive.Root
> & {
  size?: AvatarSize;
  shape?: AvatarShape;
};

function AvatarRoot({
  className,
  size = 'sm',
  shape = 'circle',
  ...props
}: AvatarRootProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        'relative flex shrink-0 overflow-hidden',
        avatarSizeClasses[size],
        avatarShapeClasses[shape],
        className
      )}
      {...props}
    />
  );
}

export type AvatarImageProps = Omit<
  React.ComponentProps<typeof AvatarPrimitive.Image>,
  'src'
> & {
  src?: string | null;
};

function AvatarImage({
  className,
  src,
  alt,
  referrerPolicy = 'no-referrer',
  loading = 'lazy',
  ...props
}: AvatarImageProps) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn('aspect-square size-full object-cover', className)}
      src={src ?? undefined}
      alt={alt}
      referrerPolicy={referrerPolicy}
      loading={loading}
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
        'flex size-full items-center justify-center rounded-[inherit] bg-muted font-semibold text-muted-foreground select-none',
        className
      )}
      {...props}
    />
  );
}

export interface AvatarProps
  extends Omit<AvatarRootProps, 'children'> {
  src?: string | null;
  alt?: string | null;
  name?: string | null;
  colorKey?: string | null;
  fallback?: React.ReactNode;
  fallbackIcon?: React.ReactNode;
  imageClassName?: string;
  fallbackClassName?: string;
  wrapperClassName?: string;
  badge?: React.ReactNode;
  badgeClassName?: string;
  badgePosition?: AvatarBadgePosition;
}

function Avatar({
  src,
  alt,
  name,
  colorKey,
  fallback,
  fallbackIcon,
  imageClassName,
  fallbackClassName,
  wrapperClassName,
  badge,
  badgeClassName,
  badgePosition = 'bottom-right',
  size = 'sm',
  shape = 'circle',
  className,
  title,
  ...props
}: AvatarProps) {
  const label = alt ?? name ?? '';
  const fallbackSeed = colorKey ?? name ?? alt;
  const fallbackContent =
    fallback ?? fallbackIcon ?? getAvatarInitial(name ?? alt);
  const root = (
    <AvatarRoot
      className={className}
      size={size}
      shape={shape}
      title={title ?? name ?? alt ?? undefined}
      {...props}
    >
      <AvatarImage
        src={src}
        alt={label}
        className={imageClassName}
      />
      <AvatarFallback
        className={cn(
          getAvatarColorClassName(fallbackSeed),
          fallbackClassName
        )}
      >
        {fallbackContent}
      </AvatarFallback>
    </AvatarRoot>
  );

  if (!badge) {
    return root;
  }

  return (
    <span
      data-slot="avatar-wrapper"
      className={cn('relative inline-flex shrink-0', wrapperClassName)}
    >
      {root}
      <span
        data-slot="avatar-badge"
        className={cn(
          'absolute z-10 flex items-center justify-center rounded-full ring-2 ring-background',
          avatarBadgeSizeClasses[size],
          avatarBadgePositionClasses[badgePosition],
          badgeClassName
        )}
      >
        {badge}
      </span>
    </span>
  );
}

export { Avatar, AvatarImage, AvatarFallback, AvatarRoot };
