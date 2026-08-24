import { createFileRoute } from "@tanstack/react-router";
import { useShop } from "@/lib/store";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { FireworkBackground } from "@/components/FireworkBackground";
import { SectionHeading } from "@/components/SectionHeading";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "My Wishlist — SparkleFire" },
      {
        name: "description",
        content: "View your saved fireworks and premium crackers ready for celebration.",
      },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useShop();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="animate-rise pb-16">
      <section className="relative overflow-hidden border-b border-champagne/60 bg-gradient-champagne py-12">
        <FireworkBackground />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            title="My Wishlist"
            subtitle="Your saved premium crackers & fireworks"
          />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        {wishlistedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 rounded-full bg-cream p-5 text-gold">
              <Heart className="h-10 w-10" />
            </div>
            <h2 className="font-serif text-xl font-bold text-brown">Your wishlist is empty</h2>
            <p className="mt-2 text-sm text-brown-muted max-w-sm">
              Explore our shop and save your favorite fireworks to light up your celebrations.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {wishlistedProducts.map((p) => (
              <div key={p.id} className="relative">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
