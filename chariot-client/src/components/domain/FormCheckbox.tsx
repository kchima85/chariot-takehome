import { Checkbox } from '../ui/checkbox'

interface FormCheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  description?: string
  disabled?: boolean
  error?: string
  id?: string
  size?: 'small' | 'medium' | 'large'
  className?: string
}

const sizeClasses = {
  small: 'h-3 w-3',
  medium: 'h-4 w-4',
  large: 'h-5 w-5',
}

const labelSizeClasses = {
  small: 'text-xs',
  medium: 'text-sm',
  large: 'text-base',
}

export const FormCheckbox = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  error,
  id,
  size = 'medium',
  className = '',
}: FormCheckboxProps) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className={`space-y-1 ${className}`}>
      <div className="flex items-start space-x-2">
        <Checkbox
          id={checkboxId}
          checked={checked}
          onCheckedChange={onChange}
          disabled={disabled}
          className={`${sizeClasses[size]} ${error ? 'border-red-500' : ''}`}
        />

        <div className="flex-1 leading-none">
          {label && (
            <label
              htmlFor={checkboxId}
              className={`${labelSizeClasses[size]} cursor-pointer font-medium ${
                disabled
                  ? 'cursor-not-allowed text-gray-400'
                  : error
                    ? 'text-red-900'
                    : 'text-gray-900'
              }`}
            >
              {label}
            </label>
          )}

          {description && (
            <p
              className={`${
                size === 'small' ? 'text-xs' : 'text-sm'
              } mt-1 text-gray-500 ${disabled ? 'text-gray-400' : ''}`}
            >
              {description}
            </p>
          )}
        </div>
      </div>

      {error && <p className="ml-6 text-sm text-red-500">{error}</p>}
    </div>
  )
}
