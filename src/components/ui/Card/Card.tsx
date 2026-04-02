import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  priority?: boolean
  className?: string
}

export function Card({ children, priority = false, className = '' }: CardProps) {
  return (
    <div className={`
      bg-white rounded-lg p-4
      shadow-sm
      border
      ${priority ? 'border-2 border-[#9a031e]' : 'border-[#e2e8f0]'}
      ${className}
    `}>
      {children}
    </div>
  )
}