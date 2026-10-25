import { useTheme } from 'next-themes';
import { Toaster as Sonner, toast, type ToasterProps } from 'sonner';

function Toaster(props: ToasterProps) {
  const { resolvedTheme } = useTheme();

  return (
    <Sonner
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      className="toaster group"
      closeButton={false}
      {...props}
    />
  );
}

export { Toaster, toast };
export type { ToasterProps };
