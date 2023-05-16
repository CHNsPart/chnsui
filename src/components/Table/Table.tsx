import { VariantProps, cva } from 'class-variance-authority';
import React, { HTMLProps } from 'react';
import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const tableVariants = cva(
  'leading-10 bg-transparent',
  {
    variants: {
      variant: {
        default: 'border border-primary text-md tracking-tight',
        bg: 'text-md bg-bg/20 tracking-tight p-5',
        border: 'text-md',
      },
      padding: {
        left: 'pl-5',
        all: 'p-5',
        right: 'pr-5',
      },
      alignmentment: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: null,
      alignmentment: null
    },
  }
);

const tableHeadVariants = cva(
  'm-0 bg-transparent text-tertiary p-0 even:bg-muted',
  {
    variants: {
      variant:{
        default: 'text-md bg-transparent border border-primary',
        bg: 'text-md bg-bg/20 border-none',
        border: 'text-md border border-primary',
      },
      alignment: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
    },
    defaultVariants: {
      alignment: 'left',
      variant: null
    },
  }
);

const tableBodyVariants = cva(
  'm-0 bg-transparent text-tertiary p-0 even:bg-muted',
  {
    variants: {
      variant:{
        default: 'text-md bg-transparent border border-primary',
        bg: 'text-md bg-bg/20 border-none',
        border: 'text-md border border-primary',
      },
      alignment: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
    },
    defaultVariants: {
      alignment: 'left',
      variant: null
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

const trVariants = cva(
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

export const Table: React.FC<TableProps> = ({ children, padding, alignmentment, variant, className, ...rest }) => {
  return (
    <table className={cn(tableVariants({ padding, alignmentment, variant, className }))} {...rest}>
        {children}
    </table>
  );
};

export interface TableHeadProps extends HTMLProps<HTMLTableSectionElement>, VariantProps<typeof tableHeadVariants> {
  children: React.ReactNode | null;
  className?: string;
}

export const TableHead: React.FC<TableHeadProps> = ({ children, variant, className, alignment, ...rest }) => {
  return (
    <thead className={cn(tableHeadVariants({ variant, className, alignment }))} {...rest}>

        {children}

    </thead>
  );
};
export interface TableBodyProps extends HTMLProps<HTMLTableSectionElement>, VariantProps<typeof tableBodyVariants> {
  children: React.ReactNode | null;
  className?: string;
}

export const TableBody: React.FC<TableBodyProps> = ({ children, variant, className, alignment, ...rest }) => {
  return (
    <tbody className={cn(tableBodyVariants({ variant, className, alignment }))} {...rest}>
        {children}
    </tbody>
  );
};
/* TD */
export interface tdProps extends HTMLProps<HTMLTableCellElement>, VariantProps<typeof tdVariants> {
  children: React.ReactNode | null;
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
  children: React.ReactNode | null;
  className?: string;
}

export const Th: React.FC<thProps> = ({ children, variant, className, padding, ...rest }) => {
  return (
    <th className={cn(thVariants({ className, variant, padding }))} {...rest}>
        {children}
    </th>
  );
};
export interface trProps extends HTMLProps<HTMLTableRowElement>, VariantProps<typeof trVariants> {
  children: React.ReactNode | null;
  className?: string;
}

export const Tr: React.FC<trProps> = ({ children, variant, className, padding, ...rest }) => {
  return (
    <tr className={cn(trVariants({ className, variant, padding }))} {...rest}>
        {children}
    </tr>
  );
};

export default {
    Table,
    TableHead,
    TableBody,
    Td,
    Th,
    Tr
};