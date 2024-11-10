import * as React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

// Base table styles
const tableVariants = cva(
  "w-full border-collapse text-sm",
  {
    variants: {
      variant: {
        default: "bg-white dark:bg-slate-800",
        striped: "bg-white dark:bg-slate-800 [&_tr:nth-child(even)]:bg-gray-50 dark:[&_tr:nth-child(even)]:bg-slate-700",
        bordered: "border border-gray-200 dark:border-slate-700",
        minimal: "bg-transparent",
      },
      size: {
        default: "text-sm",
        sm: "text-xs",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Table Head styles
const theadVariants = cva(
  "text-left",
  {
    variants: {
      variant: {
        default: "bg-gray-50 dark:bg-slate-700",
        bordered: "bg-gray-50 dark:bg-slate-700 border-b border-gray-200 dark:border-slate-600",
        minimal: "border-b-2 border-gray-200 dark:border-slate-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Table Cell styles
const cellVariants = cva(
  "px-4 py-3",
  {
    variants: {
      textAlign: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
      variant: {
        default: "",
        bordered: "border border-gray-200 dark:border-slate-700",
      },
    },
    defaultVariants: {
      textAlign: "left",
      variant: "default",
    },
  }
);

// Interfaces
export interface TableProps 
  extends React.TableHTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {}

export interface TableHeadProps 
  extends React.HTMLAttributes<HTMLTableSectionElement>,
    VariantProps<typeof theadVariants> {}

export interface TableBodyProps 
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

export interface TableRowProps 
  extends React.HTMLAttributes<HTMLTableRowElement> {
  hover?: boolean;
}

export interface TableCellBaseProps extends VariantProps<typeof cellVariants> {
  textAlign?: 'left' | 'center' | 'right';
}

export interface TableCellProps 
  extends Omit<React.TdHTMLAttributes<HTMLTableCellElement>, 'align'>,
    TableCellBaseProps {}

export interface TableHeaderCellProps 
  extends Omit<React.ThHTMLAttributes<HTMLTableCellElement>, 'align'>,
    TableCellBaseProps {}

// Components
export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, variant, size, ...props }, ref) => (
    <table
      ref={ref}
      className={cn(tableVariants({ variant, size, className }))}
      {...props}
    />
  )
);
Table.displayName = "Table";

export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeadProps>(
  ({ className, variant, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn(theadVariants({ variant, className }))}
      {...props}
    />
  )
);
TableHeader.displayName = "TableHeader";

export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn("divide-y divide-gray-200 dark:divide-slate-700", className)}
      {...props}
    />
  )
);
TableBody.displayName = "TableBody";

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, hover, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        hover && "hover:bg-gray-50 dark:hover:bg-slate-700",
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = "TableRow";

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, textAlign, variant, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(cellVariants({ textAlign, variant, className }))}
      {...props}
    />
  )
);
TableCell.displayName = "TableCell";

export const TableHeaderCell = React.forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
  ({ className, textAlign, variant, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        cellVariants({ textAlign, variant, className }),
        "font-semibold text-gray-900 dark:text-white"
      )}
      {...props}
    />
  )
);
TableHeaderCell.displayName = "TableHeaderCell";