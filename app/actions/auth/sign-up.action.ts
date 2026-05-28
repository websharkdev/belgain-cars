'use server';

import { DUPLICATE_EMAIL_ERROR } from '@/features/auth/auth.constants';
import { auth } from '@/lib/auth';
import { decodePasswordFromAction } from '@/lib/password.lib';
import prisma from '@/lib/prisma';
import { logger } from '@/lib/logger';
import { createVerificationToken } from '@/lib/verification-token';
import { signUpActionSchema } from '@/schemas/auth.schema';

import { normalizeAuthRole, type SignUpValues } from './auth-action.types';

export const signUpAction = async (values: SignUpValues, role: string) => {
  try {
    const parsed = signUpActionSchema.safeParse(values);

    if (!parsed.success) {
      return { error: parsed.error.issues[0]?.message ?? 'Invalid sign up details.' };
    }

    const plainPassword = decodePasswordFromAction(parsed.data.password);
    const email = parsed.data.email.toLowerCase();
    const normalizedRole = normalizeAuthRole(role);
    const existingUser = await prisma.user.findFirst({
      where: { email: { equals: email, mode: 'insensitive' } },
      select: { id: true },
    });

    if (existingUser) {
      return { error: DUPLICATE_EMAIL_ERROR, field: 'email' as const };
    }

    await auth.api.signUpEmail({
      body: {
        name: parsed.data.firstName,
        lastName: parsed.data.lastName,
        email,
        password: plainPassword,
        role: normalizedRole,
        companyName: parsed.data.companyName || '',
      },
    });

    return {
      success: true,
      verificationToken: createVerificationToken(email, normalizedRole),
    };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Failed to create account';
    logger.warn('Failed sign up attempt', { reason: message });
    return { error: message };
  }
};
