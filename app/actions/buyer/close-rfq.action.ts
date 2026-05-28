"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const closeRfqAction = async (rfqId: number): Promise<{ error?: string; success?: true }> => {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
        return { error: "You must be signed in." };
    }

    const updated = await prisma.$executeRaw`
        UPDATE "Rfq"
        SET "status" = 'closed', "updatedAt" = ${new Date()}
        WHERE "id" = ${rfqId}
          AND "buyerId" = ${session.user.id}
          AND "status" != 'closed'
    `;

    if (updated === 0) {
        return { error: "RFQ not found or already closed." };
    }

    revalidatePath("/dashboard/buyer");
    revalidatePath(`/dashboard/buyer/rfq/${rfqId}`);

    return { success: true };
};
