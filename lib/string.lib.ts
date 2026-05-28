const DEFAULT_USER_FALLBACK = "User";
const DEFAULT_INITIALS_FALLBACK = "U";

interface UserNameParts {
    email?: string | null;
    fallback?: string;
    firstName?: string | null;
    lastName?: string | null;
    name?: string | null;
}

export function compactWhitespace(value?: string | null) {
    return value?.trim().replace(/\s+/g, " ") ?? "";
}

export function getEmailName(email?: string | null) {
    return compactWhitespace(email?.split("@")[0]?.replace(/[._-]+/g, " "));
}

export function getInitialsFromName(
    name?: string | null,
    fallback = DEFAULT_INITIALS_FALLBACK
) {
    const initials = compactWhitespace(name)
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join("");

    return initials || fallback;
}

export function getFullName(
    firstName?: string | null,
    lastName?: string | null,
    fallback = DEFAULT_USER_FALLBACK
) {
    return [compactWhitespace(firstName), compactWhitespace(lastName)]
        .filter(Boolean)
        .join(" ") || compactWhitespace(fallback) || DEFAULT_USER_FALLBACK;
}

export function getCompactName(
    firstName?: string | null,
    lastName?: string | null,
    fallback = DEFAULT_USER_FALLBACK
) {
    const normalizedFirstName = compactWhitespace(firstName);
    const normalizedLastName = compactWhitespace(lastName);

    if (normalizedFirstName && normalizedLastName) {
        return `${normalizedFirstName} ${normalizedLastName.charAt(0)}.`;
    }

    return normalizedFirstName || compactWhitespace(fallback) || DEFAULT_USER_FALLBACK;
}

export function getUserInitials({
    email,
    fallback = DEFAULT_USER_FALLBACK,
    firstName,
    lastName,
    name,
}: UserNameParts) {
    const fullName = [compactWhitespace(firstName), compactWhitespace(lastName)]
        .filter(Boolean)
        .join(" ");
    const fallbackName = compactWhitespace(name) || getEmailName(email) || fallback;

    return getInitialsFromName(fullName || fallbackName);
}

export function getUserDisplayName({
    email,
    fallback = DEFAULT_USER_FALLBACK,
    firstName,
    lastName,
    name,
}: UserNameParts) {
    const fallbackName = compactWhitespace(name) || compactWhitespace(email) || fallback;
    const fullName = getFullName(firstName, lastName, fallbackName);

    return {
        compactName: getCompactName(firstName, lastName, fallbackName),
        fullName,
        initials: getUserInitials({
            email,
            fallback,
            firstName,
            lastName,
            name: fullName,
        }),
    };
}
