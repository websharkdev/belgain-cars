'use client';

import * as React from 'react';

/** Figma artboard */
const CARD_WIDTH = 562;
const CARD_HEIGHT = 456;
/** Top-right cutout width — card body ends at CARD_WIDTH - NOTCH_WIDTH */
const NOTCH_WIDTH = 102;
const NOTCH_LEFT = CARD_WIDTH - NOTCH_WIDTH;

/** Card shape with 102px-wide top-right cutout. */
const HERO_SLIDER_SHAPE_PATH = `M${NOTCH_LEFT} 26C${NOTCH_LEFT} 43.6731 474.287 58 491.96 58H542C553.046 58 562 66.9543 562 78V436C562 447.046 553.046 456 542 456H20C8.95431 456 0 447.046 0 436V20C0 8.95431 8.95431 0 20 0H${NOTCH_LEFT - 20}C${NOTCH_LEFT - 9} 0 ${NOTCH_LEFT} 8.95431 ${NOTCH_LEFT} 20V26Z`;

/** Normalized to 0–1 for responsive clip-path scaling. */
const HERO_SLIDER_CLIP_PATH = `M${NOTCH_LEFT / CARD_WIDTH},${26 / CARD_HEIGHT} C${NOTCH_LEFT / CARD_WIDTH},${43.6731 / CARD_HEIGHT} ${474.287 / CARD_WIDTH},${58 / CARD_HEIGHT} ${491.96 / CARD_WIDTH},${58 / CARD_HEIGHT} H${542 / CARD_WIDTH} C${553.046 / CARD_WIDTH},${58 / CARD_HEIGHT} 1,${66.9543 / CARD_HEIGHT} 1,${78 / CARD_HEIGHT} V${436 / CARD_HEIGHT} C1,${447.046 / CARD_HEIGHT} ${553.046 / CARD_WIDTH},1 ${542 / CARD_WIDTH},1 H${20 / CARD_WIDTH} C${8.95431 / CARD_WIDTH},1 0,${447.046 / CARD_HEIGHT} 0,${436 / CARD_HEIGHT} V${20 / CARD_HEIGHT} C0,${8.95431 / CARD_HEIGHT} ${8.95431 / CARD_WIDTH},0 ${20 / CARD_WIDTH},0 H${(NOTCH_LEFT - 20) / CARD_WIDTH} C${(NOTCH_LEFT - 9) / CARD_WIDTH},0 ${NOTCH_LEFT / CARD_WIDTH},${8.95431 / CARD_HEIGHT} ${NOTCH_LEFT / CARD_WIDTH},${20 / CARD_HEIGHT} V${26 / CARD_HEIGHT} Z`;

/** Figma gradient overlay — skewed band across the card. */
const HERO_SLIDER_GRADIENT_PATH =
  'M31 240.885C32.4091 235.643 37.161 232 42.5886 232H579.919C588.503 232 594.311 240.751 590.976 248.661L564.418 311.661C562.543 316.109 558.186 319 553.36 319H25.6521C17.7577 319 12.014 311.508 14.0635 303.885L31 240.885Z';

function HeroSliderClipPath({ id }: { id: string }) {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute size-0 overflow-hidden"
    >
      <defs>
        <clipPath id={id} clipPathUnits="objectBoundingBox">
          <path d={HERO_SLIDER_CLIP_PATH} />
        </clipPath>
      </defs>
    </svg>
  );
}

function useHeroSliderClipPathId() {
  return React.useId().replace(/:/g, '');
}

export {
  CARD_HEIGHT,
  CARD_WIDTH,
  HERO_SLIDER_CLIP_PATH,
  HERO_SLIDER_GRADIENT_PATH,
  HERO_SLIDER_SHAPE_PATH,
  HeroSliderClipPath,
  NOTCH_LEFT,
  NOTCH_WIDTH,
  useHeroSliderClipPathId,
};
