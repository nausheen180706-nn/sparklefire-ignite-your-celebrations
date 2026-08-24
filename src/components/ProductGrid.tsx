import type { Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export function ProductGrid({
  products,
  columns = 4,
}: {
  products: Product[];
  columns?: 3 | 4;
}) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-champagne bg-card p-12 text-center">
        <h3 className="text-xl">No products found</h3>
        <p className="mt-2 text-sm text-brown-muted">
          Try adjusting your filters or exploring another category.
        </p>
      </div>
    );
  }

  return (
    <div
      className={
        columns === 3
          ? "grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3"
          : "grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4"
      }
    >
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
