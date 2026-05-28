'use client';

import { Toaster } from '@/components/ui/sonner';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';
import { EASE_EXPO_OUT } from '@/lib/animations.lib';

const MainProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();

  return (
    <NuqsAdapter>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12, scale: 0.99 }}
          transition={{
            duration: 0.55,
            ease: EASE_EXPO_OUT,
            opacity: { duration: 0.3, ease: EASE_EXPO_OUT },
          }}
          className="flex h-full w-full flex-col"
        >
          {children}
        </motion.div>
      </AnimatePresence>
      <Toaster />
    </NuqsAdapter>
  );
};

export default MainProvider;
