import * as React from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const paraVariants = cva(
  "text-md leading-7 h-fit min-h-10",
  {
    variants: {
      variant: {
        default: "py-5",
        darkGlass: "backdrop-blur-xl bg-white/5 p-5 rounded-lg",
        glass: "backdrop-blur-xl bg-white/5 p-5 rounded-lg",
        bg: "bg-bg/20 p-5 rounded-lg",
        bgGlass: "backdrop-blur-xl bg-bg/20 p-5 rounded-lg",
        transparent:"bg-transparent p-5 rounded-lg"   
      },
      colors:{
        primary: "text-primary dark:text-blue-400",
        secondary: "text-secondary dark:text-gray-300",
        tertiary: "text-tertiary dark:text-blue-100",
        danger: "text-danger dark:text-red-400",
        warning: "text-warning dark:text-yellow-400",
        success: "text-success dark:text-green-400",
        info: "text-info dark:text-cyan-400",
        dark: "text-dark/20 dark:text-gray-400/20",
        light: "text-white dark:text-white",
      },
      badge:{
        default: "bg-primary/5 dark:bg-blue-400/10",
        secondary: "bg-secondary/5 dark:bg-gray-300/10",
        tertiary: "bg-tertiary/5 dark:bg-blue-100/10",
        danger: "bg-danger/5 dark:bg-red-400/10",
        warning: "bg-warning/5 dark:bg-yellow-400/10",
        success: "bg-success/5 dark:bg-green-400/10",
        info: "bg-info/5 dark:bg-cyan-400/10",
        dark: "bg-dark/5 dark:bg-gray-400/10",
        light: "bg-white/5 dark:bg-white",
      },
      sizes: {
        sm: "text-sm leading-5",
        md: "text-md leading-7",
        lg: "text-lg leading-9",
        xl: "text-xl leading-11"
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
        normalcase: "normal-case",
      },
      decoration: {
        underline: "underline",
        lineThrough: "line-through",
        noUnderline: "no-underline",
      },
      bg:{
        true: "p-5 rounded-lg",
        false: "",
      }
      
  },
    defaultVariants: {
      variant: "default",
      colors: "primary",
      badge:null,
      sizes:null,
      weight:null,
      align:null,
      transform:null,
      decoration:null,
      bg:null
    },
  }
)

export interface HeadingProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paraVariants> {
}

const Paragraph = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, 
    children, 
    colors, 
    variant, 
    badge,
    sizes,
    weight,
    align,
    transform,
    decoration,
    bg, 
   ...props 
  }, ref) => {
    return (
        <p
          className={cn(paraVariants({ variant, colors, badge, sizes, weight, align, transform, decoration, bg, className }))}
          ref={ref}
          {...props}
          >
          {children}
        </p>
    )
  }
)
Paragraph.displayName = 'Paragraph'

export default Paragraph