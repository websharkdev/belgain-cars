import { cn } from '@/lib/utils';

const authInputVariants = {
  state: {
    default:
      'border-transparent bg-muted text-ink placeholder:text-ink-40 focus-visible:border-transparent focus-visible:ring-3 focus-visible:ring-primary/15',
    error:
      'border-danger/40 bg-danger/5 text-ink placeholder:text-ink-40 focus-visible:border-danger/40 focus-visible:ring-3 focus-visible:ring-danger/15',
  },
};

export type AuthInputState = keyof typeof authInputVariants.state;

export function getAuthInputClassName(state: AuthInputState) {
  return cn(
    'h-12 w-full min-w-0 rounded-full border px-4 py-3 text-base leading-6 outline-none transition-colors md:text-base',
    authInputVariants.state[state],
  );
}
