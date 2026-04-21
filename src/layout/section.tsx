import { cn } from '../lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const sectionVariants = cva('', {
  variants: {
    border: {
      true: 'border border-border rounded-lg',
      false: '',
    },
  },
  defaultVariants: {
    border: false,
  },
});

interface Props
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {}

export function LayoutSection({ border, className, ...props }: Props) {
  return (
    <section
      className={cn(sectionVariants({ border, className }))}
      {...props}
    />
  );
}
