import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "cursor-pointer group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all duration-200 ease-out outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-0 disabled:pointer-events-none disabled:opacity-50 disabled:hover:shadow-none aria-invalid:animate-shake aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground [a]:hover:bg-primary/80',
        outline:
          'border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
        ghost:
          'hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50',
        destructive:
          'bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
        link: 'text-primary underline-offset-4 hover:translate-y-0 hover:underline hover:shadow-none',
        linkMuted:
          'h-auto p-0! text-sm text-ink-60 hover:translate-y-0 hover:text-primary hover:shadow-none hover:no-underline',
        linkInverse:
          'h-auto justify-start p-0! text-sm leading-5 font-normal text-white/60 hover:translate-y-0 hover:text-white hover:shadow-none hover:no-underline',
        linkInverseStrong:
          'h-auto justify-start p-0! text-sm leading-5 font-medium text-white hover:translate-y-0 hover:text-white hover:shadow-none hover:no-underline',
        iconSoftInverse:
          'size-10.5 rounded-full border-white/10 bg-white/10 text-white hover:bg-white/15 hover:text-white',
        pillMuted:
          'h-12 gap-2 rounded-full border-0 bg-muted px-4 py-3 hover:bg-ink-06 hover:shadow-none',
        catalogItem:
          'h-12 w-full shrink-0 justify-start gap-3 rounded-full py-3 pl-4 pr-3.5 font-medium hover:translate-x-1 hover:bg-muted hover:shadow-none',
        pillSurface:
          'rounded-full border-0 bg-background text-ink hover:bg-neutral-light hover:shadow-none',
        pillDanger:
          'rounded-full bg-danger text-primary-foreground hover:bg-danger/90',
        pillGradient:
          'rounded-full border-0 bg-linear-343 from-red-800 to-cyan-700 to-70% text-white hover:opacity-90',
        heroProgress:
          'h-1 flex-1 overflow-hidden rounded-0.5 bg-white/20 p-0 backdrop-blur-[2px] transition-colors hover:bg-white/30 hover:translate-y-0 hover:shadow-none',
        heroControl:
          'size-5 rounded-full hover:bg-transparent hover:translate-y-0 hover:shadow-none',
      },
      size: {
        default:
          'h-12 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        xs: "h-10 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-12 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: 'h-14 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        auto: 'h-auto gap-1.5 p-0 has-data-[icon=inline-end]:pr-0 has-data-[icon=inline-start]:pl-0',
        icon: 'size-8',
        'icon-xs':
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        'icon-sm':
          'size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg',
        'icon-lg': 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
