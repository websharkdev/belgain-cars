import { Link } from '@/i18n/routing';

interface DemoPlaceholderPageProps {
  eyebrow: string;
  title: string;
  description: string;
  actionLabel: string;
  actionHref?: string;
}

export function DemoPlaceholderPage({
  eyebrow,
  title,
  description,
  actionLabel,
  actionHref = '/',
}: DemoPlaceholderPageProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted px-5 py-14">
      <section className="flex w-full max-w-120 flex-col gap-5 rounded-3xl bg-card p-8 text-center shadow-sm">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium uppercase tracking-wide text-primary">{eyebrow}</p>
          <h1 className="text-8 font-medium leading-10 text-ink">{title}</h1>
          <p className="text-base leading-6 text-ink-60">{description}</p>
        </div>
        <Link
          href={actionHref}
          className="mx-auto flex h-12 items-center rounded-full bg-primary px-6 text-base font-medium text-primary-foreground"
        >
          {actionLabel}
        </Link>
      </section>
    </main>
  );
}
