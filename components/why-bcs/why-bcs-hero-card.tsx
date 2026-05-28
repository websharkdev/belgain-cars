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
        'h-79 max-w-103 gap-0 rounded-2xl py-0 relative w-full shrink-0 overflow-hidden border-0 ring-0',
        className,
      )}
    >
      <div className="top-0 right-0 h-79 w-118.5 absolute">
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="474px"
          className="object-cover"
        />
      </div>

      <p className="left-5 top-4 w-87.5 text-8 leading-9.5 absolute z-10 font-semibold text-white">
        {data.metric}
      </p>

      <p className="left-5 top-15 w-87.5 text-base leading-6 absolute z-10 font-medium text-white">
        {data.subtitle}
      </p>

      <p className="left-5 top-22.5 w-87.5 text-sm leading-5.25 absolute z-10 text-white/80">
        {data.description}
      </p>

      <Button
        variant="pillSurface"
        className="left-5 top-63.5 h-10.5 w-27.25 px-5 py-2.75 text-sm leading-5 absolute z-10 font-medium"
      >
        {data.buttonLabel ?? 'Shop Now'}
      </Button>
    </Card>
  );
}

export { WhyBcsHeroCard };
export type { WhyBcsHeroCardProps };
