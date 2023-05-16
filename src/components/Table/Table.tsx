import { VariantProps, cva } from 'class-variance-authority';
import React, { HTMLProps } from 'react';
import { cn } from '../../lib/utils';

const tableVariants = cva(
  'leading-10 bg-transparent',
  {
    variants: {
      variant: {
        default: 'border border-primary text-md tracking-tight',
        bg: 'text-md bg-bg/20 tracking-tight p-5',
        border: 'text-md',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const tableHeadVariants = cva(
  'm-0 bg-transparent text-tertiary p-0 even:bg-muted',
  {
    variants: {
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
    },
    defaultVariants: {
      align: 'left',
    },
  }
);

const tableRowVariants = cva(
  'text-left bg-transparent text-tertiary even:bg-muted',
  {
    variants: {
      variant: {
        default: 'text-md bg-transparent',
        bg: 'text-md bg-bg/20 border-none even:bg-bg',
        border: 'text-md border border-primary odd:bg-primary/10',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
    },
    defaultVariants: {
      align: 'left',
      variant: 'default'
    },
  }
);

const tdVariants = cva(
  'm-0 bg-transparent text-tertiary p-0 even:bg-muted',
  {
    variants: {
      variant:{
        default: 'text-md bg-transparent border border-primary',
        bg: 'text-md bg-bg/20 border-none',
        border: 'text-md border border-primary',
      },
      padding: {
        left: 'pl-5',
        all: 'p-5',
        right: 'pr-5',
      },
    },
    defaultVariants: {
      padding: 'all',
      variant: 'default'
    },
  }
);

const thVariants = cva(
  'text-bold text-primary p-0',
  {
    variants: {
      variant:{
        default: 'bg-primary/10 border-2 border-primary',
        bg: 'text-md bg-bg/20 border-none',
        border: 'text-md text-white bg-primary/50 border border-white',
      },
      padding: {
        left: 'pl-5',
        all: 'p-5',
        right: 'pr-5',
      },
    },
    defaultVariants: {
      padding: 'all',
    },
  }
);

export interface TableProps extends HTMLProps<HTMLTableElement>, VariantProps<typeof tableVariants> {
  children: React.ReactNode;
  className?: string;
}

export const Table: React.FC<TableProps> = ({ children, variant, className, ...rest }) => {
  return (
    <table {...rest}>
      <tbody>
        <tr className={cn(tableVariants({ variant, className }))}>
          {children}
        </tr>
      </tbody>
    </table>
  );
};

export interface TableHeadProps extends HTMLProps<HTMLTableSectionElement>, VariantProps<typeof tableHeadVariants> {
  children: React.ReactNode;
  className?: string;
}

export const TableHead: React.FC<TableHeadProps> = ({ children, className, align, ...rest }) => {
  return (
    <thead {...rest}>
      <tr className={cn(tableHeadVariants({ className, align }))}>
        {children}
      </tr>
    </thead>
  );
};

export interface TableRowProps extends HTMLProps<HTMLTableRowElement>, VariantProps<typeof tableRowVariants> {
  children: React.ReactNode;
  className?: string;
}

export const TableRow: React.FC<TableRowProps> = ({ children, variant, className, align, ...rest }) => {
  return (
    <tr className={cn(tableRowVariants({ className, variant, align }))} {...rest}>
        {children}
    </tr>
  );
};
/* TD */
export interface tdProps extends HTMLProps<HTMLTableCellElement>, VariantProps<typeof tdVariants> {
  children: React.ReactNode;
  className?: string;
}

export const Td: React.FC<tdProps> = ({ children, variant, className, padding, ...rest }) => {
  return (
    <td className={cn(tdVariants({ className, variant, padding }))} {...rest}>
        {children}
    </td>
  );
};

export interface thProps extends HTMLProps<HTMLTableCellElement>, VariantProps<typeof thVariants> {
  children: React.ReactNode;
  className?: string;
}

export const Th: React.FC<thProps> = ({ children, variant, className, padding, ...rest }) => {
  return (
    <th className={cn(thVariants({ className, variant, padding }))} {...rest}>
        {children}
    </th>
  );
};