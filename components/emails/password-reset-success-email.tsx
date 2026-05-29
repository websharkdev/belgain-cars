interface PasswordResetSuccessEmailProps {
  email: string;
}

export function PasswordResetSuccessEmail({
  email,
}: PasswordResetSuccessEmailProps) {
  return (
    <div>
      <h1>Password changed successfully</h1>
      <p>
        The password for {email} was updated. If this was not you, contact
        support immediately.
      </p>
    </div>
  );
}
