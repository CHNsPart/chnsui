import * as React from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const headerVariants = cva(
  "text-4xl font-extrabold tracking-tight lg:text-5xl text-blue-500 dark:text-blue-400",
  {
    variants: {
      variant: {
        h1: "text-4xl font-extrabold tracking-tight lg:text-5xl",
        h2: "text-2xl font-bold tracking-tight lg:text-3xl",
        h3: "text-xl tracking-tight lg:text-xl",
        h4: "text-lg tracking-tight lg:text-lg",
        h5: "text-md tracking-tight lg:text-md",
        h6: "text-sm tracking-tight lg:text-sm",
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
      quickie:{
        q_grad_watermelone: "bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-green-500 to-violet-500",
        q_grad_aqua: "bg-clip-text text-transparent bg-gradient-to-r from-sky-300 via-blue-600 to-blue-700",
        q_grad_rasta: "bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-green-600 to-green-700",
        q_grad_lemon: "bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-teal-500 to-teal-500",
        q_grad_rose: "bg-clip-text text-transparent bg-gradient-to-l from-rose-500 via-rose-600 to-teal-200",
        
        q_line:"underline underline-offset-2 hover:underline-offset-0 decoration-primary",
        q_line_sync:"underline underline-offset-2 hover:underline-offset-0 decoration-current",
        
        qc_leanFull: "w-full text-center",
        qc_leanLeft: "w-full text-left",
        qc_leanRight: "w-full text-right",

        qc_leanHalf: "w-1/2 text-center",
        qc_leanLeftHalf: "w-1/2 text-left",
        qc_leanRightHalf: "w-1/2 text-right",
        
        qc_short:"w-1/2 text-left",
        qc_shortLeft:"w-1/2 text-left",
        qc_shortRight:"w-1/2 text-right",
        shortCenter:"w-1/2 text-center",
        qc_shortJustify:"w-1/2 text-justify",
      },
      sectionWidth: {
        full: "w-full",
        half: "w-1/2",
        third: "w-1/3",
        fourth: "w-1/4",
      },
      animations:{
        x_wave: "animate-wave",
        x_jello: "animate-jello",
        x_rubberBand: "animate-rubberBand",
        x_flash: "animate-flash",
        x_wiggle: "animate-wiggle",
        x_bounce: "animate-bounce",
        x_spin: "animate-spin",
        x_pulse: "animate-pulse",
        x_ping: "animate-ping",

      }
    },
    defaultVariants: {
      variant: "h1",
      colors: "primary",
      weight: null,
      align: null,
      transform: null,
      decoration: null,
      quickie: null,
      animations:null,
      sectionWidth:null
    },
  }
)

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headerVariants> {
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, children, colors, variant, weight, align, transform, decoration, quickie, animations, sectionWidth, ...props }, ref) => {
    if(variant==='h1'){
        return (
          <h1
            className={cn(headerVariants({ variant, colors, weight, align, transform, decoration, quickie, animations, sectionWidth, className }))}
            ref={ref}
            {...props}
          >
            {children}
          </h1>
        )
    }
    if(variant==='h2'){
        return (
          <h2
            className={cn(headerVariants({ variant, colors, weight, align, transform, decoration, quickie, animations, sectionWidth, className }))}
            ref={ref}
            {...props}
          >
            {children}
          </h2>
        )
    }
    if(variant==='h3'){
        return (
          <h3
            className={cn(headerVariants({ variant, colors, weight, align, transform, decoration, quickie, animations, sectionWidth, className }))}
            ref={ref}
            {...props}
          >
            {children}
          </h3>
        )
    }
    if(variant==='h4'){
        return (
          <h4
            className={cn(headerVariants({ variant, colors, weight, align, transform, decoration, quickie, animations, sectionWidth, className }))}
            ref={ref}
            {...props}
          >
            {children}
          </h4>
        )
    }
    if(variant==='h5'){
        return (
          <h5
            className={cn(headerVariants({ variant, colors, weight, align, transform, decoration, quickie, animations, sectionWidth, className }))}
            ref={ref}
            {...props}
          >
            {children}
          </h5>
        )
    }
    if(variant==='h6'){
        return (
          <h6
            className={cn(headerVariants({ variant, colors, weight, align, transform, decoration, quickie, animations, sectionWidth, className }))}
            ref={ref}
            {...props}
          >
            {children}
          </h6>
        )
    }
    return (
        <h1
          className={cn(headerVariants({ variant, colors, weight, align, transform, decoration, quickie, animations, sectionWidth, className }))}
          ref={ref}
          {...props}
          >
          {children}
        </h1>
    )
  }
)
Heading.displayName = 'Heading'

export default Heading