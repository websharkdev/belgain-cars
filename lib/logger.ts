import * as Sentry from '@sentry/nextjs';

export const logger = {
  error: (message: string, context?: Record<string, unknown>) => {
    if (process.env.NODE_ENV === 'production') {
      Sentry.captureException(new Error(message), { extra: context });
    } else {
      console.error(message, context);
    }
  },
  warn: (message: string, context?: Record<string, unknown>) => {
    if (process.env.NODE_ENV === 'production') {
      Sentry.captureMessage(message, { level: 'warning', extra: context });
    } else {
      console.warn(message, context);
    }
  },
  info: (message: string, context?: Record<string, unknown>) => {
    if (process.env.NODE_ENV !== 'production') {
      console.info(message, context);
    }
  },
};
