import { ComponentProps, ReactNode } from 'react';

interface Props extends ComponentProps<'div'> {
  children: ReactNode;
}

export function LayoutContainer({ children, ...props }: Props) {
  return (
    <div
      className='w-full h-full p-4 sm:py-[40px] sm:px-[60px] lg:py-[40px] lg:px-[120px] mx-auto'
      {...props}
    >
      <div className='max-w-[940px] w-full h-full mx-auto'>{children}</div>
    </div>
  );
}
