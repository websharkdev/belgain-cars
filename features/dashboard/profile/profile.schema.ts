import { z } from 'zod';

export const profileDetailsSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required.').max(80),
  lastName: z.string().trim().min(1, 'Last name is required.').max(80),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  email: z.string().trim().email('Enter a valid email address.'),
});

export type ProfileDetailsValues = z.infer<typeof profileDetailsSchema>;
