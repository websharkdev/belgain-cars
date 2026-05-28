import { z } from 'zod';

export const vehicleFilterSelectionSchema = z.record(z.string(), z.string().min(1));

export type VehicleFilterSelection = z.infer<typeof vehicleFilterSelectionSchema>;
