'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { VinSearchInput } from '@/components/vin-search/vin-search-input';
import {
  findMockVehicleByVin,
  type VehicleLookupResult,
} from '@/data/vehicle-lookup';
import { vinSearchSchema } from '@/schemas/search.schema';

function VehicleResult({ vehicle }: { vehicle: VehicleLookupResult }) {
  return (
    <div className="rounded-xl bg-success/10 px-3.5 py-2.5 text-3.25 leading-4.5 text-success w-full text-center">
      {vehicle.year} {vehicle.make} {vehicle.model}
    </div>
  );
}

function VinSearchPanel() {
  const [vinCode, setVinCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [vehicle, setVehicle] = useState<VehicleLookupResult | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = vinSearchSchema.safeParse({ vin: vinCode });

    if (!parsed.success) {
      setVehicle(null);
      setError(
        parsed.error.issues[0]?.message ?? 'Enter a valid plate or VIN.',
      );
      return;
    }

    const foundVehicle = findMockVehicleByVin(parsed.data.vin);

    if (!foundVehicle) {
      setVehicle(null);
      setError('No vehicle found for this VIN');
      setVinCode(parsed.data.vin);
      return;
    }

    setError(null);
    setVehicle(foundVehicle);
    setVinCode(parsed.data.vin);
  };

  return (
    <div className="min-h-0 gap-5 flex h-full w-full flex-1 flex-col">
      <form
        className="gap-3 rounded-2xl border-ink-08 p-4 flex flex-col items-center justify-center border"
        onSubmit={handleSubmit}
      >
        <VinSearchInput
          value={vinCode}
          onChange={(value) => {
            setVinCode(value.toUpperCase());
            setError(null);
            setVehicle(null);
          }}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'vin-search-error' : undefined}
        />
        {error ? (
          <p
            id="vin-search-error"
            className="text-3.25 leading-4.5 text-danger text-center"
          >
            {error}
          </p>
        ) : null}
        {vehicle ? <VehicleResult vehicle={vehicle} /> : null}
        <Button
          type="submit"
          variant="link"
          className="h-6 self-center p-0 text-base hover:no-underline"
        >
          Identify Vehicle
        </Button>
      </form>

      <Image
        src="/images/vin-search.webp"
        alt="VIN location guide"
        width={331}
        height={246}
        className="h-61.5 w-82.75 mx-auto object-contain"
        loading="lazy"
        sizes="(min-width: 1280px) 25vw, 100vw"
      />
    </div>
  );
}

export { VinSearchPanel };
