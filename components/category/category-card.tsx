'use client';

import Image from 'next/image';
import {
  DEFAULT_CATEGORY_CARD_IMAGE,
  type CategoryCardData,
} from '@/components/category/category-card.types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@/i18n/routing';

interface CategoryCardProps {
  category: CategoryCardData;
  className?: string;
}

function CategoryCardContent({ category }: { category: CategoryCardData }) {
  const imageSrc = category.image ?? DEFAULT_CATEGORY_CARD_IMAGE;

  return (
    <>
      <CardHeader className="absolute -top-1/6 left-1/2 mx-auto flex h-19 w-full -translate-x-1/2 items-center justify-center px-0">
        <Image
          src={imageSrc}
          alt={category.title}
          fill
          sizes="76px"
          loading="lazy"
          className="pointer-events-none object-contain"
        />
      </CardHeader>

      <CardContent className="flex h-max items-end justify-center px-5 pt-18.5 pb-5">
        <CardTitle className="text-3.75 text-center leading-5.5 font-normal">
          {category.title}
        </CardTitle>
      </CardContent>
    </>
  );
}

function CategoryCard({ category, className }: CategoryCardProps) {
  const cardClassName = className;

  if (category.href) {
    return (
      <Link
        href={category.href}
        className="focus-visible:ring-ring/50 block rounded-2xl focus-visible:ring-3 focus-visible:outline-none"
      >
        <Card variant="category" className={cardClassName}>
          <CategoryCardContent category={category} />
        </Card>
      </Link>
    );
  }

  return (
    <Card variant="category" className={cardClassName}>
      <CategoryCardContent category={category} />
    </Card>
  );
}

export { CategoryCard };
export type { CategoryCardProps };
