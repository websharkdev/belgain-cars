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
    <Skeleton className={cn('rounded-2xl bg-muted', className)}>
      {children}
    </Skeleton>
  );
}

function HeroSearchSkeleton() {
  return (
    <section className="gap-5 flex w-full flex-col items-start xl:flex-row">
      <div className="min-w-0 gap-5 xl:w-75.5 flex w-full flex-col xl:shrink-0">
        <div className="h-12 gap-1 bg-muted p-1 flex items-center rounded-full">
          <SkeletonPill className="h-10 flex-1 bg-card" />
          <SkeletonPill className="h-10 flex-1 bg-transparent" />
        </div>

        <div className="h-97 relative flex flex-col justify-between">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="relative">
              {index > 0 ? (
                <span
                  aria-hidden="true"
                  className="-top-5 left-6 h-5 w-px bg-ink-05 absolute"
                />
              ) : null}
              <SkeletonPill className="h-12 bg-muted w-full" />
            </div>
          ))}
        </div>
      </div>

      <SkeletonPanel className="min-h-114 rounded-3xl min-w-0 w-full flex-1" />
      <SkeletonPanel className="h-114 rounded-3xl xl:w-72 hidden w-full xl:block xl:shrink-0" />
    </section>
  );
}

function NewArrivalsSkeleton() {
  return (
    <section className="gap-5 flex w-full flex-col">
      <SkeletonPill className="h-7 w-40" />

      <div className="h-12 gap-2 bg-muted p-1 flex items-center overflow-hidden rounded-full">
        <SkeletonPill className="h-10 w-36 shrink-0 bg-card" />
        {NEW_ARRIVAL_TAB_SKELETON_WIDTHS.map((widthClassName, index) => (
          <SkeletonPill
            key={index}
            className={cn('h-10 shrink-0', widthClassName)}
          />
        ))}
      </div>

      <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonPanel
            key={index}
            className="h-87.5 rounded-2xl border-ink-10 bg-ink-05 border"
          />
        ))}
      </div>

      <div className="pt-2 flex justify-center">
        <SkeletonPill className="h-12 w-36 bg-muted" />
      </div>
    </section>
  );
}

function CategoryCardSkeleton() {
  return (
    <SkeletonPanel className="h-31.75 rounded-2xl relative overflow-visible">
      <Skeleton className="-top-3 size-20 bg-ink-05 absolute left-1/2 -translate-x-1/2 rounded-none" />
      <SkeletonPill className="bottom-6.75 h-4 w-36 absolute left-1/2 -translate-x-1/2" />
    </SkeletonPanel>
  );
}

function PopularCategoriesSkeleton() {
  return (
    <section className="gap-9 flex w-full flex-col overflow-hidden">
      <div className="gap-5 flex items-center justify-between">
        <SkeletonPill className="h-7 w-40" />
        <SkeletonPill className="h-12 w-36 bg-muted" />
      </div>

      <div className="gap-x-5 gap-y-8 grid grid-cols-2 sm:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <CategoryCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}

function ManufacturersSkeleton() {
  return (
    <section className="gap-6 flex w-full flex-col overflow-hidden">
      <SkeletonPill className="h-7 w-96 max-w-full" />

      <div className="gap-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <SkeletonPanel key={index} className="h-28 rounded-2xl" />
        ))}
      </div>
    </section>
  );
}

function WhyBcsSkeleton() {
  return (
    <section className="gap-6 pb-2 flex w-full flex-col overflow-hidden">
      <SkeletonPill className="h-7 w-64" />

      <div className="gap-5 flex w-full flex-col lg:flex-row">
        <SkeletonPanel className="h-79 rounded-2xl lg:w-103 relative overflow-hidden bg-card">
          <Skeleton className="-left-15.5 h-79 w-118.5 bg-ink-05 absolute top-0 rounded-none" />
          <SkeletonPill className="left-5 top-4 h-7 w-64 absolute" />
          <SkeletonPill className="left-5 top-12.5 h-7 w-40 absolute" />
        </SkeletonPanel>

        <div className="min-w-0 gap-5 grid flex-1 grid-cols-1 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonPanel
              key={index}
              className="h-37 gap-1.5 rounded-2xl px-5 py-4 flex flex-col"
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
      className="gap-14 px-5 py-14 max-w-319 mx-auto flex w-full flex-col items-stretch overflow-hidden xl:px-0"
    >
      <HeroSearchSkeleton />
      <NewArrivalsSkeleton />
      <PopularCategoriesSkeleton />
      <ManufacturersSkeleton />
      <WhyBcsSkeleton />
    </div>
  );
}
