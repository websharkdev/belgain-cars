export interface ResetPasswordValues {
    password?: string;
    [key: string]: unknown;
}

export interface SignUpValues {
    companyName?: string;
    email: string;
    firstName: string;
    lastName: string;
    password?: string;
}

export interface SignInValues {
    email: string;
    password?: string;
}

export type AuthRole = "buyer" | "supplier";

export const normalizeAuthRole = (role?: string | null): AuthRole =>
    role === "supplier" || role === "business" ? "supplier" : "buyer";

export const getAuthRoleLabel = (role?: string | null) =>
    normalizeAuthRole(role) === "supplier" ? "Business" : "Person";
