"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const duplicateRfqAction = async (rfqId: number): Promise<{ error?: string; newId?: number }> => {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
        return { error: "You must be signed in." };
    }

    const rfq = await prisma.rfq.findFirst({
        where: { id: rfqId, buyerId: session.user.id },
        include: {
            lineItems: { orderBy: { sortOrder: "asc" } },
            questions: { orderBy: { sortOrder: "asc" } },
            requirements: { orderBy: { sortOrder: "asc" } },
            suppliers: { orderBy: { sortOrder: "asc" } },
        },
    });

    if (!rfq) {
        return { error: "RFQ not found." };
    }

    const newRfq = await prisma.rfq.create({
        data: {
            title: `Copy of ${rfq.title}`,
            description: rfq.description,
            budget: rfq.budget,
            budgetVisible: rfq.budgetVisible,
            deadline: rfq.deadline,
            status: "active",
            buyerId: session.user.id,
            lineItems: {
                create: rfq.lineItems.map((item) => ({
                    item: item.item,
                    specifications: item.specifications,
                    quantity: item.quantity,
                    price: item.price,
                    total: item.total,
                    sortOrder: item.sortOrder,
                })),
            },
            questions: {
                create: rfq.questions.map((q) => ({
                    value: q.value,
                    sortOrder: q.sortOrder,
                })),
            },
            requirements: {
                create: rfq.requirements.map((r) => ({
                    value: r.value,
                    sortOrder: r.sortOrder,
                })),
            },
            suppliers: {
                create: rfq.suppliers.map((s) => ({
                    email: s.email,
                    sortOrder: s.sortOrder,
                })),
            },
        },
        select: { id: true },
    });

    revalidatePath("/dashboard/buyer");

    return { newId: newRfq.id };
};
