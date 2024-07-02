import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn, tw } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

const buttonVariants = cva(
  tw`inline-flex select-none items-center justify-center gap-2.5 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none`,
  {
    variants: {
      variant: {
        primary: tw`bg-slate-900 text-white hover:bg-slate-700 hover:text-white disabled:bg-slate-300`,
        outline: tw`border border-slate-200 bg-white text-slate-900 hover:bg-slate-100 hover:text-slate-900 disabled:text-slate-400`,
      },
      size: {
        default: tw`px-4 py-2`,
        sm: tw`h-9 px-3`,
        lg: tw`h-11 px-8`,
        icon: tw`h-8 w-8`,
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, leftIcon, rightIcon, children, ...props }, ref) => {
    // ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        <>
          {leftIcon && <span>{leftIcon}</span>}
          {children}
          {/* {children && <span>{children}</span>} */}
          {rightIcon && <span>{rightIcon}</span>}
        </>
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
