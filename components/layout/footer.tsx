import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  footerColumns,
  footerContacts,
  footerSocialLinks,
  newsletterCta,
  type ContactLinkData,
  type NavLinkData,
} from '@/data/layout';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { Logo } from './logo';
import { pageContainerClassName } from './page-container';

function FooterLink({ link }: { link: NavLinkData }) {
  return (
    <Button asChild variant="linkInverse" size="auto">
      <Link href={link.href ?? '#'}>{link.label}</Link>
    </Button>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: NavLinkData[];
}) {
  return (
    <div className="flex min-w-0 flex-col items-start gap-3">
      <h4 className="text-sm leading-5 font-medium text-white">{title}</h4>
      <div className="flex flex-col items-start gap-1.5">
        {links.map((link) => (
          <FooterLink key={link.label} link={link} />
        ))}
      </div>
    </div>
  );
}

function ContactBlock({ contact }: { contact: ContactLinkData }) {
  const valueClassName = cn(
    'h-max text-sm leading-5 font-medium text-white',
    contact.kind === 'email' && 'lowercase',
  );

  return (
    <div className="flex flex-col items-start gap-1.5">
      <span className="text-xs leading-5 font-normal text-white/60">
        {contact.label}
      </span>
      {contact.href ? (
        <Button
          asChild
          variant="linkInverseStrong"
          size="auto"
          className={valueClassName}
        >
          <a href={contact.href}>{contact.value}</a>
        </Button>
      ) : (
        <span className={valueClassName}>{contact.value}</span>
      )}
    </div>
  );
}

export function Footer() {
  const NewsletterIcon = newsletterCta.icon;

  return (
    <footer className="bg-ink border-t border-white/5 text-white">
      <div
        className={cn(
          pageContainerClassName,
          'flex min-h-max w-full flex-col pt-14.5 pb-5',
        )}
      >
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <Logo variant="white" />

          <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
            <p className="text-sm leading-5 font-medium text-white">
              {newsletterCta.title}
              <br />
              {newsletterCta.subtitle}
            </p>

            <Button
              size="lg"
              variant="pillGradient"
              className="h-12 gap-2 py-3 pr-5 pl-4 text-base leading-6 font-medium"
            >
              <NewsletterIcon className="size-5" />
              <span className="text-base leading-6 font-medium text-white">
                {newsletterCta.label}
              </span>
            </Button>
          </div>
        </div>

        <Separator className="mt-8 bg-white/10" />

        <div className="grid grid-cols-1 gap-12 pt-10 pb-10.5 sm:grid-cols-2 lg:grid-cols-4">
          {footerColumns.map((column) => (
            <FooterColumn
              key={column.title}
              title={column.title}
              links={column.links}
            />
          ))}

          <div className="flex min-w-0 flex-col items-start gap-3">
            <h4 className="text-sm leading-5 font-medium text-white">
              Contacts
            </h4>
            <div className="flex flex-col items-start gap-3">
              {footerContacts.map((contact) => (
                <ContactBlock key={contact.label} contact={contact} />
              ))}
            </div>
          </div>
        </div>

        <Separator className="bg-white/10" />

        <div className="flex flex-col items-start justify-between gap-5 pt-5 text-sm leading-5 text-white/60 sm:flex-row sm:items-center">
          <span className="line-clamp-1">
            ©BCS AUTOPARTS 2026. All rights reserved.
          </span>

          <div className="flex items-center gap-2">
            {footerSocialLinks.map(({ label, href, icon: Icon }) => (
              <Button
                key={label}
                asChild
                aria-label={label}
                size="icon-lg"
                variant="iconSoftInverse"
              >
                <a href={href}>
                  <Icon className="size-5" />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
