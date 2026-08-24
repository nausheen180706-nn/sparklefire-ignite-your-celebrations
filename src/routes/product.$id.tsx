import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { toast } from "sonner";
import { categoryName, formatPrice, getProduct, products } from "@/data/products";
import { Rating } from "@/components/Rating";
import { PriceDisplay } from "@/components/PriceDisplay";
import { QuantitySelector } from "@/components/QuantitySelector";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { useShop } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product not found — SparkleFire" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} — SparkleFire` },
        { name: "description", content: product.description.slice(0, 155) },
        { property: "og:title", content: `${product.name} — SparkleFire` },
        { property: "og:description", content: product.description.slice(0, 155) },
      ],
    };
  },
  component: ProductPage,
});

const packs = ["Single Pack", "Family Pack (3x)", "Party Pack (5x)"];

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart } = useShop();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [pack, setPack] = useState(packs[0]);
  const [activeImage, setActiveImage] = useState(0);
  const [pincode, setPincode] = useState("");
  const [pinResult, setPinResult] = useState<string | null>(null);

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const checkPin = () => {
    if (!/^\d{6}$/.test(pincode)) {
      setPinResult("Please enter a valid 6-digit pincode.");
      return;
    }
    setPinResult("Delivery available — expected in 3–5 business days.");
  };

  const buyNow = () => {
    addToCart(product.id, qty);
    navigate({ to: "/checkout" });
  };

  return (
    <div className="animate-rise mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <nav className="mb-6 flex flex-wrap items-center gap-1 text-xs text-brown-muted">
        <Link to="/" className="hover:text-gold-deep">
          Home
        </Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-gold-deep">
          Shop
        </Link>
        <span>/</span>
        <Link to="/shop" search={{ category: product.category }} className="hover:text-gold-deep">
          {categoryName(product.category)}
        </Link>
        <span>/</span>
        <span className="text-brown">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-3xl border border-champagne bg-cream shadow-soft">
            <img
              src={product.image}
              alt={product.name}
              width={800}
              height={800}
              className="aspect-square w-full object-cover"
            />
          </div>
          <div className="mt-4 flex gap-3">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImage(i)}
                aria-label={`View image ${i + 1}`}
                className={cn(
                  "h-20 w-20 overflow-hidden rounded-xl border bg-cream transition",
                  activeImage === i ? "border-gold shadow-gold" : "border-champagne",
                )}
              >
                <img
                  src={product.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h1 className="font-serif text-3xl font-bold text-brown md:text-4xl">{product.name}</h1>
          <div className="mt-3">
            <Rating value={product.rating} count={product.reviewCount} size={16} />
          </div>
          <PriceDisplay
            className="mt-4"
            size="lg"
            price={product.price}
            originalPrice={product.originalPrice}
            discount={product.discount}
          />
          <p
            className={cn(
              "mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
              product.stock > 0
                ? "bg-success/15 text-success"
                : "bg-destructive/10 text-destructive",
            )}
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            {product.stock > 0 ? `In Stock (${product.stock} left)` : "Out of Stock"}
          </p>

          <p className="mt-5 text-sm leading-relaxed text-brown-muted">{product.description}</p>

          <div className="mt-6 space-y-5 rounded-2xl border border-champagne/70 bg-card p-5 shadow-soft">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-sm font-semibold text-brown">Quantity</span>
              <QuantitySelector value={qty} onChange={setQty} />
            </div>

            <div>
              <span className="text-sm font-semibold text-brown">Pack Selection</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {packs.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPack(p)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-xs font-medium transition",
                      pack === p
                        ? "border-gold bg-gradient-gold text-brown"
                        : "border-champagne bg-ivory text-brown-muted hover:border-gold/50",
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-sm font-semibold text-brown">Delivery Pincode</span>
              <div className="mt-2 flex gap-2">
                <input
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="600001"
                  inputMode="numeric"
                  className="min-w-0 flex-1 rounded-full border border-champagne bg-ivory px-4 py-2.5 text-sm outline-none focus:border-gold"
                />
                <button
                  type="button"
                  onClick={checkPin}
                  className="shrink-0 rounded-full border border-gold/40 px-5 py-2.5 text-sm font-semibold text-gold-deep"
                >
                  Check
                </button>
              </div>
              {pinResult && <p className="mt-2 text-xs text-brown-muted">{pinResult}</p>}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                disabled={product.stock === 0}
                onClick={() => addToCart(product.id, qty)}
                className="shimmer-btn inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-gold px-6 py-3 text-sm font-semibold text-brown disabled:opacity-50"
              >
                <ShoppingBag className="h-4 w-4" /> Add to Cart
              </button>
              <button
                type="button"
                disabled={product.stock === 0}
                onClick={buyNow}
                className="inline-flex flex-1 items-center justify-center rounded-full border border-gold/40 bg-ivory px-6 py-3 text-sm font-semibold text-brown transition hover:bg-cream disabled:opacity-50"
              >
                Buy Now
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 border-t border-champagne/60 pt-4 text-xs text-brown-muted">
              <span className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-gold" /> Safe packed delivery
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-gold" /> Certified & tested
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <InfoBlock title="Product Details">
          <p className="text-sm leading-relaxed text-brown-muted">{product.description}</p>
          <ul className="mt-3 space-y-1.5 text-sm text-brown-muted">
            <li>Category: {categoryName(product.category)}</li>
            <li>Selected pack: {pack}</li>
            <li>Unit price: {formatPrice(product.price)}</li>
          </ul>
        </InfoBlock>

        <InfoBlock title="Specifications">
          <dl className="grid grid-cols-2 gap-y-2 text-sm">
            {Object.entries(product.specifications).map(([k, v]) => (
              <div key={k} className="col-span-2 flex justify-between border-b border-champagne/50 pb-1.5">
                <dt className="text-brown-muted">{k}</dt>
                <dd className="font-medium text-brown">{v}</dd>
              </div>
            ))}
          </dl>
        </InfoBlock>

        <InfoBlock title="Safety Information">
          <ul className="space-y-1.5 text-sm text-brown-muted">
            <li>Always light fireworks in open, ventilated outdoor spaces.</li>
            <li>Keep a bucket of water or sand nearby at all times.</li>
            <li>Children must be supervised by an adult.</li>
            <li>Never relight a firework that failed to ignite.</li>
          </ul>
        </InfoBlock>

        <InfoBlock title="Delivery Information">
          <ul className="space-y-1.5 text-sm text-brown-muted">
            <li>Dispatched within 24 hours of order confirmation.</li>
            <li>Delivered in 3–5 business days across serviceable pincodes.</li>
            <li>Transported by licensed carriers as per safety regulations.</li>
            <li>Free delivery on orders above ₹1,499.</li>
          </ul>
        </InfoBlock>
      </div>

      <div className="mt-10 rounded-2xl border border-champagne/70 bg-card p-6 shadow-soft">
        <h2 className="font-serif text-xl font-bold text-brown">Reviews</h2>
        <div className="mt-4 space-y-4">
          {[
            { name: "Arun K.", text: "Bright, clean burst and zero duds. Ordering again.", r: 5 },
            { name: "Meera R.", text: "Packaging was excellent and delivery was quick.", r: 4 },
            { name: "Vikram S.", text: "Kids loved it — very little smoke as promised.", r: 5 },
          ].map((rv) => (
            <div key={rv.name} className="border-b border-champagne/50 pb-4 last:border-0">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-semibold text-brown">{rv.name}</span>
                <Rating value={rv.r} />
              </div>
              <p className="mt-1.5 text-sm text-brown-muted">{rv.text}</p>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => toast.success("Thanks! Review form coming soon.")}
          className="mt-5 rounded-full border border-gold/40 px-5 py-2.5 text-sm font-semibold text-gold-deep"
        >
          Write a Review
        </button>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <SectionHeading title="Related Products" align="left" />
          <div className="mt-8">
            <ProductGrid products={related} />
          </div>
        </section>
      )}
    </div>
  );
}

function InfoBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-champagne/70 bg-card p-6 shadow-soft">
      <h2 className="font-serif text-xl font-bold text-brown">{title}</h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}
