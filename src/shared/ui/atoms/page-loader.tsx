import { Spinner } from './spinner';
import { cn } from '@/shared/lib/utils';

interface PageLoaderProps {
  label?: string;
  className?: string;
}

function PageLoader({ label, className }: PageLoaderProps) {
  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <Spinner className="size-8" />
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
    </div>
  );
}

export { PageLoader };
