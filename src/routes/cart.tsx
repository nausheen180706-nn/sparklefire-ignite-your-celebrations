import { createFileRoute, Link } from "@tanstack/react-router";
import { useShop } from "@/lib/store";
import { FireworkBackground } from "@/components/FireworkBackground";
import { SectionHeading } from "@/components/SectionHeading";
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { formatPrice } from "@/data/products";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Shopping Cart — SparkleFire" },
      {
        name: "description",
        content: "View your premium fireworks cart, change quantities, and check out securely.",
      },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cartItems, subtotal, setQty, removeFromCart, clearCart } = useShop();
  const [checkingOut, setCheckingOut] = useState(false);

  const handleCheckout = () => {
    setCheckingOut(true);
    setTimeout(() => {
      toast.success("Order placed successfully! This is a demo checkout.");
      clearCart();
      setCheckingOut(false);
    }, 1500);
  };

  const deliveryFee = subtotal > 1500 ? 0 : 150;

  return (
    <div className="animate-rise pb-16">
      <section className="relative overflow-hidden border-b border-champagne/60 bg-gradient-champagne py-12">
        <FireworkBackground />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            title="Shopping Cart"
            subtitle="Secure your festival celebration pack"
          />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 rounded-full bg-cream p-5 text-gold">
              <ShoppingCart className="h-10 w-10" />
            </div>
            <h2 className="font-serif text-xl font-bold text-brown">Your cart is empty</h2>
            <p className="mt-2 text-sm text-brown-muted max-w-sm">
              Add premium sparklers, rockets, and combos to start your celebration.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3 text-sm font-semibold text-brown"
            >
              Shop Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
            {/* Cart Items list */}
            <div className="space-y-4">
              {cartItems.map(({ product, qty }) => (
                <div
                  key={product.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-champagne/70 bg-card p-4 shadow-soft"
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-16 w-16 rounded-xl object-cover border border-champagne"
                    />
                    <div>
                      <h3 className="font-serif text-base font-bold text-brown">{product.name}</h3>
                      <p className="text-xs text-brown-muted capitalize">{product.category}</p>
                      <p className="text-sm font-semibold text-gold-deep mt-1">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-6 border-t sm:border-t-0 pt-3 sm:pt-0">
                    <div className="flex items-center border border-champagne rounded-full bg-ivory overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setQty(product.id, qty - 1)}
                        className="p-2 hover:bg-cream text-brown transition"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-brown">{qty}</span>
                      <button
                        type="button"
                        onClick={() => setQty(product.id, qty + 1)}
                        className="p-2 hover:bg-cream text-brown transition"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-brown w-20 text-right">
                        {formatPrice(product.price * qty)}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                        className="p-2 text-brown-muted hover:text-red-500 hover:bg-red-50 rounded-full transition"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart summary */}
            <div>
              <div className="rounded-2xl border border-champagne/70 bg-card p-6 shadow-soft space-y-6">
                <h3 className="font-serif text-lg font-bold text-brown border-b border-champagne/50 pb-3">
                  Order Summary
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-brown-muted">
                    <span>Subtotal</span>
                    <span className="font-medium text-brown">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-brown-muted">
                    <span>Delivery Fee</span>
                    <span className="font-medium text-brown">
                      {deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}
                    </span>
                  </div>
                  {deliveryFee > 0 && (
                    <p className="text-[11px] text-gold-deep bg-cream/50 p-2 rounded-lg">
                      Add {formatPrice(1500 - subtotal)} more for free delivery!
                    </p>
                  )}
                </div>

                <div className="border-t border-champagne/50 pt-4 flex justify-between font-serif text-base font-bold text-brown">
                  <span>Total</span>
                  <span>{formatPrice(subtotal + deliveryFee)}</span>
                </div>

                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={checkingOut}
                  className="w-full rounded-full bg-gradient-gold py-3 text-sm font-semibold text-brown hover:opacity-95 shadow-soft transition disabled:opacity-50"
                >
                  {checkingOut ? "Processing..." : "Place Demo Order"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
