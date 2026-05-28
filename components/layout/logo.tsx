import Image from 'next/image';
import { cn } from '@/lib/utils';

function Logo({ variant = 'color' }: { variant?: 'color' | 'white' }) {
  return (
    <div className="relative h-12 w-24 overflow-hidden">
      <Image
        src="/logo.svg"
        alt="BCS Autoparts"
        width={96}
        height={48}
        className={cn(
          'h-12 w-24 object-contain object-left',
          variant === 'white' && 'brightness-0 invert',
        )}
        priority
        fetchPriority="high"
      />
    </div>
  );
}

export { Logo };
