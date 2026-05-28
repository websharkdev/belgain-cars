export function encodePasswordForAction(password?: string | null) {
    return btoa(encodeURIComponent(password || ""));
}

export function decodePasswordFromAction(encodedPassword?: string | null) {
    if (!encodedPassword) {
        return "";
    }

    try {
        return decodeURIComponent(Buffer.from(encodedPassword, "base64").toString());
    } catch {
        return encodedPassword;
    }
}
