import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { X } from 'lucide-react'

interface SimpleModalProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  children: React.ReactNode
  size?: 'small' | 'medium' | 'large' | 'full'
  showCloseButton?: boolean
  closable?: boolean
  footer?: React.ReactNode
  className?: string
}

const sizeClasses = {
  small: 'max-w-md',
  medium: 'max-w-lg',
  large: 'max-w-2xl',
  full: 'max-w-full mx-4',
}

export const SimpleModal = ({
  open,
  onClose,
  title,
  description,
  children,
  size = 'medium',
  showCloseButton = true,
  closable = true,
  footer,
  className = '',
}: SimpleModalProps) => {
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && closable) {
      onClose()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={`${sizeClasses[size]} ${className}`}
        onInteractOutside={e => {
          if (!closable) e.preventDefault()
        }}
      >
        {/* Header */}
        {(title || description || showCloseButton) && (
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {title && <DialogTitle>{title}</DialogTitle>}
                {description && (
                  <DialogDescription className="mt-2">
                    {description}
                  </DialogDescription>
                )}
              </div>

              {showCloseButton && closable && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              )}
            </div>
          </DialogHeader>
        )}

        {/* Content */}
        <div className="flex-1">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="flex justify-end space-x-2 border-t pt-4">
            {footer}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
