import Image from 'next/image';
import { Package } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { Item, ItemMedia, ItemTitle } from '@/components/ui/item';
import type { CatalogProduct } from '@/components/layout/catalog/catalog-menu.types';

interface CatalogMenuProductCardProps {
  product: CatalogProduct;
}

function CatalogMenuProductCard({ product }: CatalogMenuProductCardProps) {
  return (
    <Item
      variant="outline"
      size="sm"
      asChild
      className="border-ink/5 hover:border-primary/20 h-auto w-64 gap-2.5 rounded-lg p-3 transition-all duration-200 ease-out hover:shadow-xs"
    >
      <Link href={product.href}>
        <ItemMedia
          variant="image"
          className="bg-muted/50 size-9 rounded-none transition-transform duration-200 ease-out group-hover/item:scale-105"
        >
          {product.image ? (
            <Image
              src={product.image}
              alt=""
              width={36}
              height={36}
              loading="lazy"
              className="size-9 object-contain"
            />
          ) : (
            <Package className="text-ink/30 size-5" strokeWidth={1.5} />
          )}
        </ItemMedia>
        <ItemTitle className="text-ink text-base leading-6 font-medium">
          {product.name}
        </ItemTitle>
      </Link>
    </Item>
  );
}

export { CatalogMenuProductCard };
