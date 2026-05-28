'use client';

import { ManufacturerCard } from '@/components/homepage/manufacturer-card';
import { SectionHeader } from '@/components/homepage/section-header';
import { popularManufacturers } from '@/data/homepage';

export function PopularManufacturers() {
  return (
    <section className="flex w-full flex-col gap-6">
      <SectionHeader title="Popular Manufacturers" />

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {popularManufacturers.map((manufacturer) => (
          <ManufacturerCard key={manufacturer.id} manufacturer={manufacturer} />
        ))}
      </div>
    </section>
  );
}
