import type { ReactNode } from 'react'

type BadgeVariant = 'todo' | 'in_progress' | 'done' | 'high' | 'medium' | 'low'

interface BadgeProps {
  variant: BadgeVariant
  children: ReactNode
}

const variantStyles: Record<BadgeVariant, string> = {
  todo:        'bg-[#f5e6ef] text-[#5f0f40]',
  in_progress: 'bg-[#fff3e6] text-[#e36414]',
  done:        'bg-[#e6f0f3] text-[#0f4c5c]',
  high:        'bg-[#fce8ea] text-[#9a031e]',
  medium:      'bg-[#fff3e6] text-[#e36414]',
  low:         'bg-[#e6f0f3] text-[#0f4c5c]',
}

export function Badge({ variant, children }: BadgeProps) {
  return (
    <span className={`
      inline-flex items-center
      px-2.5 py-0.5
      rounded-full text-xs font-medium
      ${variantStyles[variant]}
    `}>
      {children}
    </span>
  )
}