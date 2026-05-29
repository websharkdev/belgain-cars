'use client';

import * as React from 'react';
import { useRouter } from '@/i18n/routing';
import { useSession } from '@/lib/auth-client';
import { routes } from '@/lib/routes';

interface UseCheckoutGuardOptions {
  onAuthRequired?: () => void;
  checkoutPath?: string;
}

export function useCheckoutGuard({
  onAuthRequired,
  checkoutPath = routes.checkout,
}: UseCheckoutGuardOptions = {}) {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const requestCheckout = React.useCallback(() => {
    if (isPending) return;

    if (!session?.user) {
      onAuthRequired?.();
      return;
    }

    router.push(checkoutPath);
  }, [checkoutPath, isPending, onAuthRequired, router, session?.user]);

  return {
    isAuthenticated: Boolean(session?.user),
    isCheckingSession: isPending,
    requestCheckout,
  };
}
