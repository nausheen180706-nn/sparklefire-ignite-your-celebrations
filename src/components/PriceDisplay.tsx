import { formatPrice } from "@/data/products";
import { cn } from "@/lib/utils";

export function PriceDisplay({
  price,
  originalPrice,
  discount,
  className,
  size = "md",
}: {
  price: number;
  originalPrice?: number;
  discount?: number;
  className?: string;
  size?: "md" | "lg";
}) {
  return (
    <div className={cn("flex flex-wrap items-baseline gap-2", className)}>
      <span
        className={cn(
          "font-semibold text-gold-deep",
          size === "lg" ? "text-3xl" : "text-base",
        )}
      >
        {formatPrice(price)}
      </span>
      {originalPrice && originalPrice > price && (
        <span className="text-xs text-brown-muted line-through">{formatPrice(originalPrice)}</span>
      )}
      {discount ? (
        <span className="rounded-full bg-champagne/50 px-2 py-0.5 text-[11px] font-semibold text-brown">
          -{discount}%
        </span>
      ) : null}
    </div>
  );
}
