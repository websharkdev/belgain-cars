'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { NewArrivalsCategoryTabs } from '@/components/homepage/new-arrivals-category-tabs';
import { ProductGrid } from '@/components/homepage/product-grid';
import { SectionHeader } from '@/components/homepage/section-header';
import { Button } from '@/components/ui/button';
import { Tabs } from '@/components/ui/tabs';
import { newArrivalCategoryTabs, newArrivalProducts } from '@/data/homepage';
import { EASE_AWWWARDS } from '@/lib/animations.lib';

function ShowMoreButton() {
  return (
    <Button
      variant="outline"
      className="border-ink-08 bg-muted text-ink hover:bg-ink-06 h-12 rounded-full pr-4 pl-5 text-base font-medium"
    >
      Show more
      <ChevronDown className="text-ink-40 size-4.5" data-icon="inline-end" />
    </Button>
  );
}

export function NewArrivals() {
  const [activeTab, setActiveTab] = React.useState('arrivals');
  const activeProducts = React.useMemo(
    () =>
      activeTab === 'arrivals'
        ? newArrivalProducts
        : [...newArrivalProducts].reverse(),
    [activeTab],
  );

  return (
    <section className="flex w-full flex-col gap-6">
      <SectionHeader title="New Arrivals" />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="gap-5">
        <NewArrivalsCategoryTabs
          tabs={newArrivalCategoryTabs}
          activeTab={activeTab}
        />

        <div className="relative w-full overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: '8px' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '-4px' }}
              transition={{ duration: 0.24, ease: EASE_AWWWARDS }}
            >
              <ProductGrid products={activeProducts} />
            </motion.div>
          </AnimatePresence>
        </div>
      </Tabs>

      <div className="flex w-full justify-center">
        <ShowMoreButton />
      </div>
    </section>
  );
}
