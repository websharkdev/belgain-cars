'use server';

import { auth } from '@/lib/auth';
import { decodePasswordFromAction } from '@/lib/password.lib';
import { logger } from '@/lib/logger';
import prisma from '@/lib/prisma';
import { checkRateLimit } from '@/lib/rate-limit';
import { signInActionSchema } from '@/schemas/auth.schema';

import { normalizeAuthRole, type SignInValues } from './auth-action.types';

export const signInAction = async (
  values: SignInValues,
  expectedRole: string,
) => {
  try {
    const parsed = signInActionSchema.safeParse(values);

    if (!parsed.success) {
      return { error: parsed.error.issues[0]?.message ?? 'Invalid sign in details.' };
    }

    const plainPassword = decodePasswordFromAction(parsed.data.password);
    const email = parsed.data.email.toLowerCase();
    const normalizedExpectedRole = normalizeAuthRole(expectedRole);
    const limit = await checkRateLimit({
      key: 'login',
      windowInSeconds: 1000,
      maxRequests: 5,
    });

    if (!limit.success) {
      return { error: 'Too many log-in attempts. Please try again later.' };
    }

    const user = await prisma.user.findFirst({
      where: { email: { equals: email, mode: 'insensitive' } },
      select: { role: true },
    });

    if (!user) {
      return { error: 'Invalid credentials' };
    }

    const userRole = normalizeAuthRole(user.role);

    if (userRole !== normalizedExpectedRole) {
      return {
        error:
          "The selected role doesn't match this account. Switch tabs and try again.",
      };
    }

    const result = await auth.api.signInEmail({
      body: { email, password: plainPassword },
    });

    return {
      success: true,
      data: {
        ...result,
        user: { ...result.user, role: userRole },
      },
    };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Invalid credentials';
    logger.warn('Failed login attempt', { reason: message });
    return { error: message };
  }
};
