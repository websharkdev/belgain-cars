import { S3Client } from '@aws-sdk/client-s3';

const region = process.env.S3_REGION ?? process.env.AWS_REGION ?? 'eu-central-1';
const endpoint = process.env.S3_ENDPOINT;
const accessKeyId = process.env.S3_ACCESS_KEY_ID ?? process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY ?? process.env.AWS_SECRET_ACCESS_KEY;

export const s3BucketName = process.env.S3_BUCKET_NAME ?? process.env.AWS_S3_BUCKET_NAME ?? '';

export const s3 = new S3Client({
  region,
  endpoint,
  forcePathStyle: Boolean(endpoint),
  credentials:
    accessKeyId && secretAccessKey
      ? {
          accessKeyId,
          secretAccessKey,
        }
      : undefined,
});

export function assertS3Configured() {
  if (!s3BucketName) {
    throw new Error('S3 bucket is not configured. Set S3_BUCKET_NAME.');
  }
}
