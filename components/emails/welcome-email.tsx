interface WelcomeEmailProps {
  name?: string | null;
}

export function WelcomeEmail({ name }: WelcomeEmailProps) {
  return (
    <div>
      <h1>Welcome to SupplierPortal</h1>
      <p>Hi {name || 'there'}, your account is ready.</p>
    </div>
  );
}
