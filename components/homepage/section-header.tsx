import type { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  action?: ReactNode;
}

export function SectionHeader({ title, action }: SectionHeaderProps) {
  return (
    <div className="flex w-full items-center justify-between gap-9">
      <h2 className="text-7 text-ink leading-8.5 font-medium">{title}</h2>
      {action}
    </div>
  );
}
