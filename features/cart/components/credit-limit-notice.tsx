export function CreditLimitNotice() {
  return (
    <div className="border-warning/10 bg-warning/5 rounded-2xl border px-5 py-3 text-sm leading-5">
      <span className="text-warning font-normal">Credit limit exceeded:</span>
      <br />
      <span className="text-ink-70">
        For your first order, your credit{' '}
        <span className="text-warning font-medium">limit is $1000</span>. This
        order is a bit over - add a partial payment to complete your purchase.
      </span>
    </div>
  );
}
