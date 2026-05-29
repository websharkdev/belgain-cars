'use server';

import { createElement } from 'react';

import { WelcomeEmail } from '@/components/emails/welcome-email';
import { sendEmail } from '@/lib/email';
import prisma from '@/lib/prisma';
import { checkRateLimit } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';
import {
  createVerificationToken,
  readVerificationToken,
} from '@/lib/verification-token';

const DEMO_VERIFICATION_CODE_LENGTH = 6;

export const verifyEmailAction = async (
  otp: string,
  verificationToken: string,
) => {
  const limit = await checkRateLimit({
    key: 'verify-email',
    windowInSeconds: 120,
    maxRequests: 5,
  });

  if (!limit.success) {
    return { error: 'Too many attempts. Please try again in a few minutes.' };
  }

  try {
    const verification = readVerificationToken(verificationToken);

    if (!verification) {
      return { error: 'Verification link is invalid or expired.' };
    }

    if (!/^\d{6}$/.test(otp.trim())) {
      return {
        error: `Enter the ${DEMO_VERIFICATION_CODE_LENGTH}-digit verification code.`,
      };
    }

    const user = await prisma.user.update({
      where: { email: verification.email },
      data: { emailVerified: true },
    });

    const result = await sendEmail({
      to: verification.email,
      subject: 'Welcome to SupplierPortal! 🎉',
      react: createElement(WelcomeEmail, { name: user.name }),
    });

    if (!result.success) {
      logger.error('[Auth Action] Failed to send welcome email', {
        error: result.error,
      });
    }

    return { success: true };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Invalid or expired code';
    return { error: message };
  }
};

export const resendVerificationCodeAction = async (
  verificationToken: string,
) => {
  const limit = await checkRateLimit({
    key: 'resend-otp',
    windowInSeconds: 30,
    maxRequests: 1,
  });

  if (!limit.success) {
    return { error: 'Please wait before requesting another code.' };
  }

  try {
    const verification = readVerificationToken(verificationToken);

    if (!verification) {
      return { error: 'Verification link is invalid or expired.' };
    }

    return {
      success: true,
      verificationToken: createVerificationToken(
        verification.email,
        verification.role,
      ),
    };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Failed to resend code';
    return { error: message };
  }
};
