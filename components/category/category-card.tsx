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
      <CardHeader className="h-19 px-0 absolute -top-1/6 left-1/2 mx-auto flex w-full -translate-x-1/2 items-center justify-center">
        <Image
          src={imageSrc}
          alt={category.title}
          fill
          sizes="76px"
          loading="lazy"
          className="pointer-events-none object-contain"
        />
      </CardHeader>

      <CardContent className="px-5 pb-5 pt-18.5 flex h-max items-end justify-center">
        <CardTitle className="text-3.75 leading-5.5 text-center font-normal">
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
        className="focus-visible:ring-ring/50 rounded-2xl block focus-visible:ring-3 focus-visible:outline-none"
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
