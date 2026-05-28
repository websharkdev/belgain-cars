'use client';

import Image from 'next/image';
import { Check, ShoppingBag } from 'lucide-react';
import {
  DEFAULT_PRODUCT_CARD_IMAGE,
  type ProductCardData,
  type ProductCardSpec,
  type ProductCardTag,
} from '@/components/product/product-card.types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Item, ItemContent, ItemDescription, ItemMedia } from '@/components/ui/item';
import { cn } from '@/lib/utils';

function ProductBadges({ tags }: { tags?: ProductCardTag[] }) {
  if (!tags?.length) return null;

  return (
    <div className="absolute left-4 top-4 flex flex-row gap-1.5">
      {tags.map((tag) => (
        <Badge
          key={tag.label}
          variant={tag.discount ? 'discount' : 'secondary'}
          className="h-6.5 rounded-full px-2.75 text-xs font-medium"
        >
          {tag.label}
        </Badge>
      ))}
    </div>
  );
}

export function ProductImage({ product }: { product: ProductCardData }) {
  return (
    <CardHeader className="relative flex h-59.75 items-center justify-center px-0 pb-0">
      <div className="relative h-[70%] w-[70%]">
        <Image
          src={product.image ?? DEFAULT_PRODUCT_CARD_IMAGE}
          alt={product.title}
          fill
          sizes="180px"
          loading="lazy"
          className="pointer-events-none object-contain"
        />
      </div>
      <ProductBadges tags={product.tags} />
    </CardHeader>
  );
}

function ProductMeta({ product }: { product: ProductCardData }) {
  return (
    <div className="flex flex-row items-center justify-between text-3.25">
      <span className="font-medium text-primary">{product.brand}</span>
      <CardDescription className="flex flex-row gap-1 text-3.25">
        <span>SKU</span>
        <span className="font-medium text-ink-40">{product.sku}</span>
      </CardDescription>
    </div>
  );
}

function ProductSpecs({ specs }: { specs: ProductCardSpec[] }) {
  return (
    <div className="flex flex-col gap-0.5 text-3.25 text-ink-40">
      {specs.map((spec) => (
        <CardDescription key={`${spec.label}-${spec.value}`} className="text-3.25 text-ink-40">
          <span>{spec.label} </span>
          <span className="font-medium">{spec.value}</span>
        </CardDescription>
      ))}
    </div>
  );
}

export function ProductDetails({ product }: { product: ProductCardData }) {
  return (
    <CardContent className="flex flex-col gap-2 px-4 pt-0">
      <ProductMeta product={product} />
      <CardTitle className="min-h-11.5 line-clamp-2 text-3.75 font-medium leading-5.5">
        {product.title}
      </CardTitle>
      <ProductSpecs specs={product.specs} />
    </CardContent>
  );
}

function StockBadge() {
  return (
    <Item size="xs" variant="default" className="w-auto gap-1.5 border-0 p-0">
      <ItemMedia variant="icon" className="size-3.5 rounded-full border border-success text-success">
        <Check className="size-2.5" />
      </ItemMedia>
      <ItemContent className="gap-0">
        <ItemDescription className="line-clamp-1 text-3.25 text-success">In stock</ItemDescription>
      </ItemContent>
    </Item>
  );
}

function ProductPrice({ product }: { product: ProductCardData }) {
  const hasDiscount = Boolean(product.oldPrice);

  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex flex-row items-center gap-1.5">
        <span className={cn('text-lg font-semibold', hasDiscount ? 'text-danger' : 'text-ink')}>
          {product.price}
        </span>
        {product.oldPrice ? (
          <span className="text-3.25 font-medium text-ink-40 line-through">{product.oldPrice}</span>
        ) : null}
      </div>
      <StockBadge />
    </div>
  );
}

function AddToCartButton({ onClick }: { onClick?: () => void }) {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon-lg"
      aria-label="Add to cart"
      className="size-12 rounded-2.5 border-0 bg-muted hover:bg-ink-06"
      onClick={onClick}
    >
      <ShoppingBag className="size-5.5" />
    </Button>
  );
}

export function ProductCardFooter({
  product,
  onAddToCart,
}: {
  product: ProductCardData;
  onAddToCart?: (product: ProductCardData) => void;
}) {
  return (
    <CardFooter className="items-end justify-between border-0 bg-transparent px-4 pb-4 pt-0">
      <ProductPrice product={product} />
      <AddToCartButton onClick={() => onAddToCart?.(product)} />
    </CardFooter>
  );
}
