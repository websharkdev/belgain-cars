import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { assertS3Configured, s3, s3BucketName } from "@/lib/s3";

export const GET = async (request: NextRequest) => {
    const key = request.nextUrl.searchParams.get("key");

    if (!key || !key.startsWith("rfq-") || key.includes("..")) {
        return new NextResponse(null, { status: 404 });
    }

    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
        return new NextResponse(null, { status: 401 });
    }

    const attachment = await prisma.rfqAttachment.findFirst({
        where: {
            key,
            rfq: {
                buyerId: session.user.id,
            },
        },
        select: {
            filename: true,
            key: true,
        },
    });

    if (!attachment) {
        return new NextResponse(null, { status: 404 });
    }

    try {
        assertS3Configured();
    } catch {
        return new NextResponse(null, { status: 503 });
    }

    const signed = await getSignedUrl(
        s3,
        new GetObjectCommand({
            Bucket: s3BucketName,
            Key: attachment.key,
            ResponseContentDisposition: `attachment; filename="${attachment.filename.replace(/"/g, "")}"`,
        }),
        { expiresIn: 3600 },
    );

    return NextResponse.redirect(signed, {
        headers: { "Cache-Control": "private, no-store" },
    });
};
