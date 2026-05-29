import { z } from 'zod';

export const encodedPasswordSchema = z.string().min(1, 'Password is required.');

export const signInActionSchema = z.object({
  email: z.string().trim().email('Enter a valid email address.'),
  password: encodedPasswordSchema,
});

export const signUpActionSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required.').max(80),
  lastName: z.string().trim().min(1, 'Last name is required.').max(80),
  email: z.string().trim().email('Enter a valid email address.'),
  password: encodedPasswordSchema,
  companyName: z.string().trim().max(120).optional().or(z.literal('')),
});

export const forgotPasswordActionSchema = z.object({
  email: z.string().trim().email('Enter a valid email address.'),
});

export const resetPasswordActionSchema = z.object({
  password: encodedPasswordSchema,
});

export type SignInActionValues = z.infer<typeof signInActionSchema>;
export type SignUpActionValues = z.infer<typeof signUpActionSchema>;
export type ForgotPasswordActionValues = z.infer<
  typeof forgotPasswordActionSchema
>;
export type ResetPasswordActionValues = z.infer<
  typeof resetPasswordActionSchema
>;
