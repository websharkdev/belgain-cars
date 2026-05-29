'use server';

import { headers } from 'next/headers';

import { auth } from '@/lib/auth';
import { getServerSession } from '@/lib/auth-session';
import { decodePasswordFromAction } from '@/lib/password.lib';
import { checkRateLimit } from '@/lib/rate-limit';
import { createDeleteAccountSchema } from '@/schemas/delete-account.schema';

import {
  type ActionResult,
  type EncodedDeleteAccountValues,
} from './account-settings-action.types';

export const deleteAccountAction = async (
  values: EncodedDeleteAccountValues,
): Promise<ActionResult> => {
  const limit = await checkRateLimit({
    key: 'delete-account',
    windowInSeconds: 3600,
    maxRequests: 3,
  });

  if (!limit.success) {
    return {
      error: 'Too many delete account attempts. Please try again later.',
    };
  }

  try {
    const session = await getServerSession();

    if (!session) {
      return {
        error: 'You need to sign in again before deleting your account.',
      };
    }

    const parsed = createDeleteAccountSchema(session.user.email).safeParse({
      ...values,
      password: decodePasswordFromAction(values.password),
    });

    if (!parsed.success) {
      return {
        error:
          parsed.error.issues[0]?.message ??
          'Invalid delete account confirmation.',
      };
    }

    await auth.api.deleteUser({
      body: { password: parsed.data.password },
      headers: await headers(),
    });

    return { success: true };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Failed to delete account.';
    return { error: message };
  }
};
