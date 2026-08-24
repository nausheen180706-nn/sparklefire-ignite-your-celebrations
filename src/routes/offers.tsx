import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Flame } from "lucide-react";
import { products } from "@/data/products";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { FireworkBackground } from "@/components/FireworkBackground";

export const Route = createFileRoute("/offers")({
  head: () => ({
    meta: [
      { title: "Festive Gold Sale — Up to 50% Off | SparkleFire" },
      {
        name: "description",
        content:
          "Flash deals, limited time offers and combo discounts on premium crackers. Save up to 50% during the SparkleFire Festive Gold Sale.",
      },
      { property: "og:title", content: "Festive Gold Sale — Up to 50% Off | SparkleFire" },
      {
        property: "og:description",
        content: "Limited-time festive discounts on rockets, sparklers and combo packs.",
      },
    ],
  }),
  component: OffersPage,
});

const target = () => {
  const d = new Date();
  d.setDate(d.getDate() + 5);
  d.setHours(23, 59, 59, 0);
  return d.getTime();
};

function useCountdown() {
  const [end] = useState(target);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    const tick = () => setLeft(Math.max(0, end - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [end]);

  const s = Math.floor(left / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

function OffersPage() {
  const { days, hours, minutes, seconds } = useCountdown();

  const flash = [...products].sort((a, b) => b.discount - a.discount).slice(0, 4);
  const limited = products.filter((p) => p.discount >= 25 && !flash.includes(p)).slice(0, 4);
  const comboDeals = products.filter((p) => p.category === "combo-packs").slice(0, 4);
  const bestValue = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <div className="animate-rise">
      <section className="relative overflow-hidden border-b border-champagne/60 bg-gradient-champagne py-16">
        <FireworkBackground dense />
        <div className="relative mx-auto max-w-3xl px-4 text-center lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-ivory/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep">
            <Flame className="h-3.5 w-3.5" /> Limited Period
          </span>
          <h1 className="mt-5 font-serif text-4xl font-bold text-brown md:text-5xl">
            Festive Gold Sale
          </h1>
          <p className="mt-3 font-serif text-2xl font-bold text-gold-deep md:text-3xl">
            UP TO 50% OFF
          </p>
          <Link
            to="/shop"
            className="shimmer-btn mt-6 inline-flex rounded-full bg-gradient-gold px-7 py-3 text-sm font-semibold text-brown shadow-gold"
          >
            Shop Offers
          </Link>

          <div className="mx-auto mt-9 grid max-w-md grid-cols-4 gap-3">
            {[
              { label: "Days", value: days },
              { label: "Hours", value: hours },
              { label: "Minutes", value: minutes },
              { label: "Seconds", value: seconds },
            ].map((u) => (
              <div
                key={u.label}
                className="rounded-2xl border border-champagne bg-card px-2 py-3 shadow-soft"
              >
                <span className="block font-serif text-2xl font-bold text-brown">
                  {String(u.value).padStart(2, "0")}
                </span>
                <span className="mt-0.5 block text-[10px] uppercase tracking-wide text-brown-muted">
                  {u.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-14 px-4 py-12 lg:px-8">
        {[
          { title: "Flash Deals", subtitle: "Biggest discounts, while stocks last", items: flash },
          { title: "Limited Time Offers", subtitle: "Ends when the countdown does", items: limited },
          { title: "Combo Discounts", subtitle: "Complete boxes at festive prices", items: comboDeals },
          { title: "Best Value Packs", subtitle: "Top-rated picks from our customers", items: bestValue },
        ].map((section) => (
          <section key={section.title}>
            <SectionHeading title={section.title} subtitle={section.subtitle} align="left" />
            <div className="mt-8">
              <ProductGrid products={section.items} />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
