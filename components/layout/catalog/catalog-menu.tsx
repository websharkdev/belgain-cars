'use client';

import * as React from 'react';
import { CatalogMenuPanel } from '@/components/layout/catalog/catalog-menu-panel';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface CatalogMenuProps {
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const CATALOG_MENU_VALUE = 'CatalogMenu';

const CATALOG_GRID_ICON_PATHS = [
  { x: 3, y: 3 },
  { x: 14, y: 3 },
  { x: 14, y: 14 },
  { x: 3, y: 14 },
] as const;

function CatalogLayoutGridIcon({ className }: { className?: string }) {
  const gradientId = React.useId();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={cn('size-4.5! shrink-0', className)}
    >
      <defs>
        <linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          x1="5.23"
          y1="21.91"
          x2="18.77"
          y2="2.09"
        >
          <stop offset="6.75%" stopColor="var(--danger)" />
          <stop offset="100%" stopColor="var(--primary)" />
        </linearGradient>
      </defs>
      {CATALOG_GRID_ICON_PATHS.map(({ x, y }) => (
        <rect
          key={`${x}-${y}`}
          width="7"
          height="7"
          x={x}
          y={y}
          rx="1"
          stroke={`url(#${gradientId})`}
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}

function CatalogMenu({
  className,
  open = false,
  onOpenChange,
}: CatalogMenuProps) {
  return (
    <NavigationMenu
      viewport={false}
      value={open ? CATALOG_MENU_VALUE : ''}
      onValueChange={(value) => onOpenChange?.(value === CATALOG_MENU_VALUE)}
      className={cn(
        '!static z-50 hidden w-max flex-none md:flex [&>div]:!static',
        className,
      )}
    >
      <NavigationMenuList className="gap-0">
        <NavigationMenuItem value={CATALOG_MENU_VALUE} className="!static">
          <NavigationMenuTrigger
            className={cn(
              'h-12 w-36.25 items-center gap-2 rounded-full border-none bg-linear-112 from-cyan-700/10 to-red-800/10 px-4.5',
              'text-base font-medium text-white hover:opacity-90',
              'data-open:opacity-90 data-popup-open:opacity-90',
              'focus:bg-linear-to-br focus:hover:bg-linear-to-br',
            )}
            icon={<ChevronDown className="flex-1 text-primary" />}
          >
            <div className="flex items-center gap-2">
              <CatalogLayoutGridIcon />
              <span className="gradient-text-catalog">Catalog</span>
            </div>
          </NavigationMenuTrigger>

          <NavigationMenuContent
            className={cn(
              '!absolute top-full right-5 left-5 z-50 !mt-0 !w-auto max-w-none overflow-hidden !rounded-t-none rounded-b-3xl bg-popover p-0 md:right-5 md:left-5 md:!w-auto',
              'ring-ink/5 shadow-none ring-1',
              'data-[motion^=from-]:fade-in-0 data-[motion^=to-]:fade-out-0',
            )}
          >
            <CatalogMenuPanel />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export { CatalogMenu };
