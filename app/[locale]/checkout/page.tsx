import { DemoPlaceholderPage } from '@/components/layout/demo-placeholder-page';
import { requireUser } from '@/lib/auth-session';

export default async function CheckoutPage() {
  await requireUser();

  return (
    <DemoPlaceholderPage
      eyebrow="Checkout"
      title="Checkout flow is protected"
      description="Only registered and signed-in users can access order checkout."
      actionLabel="Continue shopping"
    />
  );
}
