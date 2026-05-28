'use client';

import * as React from 'react';
import { CatalogEmptyState } from '@/components/layout/catalog/catalog-empty-state';
import { CatalogMenuCategoryItem } from '@/components/layout/catalog/catalog-menu-category-item';
import { CatalogMenuProductCard } from '@/components/layout/catalog/catalog-menu-product-card';
import { CatalogMenuSubcategoryItem } from '@/components/layout/catalog/catalog-menu-subcategory-item';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { CATALOG_CATEGORIES } from '@/data/catalog';

function CatalogMenuPanel() {
  const [activeCategoryId, setActiveCategoryId] = React.useState<string | null>(null);
  const [activeSubcategoryId, setActiveSubcategoryId] = React.useState<string | null>(null);

  const activeCategory = activeCategoryId
    ? CATALOG_CATEGORIES.find((category) => category.id === activeCategoryId)
    : undefined;

  const activeSubcategory =
    activeCategory && activeSubcategoryId
      ? activeCategory.subcategories.find(
          (subcategory) => subcategory.id === activeSubcategoryId,
        )
      : undefined;

  const handleCategoryPreview = (categoryId: string) => {
    setActiveCategoryId(categoryId);
    setActiveSubcategoryId(null);
  };

  return (
    <div className="flex w-full min-w-0 items-start overflow-hidden rounded-b-3xl bg-popover">
      <ScrollArea className="h-120 w-96 shrink-0">
        <div className="flex flex-col gap-0.5 p-3">
          {CATALOG_CATEGORIES.map((category) => (
            <CatalogMenuCategoryItem
              key={category.id}
              category={category}
              isActive={category.id === activeCategoryId}
              onPreview={handleCategoryPreview}
            />
          ))}
        </div>
      </ScrollArea>

      <Separator orientation="vertical" className="bg-ink/5" />

      <ScrollArea className="h-120 w-96 shrink-0">
        {activeCategory ? (
          <div className="flex flex-col gap-0.5 p-3">
            {activeCategory.subcategories.map((subcategory) => (
              <CatalogMenuSubcategoryItem
                key={subcategory.id}
                subcategory={subcategory}
                isActive={subcategory.id === activeSubcategoryId}
                onPreview={setActiveSubcategoryId}
              />
            ))}
          </div>
        ) : (
          <CatalogEmptyState>Hover a catalog category to preview subcategories.</CatalogEmptyState>
        )}
      </ScrollArea>

      <Separator orientation="vertical" className="bg-ink/5" />

      <ScrollArea className="h-120 min-w-0 flex-1">
        {activeSubcategory ? (
          <div className="flex flex-wrap content-start gap-3 p-3">
            {activeSubcategory.products.map((product) => (
              <CatalogMenuProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <CatalogEmptyState>
            {activeCategory
              ? 'Hover a subcategory to preview available products.'
              : 'Products appear after hovering a category and subcategory.'}
          </CatalogEmptyState>
        )}
      </ScrollArea>
    </div>
  );
}

export { CatalogMenuPanel };
