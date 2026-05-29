interface CartTotalRowProps {
  total: string;
}

export function CartTotalRow({ total }: CartTotalRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-ink text-base leading-6 font-normal">Total</span>
      <span className="text-ink text-right text-base leading-6 font-semibold">
        {total}
      </span>
    </div>
  );
}
