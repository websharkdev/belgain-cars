'use client';

import { RotateCcw, ShieldAlert } from 'lucide-react';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div className="bg-background flex min-h-screen flex-col items-center justify-center p-4 text-center">
          <div className="flex flex-col items-center gap-6">
            <div className="bg-destructive/10 text-destructive flex size-24 items-center justify-center rounded-full">
              <ShieldAlert className="size-12" />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-10 text-ink leading-[1.2] font-normal">
                Critical Error
              </h1>
              <p className="text-ink-60 max-w-100 text-base leading-[1.4]">
                A critical error occurred that prevented the application from
                loading.
              </p>
            </div>
            <button
              onClick={() => reset()}
              className="bg-primary text-primary-foreground hover:bg-primary-dark flex cursor-pointer items-center gap-2 rounded-xl border-0 px-6 py-3 text-base font-medium"
            >
              <RotateCcw className="size-5" />
              Restart Application
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
