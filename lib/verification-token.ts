import "server-only";

import { createCipheriv, createDecipheriv, createHash, randomBytes } from "crypto";

type VerificationTokenPayload = {
    email: string;
    role: string;
    expiresAt: number;
};

const TOKEN_TTL_MS = 10 * 60 * 1000;
const ALGORITHM = "aes-256-gcm";

function getTokenKey() {
    const secret = process.env.BETTER_AUTH_SECRET;

    if (!secret) {
        throw new Error("BETTER_AUTH_SECRET is required to create verification links.");
    }

    return createHash("sha256").update(secret).digest();
}

export function createVerificationToken(email: string, role: string) {
    const iv = randomBytes(12);
    const cipher = createCipheriv(ALGORITHM, getTokenKey(), iv);
    const payload: VerificationTokenPayload = {
        email: email.trim().toLowerCase(),
        role,
        expiresAt: Date.now() + TOKEN_TTL_MS,
    };
    const encrypted = Buffer.concat([
        cipher.update(JSON.stringify(payload), "utf8"),
        cipher.final(),
    ]);
    const authTag = cipher.getAuthTag();

    return [iv, encrypted, authTag].map((part) => part.toString("base64url")).join(".");
}

export function readVerificationToken(token?: string | null) {
    if (!token) return null;

    try {
        const [ivPart, encryptedPart, authTagPart] = token.split(".");

        if (!ivPart || !encryptedPart || !authTagPart) {
            return null;
        }

        const decipher = createDecipheriv(
            ALGORITHM,
            getTokenKey(),
            Buffer.from(ivPart, "base64url")
        );

        decipher.setAuthTag(Buffer.from(authTagPart, "base64url"));

        const decrypted = Buffer.concat([
            decipher.update(Buffer.from(encryptedPart, "base64url")),
            decipher.final(),
        ]);
        const payload = JSON.parse(decrypted.toString("utf8")) as VerificationTokenPayload;

        if (!payload.email || Date.now() > payload.expiresAt) {
            return null;
        }

        return payload;
    } catch {
        return null;
    }
}
