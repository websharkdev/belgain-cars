import type { ReactNode } from 'react';

interface CatalogEmptyStateProps {
  children?: ReactNode;
}

export function CatalogEmptyState({ children }: CatalogEmptyStateProps) {
  return (
    <div aria-hidden="true" className="h-full">
      <span className="hidden">{children}</span>
    </div>
  );
}
