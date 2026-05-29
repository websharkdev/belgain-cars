import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const NEW_ARRIVAL_TAB_SKELETON_WIDTHS = [
  'w-20',
  'w-36',
  'w-20',
  'w-36',
  'w-44',
  'w-36',
  'w-28',
];

function SkeletonPill({ className }: { className?: string }) {
  return <Skeleton className={cn('bg-ink-05 rounded-full', className)} />;
}

function SkeletonPanel({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Skeleton className={cn('bg-muted rounded-2xl', className)}>
      {children}
    </Skeleton>
  );
}

function HeroSearchSkeleton() {
  return (
    <section className="flex w-full flex-col items-start gap-5 xl:flex-row">
      <div className="flex w-full min-w-0 flex-col gap-5 xl:w-75.5 xl:shrink-0">
        <div className="bg-muted flex h-12 items-center gap-1 rounded-full p-1">
          <SkeletonPill className="bg-card h-10 flex-1" />
          <SkeletonPill className="h-10 flex-1 bg-transparent" />
        </div>

        <div className="relative flex h-97 flex-col justify-between">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="relative">
              {index > 0 ? (
                <span
                  aria-hidden="true"
                  className="bg-ink-05 absolute -top-5 left-6 h-5 w-px"
                />
              ) : null}
              <SkeletonPill className="bg-muted h-12 w-full" />
            </div>
          ))}
        </div>
      </div>

      <SkeletonPanel className="min-h-114 w-full min-w-0 flex-1 rounded-3xl" />
      <SkeletonPanel className="hidden h-114 w-full rounded-3xl xl:block xl:w-72 xl:shrink-0" />
    </section>
  );
}

function NewArrivalsSkeleton() {
  return (
    <section className="flex w-full flex-col gap-5">
      <SkeletonPill className="h-7 w-40" />

      <div className="bg-muted flex h-12 items-center gap-2 overflow-hidden rounded-full p-1">
        <SkeletonPill className="bg-card h-10 w-36 shrink-0" />
        {NEW_ARRIVAL_TAB_SKELETON_WIDTHS.map((widthClassName, index) => (
          <SkeletonPill
            key={index}
            className={cn('h-10 shrink-0', widthClassName)}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonPanel
            key={index}
            className="border-ink-10 bg-ink-05 h-87.5 rounded-2xl border"
          />
        ))}
      </div>

      <div className="flex justify-center pt-2">
        <SkeletonPill className="bg-muted h-12 w-36" />
      </div>
    </section>
  );
}

function CategoryCardSkeleton() {
  return (
    <SkeletonPanel className="relative h-31.75 overflow-visible rounded-2xl">
      <Skeleton className="bg-ink-05 absolute -top-3 left-1/2 size-20 -translate-x-1/2 rounded-none" />
      <SkeletonPill className="absolute bottom-6.75 left-1/2 h-4 w-36 -translate-x-1/2" />
    </SkeletonPanel>
  );
}

function PopularCategoriesSkeleton() {
  return (
    <section className="flex w-full flex-col gap-9 overflow-hidden">
      <div className="flex items-center justify-between gap-5">
        <SkeletonPill className="h-7 w-40" />
        <SkeletonPill className="bg-muted h-12 w-36" />
      </div>

      <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <CategoryCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}

function ManufacturersSkeleton() {
  return (
    <section className="flex w-full flex-col gap-6 overflow-hidden">
      <SkeletonPill className="h-7 w-96 max-w-full" />

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <SkeletonPanel key={index} className="h-28 rounded-2xl" />
        ))}
      </div>
    </section>
  );
}

function WhyBcsSkeleton() {
  return (
    <section className="flex w-full flex-col gap-6 overflow-hidden pb-2">
      <SkeletonPill className="h-7 w-64" />

      <div className="flex w-full flex-col gap-5 lg:flex-row">
        <SkeletonPanel className="bg-card relative h-79 overflow-hidden rounded-2xl lg:w-103">
          <Skeleton className="bg-ink-05 absolute top-0 -left-15.5 h-79 w-118.5 rounded-none" />
          <SkeletonPill className="absolute top-4 left-5 h-7 w-64" />
          <SkeletonPill className="absolute top-12.5 left-5 h-7 w-40" />
        </SkeletonPanel>

        <div className="grid min-w-0 flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonPanel
              key={index}
              className="flex h-37 flex-col gap-1.5 rounded-2xl px-5 py-4"
            >
              <SkeletonPill className="h-7 w-64 max-w-full" />
              <SkeletonPill className="h-7 w-40" />
            </SkeletonPanel>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Loading() {
  return (
    <div
      aria-label="Loading home page"
      className="mx-auto flex w-full max-w-319 flex-col items-stretch gap-14 overflow-hidden px-5 py-14 xl:px-0"
    >
      <HeroSearchSkeleton />
      <NewArrivalsSkeleton />
      <PopularCategoriesSkeleton />
      <ManufacturersSkeleton />
      <WhyBcsSkeleton />
    </div>
  );
}
