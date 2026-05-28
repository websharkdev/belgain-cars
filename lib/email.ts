import type { ReactNode } from 'react';

export type SendEmailOptions = {
  to: string | string[];
  subject: string;
  html?: string;
  react?: ReactNode;
  text?: string;
  from?: string;
  headers?: Record<string, string>;
};

/**
 * Minimal mailer so the module graph type-checks. Replace with SMTP / Resend
 * (see previous nodemailer implementation in git history if you had one).
 */
export async function sendEmail(
  options: SendEmailOptions,
): Promise<
  { success: true; data?: unknown } | { success: false; error: unknown }
> {
  void options;
  return {
    success: false,
    error: new Error(
      'Email sending is not configured: implement lib/email.ts or set up SMTP.',
    ),
  };
}
