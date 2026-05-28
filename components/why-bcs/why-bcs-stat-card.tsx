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
        <CardTitle className="text-8 leading-9.5 text-danger font-semibold">
          {stat.metric}
        </CardTitle>
        <CardDescription className="text-base leading-6 text-ink font-medium">
          {stat.title}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-0">
        <CardDescription className="text-sm leading-5.25 text-ink-40">
          {stat.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

export { WhyBcsStatCard };
export type { WhyBcsStatCardProps };
