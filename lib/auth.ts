import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import prisma from './prisma';
import {
  AUTH_SESSION_EXPIRES_IN,
  PASSWORD_RESET_TOKEN_EXPIRES_IN,
} from './constants';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  session: {
    expiresIn: AUTH_SESSION_EXPIRES_IN,
    disableSessionRefresh: true,
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    // Using the correct option for token expiration
    resetPasswordTokenExpiresIn: PASSWORD_RESET_TOKEN_EXPIRES_IN,
  },
  user: {
    deleteUser: {
      enabled: true,
    },
    additionalFields: {
      role: {
        type: 'string',
        required: false,
        defaultValue: 'buyer',
      },
      lastName: {
        type: 'string',
        required: true,
      },
      companyName: {
        type: 'string',
        required: false,
      },
      phone: {
        type: 'string',
        required: false,
      },
    },
  },
  plugins: [nextCookies()],
  rateLimit: {
    window: 60,
    max: 10,
    enabled: true,
  },
});
