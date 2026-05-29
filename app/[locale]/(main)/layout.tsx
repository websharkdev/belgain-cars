import * as React from 'react';
import { TopBar } from '@/components/layout/top-bar';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background flex min-h-screen w-full flex-col">
      <TopBar />
      <Header />
      <main className="flex w-full flex-1 flex-col items-center">
        {children}
      </main>
      <Footer />
    </div>
  );
}
