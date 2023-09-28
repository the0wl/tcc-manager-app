import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const button = tv({
  base: [
    'rounded-lg px-4 py-2 text-sm font-semibold outline-none shadow-sm',
    'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-Card/70',
    'active:opacity-80',
  ],

  variants: {
    variant: {
      primary: 'bg-Card text-Background',
      outline: 'border border-zinc-300 text-zinc-800',
      ghost: 'rounded-md px-2 shadow-none text-zinc-800',
    },
  },

  defaultVariants: {
    variant: 'primary',
  },
})

export type ButtonProps = ComponentProps<'button'> & VariantProps<typeof button>

export function Button({ variant, className, ...props }: ButtonProps) {
  return <button className={button({ variant, className })} {...props} />
}
