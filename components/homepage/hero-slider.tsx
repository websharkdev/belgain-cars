'use client';

import * as React from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import {
  HeroSliderClipPath,
  HERO_SLIDER_GRADIENT_PATH,
  useHeroSliderClipPathId,
} from '@/components/homepage/hero-slider-clip-path';
import { heroSlides, type HeroSlideData } from '@/data/homepage';

function HeroSlideBackground({ slide }: { slide: HeroSlideData }) {
  return (
    <motion.div
      key={slide.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="absolute inset-0"
    >
      <Image
        src={slide.image}
        alt=""
        fill
        priority={slide.id === 1}
        sizes="(min-width: 1280px) 562px, 100vw"
        className="object-cover"
      />
    </motion.div>
  );
}

function HeroGradientOverlay({ gradientId }: { gradientId: string }) {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10 size-full"
      viewBox="0 0 562 456"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="32.5486"
          y1="275.5"
          x2="548.631"
          y2="275.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--danger)" stopOpacity="0.4" />
          <stop offset="1" stopColor="var(--danger)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={HERO_SLIDER_GRADIENT_PATH} fill={`url(#${gradientId})`} />
    </svg>
  );
}

function HeroSlideCopy({ slide }: { slide: HeroSlideData }) {
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="absolute top-50.75 left-10 z-20 w-127.75"
        >
          <CardTitle className="text-5xl leading-13.25 font-medium text-white">
            {slide.title}
          </CardTitle>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.p
          key={`${slide.id}-subtitle`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="absolute top-83 left-10 w-96 text-base leading-6 font-normal text-white"
        >
          {slide.subtitle}
        </motion.p>
      </AnimatePresence>

      <Button
        variant="pillSurface"
        className="absolute top-93.5 left-10 z-20 h-10.5 w-27.25 text-sm leading-5 font-medium"
      >
        {slide.ctaLabel}
      </Button>
    </>
  );
}

function HeroSliderProgress({
  slides,
  current,
  onSelect,
}: {
  slides: HeroSlideData[];
  current: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="absolute right-5 bottom-5 z-20 flex h-1 w-50 gap-1.5">
      {slides.map((slide, index) => (
        <Button
          key={slide.id}
          type="button"
          aria-label={`Go to slide ${index + 1}`}
          onClick={() => onSelect(index)}
          variant="heroProgress"
          className="relative h-1"
        >
          {index === current ? (
            <motion.span
              layoutId="hero-slider-indicator"
              className="rounded-0.5 absolute top-0 left-0 h-1 w-full bg-white"
            />
          ) : null}
        </Button>
      ))}
    </div>
  );
}

function HeroSliderControls({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="border-ink-08 bg-background absolute top-0 right-0 z-30 flex h-11.75 w-23 items-center justify-center gap-6 rounded-full border">
      <Button
        variant="heroControl"
        onClick={onPrev}
        aria-label="Previous slide"
      >
        <ArrowLeft className="size-3.5" strokeWidth={1.83} />
      </Button>
      <Button variant="heroControl" onClick={onNext} aria-label="Next slide">
        <ArrowRight className="size-3.5" strokeWidth={1.83} />
      </Button>
    </div>
  );
}

export function HeroSlider() {
  const clipPathId = useHeroSliderClipPathId();
  const gradientId = `${clipPathId}-gradient`;
  const [current, setCurrent] = React.useState(0);
  const activeSlide = heroSlides[current];

  const handleNext = () => setCurrent((prev) => (prev + 1) % heroSlides.length);
  const handlePrev = () =>
    setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <Card
      variant="ghost"
      className="relative col-span-full h-114 w-full overflow-visible xl:col-span-5"
    >
      <HeroSliderClipPath id={clipPathId} />

      <div
        className="absolute inset-0"
        style={{ clipPath: `url(#${clipPathId})` }}
      >
        <AnimatePresence mode="wait">
          <HeroSlideBackground slide={activeSlide} />
        </AnimatePresence>
        <HeroGradientOverlay gradientId={gradientId} />
        <HeroSlideCopy slide={activeSlide} />
        <HeroSliderProgress
          slides={heroSlides}
          current={current}
          onSelect={setCurrent}
        />
      </div>

      <HeroSliderControls onPrev={handlePrev} onNext={handleNext} />
    </Card>
  );
}
