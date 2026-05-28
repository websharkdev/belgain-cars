import { z } from 'zod';

const requiredText = (message: string) => z.string().trim().min(1, message);

export const rfqLineItemSchema = z.object({
  item: requiredText('Item is required.'),
  specifications: z.string().trim().default(''),
  quantity: z.union([z.string(), z.number()]).transform(String),
  price: z.union([z.string(), z.number()]).transform(String),
  total: z.union([z.string(), z.number()]).transform(String),
});

export const rfqTextValueSchema = z.object({
  value: z.string().trim().default(''),
});

export const rfqFormSchema = z.object({
  title: requiredText('Title is required.'),
  description: requiredText('Description is required.'),
  budget: z.union([z.string(), z.number()]).transform(String),
  budgetVisible: z.boolean().default(true),
  deadline: requiredText('Deadline is required.'),
  lineItems: z.array(rfqLineItemSchema).min(1, 'Add at least one line item.'),
  questions: z.array(rfqTextValueSchema).default([]),
  requirements: z.array(rfqTextValueSchema).default([]),
  suppliers: z.array(z.string().trim().email()).default([]),
});

export type RfqFormValues = z.infer<typeof rfqFormSchema>;
