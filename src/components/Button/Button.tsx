import * as React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-md font-medium transition-colors dark:hover:bg-blue-800 dark:hover:text-blue-100 disabled:opacity-50 disabled:pointer-events-none data-[state=open]:bg-blue-100 dark:data-[state=open]:bg-blue-800 select-none",
  {
    variants: {
      variant: {
        default: "bg-blue-500 text-white hover:bg-blue-700 dark:bg-blue-50 dark:text-blue-900",
        destructive: "bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600",
        outline: "bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-950/50 dark:border-blue-700 dark:text-blue-100",
        subtle: "bg-blue-100 text-blue-900 hover:bg-blue-200 dark:bg-blue-700 dark:text-blue-100",
        ghost: "bg-transparent dark:bg-transparent text-blue-500 hover:bg-blue-100 hover:bg-blue-950/50 dark:text-blue-100 dark:hover:text-blue-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent",
        link: "bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-blue-500 dark:text-blue-300 hover:bg-transparent dark:hover:bg-transparent",
        withRing: "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-blue-400 dark:focus:ring-offset-blue-900",
      },
      size: {
        default: 'h-10 py-2 px-4 text-md',
        sm: 'h-9 px-2 rounded-md text-sm',
        lg: 'h-11 px-8 rounded-md text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  target?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, href, target, variant, size, ...props }, ref) => {
    if (href) {
      return (
        <a
          href={href}
          target={target}
          className={cn(buttonVariants({ variant, size, className }))}
        >
          {children}
        </a>
      );
    }
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;