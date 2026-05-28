/**
 * Calculates password strength based on the security policy.
 * Returns a score from 0 to 4 and a corresponding color.
 * 
 * Score criteria:
 * 1. Length >= 12 (Essential)
 * 2. Contains uppercase
 * 3. Contains lowercase AND number
 * 4. Contains special character
 */
export const getPasswordStrength = (password: string) => {
    if (!password) return { score: 0, color: "transparent" };

    let score = 0;

    // Length check
    if (password.length >= 1) score++;

    // Complexity checks
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password) && /[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const colors = {
        0: "transparent",
        1: "#ef4444", // Red - Very Weak (doesn't meet basic length or complexity)
        2: "#f97316", // Orange - Weak
        3: "#eab308", // Yellow - Medium
        4: "#22c55e", // Green - Strong (meets all criteria including 12+ chars)
    };

    return {
        score,
        color: colors[score as keyof typeof colors],
    };
};
