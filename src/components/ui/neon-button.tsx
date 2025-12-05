import React from 'react'
import { cn } from '@/components/ui/utils'
import { VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
    "relative group border text-foreground mx-auto text-center rounded-full shadow-lg shadow-emerald-100/50 border-emerald-100",
    {
        variants: {
            variant: {
                default: "bg-emerald-500/5 hover:bg-emerald-500/0",
                solid: "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-200 shadow-emerald-200/60 transition-all duration-200",
                ghost: "bg-transparent hover:bg-white/10 border-emerald-200/70",
            },
            size: {
                default: "px-7 py-1.5 ",
                sm: "px-4 py-0.5 ",
                lg: "px-10 py-2.5 ",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { neon?: boolean }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, neon = true, size, variant, children, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size }), className)}
                ref={ref}
                {...props}
            >
                {children}
            </button>
        );
    }
)

Button.displayName = 'Button';

export { Button, buttonVariants };