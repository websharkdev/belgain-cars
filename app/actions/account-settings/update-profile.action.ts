'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { profileDetailsSchema, type ProfileDetailsValues } from '@/features/dashboard/profile/profile.schema';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { checkRateLimit } from '@/lib/rate-limit';

import { type ActionResult } from './account-settings-action.types';

export const updateProfileAction = async (
  values: ProfileDetailsValues,
): Promise<ActionResult> => {
  const limit = await checkRateLimit({
    key: 'update-profile',
    windowInSeconds: 3600,
    maxRequests: 20,
  });

  if (!limit.success) {
    return { error: 'Too many profile updates. Please try again later.' };
  }

  const parsed = profileDetailsSchema.safeParse(values);

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? 'Invalid profile information.',
    };
  }

  try {
    const headerList = await headers();
    const session = await auth.api.getSession({ headers: headerList });

    if (!session) {
      return { error: 'You need to sign in again before updating your profile.' };
    }

    const email = parsed.data.email.toLowerCase();
    const existingEmailUser = await prisma.user.findFirst({
      where: {
        email: { equals: email, mode: 'insensitive' },
        NOT: { id: session.user.id },
      },
      select: { id: true },
    });

    if (existingEmailUser) {
      return { error: 'An account with this email already exists.' };
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: parsed.data.firstName,
        lastName: parsed.data.lastName,
        email,
        phone: parsed.data.phone || null,
      },
    });

    revalidatePath('/dashboard');

    return { success: true };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Failed to update profile.';
    return { error: message };
  }
};
