"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const normalizeEmails = (emails: string[]) => {
    const uniqueEmails = new Map<string, string>();

    emails.forEach((email) => {
        const trimmed = email.trim();
        const normalized = trimmed.toLowerCase();

        if (EMAIL_RE.test(trimmed)) {
            uniqueEmails.set(normalized, trimmed);
        }
    });

    return Array.from(uniqueEmails.entries()).map(([normalized, value]) => ({
        normalized,
        value,
    }));
};

export const inviteRfqSuppliersAction = async (
    rfqId: number,
    emails: string[],
): Promise<{ addedCount?: number; error?: string; success?: true }> => {
    if (!Number.isSafeInteger(rfqId) || rfqId <= 0) {
        return { error: "Invalid RFQ id." };
    }

    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
        return { error: "You must be signed in." };
    }

    const normalizedEmails = normalizeEmails(emails);

    if (normalizedEmails.length === 0) {
        return { error: "Add at least one valid supplier email." };
    }

    const rfq = await prisma.rfq.findFirst({
        where: {
            id: rfqId,
            buyerId: session.user.id,
        },
        select: {
            id: true,
            status: true,
            suppliers: {
                orderBy: { sortOrder: "asc" },
                select: {
                    email: true,
                    sortOrder: true,
                },
            },
        },
    });

    if (!rfq) {
        return { error: "RFQ not found." };
    }

    if (rfq.status === "closed") {
        return { error: "Closed RFQs cannot receive new suppliers." };
    }

    const existingEmails = new Set(rfq.suppliers.map((supplier) => supplier.email.toLowerCase()));
    const suppliersToAdd = normalizedEmails
        .filter((email) => !existingEmails.has(email.normalized))
        .map((email) => email.value);

    if (suppliersToAdd.length === 0) {
        return { error: "These suppliers are already invited." };
    }

    const lastSortOrder = rfq.suppliers.reduce(
        (maxSortOrder, supplier) => Math.max(maxSortOrder, supplier.sortOrder),
        -1,
    );

    await prisma.$transaction([
        prisma.rfqSupplier.createMany({
            data: suppliersToAdd.map((email, index) => ({
                rfqId,
                email,
                sortOrder: lastSortOrder + index + 1,
            })),
        }),
        prisma.rfq.update({
            where: { id: rfqId },
            data: { updatedAt: new Date() },
            select: { id: true },
        }),
    ]);

    revalidatePath("/dashboard/buyer");
    revalidatePath(`/dashboard/buyer/rfq/${rfqId}`);

    return {
        addedCount: suppliersToAdd.length,
        success: true,
    };
};
