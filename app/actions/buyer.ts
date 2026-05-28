"use server";

import { createRfqAction as createRfq } from "./buyer/create-rfq.action";
import { inviteRfqSuppliersAction as inviteRfqSuppliers } from "./buyer/invite-rfq-suppliers.action";

export const createRfqAction = async (
    ...args: Parameters<typeof createRfq>
) => createRfq(...args);

export const inviteRfqSuppliersAction = async (
    ...args: Parameters<typeof inviteRfqSuppliers>
) => inviteRfqSuppliers(...args);
