'use client';

import { ClipboardList, LogOut, User } from 'lucide-react';
import { SignInModalForm } from '@/features/auth/sign-in-modal.form';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { headerOrdersHref, headerProfileHref } from '@/data/header';
import { useSessionUser } from '@/hooks/use-session-user';
import { useSignOut } from '@/hooks/use-sign-out';
import { Link } from '@/i18n/routing';
import { useSession } from '@/lib/auth-client';
import { cn } from '@/lib/utils';

const menuItemClassName =
  'h-12 gap-3 rounded-[20px] px-4 py-3 text-base leading-6 font-medium focus:bg-muted data-[variant=destructive]:text-danger data-[variant=destructive]:focus:bg-danger/10 data-[variant=destructive]:*:[svg]:text-danger';

function SignInButton() {
  return <SignInModalForm />;
}

function UserAccountMenuContent() {
  const signOut = useSignOut();

  return (
    <DropdownMenuContent
      align="end"
      sideOffset={8}
      className={cn(
        'border-ink-10 w-64 gap-0.5 rounded-3xl border p-1 shadow-[0px_7px_16px_0px_rgba(178,174,174,0.10),0px_30px_30px_0px_rgba(178,174,174,0.09),0px_67px_40px_0px_rgba(178,174,174,0.05)]',
        'ring-0',
      )}
    >
      <DropdownMenuItem asChild className={cn(menuItemClassName, 'text-ink')}>
        <Link href={headerProfileHref}>
          <User className="size-5" strokeWidth={1.5} />
          <span className="line-clamp-1">Profile</span>
        </Link>
      </DropdownMenuItem>

      <DropdownMenuItem
        asChild
        className={cn(menuItemClassName, 'text-ink-80')}
      >
        <Link href={headerOrdersHref}>
          <ClipboardList className="size-5" strokeWidth={1.5} />
          <span className="line-clamp-1">My orders</span>
        </Link>
      </DropdownMenuItem>

      <DropdownMenuSeparator className="bg-ink-10 mx-0 my-2 h-px" />

      <DropdownMenuItem
        variant="destructive"
        className={menuItemClassName}
        onSelect={(event) => {
          event.preventDefault();
          void signOut();
        }}
      >
        <LogOut className="size-5" strokeWidth={1.5} />
        <span className="line-clamp-1">Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}

export function HeaderUserMenu() {
  const { data, isPending } = useSession();
  const { user } = useSessionUser();

  if (isPending) {
    return <SignInButton />;
  }

  if (!data?.user) {
    return <SignInButton />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="pillMuted"
          aria-label={`Account menu for ${user.compactName}`}
          className="px-4"
        >
          <User className="text-ink size-5" strokeWidth={1.5} />
          <span className="text-ink pb-px text-sm leading-5 font-normal">
            {user.compactName}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <UserAccountMenuContent />
    </DropdownMenu>
  );
}
