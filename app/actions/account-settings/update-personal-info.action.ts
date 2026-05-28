"use server";

import { headers } from "next/headers";

import { personalInfoSchema, type PersonalInfoValues } from "@/features/dashboard/account-settings/account-settings.schema";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rate-limit";

import { type ActionResult, type UpdateUserBody } from "./account-settings-action.types";

export const updatePersonalInfoAction = async (
    values: PersonalInfoValues,
): Promise<ActionResult> => {
    const limit = await checkRateLimit({ key: "update-personal-info", windowInSeconds: 3600, maxRequests: 20 });

    if (!limit.success) {
        return { error: "Too many profile updates. Please try again later." };
    }

    const parsed = personalInfoSchema.safeParse(values);

    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? "Invalid profile information." };
    }

    try {
        const headerList = await headers();
        const session = await auth.api.getSession({ headers: headerList });

        if (!session) {
            return { error: "You need to sign in again before updating your profile." };
        }

        const body: UpdateUserBody = {
            name: parsed.data.firstName,
            lastName: parsed.data.lastName,
        };

        await auth.api.updateUser({ body, headers: headerList });
        await prisma.$executeRaw`
            UPDATE "User"
            SET "phone" = ${parsed.data.phone || null}, "updatedAt" = ${new Date()}
            WHERE "id" = ${session.user.id}
        `;

        return { success: true };
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Failed to update profile.";
        return { error: message };
    }
};
