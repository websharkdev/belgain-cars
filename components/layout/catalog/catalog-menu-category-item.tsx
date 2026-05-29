'use client';

import Image from 'next/image';
import { ChevronRight, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { CatalogCategory } from '@/components/layout/catalog/catalog-menu.types';
import { cn } from '@/lib/utils';

interface CatalogMenuCategoryItemProps {
  category: CatalogCategory;
  isActive: boolean;
  onPreview: (categoryId: string) => void;
}

function CatalogMenuCategoryItem({
  category,
  isActive,
  onPreview,
}: CatalogMenuCategoryItemProps) {
  const handlePreview = () => onPreview(category.id);

  return (
    <Button
      type="button"
      variant="catalogItem"
      onClick={handlePreview}
      onFocus={handlePreview}
      onMouseEnter={handlePreview}
      className={cn(isActive && 'bg-muted hover:bg-muted')}
    >
      <span className="relative flex size-6 shrink-0 items-center justify-center overflow-hidden transition-transform duration-200 ease-out group-hover/button:scale-105">
        {category.icon ? (
          <Image
            src={category.icon}
            alt=""
            width={24}
            height={24}
            loading="lazy"
            className="size-6 object-contain"
          />
        ) : (
          <Package className="text-ink/30 size-4" strokeWidth={1.5} />
        )}
      </span>
      <span className="text-ink line-clamp-1 flex-1 text-left text-base leading-6">
        {category.name}
      </span>
      <ChevronRight
        className="text-ink/20 size-4 shrink-0 transition-transform duration-200 ease-out group-hover/button:translate-x-1"
        strokeWidth={1.5}
      />
    </Button>
  );
}

export { CatalogMenuCategoryItem };
