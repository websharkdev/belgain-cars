"use client";

import { useCallback } from "react";

import { useRouter } from "@/i18n/routing";
import { signOut } from "@/lib/auth-client";
import { useUserStore } from "@/store/use-user-store";

export function useSignOut() {
    const router = useRouter();
    const clearStoredUser = useUserStore((state) => state.logout);

    return useCallback(async () => {
        await signOut();
        clearStoredUser();
        router.push("/auth/sign-in");
    }, [clearStoredUser, router]);
}
