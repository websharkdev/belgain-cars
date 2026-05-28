import { headers } from "next/headers";
import prisma from "./prisma";

interface RateLimitConfig {
    windowInSeconds: number;
    maxRequests: number;
    key: string;
}

/**
 * A simple Prisma-backed rate limiter.
 * This ensures that rate limits persist across server restarts and work in multi-instance environments (to some extent).
 */
export async function checkRateLimit(config: RateLimitConfig) {
    const headerList = await headers();
    const ip = headerList.get("x-forwarded-for") || "unknown";
    const fullKey = `rate-limit:${config.key}:${ip}`;

    const now = new Date();
    const windowStart = new Date(now.getTime() - config.windowInSeconds * 1000);

    // Clean up old entries (optional, but good for maintenance)
    // In a real app, you might want to do this via a cron job or a more efficient way
    
    const record = await prisma.rateLimit.findUnique({
        where: { key: fullKey },
    });

    if (!record || record.lastReset < windowStart) {
        // Reset or create new window
        await prisma.rateLimit.upsert({
            where: { key: fullKey },
            create: {
                key: fullKey,
                count: 1,
                lastReset: now,
            },
            update: {
                count: 1,
                lastReset: now,
            },
        });
        return { success: true, remaining: config.maxRequests - 1 };
    }

    if (record.count >= config.maxRequests) {
        return { success: false, remaining: 0 };
    }

    await prisma.rateLimit.update({
        where: { key: fullKey },
        data: {
            count: { increment: 1 },
        },
    });

    return { success: true, remaining: config.maxRequests - record.count - 1 };
}
