'use server';

import { DeleteObjectsCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { parse, isValid } from 'date-fns';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';

import { ATTACHMENT_MAX_SIZE_MB } from '@/features/dashboard/buyer/(modals)/create-rfq/constants';
import {
  rfqFormSchema,
  type RfqFormValues,
} from '@/features/dashboard/buyer/(modals)/create-rfq/schema';
import { parseCurrencyValue } from '@/features/dashboard/buyer/(modals)/create-rfq/utils';
import { auth } from '@/lib/auth';
import { logger } from '@/lib/logger';
import prisma from '@/lib/prisma';
import { assertS3Configured, s3, s3BucketName } from '@/lib/s3';

import { type Prisma } from '@prisma/client';

import { type CreateRfqActionResult } from './buyer-action.types';

const DATE_FORMAT = 'dd/MM/yyyy';
const MAX_FILE_BYTES = ATTACHMENT_MAX_SIZE_MB * 1024 * 1024;
const ALLOWED_ATTACHMENT_TYPES = new Set([
  'application/msword',
  'application/pdf',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

type CreatedRfqRow = {
  id: number;
};

const getPayload = (formData: FormData) => {
  const payload = formData.get('payload');

  if (typeof payload !== 'string') {
    return { error: 'RFQ payload is missing.' } as const;
  }

  try {
    return { data: JSON.parse(payload) as unknown } as const;
  } catch {
    return { error: 'RFQ payload is invalid.' } as const;
  }
};

const getFiles = (formData: FormData) => {
  return formData
    .getAll('files')
    .filter((file): file is File => file instanceof File);
};

const getSafeFilename = (filename: string) => {
  return (
    filename
      .replace(/[/\\]/g, '-')
      .replace(/[^\w.\-()\s]/g, '')
      .trim() || 'attachment'
  );
};

const validateFiles = (files: File[]) => {
  for (const file of files) {
    if (!ALLOWED_ATTACHMENT_TYPES.has(file.type)) {
      return 'Only DOC, DOCX, PDF, XLS and XLSX files are allowed.';
    }

    if (file.size > MAX_FILE_BYTES) {
      return `File exceeds the ${ATTACHMENT_MAX_SIZE_MB} MB limit.`;
    }
  }

  return undefined;
};

const parseDeadline = (deadline: string) => {
  const date = parse(deadline, DATE_FORMAT, new Date());

  return isValid(date) ? date : undefined;
};

const cleanupUploadedFiles = async (keys: string[]) => {
  if (keys.length === 0) {
    return;
  }

  await s3.send(
    new DeleteObjectsCommand({
      Bucket: s3BucketName,
      Delete: {
        Objects: keys.map((Key) => ({ Key })),
        Quiet: true,
      },
    }),
  );
};

const deleteCreatedRfq = async (rfqId: number) => {
  await prisma.$executeRaw`DELETE FROM "Rfq" WHERE "id" = ${rfqId}`;
};

const createRfqRecord = async (
  values: RfqFormValues,
  userId: string,
  deadline: Date,
) => {
  const now = new Date();
  const rows = await prisma.$queryRaw<CreatedRfqRow[]>`
        INSERT INTO "Rfq" (
            "title",
            "description",
            "budget",
            "budgetVisible",
            "deadline",
            "status",
            "buyerId",
            "createdAt",
            "updatedAt"
        )
        VALUES (
            ${values.title},
            ${values.description},
            ${Math.round(parseCurrencyValue(values.budget))},
            ${values.budgetVisible},
            ${deadline},
            ${'active'},
            ${userId},
            ${now},
            ${now}
        )
        RETURNING "id"
    `;

  const [rfq] = rows;

  if (!rfq) {
    throw new Error('RFQ was not created.');
  }

  return rfq.id;
};

const saveRfqChildren = async (
  rfqId: number,
  values: RfqFormValues,
  attachments: Array<{
    contentType: string;
    filename: string;
    key: string;
    size: number;
  }>,
  storagePrefix: string | null,
) => {
  await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    if (storagePrefix) {
      await tx.$executeRaw`
                UPDATE "Rfq"
                SET "storagePrefix" = ${storagePrefix}, "updatedAt" = ${new Date()}
                WHERE "id" = ${rfqId}
            `;
    }

    for (const [index, item] of values.lineItems.entries()) {
      await tx.$executeRaw`
                INSERT INTO "RfqLineItem" (
                    "id",
                    "rfqId",
                    "item",
                    "specifications",
                    "quantity",
                    "price",
                    "total",
                    "sortOrder"
                )
                VALUES (
                    ${crypto.randomUUID()},
                    ${rfqId},
                    ${item.item},
                    ${item.specifications},
                    ${Math.round(parseCurrencyValue(item.quantity))},
                    ${Math.round(parseCurrencyValue(item.price))},
                    ${Math.round(parseCurrencyValue(item.total))},
                    ${index}
                )
            `;
    }

    for (const [index, question] of values.questions.entries()) {
      const value = question.value.trim();
      if (!value) continue;

      await tx.$executeRaw`
                INSERT INTO "RfqQuestion" ("id", "rfqId", "value", "sortOrder")
                VALUES (${crypto.randomUUID()}, ${rfqId}, ${value}, ${index})
            `;
    }

    for (const [index, requirement] of values.requirements.entries()) {
      const value = requirement.value.trim();
      if (!value) continue;

      await tx.$executeRaw`
                INSERT INTO "RfqRequirement" ("id", "rfqId", "value", "sortOrder")
                VALUES (${crypto.randomUUID()}, ${rfqId}, ${value}, ${index})
            `;
    }

    for (const [index, email] of values.suppliers.entries()) {
      await tx.$executeRaw`
                INSERT INTO "RfqSupplier" ("id", "rfqId", "email", "sortOrder")
                VALUES (${crypto.randomUUID()}, ${rfqId}, ${email}, ${index})
            `;
    }

    for (const attachment of attachments) {
      await tx.$executeRaw`
                INSERT INTO "RfqAttachment" (
                    "id",
                    "rfqId",
                    "filename",
                    "key",
                    "contentType",
                    "size",
                    "createdAt"
                )
                VALUES (
                    ${crypto.randomUUID()},
                    ${rfqId},
                    ${attachment.filename},
                    ${attachment.key},
                    ${attachment.contentType},
                    ${attachment.size},
                    ${new Date()}
                )
            `;
    }
  });

  return storagePrefix;
};

export const createRfqAction = async (
  formData: FormData,
): Promise<CreateRfqActionResult> => {
  const headerList = await headers();
  const session = await auth.api.getSession({ headers: headerList });

  if (!session) {
    return { error: 'You must be signed in to create an RFQ.' };
  }

  const payload = getPayload(formData);
  if ('error' in payload) {
    return { error: payload.error };
  }

  const parsed = rfqFormSchema.safeParse(payload.data);
  if (!parsed.success) {
    return { error: 'Please fix the highlighted RFQ fields.' };
  }

  const deadline = parseDeadline(parsed.data.deadline);
  if (!deadline) {
    return { error: 'Deadline date is invalid.' };
  }

  const files = getFiles(formData);
  const fileError = validateFiles(files);
  if (fileError) {
    return { error: fileError };
  }

  let rfqId: number | undefined;
  const uploadedKeys: string[] = [];

  try {
    const createdRfqId = await createRfqRecord(parsed.data, session.user.id, deadline);
    rfqId = createdRfqId;
    const attachments: Array<{
      contentType: string;
      filename: string;
      key: string;
      size: number;
    }> = [];
    let storagePrefix: string | null = null;

    if (files.length > 0) {
      assertS3Configured();
      storagePrefix = `rfq-${createdRfqId}`;

      for (const file of files) {
        const filename = getSafeFilename(file.name);
        const key = `${storagePrefix}/${crypto.randomUUID()}-${filename}`;
        const buffer = Buffer.from(await file.arrayBuffer());

        await s3.send(
          new PutObjectCommand({
            Bucket: s3BucketName,
            Key: key,
            Body: buffer,
            ContentType: file.type,
          }),
        );

        uploadedKeys.push(key);
        attachments.push({
          contentType: file.type,
          filename,
          key,
          size: file.size,
        });
      }
    }

    await saveRfqChildren(createdRfqId, parsed.data, attachments, storagePrefix);

    revalidatePath('/dashboard/buyer');
    revalidatePath(`/dashboard/buyer/rfq/${createdRfqId}`);

    return {
      success: true,
      id: createdRfqId,
      storagePrefix: storagePrefix ?? undefined,
    };
  } catch (error) {
    logger.error('[Create RFQ Error]', {
      error: error instanceof Error ? error.message : String(error),
    });

    await cleanupUploadedFiles(uploadedKeys).catch((cleanupError: unknown) => {
      logger.error('[Create RFQ Cleanup Error]', {
        error:
          cleanupError instanceof Error
            ? cleanupError.message
            : String(cleanupError),
      });
    });

    if (rfqId) {
      await deleteCreatedRfq(rfqId).catch((deleteError: unknown) => {
        logger.error('[Create RFQ Delete Error]', {
          error:
            deleteError instanceof Error
              ? deleteError.message
              : String(deleteError),
        });
      });
    }

    return { error: 'Failed to create RFQ. Please try again.' };
  }
};
