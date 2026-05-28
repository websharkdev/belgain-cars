export interface VehicleLookupResult {
  vin: string;
  make: string;
  model: string;
  year: string;
}

export const mockVehiclesByVin: Record<string, VehicleLookupResult> = {
  WAUZZZF43NA000001: {
    vin: 'WAUZZZF43NA000001',
    make: 'Audi',
    model: 'A4',
    year: '2024',
  },
  WBA5R110X0FK00001: {
    vin: 'WBA5R110X0FK00001',
    make: 'BMW',
    model: '3 Series',
    year: '2023',
  },
  W1K2060041F000001: {
    vin: 'W1K2060041F000001',
    make: 'Mercedes-Benz',
    model: 'C-Class',
    year: '2022',
  },
};

export function findMockVehicleByVin(vin: string) {
  return mockVehiclesByVin[vin.toUpperCase()] ?? null;
}
