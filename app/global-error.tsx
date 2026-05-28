"use client"

import { RotateCcw, ShieldAlert } from "lucide-react"

export default function GlobalError({
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html lang="en">
            <body>
                <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
                    <div className="flex flex-col items-center gap-6">
                        <div className="flex size-24 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                            <ShieldAlert className="size-12" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-10 font-normal leading-[1.2] text-ink">
                                Critical Error
                            </h1>
                            <p className="text-base leading-[1.4] text-ink-60 max-w-100">
                                A critical error occurred that prevented the application from loading.
                            </p>
                        </div>
                        <button
                            onClick={() => reset()}
                            className="flex cursor-pointer items-center gap-2 rounded-xl border-0 bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:bg-primary-dark"
                        >
                            <RotateCcw className="size-5" />
                            Restart Application
                        </button>
                    </div>
                </div>
            </body>
        </html>
    )
}
