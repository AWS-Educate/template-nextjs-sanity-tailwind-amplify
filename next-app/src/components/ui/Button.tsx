import Link from 'next/link'
import {clsx} from 'clsx'

const variants = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600',
  secondary: 'bg-secondary-500 text-white hover:bg-secondary-600',
  outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white',
} as const

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
} as const

interface ButtonProps {
  children: React.ReactNode
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  href?: string
  className?: string
  type?: 'button' | 'submit'
  onClick?: () => void
  disabled?: boolean
}

export default function Button({
  children, variant = 'primary', size = 'md', href, className = '', ...props
}: ButtonProps) {
  const classes = clsx(
    'inline-flex items-center justify-center font-semibold rounded-lg transition-colors duration-200 focus-visible:outline-primary-500',
    variants[variant],
    sizes[size],
    props.disabled && 'opacity-50 cursor-not-allowed',
    className,
  )

  if (href) {
    return <Link href={href} className={classes}>{children}</Link>
  }

  return <button className={classes} {...props}>{children}</button>
}
