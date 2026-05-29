'use client';

import { CategoryCard } from '@/components/category/category-card';
import { SectionHeader } from '@/components/homepage/section-header';
import { Button } from '@/components/ui/button';
import { popularCategories } from '@/data/homepage';

function ViewCatalogButton() {
  return (
    <Button
      variant="outline"
      className="bg-muted text-ink hover:bg-ink-06 h-12 rounded-full border-0 px-5 text-base font-medium"
    >
      View catalog
    </Button>
  );
}

export function PopularCategories() {
  return (
    <section className="flex w-full flex-col gap-9">
      <SectionHeader
        title="Popular Categories"
        action={<ViewCatalogButton />}
      />

      <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-4">
        {popularCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}
