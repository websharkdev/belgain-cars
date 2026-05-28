'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { oilPromo, type PromoCardData } from '@/data/homepage';

function PromoBadge({ children }: { children: string }) {
  return (
    <Button
      variant="secondary"
      size="xs"
      className="relative z-10 h-6.5 w-fit rounded-full px-2.75 text-xs font-medium text-danger"
    >
      {children}
    </Button>
  );
}

function PromoContent({ promo }: { promo: PromoCardData }) {
  return (
    <CardContent className="relative z-10 px-5.5 pt-0">
      <CardTitle className="max-w-66 text-7 font-medium leading-8.5 text-ink">
        {promo.title}
      </CardTitle>
      <CardDescription className="text-base text-ink-60">
        {promo.subtitle}
      </CardDescription>
    </CardContent>
  );
}

function PromoImage({ promo }: { promo: PromoCardData }) {
  return (
    <Image
      src={promo.image}
      alt=""
      width={320}
      height={320}
      loading="eager"
      sizes="(min-width: 1280px) 25vw, 100vw"
      className="pointer-events-none absolute bottom-0 right-0 z-0 h-auto w-[95%] object-contain object-bottom-right mix-blend-darken"
    />
  );
}

export function PromoCard() {
  return (
    <Card variant="promo">
      <PromoImage promo={oilPromo} />

      <CardHeader className="px-6 pt-6">
        <PromoBadge>{oilPromo.badge}</PromoBadge>
      </CardHeader>

      <PromoContent promo={oilPromo} />

      <CardFooter className="relative z-10 mt-auto border-0 bg-transparent px-6 pb-6">
        <Button variant="pillDanger" className="h-10.5 px-5 text-sm font-medium">
          {oilPromo.ctaLabel}
        </Button>
      </CardFooter>
    </Card>
  );
}
