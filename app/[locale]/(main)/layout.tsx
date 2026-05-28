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
    <div className="flex flex-col min-h-screen w-full bg-background">
      <TopBar />
      <Header />
      <main className="flex-1 flex flex-col items-center w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}
