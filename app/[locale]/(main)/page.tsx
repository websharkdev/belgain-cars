import { Filters } from '@/components/homepage/filters';
import { HeroSlider } from '@/components/homepage/hero-slider';
import { NewArrivals } from '@/components/homepage/new-arrivals';
import { PopularCategories } from '@/components/homepage/popular-categories';
import { PopularManufacturers } from '@/components/homepage/popular-manufactures';
import { PromoCard } from '@/components/homepage/promo-card';
import { WhyBcs } from '@/components/homepage/why-bcs';
import { pageContainerClassName } from '@/components/layout/page-container';
import { cn } from '@/lib/utils';

export default function HomePage() {
  return (
    <div
      className={cn(
        pageContainerClassName,
        'flex flex-col items-stretch gap-14 py-14',
      )}
    >
      <div className="grid w-full grid-cols-1 items-center gap-5 xl:grid-cols-12">
        <Filters />
        <HeroSlider />
        <PromoCard />
      </div>

      <NewArrivals />
      <PopularCategories />
      <PopularManufacturers />
      <WhyBcs />
    </div>
  );
}
