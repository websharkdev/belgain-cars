import { z } from 'zod';

export const createDeleteAccountSchema = (email: string) =>
  z.object({
    email: z
      .string()
      .trim()
      .email('Enter a valid email address.')
      .refine((value) => value.toLowerCase() === email.toLowerCase(), {
        message: 'Email confirmation does not match your account email.',
      }),
    password: z.string().min(1, 'Password is required.'),
    confirmation: z
      .string()
      .trim()
      .refine((value) => value === 'DELETE', {
        message: 'Type DELETE to confirm account deletion.',
      }),
  });

export type DeleteAccountValues = z.infer<ReturnType<typeof createDeleteAccountSchema>>;
