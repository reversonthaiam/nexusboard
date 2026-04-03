import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function Input({ label, error, id, ...props }: InputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s/g, '-')

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={inputId}
        className="text-sm font-medium text-[#0f4c5c]"
      >
        {label}
      </label>

      <input
        id={inputId}
        className={`
          w-full px-3 py-2 rounded-lg text-sm
          border outline-none
          transition-colors duration-150
          ${error
            ? 'border-[#9a031e] focus:border-[#9a031e]'
            : 'border-[#e2e8f0] focus:border-[#0f4c5c]'
          }
        `}
        {...props}
      />

      {error && (
        <span className="text-xs text-[#9a031e]">{error}</span>
      )}
    </div>
  )
}