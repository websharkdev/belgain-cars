'use client';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { BelgianFlagIcon } from '@/components/vin-search/belgian-flag-icon';
import { cn } from '@/lib/utils';

interface VinSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
}

function VinSearchInput({
  value,
  onChange,
  className,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
}: VinSearchInputProps) {
  return (
    <InputGroup
      className={cn(
        'bg-muted h-12 rounded-full border-0 px-1 shadow-none ring-0',
        'has-[[data-slot=input-group-control]:focus-visible]:border-transparent has-[[data-slot=input-group-control]:focus-visible]:ring-0',
        className,
      )}
    >
      <InputGroupAddon align="inline-start" className="pl-1">
        <div className="border-ink-08 flex size-10 items-center justify-center rounded-full border border-dashed p-1">
          <BelgianFlagIcon />
        </div>
      </InputGroupAddon>
      <InputGroupInput
        value={value}
        aria-describedby={ariaDescribedBy}
        aria-invalid={ariaInvalid}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Enter a valid plate or 17-digit VIN"
        className="text-3.75 text-ink placeholder:text-ink-40 pl-2 uppercase"
        maxLength={17}
        minLength={1}
      />
    </InputGroup>
  );
}

export { VinSearchInput };
export type { VinSearchInputProps };
