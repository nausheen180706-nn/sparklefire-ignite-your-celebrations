import { Minus, Plus } from "lucide-react";

export function QuantitySelector({
  value,
  onChange,
  max = 99,
}: {
  value: number;
  onChange: (next: number) => void;
  max?: number;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-champagne bg-card">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(1, value - 1))}
        className="grid h-9 w-9 place-items-center rounded-full text-brown transition hover:text-gold-deep"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-10 text-center text-sm font-semibold text-brown">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="grid h-9 w-9 place-items-center rounded-full text-brown transition hover:text-gold-deep"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
