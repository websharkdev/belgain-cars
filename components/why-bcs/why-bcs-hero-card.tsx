import Image from 'next/image';
import {
  DEFAULT_WHY_BCS_HERO_IMAGE,
  type WhyBcsHeroCardData,
} from '@/components/why-bcs/why-bcs-hero-card.types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface WhyBcsHeroCardProps {
  data: WhyBcsHeroCardData;
  className?: string;
}

function WhyBcsHeroCard({ data, className }: WhyBcsHeroCardProps) {
  const imageSrc = data.image ?? DEFAULT_WHY_BCS_HERO_IMAGE;

  return (
    <Card
      className={cn(
        'relative h-79 w-full max-w-103 shrink-0 gap-0 overflow-hidden rounded-2xl border-0 py-0 ring-0',
        className,
      )}
    >
      <div className="absolute top-0 right-0 h-79 w-118.5">
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="474px"
          className="object-cover"
        />
      </div>

      <p className="text-8 absolute top-4 left-5 z-10 w-87.5 leading-9.5 font-semibold text-white">
        {data.metric}
      </p>

      <p className="absolute top-15 left-5 z-10 w-87.5 text-base leading-6 font-medium text-white">
        {data.subtitle}
      </p>

      <p className="absolute top-22.5 left-5 z-10 w-87.5 text-sm leading-5.25 text-white/80">
        {data.description}
      </p>

      <Button
        variant="pillSurface"
        className="absolute top-63.5 left-5 z-10 h-10.5 w-27.25 px-5 py-2.75 text-sm leading-5 font-medium"
      >
        {data.buttonLabel ?? 'Shop Now'}
      </Button>
    </Card>
  );
}

export { WhyBcsHeroCard };
export type { WhyBcsHeroCardProps };
