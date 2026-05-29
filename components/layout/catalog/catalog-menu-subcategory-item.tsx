'use client';

import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { CatalogSubcategory } from '@/components/layout/catalog/catalog-menu.types';
import { cn } from '@/lib/utils';

interface CatalogMenuSubcategoryItemProps {
  subcategory: CatalogSubcategory;
  isActive: boolean;
  onPreview: (subcategoryId: string) => void;
}

function CatalogMenuSubcategoryItem({
  subcategory,
  isActive,
  onPreview,
}: CatalogMenuSubcategoryItemProps) {
  const handlePreview = () => onPreview(subcategory.id);

  return (
    <Button
      type="button"
      variant="catalogItem"
      onClick={handlePreview}
      onFocus={handlePreview}
      onMouseEnter={handlePreview}
      className={cn(isActive && 'bg-muted hover:bg-muted')}
    >
      <span className="text-ink line-clamp-1 flex-1 text-left text-base leading-6">
        {subcategory.name}
      </span>
      <ChevronRight
        className="text-ink/20 size-4 shrink-0 transition-transform duration-200 ease-out group-hover/button:translate-x-1"
        strokeWidth={1.5}
      />
    </Button>
  );
}

export { CatalogMenuSubcategoryItem };
