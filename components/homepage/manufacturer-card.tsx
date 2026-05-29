import type { ManufacturerData } from '@/data/homepage';
import { Card, CardContent } from '@/components/ui/card';

function ManufacturerLogo({
  label,
  color = 'var(--foreground)',
}: Pick<ManufacturerData, 'label' | 'color'>) {
  return (
    <span
      className="text-center text-lg font-bold tracking-wide"
      style={{ color }}
    >
      {label}
    </span>
  );
}

interface ManufacturerCardProps {
  manufacturer: ManufacturerData;
}

export function ManufacturerCard({ manufacturer }: ManufacturerCardProps) {
  return (
    <Card
      title={manufacturer.name}
      className="bg-muted hover:bg-background h-28 items-center justify-center rounded-2xl border-0 py-7.75 ring-0"
    >
      <CardContent className="flex h-12 w-24 items-center justify-center px-12.5">
        <ManufacturerLogo
          label={manufacturer.label}
          color={manufacturer.color}
        />
      </CardContent>
    </Card>
  );
}
