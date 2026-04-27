import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

function Toaster({ ...props }: ToasterProps) {
  const { resolvedTheme } = useTheme();

  return (
    <Sonner
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      className="toaster group"
      closeButton
      toastOptions={{
        classNames: {
          toast:
            'group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          closeButton:
            '!left-auto !right-1.5 !top-1.5 !translate-x-0 !translate-y-0 !border-0 !bg-transparent !text-muted-foreground !opacity-60 hover:!opacity-100 !transition-opacity',
          success:
            'group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-border',
          error:
            'group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-border',
          warning:
            'group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-border',
          info:
            'group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-border',
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
