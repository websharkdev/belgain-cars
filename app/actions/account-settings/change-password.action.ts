"use server";

import { headers } from "next/headers";

import { changePasswordSchema } from "@/features/dashboard/account-settings/account-settings.schema";
import { auth } from "@/lib/auth";
import { decodePasswordFromAction } from "@/lib/password.lib";
import { checkRateLimit } from "@/lib/rate-limit";

import {
    type ActionResult,
    type EncodedChangePasswordValues,
} from "./account-settings-action.types";

export const changePasswordAction = async (
    values: EncodedChangePasswordValues,
): Promise<ActionResult> => {
    const decodedValues = {
        currentPassword: decodePasswordFromAction(values.currentPassword),
        newPassword: decodePasswordFromAction(values.newPassword),
        confirmPassword: decodePasswordFromAction(values.confirmPassword),
    };
    const parsed = changePasswordSchema.safeParse(decodedValues);

    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? "Invalid password information." };
    }

    const limit = await checkRateLimit({ key: "change-password", windowInSeconds: 600, maxRequests: 5 });

    if (!limit.success) {
        return { error: "Too many password change attempts. Please try again later." };
    }

    try {
        await auth.api.changePassword({
            body: {
                currentPassword: parsed.data.currentPassword,
                newPassword: parsed.data.newPassword,
                revokeOtherSessions: true,
            },
            headers: await headers(),
        });

        return { success: true };
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Failed to update password.";
        return { error: message };
    }
};
