'use client';

import * as React from 'react';
import { Search, ShoppingBag, User } from 'lucide-react';
import { CartSheet } from '@/components/layout/cart/cart-sheet';
import { CatalogMenu } from '@/components/layout/catalog/catalog-menu';
import { Logo } from '@/components/layout/logo';
import { pageContainerClassName } from '@/components/layout/page-container';
import { PageOverlay } from '@/components/layout/page-overlay';
import { SearchSuggestionMenu } from '@/components/layout/search/search-suggestion-menu.custom';
import { Button } from '@/components/ui/button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import {
  headerCartSummary,
  headerSearchPlaceholder,
  headerSignInHref,
  type HeaderCartSummary,
} from '@/data/header';
import { Link, useRouter } from '@/i18n/routing';
import { headerSearchSchema } from '@/schemas/search.schema';
import { cn } from '@/lib/utils';

function HeaderShell({ children }: { children: React.ReactNode }) {
  return (
    <header className="border-border bg-background sticky top-0 z-50 w-full border-b">
      <div
        className={cn(
          pageContainerClassName,
          'bg-background relative flex h-22 items-center justify-start gap-7 self-stretch py-1.25',
        )}
      >
        {children}
      </div>
    </header>
  );
}

function HeaderLogo() {
  return (
    <Link href="/" className="shrink-0" aria-label="BCS Autoparts home">
      <Logo />
    </Link>
  );
}

interface HeaderSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function HeaderSearch({ open, onOpenChange }: HeaderSearchProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState('');
  const searchMenuId = React.useId();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const parsed = headerSearchSchema.safeParse({
      query: formData.get('query'),
    });

    if (!parsed.success) return;

    onOpenChange(false);
    router.push(`/?q=${encodeURIComponent(parsed.data.query)}`);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    onOpenChange(true);
  };

  const handleInputFocus = () => {
    onOpenChange(true);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      onOpenChange(false);
      event.currentTarget.blur();
    }
  };

  return (
    <>
      <form role="search" className="min-w-0 flex-1" onSubmit={handleSubmit}>
        <InputGroup className="bg-muted flex h-12 min-w-0 rounded-full border-0 pr-1 pl-5 shadow-none has-[[data-slot=input-group-control]:focus-visible]:ring-0">
          <InputGroupInput
            name="query"
            value={query}
            placeholder={headerSearchPlaceholder}
            aria-expanded={open}
            aria-controls={open ? searchMenuId : undefined}
            aria-haspopup="dialog"
            autoComplete="off"
            className="text-ink placeholder:text-ink-60 text-base leading-6"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyDown={handleInputKeyDown}
          />
          <InputGroupAddon align="inline-end" className="pr-1">
            <InputGroupButton
              type="submit"
              aria-label="Search catalog"
              className="bg-background hover:bg-background size-10 rounded-full"
            >
              <Search className="text-ink size-5.5" strokeWidth={1.5} />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </form>

      <SearchSuggestionMenu
        id={searchMenuId}
        open={open}
        query={query}
        onRequestClose={() => onOpenChange(false)}
      />
    </>
  );
}

function SignInButton() {
  return (
    <Button
      asChild
      variant="pillMuted"
      className="px-5"
      aria-label="Sign in to your account"
    >
      <Link href={headerSignInHref}>
        <User className="text-ink size-5" />
        <span className="text-ink pb-px text-sm leading-5 font-normal">
          Sign In
        </span>
      </Link>
    </Button>
  );
}

function CartButton({ cart }: { cart: HeaderCartSummary }) {
  return (
    <CartSheet
      cart={cart}
      trigger={
        <Button
          type="button"
          variant="pillMuted"
          aria-label={`Cart, ${cart.itemsCount} item, ${cart.total}`}
          className="relative px-5"
        >
          <ShoppingBag className="text-primary size-5" />
          <span className="gradient-text-cart pb-px text-sm leading-5 font-medium">
            {cart.total}
          </span>
          {cart.itemsCount > 0 ? (
            <span className="bg-danger text-primary-foreground absolute -top-1 right-0 flex size-4.5 items-center justify-center rounded-full border-2 border-white text-center text-[11px] leading-4 font-normal">
              {cart.itemsCount}
            </span>
          ) : null}
        </Button>
      }
    />
  );
}

function HeaderActions() {
  return (
    <div className="flex shrink-0 items-center gap-3">
      <SignInButton />
      <CartButton cart={headerCartSummary} />
    </div>
  );
}

export function Header() {
  const [catalogOpen, setCatalogOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);

  const handleCatalogOpenChange = (open: boolean) => {
    setCatalogOpen(open);
    if (open) setSearchOpen(false);
  };

  const handleSearchOpenChange = (open: boolean) => {
    setSearchOpen(open);
    if (open) setCatalogOpen(false);
  };

  const closeHeaderMenus = () => {
    setCatalogOpen(false);
    setSearchOpen(false);
  };

  return (
    <>
      <PageOverlay
        open={catalogOpen || searchOpen}
        onClose={closeHeaderMenus}
      />

      <HeaderShell>
        <HeaderLogo />
        <CatalogMenu
          open={catalogOpen}
          onOpenChange={handleCatalogOpenChange}
        />
        <HeaderSearch open={searchOpen} onOpenChange={handleSearchOpenChange} />
        <HeaderActions />
      </HeaderShell>
    </>
  );
}
