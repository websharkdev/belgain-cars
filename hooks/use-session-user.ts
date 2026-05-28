"use client";

import { useMemo } from "react";

import { useSession } from "@/lib/auth-client";
import { getUserDisplayName } from "@/lib/string.lib";
import { useUserStore } from "@/store/use-user-store";

interface SessionUserFields {
    name?: string | null;
    email?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    phone?: string | null;
    image?: string | null;
    role?: string | null;
    position?: string | null;
    jobTitle?: string | null;
}

export function useSessionUser() {
    const { data, isPending } = useSession();
    const storedUser = useUserStore((state) => state.user);
    const sessionUser = data?.user as SessionUserFields | undefined;

    const user = useMemo(() => {
        const email = sessionUser?.email ?? storedUser?.email ?? "";
        const nameParts = sessionUser?.name?.trim().split(/\s+/) ?? [];
        const firstName = sessionUser?.firstName ?? storedUser?.firstName ?? nameParts[0] ?? "";
        const lastName = sessionUser?.lastName ?? storedUser?.lastName ?? nameParts.slice(1).join(" ") ?? "";
        const { compactName, fullName, initials } = getUserDisplayName({
            email,
            firstName,
            lastName,
        });

        return {
            compactName,
            fullName,
            email,
            firstName,
            lastName,
            phone: sessionUser?.phone ?? "",
            imageUrl: sessionUser?.image,
            initials,
            role: sessionUser?.role ?? storedUser?.role ?? "",
            position: sessionUser?.position ?? sessionUser?.jobTitle ?? "",
        };
    }, [sessionUser, storedUser]);

    const sessionProfile = useMemo(() => {
        const email = sessionUser?.email ?? "";
        const nameParts = sessionUser?.name?.trim().split(/\s+/) ?? [];
        const firstName = sessionUser?.firstName ?? nameParts[0] ?? "";
        const lastName = sessionUser?.lastName ?? nameParts.slice(1).join(" ") ?? "";
        const { compactName, fullName, initials } = getUserDisplayName({
            email,
            firstName,
            lastName,
        });

        return {
            compactName,
            fullName,
            email,
            firstName,
            lastName,
            phone: sessionUser?.phone ?? "",
            imageUrl: sessionUser?.image,
            initials,
            role: sessionUser?.role ?? "",
            position: sessionUser?.position ?? sessionUser?.jobTitle ?? "",
        };
    }, [sessionUser]);

    return { user, sessionProfile, isPending };
}
