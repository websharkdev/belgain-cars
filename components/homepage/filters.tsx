'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VinSearchPanel } from '@/components/vin-search/vin-search-panel';
import {
  vehicleFilters,
  type VehicleFilterData,
} from '@/data/homepage-filters';
import { vehicleFilterSelectionSchema } from '@/schemas/vehicle-filter.schema';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

type FilterTabValue = 'make' | 'vin';

const FILTER_CONTENT_CLASS =
  'transition-opacity duration-200 ease-out motion-reduce:transition-none data-[state=active]:relative data-[state=active]:opacity-100 data-[state=inactive]:pointer-events-none data-[state=inactive]:absolute data-[state=inactive]:inset-x-0 data-[state=inactive]:top-0 data-[state=inactive]:opacity-0';

function FilterIcon({
  filter,
  disabled,
}: {
  filter: VehicleFilterData;
  disabled?: boolean;
}) {
  return (
    <ItemMedia
      variant="icon"
      className={cn(
        'shrink-0 rounded-full border p-1',
        disabled ? 'border-ink-10' : 'border-primary border-dashed',
      )}
    >
      <div
        className={cn(
          'flex items-center justify-center rounded-full p-1',
          disabled ? 'text-ink-40' : 'bg-primary text-primary-foreground',
        )}
      >
        {filter.icon}
      </div>
    </ItemMedia>
  );
}

function FilterTrigger({
  filter,
  label,
  selected,
  disabled,
}: {
  filter: VehicleFilterData;
  label: string;
  selected: boolean;
  disabled?: boolean;
}) {
  return (
    <DropdownMenuTrigger
      asChild
      disabled={disabled}
      className="pr-4! pl-1! disabled:cursor-not-allowed"
    >
      <Item
        asChild
        variant="default"
        size="xs"
        className={cn(
          'bg-muted h-12 w-full gap-2 rounded-full border-transparent py-0 pr-4 pl-1',
          disabled && 'cursor-not-allowed',
        )}
      >
        <Button
          type="button"
          variant="ghost"
          size="auto"
          disabled={disabled}
          aria-label={`Select ${filter.placeholder}`}
          className="hover:bg-muted/40 h-12 w-full items-center justify-start gap-2 rounded-full px-0 disabled:pointer-events-auto disabled:cursor-not-allowed disabled:opacity-100"
        >
          <FilterIcon filter={filter} disabled={disabled} />
          <ItemContent>
            <ItemTitle
              className={cn(
                'text-base leading-6 font-normal',
                disabled
                  ? 'text-ink-40'
                  : selected
                    ? 'text-foreground'
                    : 'text-ink',
              )}
            >
              {label}
            </ItemTitle>
          </ItemContent>
          <ItemActions>
            <ChevronDown
              className={cn(
                'size-4 transition-transform group-data-[state=open]:rotate-180',
                disabled ? 'text-ink-30' : 'text-ink-40',
              )}
            />
          </ItemActions>
        </Button>
      </Item>
    </DropdownMenuTrigger>
  );
}

function FilterDropdown({
  filter,
  value,
  onSelect,
  disabled,
  hasConnector,
}: {
  filter: VehicleFilterData;
  value?: string;
  onSelect: (filterId: string, value: string) => void;
  disabled?: boolean;
  hasConnector?: boolean;
}) {
  const selectedOption = filter.options.find((o) => o.value === value);
  const label = selectedOption?.label ?? filter.placeholder;

  return (
    <div
      className={cn(
        'relative w-full',
        hasConnector &&
          'after:bg-ink-05 after:pointer-events-none after:absolute after:top-full after:left-6 after:h-5 after:w-0.5 after:rounded-full after:content-[""]',
      )}
    >
      <DropdownMenu>
        <FilterTrigger
          filter={filter}
          label={label}
          selected={Boolean(selectedOption)}
          disabled={disabled}
        />
        <DropdownMenuContent
          align="start"
          sideOffset={8}
          className="rounded-xl p-1.5"
        >
          {filter.options.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onSelect={() => onSelect(filter.id, option.value)}
              className={cn(
                'rounded-2.5 text-ink h-10 px-3 text-sm',
                option.value === value && 'bg-muted text-primary font-medium',
              )}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function MakeFilterList({ activeTab }: { activeTab: FilterTabValue }) {
  const [selection, setSelection] = React.useState<Record<string, string>>({});

  const handleSelect = (filterId: string, value: string) => {
    const filterIndex = vehicleFilters.findIndex((f) => f.id === filterId);

    // Keep selections before this filter, set this one, clear all after
    const nextSelection: Record<string, string> = {};
    vehicleFilters.slice(0, filterIndex).forEach((f) => {
      if (selection[f.id]) nextSelection[f.id] = selection[f.id];
    });
    nextSelection[filterId] = value;

    const parsed = vehicleFilterSelectionSchema.safeParse(nextSelection);
    if (!parsed.success) return;
    setSelection(parsed.data);
  };

  return (
    <TabsContent
      forceMount
      value="make"
      inert={activeTab !== 'make' ? true : undefined}
      aria-hidden={activeTab !== 'make'}
      className={cn(FILTER_CONTENT_CLASS, 'flex w-full flex-col gap-5')}
    >
      {vehicleFilters.map((filter, index) => {
        const disabled = index > 0 && !selection[vehicleFilters[index - 1].id];
        return (
          <FilterDropdown
            key={filter.id}
            filter={filter}
            value={selection[filter.id]}
            onSelect={handleSelect}
            disabled={disabled}
            hasConnector={index < vehicleFilters.length - 1}
          />
        );
      })}
    </TabsContent>
  );
}

export function Filters() {
  const [activeTab, setActiveTab] = React.useState<FilterTabValue>('make');

  return (
    <div className="col-span-full flex h-114 w-full flex-col gap-5 xl:col-span-4">
      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          if (value === 'make' || value === 'vin') setActiveTab(value);
        }}
        className="flex min-h-0 w-full flex-1 flex-col gap-5"
      >
        <TabsList className="bg-muted h-12 w-full gap-1 rounded-full p-1">
          <TabsTrigger
            value="make"
            className="text-ink-60 data-active:bg-card data-active:text-foreground h-10 flex-1 rounded-lg px-5 py-2 text-base leading-6 font-medium data-active:rounded-full data-active:shadow-none"
          >
            By Make
          </TabsTrigger>
          <TabsTrigger
            value="vin"
            className="text-ink-60 data-active:bg-card data-active:text-foreground h-10 flex-1 rounded-lg px-5 py-2 text-base leading-6 font-medium data-active:rounded-full data-active:shadow-none"
          >
            VIN Code
          </TabsTrigger>
        </TabsList>

        <div className="relative min-h-0 flex-1">
          <MakeFilterList activeTab={activeTab} />

          <TabsContent
            forceMount
            value="vin"
            inert={activeTab !== 'vin' ? true : undefined}
            aria-hidden={activeTab !== 'vin'}
            className={cn(
              FILTER_CONTENT_CLASS,
              'flex min-h-0 flex-1 flex-col gap-5',
            )}
          >
            <VinSearchPanel />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
