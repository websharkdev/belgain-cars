'use client';

import * as React from 'react';
import { Check, Clock3, Search, ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  popularSearchCategories,
  recentSearches,
  searchMockProducts,
  type BatteryArtVariant,
  type ProductAvailability,
  type SearchSuggestionProduct,
  type SearchSuggestionTag,
} from '@/data/search';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

interface SearchSuggestionMenuProps {
  id: string;
  open: boolean;
  query: string;
  onRequestClose?: () => void;
}

const batteryArtVariants = {
  shell: {
    bosch: 'w-42 -rotate-12 bg-white shadow-[0_18px_35px_rgba(2,10,21,0.16)]',
    exide:
      'w-46 -rotate-6 bg-[#151a22] shadow-[0_18px_32px_rgba(2,10,21,0.22)]',
    topla: 'w-42 bg-[#17191c] shadow-[0_18px_32px_rgba(2,10,21,0.2)]',
  },
  top: {
    bosch: 'bg-[#eceff2]',
    exide: 'bg-[#222831]',
    topla: 'bg-[#17418f]',
  },
  label: {
    bosch: 'from-[#f7f8fa] via-white to-[#e7ebef] text-[#e00012]',
    exide: 'from-[#243f76] via-[#2c62b7] to-[#1d376b] text-white',
    topla: 'from-[#2a72bd] via-[#1b4f95] to-[#123464] text-white',
  },
  base: {
    bosch: 'bg-[#d9dde2]',
    exide: 'bg-[#0d1117]',
    topla: 'bg-[#111317]',
  },
} satisfies Record<string, Record<BatteryArtVariant, string>>;

const badgeToneVariants = {
  new: 'bg-primary/10 text-primary',
  discount: 'bg-danger/10 text-danger',
} satisfies Record<SearchSuggestionTag['tone'], string>;

const availabilityVariants = {
  order: {
    text: 'text-primary',
    icon: 'border-primary text-primary',
    iconNode: Clock3,
  },
  stock: {
    text: 'text-success',
    icon: 'border-success text-success',
    iconNode: Check,
  },
} satisfies Record<
  ProductAvailability,
  {
    text: string;
    icon: string;
    iconNode: React.ElementType;
  }
>;

const priceToneVariants = {
  default: 'text-ink',
  discount: 'text-danger',
} satisfies Record<'default' | 'discount', string>;

function SidebarSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-ink text-base leading-6 font-medium">{title}</h2>
      {children}
    </section>
  );
}

function RecentSearches({ onRequestClose }: { onRequestClose?: () => void }) {
  return (
    <div className="flex flex-col gap-2">
      {recentSearches.map((search) => (
        <Link
          key={search}
          href={`/?q=${encodeURIComponent(search)}`}
          className="text-ink hover:text-primary flex min-h-6 items-center gap-2.5 text-base leading-6 transition-colors"
          onClick={onRequestClose}
        >
          <Search className="text-ink-40 size-4 shrink-0" strokeWidth={1.8} />
          <span className="truncate">{search}</span>
        </Link>
      ))}
    </div>
  );
}

function PopularCategories({
  onRequestClose,
}: {
  onRequestClose?: () => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {popularSearchCategories.map((category) => (
        <Link
          key={category}
          href={`/catalog/${category
            .toLowerCase()
            .replace(/&/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')}`}
          className="text-ink hover:text-primary min-h-6 truncate text-base leading-6 transition-colors"
          onClick={onRequestClose}
        >
          {category}
        </Link>
      ))}
    </div>
  );
}

function BatteryProductArt({ variant }: { variant: BatteryArtVariant }) {
  const brandLabel = {
    bosch: 'BOSCH',
    exide: 'EXIDE',
    topla: 'topla',
  } satisfies Record<BatteryArtVariant, string>;

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div
        aria-hidden
        className={cn(
          'border-ink/10 relative h-25 overflow-hidden rounded-[4px] border',
          batteryArtVariants.shell[variant],
        )}
      >
        <div
          className={cn(
            'absolute inset-x-0 top-0 h-4',
            batteryArtVariants.top[variant],
          )}
        />
        <div className="bg-danger absolute top-1.5 right-4 size-3 rounded-full shadow-sm" />
        <div className="bg-ink/80 absolute top-1.5 left-4 size-3 rounded-full shadow-sm" />
        <div
          className={cn(
            'absolute top-8 right-5 left-5 flex h-10 items-center justify-center rounded-[3px] bg-linear-to-br px-3 text-lg leading-none font-black tracking-normal',
            batteryArtVariants.label[variant],
          )}
        >
          {brandLabel[variant]}
        </div>
        <div
          className={cn(
            'absolute inset-x-0 bottom-0 h-5',
            batteryArtVariants.base[variant],
          )}
        />
        <div className="absolute right-4 bottom-1.5 left-4 flex justify-between">
          {Array.from({ length: 5 }, (_, index) => (
            <span key={index} className="h-2 w-5 rounded-[2px] bg-white/20" />
          ))}
        </div>
      </div>
      <div className="bg-ink/10 absolute bottom-8 h-5 w-44 rounded-full blur-xl" />
    </div>
  );
}

function ProductTags({ tags }: { tags?: SearchSuggestionProduct['tags'] }) {
  if (!tags?.length) return null;

  return (
    <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5">
      {tags.map((tag) => (
        <Badge
          key={tag.label}
          className={cn(
            'h-6.5 rounded-full px-2.75 text-xs font-medium',
            badgeToneVariants[tag.tone],
          )}
        >
          {tag.label}
        </Badge>
      ))}
    </div>
  );
}

function ProductAvailability({
  availability,
}: {
  availability: SearchSuggestionProduct['availability'];
}) {
  const variant = availabilityVariants[availability.kind];
  const Icon = variant.iconNode;

  return (
    <div className="flex min-w-0 items-center gap-1.5">
      <span
        className={cn(
          'flex size-3.5 shrink-0 items-center justify-center rounded-full border',
          variant.icon,
        )}
      >
        <Icon className="size-2.5" strokeWidth={2} />
      </span>
      <span className={cn('text-3.25 truncate leading-5', variant.text)}>
        {availability.label}
      </span>
    </div>
  );
}

function SearchProductCard({
  product,
  matches,
  onRequestClose,
}: {
  product: SearchSuggestionProduct;
  matches?: ReturnType<typeof searchMockProducts>[number]['matches'];
  onRequestClose?: () => void;
}) {
  const priceTone = product.oldPrice ? 'discount' : 'default';
  const visibleMatches = matches?.slice(0, 3) ?? [];

  return (
    <article className="group/product border-ink-08 bg-card hover:border-primary/20 flex min-w-0 flex-col overflow-hidden rounded-2xl border transition-all duration-200 hover:shadow-xs">
      <Link
        href={product.href}
        className="bg-card relative flex h-59.75 items-center justify-center"
        onClick={onRequestClose}
      >
        <ProductTags tags={product.tags} />
        <BatteryProductArt variant={product.art} />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-2 px-4 pb-4">
        <div className="text-3.25 flex min-w-0 items-center justify-between gap-4 leading-5">
          <Link
            href={`/catalog/brand/${product.brand.toLowerCase()}`}
            className="text-primary truncate font-medium"
            onClick={onRequestClose}
          >
            {product.brand}
          </Link>
          <div className="text-ink-40 flex shrink-0 items-center gap-1">
            <span>SKU:</span>
            <span className="font-medium">{product.sku}</span>
          </div>
        </div>

        <Link
          href={product.href}
          className="text-3.75 text-ink hover:text-primary line-clamp-2 min-h-11.5 leading-5.5 font-medium transition-colors"
          onClick={onRequestClose}
        >
          {product.title}
        </Link>

        {visibleMatches.length > 0 ? (
          <div className="flex min-w-0 flex-wrap gap-1.5">
            {visibleMatches.map((match) => (
              <span
                key={`${match.label}-${match.value}`}
                className="bg-primary/8 text-primary rounded-full px-2 py-0.5 text-[11px] leading-4 font-medium"
              >
                {match.label}: {match.value}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-auto flex items-end justify-between gap-3">
          <div className="flex min-w-0 flex-col gap-0.5">
            <div className="flex min-w-0 items-baseline gap-1.5">
              <span
                className={cn(
                  'text-lg leading-7 font-semibold',
                  priceToneVariants[priceTone],
                )}
              >
                {product.price}
              </span>
              {product.oldPrice ? (
                <span className="text-3.25 text-ink-40 truncate leading-5 font-medium line-through">
                  {product.oldPrice}
                </span>
              ) : null}
            </div>
            <ProductAvailability availability={product.availability} />
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon-lg"
            className="rounded-2.5 bg-muted hover:bg-ink-06 size-12 shrink-0 border-0"
            aria-label={`Add ${product.title} to cart`}
          >
            <ShoppingCart className="text-ink size-5.5" strokeWidth={1.8} />
          </Button>
        </div>
      </div>
    </article>
  );
}

function SearchSuggestionMenu({
  id,
  open,
  query,
  onRequestClose,
}: SearchSuggestionMenuProps) {
  const searchResults = React.useMemo(() => searchMockProducts(query), [query]);
  const hasQuery = query.trim().length >= 2;

  if (!open) return null;

  return (
    <div
      id={id}
      role="region"
      aria-label="Search suggestions"
      className={cn(
        'bg-popover text-popover-foreground absolute top-full right-5 left-5 z-50 max-h-[calc(100vh-5.5rem)] overflow-hidden rounded-b-3xl',
        'ring-ink/5 animate-in fade-in-0 zoom-in-98 ring-1 duration-150',
      )}
    >
      <div className="bg-popover flex min-w-0 flex-col overflow-auto rounded-b-3xl md:flex-row">
        <aside className="border-ink-08 flex w-full shrink-0 flex-col gap-5 border-b p-5 md:w-77.5 md:border-r md:border-b-0">
          <SidebarSection title="Recent searches">
            <RecentSearches onRequestClose={onRequestClose} />
          </SidebarSection>

          <div className="bg-ink-08 h-px w-full" />

          <SidebarSection title="Popular categories">
            <PopularCategories onRequestClose={onRequestClose} />
          </SidebarSection>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col gap-3 p-5">
          <div className="flex min-w-0 items-start justify-between gap-4">
            <div className="flex min-w-0 flex-col gap-1">
              <h2 className="text-ink text-xl leading-6 font-medium">
                {hasQuery
                  ? `Search results for “${query.trim()}”`
                  : 'Popular products'}
              </h2>
              <p className="text-ink-60 text-sm leading-5">
                Try VIN, product number, EAN, OE or tyre size. Example: 359526,
                4047023479564, TE077, 215/65R15.
              </p>
            </div>
            {hasQuery ? (
              <span className="text-ink-60 shrink-0 text-sm leading-5">
                {searchResults.length} found
              </span>
            ) : null}
          </div>

          {searchResults.length > 0 ? (
            <div className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-3">
              {searchResults.map(({ product, matches }) => (
                <SearchProductCard
                  key={product.id}
                  product={product}
                  matches={matches}
                  onRequestClose={onRequestClose}
                />
              ))}
            </div>
          ) : (
            <div className="border-ink-08 bg-muted/50 flex min-h-59.75 flex-col items-center justify-center rounded-2xl border p-8 text-center">
              <h3 className="text-ink text-lg font-medium">
                No mock matches yet
              </h3>
              <p className="text-ink-60 mt-2 max-w-120 text-sm leading-5">
                This demo searches local mock data by VIN, product number, EAN,
                OE and tyre size.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export { SearchSuggestionMenu };
