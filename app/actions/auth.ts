'use server';

import {
  forgotPasswordAction as forgotPassword,
  resetPasswordAction as resetPassword,
} from './auth/password-reset.action';
import { signInAction as signIn } from './auth/sign-in.action';
import { signUpAction as signUp } from './auth/sign-up.action';
import {
  resendVerificationCodeAction as resendVerificationCode,
  verifyEmailAction as verifyEmail,
} from './auth/verify-email.action';

export const forgotPasswordAction = async (
  ...args: Parameters<typeof forgotPassword>
) => forgotPassword(...args);

export const resetPasswordAction = async (
  ...args: Parameters<typeof resetPassword>
) => resetPassword(...args);

export const resendVerificationCodeAction = async (
  ...args: Parameters<typeof resendVerificationCode>
) => resendVerificationCode(...args);

export const verifyEmailAction = async (
  ...args: Parameters<typeof verifyEmail>
) => verifyEmail(...args);

export const signInAction = async (...args: Parameters<typeof signIn>) =>
  signIn(...args);

export const signUpAction = async (...args: Parameters<typeof signUp>) =>
  signUp(...args);
