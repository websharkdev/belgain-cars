export const EASE_EXPO_OUT = [0.16, 1, 0.3, 1] as const; // smooth deceleration
export const EASE_AWWWARDS = [0.22, 1, 0.36, 1] as const; // slightly bouncier deceleration
export const EASE_AWWWARDS_EXIT = [0.55, 0, 1, 0.45] as const; // sharp acceleration out
export const EASE_MAGNETIC = [0.23, 1, 0.32, 1] as const; // elastic follow-through
export const EASE_BACK_OUT = [0.34, 1.56, 0.64, 1] as const; // overshoot then settle
export const EASE_SILK = [0.52, 0.01, 0.16, 1] as const; // silky late deceleration
export const EASE_EXPO_IN_OUT = [0.87, 0, 0.13, 1] as const; // symmetric expo

export const LIST_ITEM_VARIANTS = {
  initial: { opacity: 0, height: 0, marginBottom: 0 },
  animate: {
    opacity: 1,
    height: 'auto',
    marginBottom: 0,
    transition: { duration: 0.24, ease: EASE_AWWWARDS },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.16, ease: EASE_AWWWARDS_EXIT },
  },
} as const;

export const UPLOAD_ZONE_HOVER = {
  whileHover: {
    scale: 1.005,
    transition: { duration: 0.2, ease: EASE_EXPO_OUT },
  },
} as const;

export const createReveal = (
  transition: Record<string, unknown>,
  delay = 0,
) => ({
  initial: { opacity: 0, y: '14px', scale: 0.99, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0)' },
  exit: { opacity: 0, y: '-6px', scale: 0.995, filter: 'blur(4px)' },
  transition: { ...transition, delay },
});

// Generic stagger container factory: children animate in sequence
// enterTransition/exitTransition come from the caller's timing system
export const createStaggerContainer = (
  enterTransition: Record<string, unknown>,
  exitTransition: Record<string, unknown>,
  delay: number,
) => ({
  initial: { opacity: 0, y: '14px', scale: 0.99, filter: 'blur(6px)' },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0)',
    transition: {
      ...enterTransition,
      delay,
      delayChildren: 0.025,
      staggerChildren: 0.035,
    },
  },
  exit: {
    opacity: 0,
    y: '-6px',
    scale: 0.995,
    filter: 'blur(4px)',
    transition: {
      ...exitTransition,
      staggerChildren: 0.018,
      staggerDirection: -1,
    },
  },
});
