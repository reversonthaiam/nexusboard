import type { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose?: () => void
  title?: string
  children: ReactNode
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      <div className="relative z-10 bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          {title && (
            <h2 className="text-lg font-medium text-[#0f4c5c]">{title}</h2>
          )}
          <button
            onClick={onClose}
            className="ml-auto text-gray-400 hover:text-[#9a031e] transition-colors"
          >
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  )
}