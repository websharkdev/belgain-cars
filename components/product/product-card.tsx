'use client';

import type { ProductCardData } from '@/components/product/product-card.types';
import {
  ProductCardFooter,
  ProductDetails,
  ProductImage,
} from '@/components/product/product-card-parts';
import { Card } from '@/components/ui/card';

interface ProductCardProps {
  product: ProductCardData;
  className?: string;
  onAddToCart?: (product: ProductCardData) => void;
}

function ProductCard({ product, className, onAddToCart }: ProductCardProps) {
  return (
    <Card variant="product" className={className}>
      <ProductImage product={product} />
      <ProductDetails product={product} />
      <ProductCardFooter product={product} onAddToCart={onAddToCart} />
    </Card>
  );
}

export { ProductCard };
export type { ProductCardProps };
