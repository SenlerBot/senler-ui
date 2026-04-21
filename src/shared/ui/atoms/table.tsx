import * as React from 'react';
import { cn } from '@/shared/lib/utils';

function Table({ className, ...props }: React.ComponentProps<'table'>) {
  return (
    <table
      className={cn(
        'table w-full table-fixed border-collapse border-spacing-0 overflow-hidden',
        className
      )}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return (
    <tbody
      className={cn('table-row-group overflow-y-auto', className)}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return (
    <td
      className={cn(
        'table-cell align-inherit text-left py-1.5 font-normal border-b border-stroke',
        className
      )}
      {...props}
    />
  );
}

function TableContainer({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('bg-card', className)} {...props} />;
}

function TableHead({ className, ...props }: React.ComponentProps<'thead'>) {
  return <thead className={cn('table-header-group', className)} {...props} />;
}

function TableHeadCell({ className, ...props }: React.ComponentProps<'th'>) {
  return (
    <th
      className={cn(
        'table-cell align-inherit text-left py-1.5 font-normal border-b border-stroke',
        className
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return (
    <tr
      className={cn('table-row align-middle outline-none', className)}
      {...props}
    />
  );
}

export {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeadCell,
  TableRow,
};
