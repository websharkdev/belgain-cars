import { NextRequest, NextResponse } from 'next/server';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { assertS3Configured, s3, s3BucketName } from '@/lib/s3';

export const GET = async (req: NextRequest) => {
  const key = req.nextUrl.searchParams.get('key');

  if (!key || !key.startsWith('avatars/')) {
    return new NextResponse(null, { status: 404 });
  }

  try {
    assertS3Configured();
  } catch {
    return new NextResponse(null, { status: 503 });
  }

  const signed = await getSignedUrl(
    s3,
    new GetObjectCommand({ Bucket: s3BucketName, Key: key }),
    { expiresIn: 3600 },
  );

  return NextResponse.redirect(signed, {
    headers: { 'Cache-Control': 'private, no-store' },
  });
};
