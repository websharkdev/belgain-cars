import { Eye, EyeOff } from 'lucide-react';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface PasswordInputProps extends React.ComponentProps<typeof Input> {
  shown: boolean;
  onShownChange: (shown: boolean) => void;
}

export function PasswordInput({
  shown,
  onShownChange,
  className,
  ...props
}: PasswordInputProps) {
  return (
    <div className="relative w-full">
      <Input
        {...props}
        type={shown ? 'text' : 'password'}
        className={cn(className, 'pr-12')}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="text-ink-40 hover:text-ink absolute top-1/2 right-3 -translate-y-1/2 rounded-full hover:bg-transparent hover:shadow-none"
        aria-label={shown ? 'Hide password' : 'Show password'}
        onClick={() => onShownChange(!shown)}
      >
        {shown ? <EyeOff /> : <Eye />}
      </Button>
    </div>
  );
}
