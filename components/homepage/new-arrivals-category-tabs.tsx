'use client';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HomepageCategoryTabData } from '@/data/homepage';
import { useDragScroll } from '@/hooks/use-drag-scroll';
import { EASE_AWWWARDS } from '@/lib/animations.lib';
import { cn } from '@/lib/utils';
import { LayoutGroup, motion } from 'motion/react';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';

interface NewArrivalsCategoryTabsProps {
  tabs: HomepageCategoryTabData[];
  activeTab: string;
}

function NewArrivalsTabTrigger({
  tab,
  isActive,
}: {
  tab: HomepageCategoryTabData;
  isActive: boolean;
}) {
  return (
    <TabsTrigger
      value={tab.value}
      className={cn(
        'group/tab relative h-full flex-1 rounded-lg border-0 bg-transparent p-0 shadow-none',
        'font-medium after:hidden',
        'focus-visible:ring-0 focus-visible:outline-none',
        isActive ? 'text-ink' : 'text-ink-60 hover:text-ink',
        'data-active:text-ink data-active:bg-transparent',
      )}
    >
      {isActive ? (
        <motion.span
          layoutId="new-arrivals-active-tab"
          className="bg-background absolute inset-0 rounded-full"
          transition={{ duration: 0.28, ease: EASE_AWWWARDS }}
        />
      ) : null}

      <span
        className={cn(
          'relative z-10 inline-flex items-center justify-center gap-1.5 px-4.5 py-2.5 text-sm leading-5',
        )}
      >
        {tab.badge ? (
          <span className="bg-danger text-primary-foreground flex h-6 w-11 shrink-0 items-center justify-center rounded-full text-xs leading-4 font-medium">
            {tab.badge}
          </span>
        ) : null}
        <span>{tab.label}</span>
      </span>
    </TabsTrigger>
  );
}

function NewArrivalsCategoryTabs({
  tabs,
  activeTab,
}: NewArrivalsCategoryTabsProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { attach, isDragging } = useDragScroll();

  const { isIntersecting: isLastTabIntersecting, ref: lastTabRef } =
    useIntersectionObserver({
      threshold: 0.1,
    });

  const { isIntersecting: isFirstTabIntersecting, ref: firstTabRef } =
    useIntersectionObserver({
      threshold: 0.1,
    });

  useLayoutEffect(() => {
    const viewport = scrollAreaRef.current?.querySelector(
      '[data-slot=scroll-area-viewport]',
    ) as HTMLElement | null;

    return attach(viewport ?? null);
  }, [attach]);

  useEffect(() => {
    const activeTrigger = scrollAreaRef.current?.querySelector(
      `[data-slot=tabs-trigger][data-state="active"]`,
    ) as HTMLElement | null;

    activeTrigger?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [activeTab]);

  return (
    <div
      ref={scrollAreaRef}
      className="relative w-full overflow-hidden rounded-full"
    >
      <ScrollArea
        className={cn(
          'w-full touch-pan-x',
          '**:data-[slot=scroll-area-viewport]:cursor-grab',
          isDragging && '**:data-[slot=scroll-area-viewport]:cursor-grabbing',
          '**:data-[slot=scroll-area-viewport]:select-none',
          '**:data-[slot=scroll-area-scrollbar]:hidden',
        )}
      >
        <TabsList
          className={cn(
            'bg-muted h-auto min-w-max justify-start gap-1 rounded-full p-1',
            '**:data-[slot=tabs-trigger]:flex-none',
          )}
        >
          <LayoutGroup id="new-arrivals-tabs">
            {tabs.map((tab, index) => (
              <span
                ref={
                  index === tabs.length - 1
                    ? lastTabRef
                    : index === 1
                      ? firstTabRef
                      : null
                }
                key={tab.value}
              >
                {tab.separatorBefore ? (
                  <Separator
                    orientation="vertical"
                    className="bg-ink/5 mx-auto h-[calc(100%-24px)] self-center!"
                  />
                ) : null}
                <NewArrivalsTabTrigger
                  tab={tab}
                  isActive={tab.value === activeTab}
                />
              </span>
            ))}
          </LayoutGroup>
        </TabsList>
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
      {!isLastTabIntersecting ? (
        <div
          aria-hidden
          className="from-muted/0 to-muted pointer-events-none absolute top-0 right-0 z-10 size-12 bg-linear-to-r from-15% to-85%"
        />
      ) : null}
      {!isFirstTabIntersecting ? (
        <div
          aria-hidden
          className="from-muted/0 to-muted pointer-events-none absolute top-0 left-0 z-10 size-12 bg-linear-to-l from-15% to-85%"
        />
      ) : null}
    </div>
  );
}

export { NewArrivalsCategoryTabs };
