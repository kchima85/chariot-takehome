import type { FC } from 'react'
import { useState, useCallback } from 'react'
import { useRecipients } from '../../hooks/usePayments'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '../../lib/utils'

interface RecipientFilterProps {
  selectedRecipients: string[]
  onRecipientsChange: (recipients: string[]) => void
}

export const RecipientFilter: FC<RecipientFilterProps> = ({
  selectedRecipients,
  onRecipientsChange,
}) => {
  const [open, setOpen] = useState(false)
  const { data: recipients = [], isLoading } = useRecipients()

  const handleRecipientToggle = useCallback(
    (recipient: string) => {
      const isSelected = selectedRecipients.includes(recipient)
      if (isSelected) {
        onRecipientsChange(selectedRecipients.filter(r => r !== recipient))
      } else {
        onRecipientsChange([...selectedRecipients, recipient])
      }
    },
    [selectedRecipients, onRecipientsChange]
  )

  const handleClearAll = useCallback(() => {
    onRecipientsChange([])
  }, [onRecipientsChange])

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="h-10 w-[300px] justify-between"
          >
            {selectedRecipients.length === 0
              ? 'Select recipients...'
              : `${selectedRecipients.length} selected`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] border border-gray-200 bg-white p-0 shadow-lg">
          <Command>
            <CommandInput placeholder="Search recipients..." />
            {selectedRecipients.length > 0 && (
              <div className="flex items-center justify-between border-b bg-gray-50 p-2">
                <span className="text-sm text-gray-600">
                  {selectedRecipients.length} selected
                </span>
                <Button variant="ghost" size="sm" onClick={handleClearAll}>
                  Clear all
                </Button>
              </div>
            )}
            <CommandList>
              <CommandEmpty>
                {isLoading ? 'Loading...' : 'No recipients found.'}
              </CommandEmpty>
              <CommandGroup>
                {recipients.map(recipient => (
                  <CommandItem
                    key={recipient}
                    value={recipient}
                    onSelect={() => handleRecipientToggle(recipient)}
                  >
                    <Checkbox
                      checked={selectedRecipients.includes(recipient)}
                      className="mr-2"
                    />
                    <span className="flex-1">{recipient}</span>
                    <Check
                      className={cn(
                        'ml-auto h-4 w-4',
                        selectedRecipients.includes(recipient)
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
