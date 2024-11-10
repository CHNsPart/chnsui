import * as React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const paragraphVariants = cva(
  "text-md leading-7 h-fit min-h-10",
  {
    variants: {
      variant: {
        default: "py-5",
        darkGlass: "backdrop-blur-xl bg-black/5 p-5 rounded-lg",
        glass: "backdrop-blur-xl bg-white/5 p-5 rounded-lg",
        bg: "bg-slate-100 dark:bg-slate-800 p-5 rounded-lg",
        bgGlass: "backdrop-blur-xl bg-white/10 dark:bg-black/10 p-5 rounded-lg",
        transparent: "bg-transparent p-5 rounded-lg"
      },
      colors: {
        primary: "text-blue-600 dark:text-blue-400",
        secondary: "text-gray-600 dark:text-gray-300",
        tertiary: "text-blue-800 dark:text-blue-100",
        danger: "text-red-600 dark:text-red-400",
        warning: "text-yellow-600 dark:text-yellow-400",
        success: "text-green-600 dark:text-green-400",
        info: "text-cyan-600 dark:text-cyan-400",
        dark: "text-gray-900 dark:text-gray-400",
        light: "text-gray-100 dark:text-white",
      },
      size: {
        sm: "text-sm leading-5",
        base: "text-base leading-7",
        lg: "text-lg leading-8",
        xl: "text-xl leading-9"
      },
      weight: {
        thin: "font-thin",
        light: "font-light",
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
        extrabold: "font-extrabold",
        black: "font-black",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
        justify: "text-justify",
      },
      transform: {
        uppercase: "uppercase",
        lowercase: "lowercase",
        capitalize: "capitalize",
        normal: "normal-case",
      },
      decoration: {
        underline: "underline",
        lineThrough: "line-through",
        noUnderline: "no-underline",
      },
      withBadge: {
        true: "relative before:content-[''] before:absolute before:-left-2 before:top-0 before:w-1 before:h-full rounded-l-none",
      }
    },
    compoundVariants: [
      {
        withBadge: true,
        colors: "primary",
        className: "before:bg-blue-500"
      },
      {
        withBadge: true,
        colors: "secondary",
        className: "before:bg-gray-500"
      },
      {
        withBadge: true,
        colors: "danger",
        className: "before:bg-red-500"
      },
      {
        withBadge: true,
        colors: "warning",
        className: "before:bg-yellow-500"
      },
      {
        withBadge: true,
        colors: "success",
        className: "before:bg-green-500"
      },
      {
        withBadge: true,
        colors: "info",
        className: "before:bg-cyan-500"
      }
    ],
    defaultVariants: {
      variant: "default",
      colors: "primary",
      size: "base",
      align: "left",
      weight: "normal",
      withBadge: false
    },
  }
);

export interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {}

const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ 
    className, 
    children, 
    variant, 
    colors, 
    size,
    weight,
    align,
    transform,
    decoration,
    withBadge,
    ...props 
  }, ref) => {
    return (
      <p
        className={cn(paragraphVariants({ 
          variant, 
          colors, 
          size,
          weight,
          align,
          transform,
          decoration,
          withBadge,
          className 
        }))}
        ref={ref}
        {...props}
      >
        {children}
      </p>
    );
  }
);

Paragraph.displayName = 'Paragraph';

export default Paragraph;