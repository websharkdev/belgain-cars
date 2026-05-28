'use server';

import { createElement } from 'react';

import { PasswordResetSuccessEmail } from '@/components/emails/password-reset-success-email';
import { auth } from '@/lib/auth';
import { sendEmail } from '@/lib/email';
import { decodePasswordFromAction } from '@/lib/password.lib';
import prisma from '@/lib/prisma';
import { checkRateLimit } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';
import {
  forgotPasswordActionSchema,
  resetPasswordActionSchema,
} from '@/schemas/auth.schema';

import { type ResetPasswordValues } from './auth-action.types';

export const forgotPasswordAction = async (email: string) => {
  const parsed = forgotPasswordActionSchema.safeParse({ email });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid email address.' };
  }

  const limit = await checkRateLimit({
    key: 'forgot-password',
    windowInSeconds: 3600,
    maxRequests: 3,
  });

  if (!limit.success) {
    return {
      error:
        'Too many password reset requests. Please check your email or try again later.',
    };
  }

  try {
    await auth.api.requestPasswordReset({
      body: { email: parsed.data.email, redirectTo: '/auth/reset-password' },
    });
    return { success: true };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Failed to send reset link';
    return { error: message };
  }
};

export const resetPasswordAction = async (
  values: ResetPasswordValues,
  token: string,
) => {
  const limit = await checkRateLimit({
    key: 'reset-password',
    windowInSeconds: 600,
    maxRequests: 5,
  });

  if (!limit.success) {
    return {
      error: 'Too many password reset attempts. Please try again later.',
    };
  }

  try {
    const parsed = resetPasswordActionSchema.safeParse(values);

    if (!parsed.success) {
      return { error: parsed.error.issues[0]?.message ?? 'Invalid password.' };
    }

    const plainPassword = decodePasswordFromAction(parsed.data.password);
    const verification = await prisma.verification.findFirst({
      where: { identifier: `reset-password:${token}` },
    });
    const targetEmail = verification
      ? (await prisma.user.findUnique({ where: { id: verification.value } }))
          ?.email
      : null;

    await auth.api.resetPassword({
      body: { newPassword: plainPassword, token },
    });

    if (targetEmail) {
      const result = await sendEmail({
        to: targetEmail,
        subject: 'Password changed successfully - SupplierPortal',
        react: createElement(PasswordResetSuccessEmail, { email: targetEmail }),
      });

      if (!result.success) {
        logger.error('[Auth Action] Password reset success email failed', {
          error: result.error,
        });
      }
    }

    return { success: true };
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : 'Failed to reset password. Link may be invalid or expired.';
    return { error: message };
  }
};
