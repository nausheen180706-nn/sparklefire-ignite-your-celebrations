import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/data/products";
import { Rating } from "@/components/Rating";
import { PriceDisplay } from "@/components/PriceDisplay";
import { useShop } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const wished = isWishlisted(product.id);
  const inStock = product.stock > 0;

  return (
    <article className="group card-lift relative flex flex-col overflow-hidden rounded-2xl border border-champagne/70 bg-card shadow-soft">
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="relative block aspect-square overflow-hidden bg-cream"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-gradient-gold px-2.5 py-1 text-[11px] font-bold text-brown shadow-soft">
            -{product.discount}%
          </span>
        )}
        {!inStock && (
          <span className="absolute inset-x-0 bottom-0 bg-brown/80 py-1.5 text-center text-xs font-semibold text-ivory">
            Out of Stock
          </span>
        )}
      </Link>

      <button
        type="button"
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        onClick={() => toggleWishlist(product.id)}
        className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-champagne bg-card/90 text-brown-muted backdrop-blur transition hover:text-gold-deep"
      >
        <Heart className={cn("h-4 w-4", wished && "fill-gold text-gold")} />
      </button>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link
          to="/product/$id"
          params={{ id: product.id }}
          className="line-clamp-1 font-semibold text-brown transition-colors hover:text-gold-deep"
        >
          {product.name}
        </Link>
        <Rating value={product.rating} count={product.reviewCount} />
        <PriceDisplay
          price={product.price}
          originalPrice={product.originalPrice}
          discount={product.discount}
        />
        <button
          type="button"
          disabled={!inStock}
          onClick={() => addToCart(product.id)}
          className="shimmer-btn mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-gold px-4 py-2.5 text-sm font-semibold text-brown transition disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ShoppingBag className="h-4 w-4" />
          {inStock ? "Add to Cart" : "Notify Me"}
        </button>
      </div>
    </article>
  );
}
