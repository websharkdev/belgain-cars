export type AuthMode = 'sign-in' | 'sign-up';
export type AccountType = 'person' | 'business';

export interface SignInFormErrors {
  email?: string;
  password?: string;
  form?: string;
}

export interface SignUpFormErrors extends SignInFormErrors {
  firstName?: string;
  lastName?: string;
}
