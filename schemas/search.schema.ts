import { z } from 'zod';

export const headerSearchSchema = z.object({
  query: z
    .string()
    .trim()
    .min(2, 'Enter at least 2 characters.')
    .max(80, 'Search query is too long.')
    .regex(/^[\p{L}\p{N}\s._/\-]+$/u, 'Search contains unsupported characters.'),
});

export const vinSearchSchema = z.object({
  vin: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-HJ-NPR-Z0-9]{6,17}$/, 'Enter a valid plate or VIN.')
    .refine((value) => !/[IOQ]/.test(value), 'VIN cannot contain I, O or Q.'),
});

export type HeaderSearchValues = z.infer<typeof headerSearchSchema>;
export type VinSearchValues = z.infer<typeof vinSearchSchema>;
