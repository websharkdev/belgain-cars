import { Separator } from '@/components/ui/separator';

interface SeparatorWithTextProps {
  children: React.ReactNode;
}

export function SeparatorWithText({ children }: SeparatorWithTextProps) {
  return (
    <div className="flex items-center gap-2 py-5">
      <Separator className="bg-ink-10 flex-1" />
      <span className="text-ink text-base leading-6 font-medium">
        {children}
      </span>
      <Separator className="bg-ink-10 flex-1" />
    </div>
  );
}
