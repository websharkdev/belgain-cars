import type { WhyBcsStatCardData } from '@/components/why-bcs/why-bcs-stat-card.types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface WhyBcsStatCardProps {
  stat: WhyBcsStatCardData;
  className?: string;
}

function WhyBcsStatCard({ stat, className }: WhyBcsStatCardProps) {
  return (
    <Card variant="stat" className={className}>
      <CardHeader className="gap-1.5 px-0">
        <CardTitle className="text-8 text-danger leading-9.5 font-semibold">
          {stat.metric}
        </CardTitle>
        <CardDescription className="text-ink text-base leading-6 font-medium">
          {stat.title}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-0">
        <CardDescription className="text-ink-40 text-sm leading-5.25">
          {stat.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

export { WhyBcsStatCard };
export type { WhyBcsStatCardProps };
