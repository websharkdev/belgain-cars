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

export const normalizeAuthRole = (role?: string | null) =>
    role === "supplier" ? "supplier" : "buyer";
