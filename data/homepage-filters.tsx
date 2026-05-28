import { Calendar, Car, Compass, Copy, Layers, Zap } from 'lucide-react';
import type { ReactNode } from 'react';

export interface VehicleFilterOption {
  label: string;
  value: string;
}

export interface VehicleFilterData {
  id: string;
  icon: ReactNode;
  placeholder: string;
  options: VehicleFilterOption[];
}

export const vehicleFilters: VehicleFilterData[] = [
  {
    id: 'make',
    icon: <Compass className="size-5" />,
    placeholder: 'Car make',
    options: [
      { label: 'Audi', value: 'audi' },
      { label: 'BMW', value: 'bmw' },
      { label: 'Mercedes-Benz', value: 'mercedes-benz' },
      { label: 'Volkswagen', value: 'volkswagen' },
    ],
  },
  {
    id: 'model',
    icon: <Car className="size-5" />,
    placeholder: 'Car model',
    options: [
      { label: 'A4', value: 'a4' },
      { label: '3 Series', value: '3-series' },
      { label: 'C-Class', value: 'c-class' },
      { label: 'Golf', value: 'golf' },
    ],
  },
  {
    id: 'year',
    icon: <Calendar className="size-5" />,
    placeholder: 'Year',
    options: [
      { label: '2024', value: '2024' },
      { label: '2023', value: '2023' },
      { label: '2022', value: '2022' },
      { label: '2021', value: '2021' },
    ],
  },
  {
    id: 'bodyStyle',
    icon: <Copy className="size-4" />,
    placeholder: 'Body style',
    options: [
      { label: 'Sedan', value: 'sedan' },
      { label: 'Hatchback', value: 'hatchback' },
      { label: 'SUV', value: 'suv' },
      { label: 'Wagon', value: 'wagon' },
    ],
  },
  {
    id: 'engine',
    icon: <Zap className="size-5" />,
    placeholder: 'Engine',
    options: [
      { label: '1.6 Petrol', value: '1-6-petrol' },
      { label: '2.0 Diesel', value: '2-0-diesel' },
      { label: 'Hybrid', value: 'hybrid' },
      { label: 'Electric', value: 'electric' },
    ],
  },
  {
    id: 'trim',
    icon: <Layers className="size-5" />,
    placeholder: 'Trim level',
    options: [
      { label: 'Base', value: 'base' },
      { label: 'Comfort', value: 'comfort' },
      { label: 'Sport', value: 'sport' },
      { label: 'Premium', value: 'premium' },
    ],
  },
];
