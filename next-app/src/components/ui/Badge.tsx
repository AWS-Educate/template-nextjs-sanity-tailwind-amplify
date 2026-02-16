import {clsx} from 'clsx'

const colorMap = {
  primary: 'bg-primary-50 text-primary-600',
  secondary: 'bg-secondary-50 text-secondary-600',
  sage: 'bg-accent-sage-50 text-accent-sage-600',
  neutral: 'bg-neutral-100 text-neutral-600',
} as const

interface BadgeProps {
  children: React.ReactNode
  color?: keyof typeof colorMap
  className?: string
}

export default function Badge({children, color = 'primary', className}: BadgeProps) {
  return (
    <span className={clsx('inline-block rounded-full px-3 py-1 text-xs font-medium', colorMap[color], className)}>
      {children}
    </span>
  )
}
