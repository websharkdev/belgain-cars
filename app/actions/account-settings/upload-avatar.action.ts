'use server';

import { revalidatePath } from 'next/cache';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';

import { getServerSession } from '@/lib/auth-session';
import prisma from '@/lib/prisma';
import { assertS3Configured, s3, s3BucketName } from '@/lib/s3';
import { checkRateLimit } from '@/lib/rate-limit';

import { type ActionResult } from './account-settings-action.types';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_BYTES = 2 * 1024 * 1024;

export const uploadAvatarAction = async (
  formData: FormData,
): Promise<ActionResult> => {
  const limit = await checkRateLimit({
    key: 'upload-avatar',
    windowInSeconds: 3600,
    maxRequests: 10,
  });
  if (!limit.success) {
    return { error: 'Too many upload attempts. Please try again later.' };
  }

  const file = formData.get('file');
  if (!(file instanceof File)) return { error: 'No file provided.' };
  if (!ALLOWED_TYPES.includes(file.type))
    return { error: 'Only JPG, PNG and WEBP images are allowed.' };
  if (file.size > MAX_BYTES) return { error: 'File exceeds the 2 MB limit.' };

  const session = await getServerSession();
  if (!session)
    return { error: 'You must be signed in to update your avatar.' };

  try {
    assertS3Configured();
  } catch {
    return { error: 'Avatar storage is not configured.' };
  }

  const key = `avatars/${session.user.id}/${Date.now()}.webp`;
  const buffer = await sharp(Buffer.from(await file.arrayBuffer()))
    .webp({ quality: 85 })
    .toBuffer();

  await s3.send(
    new PutObjectCommand({
      Bucket: s3BucketName,
      Key: key,
      Body: buffer,
      ContentType: 'image/webp',
      CacheControl: 'public, max-age=31536000',
    }),
  );

  const imageUrl = `/api/avatar?key=${encodeURIComponent(key)}`;

  await prisma.$executeRaw`
        UPDATE "User" SET "image" = ${imageUrl}, "updatedAt" = ${new Date()} WHERE "id" = ${session.user.id}
    `;

  revalidatePath('/', 'layout');
  return { success: true, imageUrl };
};
