'use client';

import { ChevronDown } from 'lucide-react';
import { pageContainerClassName } from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { topBarLinks, topBarLocales, topBarPhone } from '@/data/layout';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

export function TopBar() {
  return (
    <div className="border-ink-08 bg-muted relative z-50 w-full border-b">
      <div
        className={cn(
          pageContainerClassName,
          'flex h-9.75 items-center justify-between gap-7 self-stretch py-2',
        )}
      >
        <nav aria-label="Secondary" className="flex flex-row items-center gap-6">
          {topBarLinks.map((link) => (
            <Button key={link.label} variant="linkMuted" size="auto" asChild>
              <Link href={link.href ?? '#'}>{link.label}</Link>
            </Button>
          ))}
        </nav>

        <div className="flex h-full flex-row items-center gap-6">
          <Button asChild variant="linkMuted" size="auto" className="text-3.75 font-semibold">
            <a href={topBarPhone.href}>{topBarPhone.label}</a>
          </Button>

          <Separator orientation="vertical" className="bg-ink-10 h-4 self-center" />

          {topBarLocales.map((locale) => (
            <Button key={locale} variant="linkMuted" size="auto" className="gap-0.5">
              {locale}
              <ChevronDown className="size-3" data-icon="inline-end" />
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
