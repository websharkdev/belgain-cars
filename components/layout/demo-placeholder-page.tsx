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
    <main className="bg-muted flex min-h-screen items-center justify-center px-5 py-14">
      <section className="bg-card flex w-full max-w-120 flex-col gap-5 rounded-3xl p-8 text-center shadow-sm">
        <div className="flex flex-col gap-2">
          <p className="text-primary text-sm font-medium tracking-wide uppercase">
            {eyebrow}
          </p>
          <h1 className="text-8 text-ink leading-10 font-medium">{title}</h1>
          <p className="text-ink-60 text-base leading-6">{description}</p>
        </div>
        <Link
          href={actionHref}
          className="bg-primary text-primary-foreground mx-auto flex h-12 items-center rounded-full px-6 text-base font-medium"
        >
          {actionLabel}
        </Link>
      </section>
    </main>
  );
}
