import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { formatPrice, products } from "@/data/products";
import { PriceDisplay } from "@/components/PriceDisplay";
import { Rating } from "@/components/Rating";
import { SectionHeading } from "@/components/SectionHeading";
import { FireworkBackground } from "@/components/FireworkBackground";
import { useShop } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/combos")({
  head: () => ({
    meta: [
      { title: "Celebration Combos & Custom Boxes — SparkleFire" },
      {
        name: "description",
        content:
          "Family, Premium and Grand firework combos, plus an interactive builder to design your own celebration box by budget.",
      },
      { property: "og:title", content: "Celebration Combos & Custom Boxes — SparkleFire" },
      {
        property: "og:description",
        content: "Everything you need for a grand celebration in one curated box.",
      },
    ],
  }),
  component: CombosPage,
});

const comboIds = ["family-combo", "premium-combo", "grand-combo"];

const comboContents: Record<string, string[]> = {
  "family-combo": ["10 Rockets", "20 Sparklers", "5 Flower Pots", "2 Ground Chakkars"],
  "premium-combo": ["15 Rockets", "30 Sparklers", "10 Flower Pots", "5 Aerial Fireworks"],
  "grand-combo": ["25 Rockets", "50 Sparklers", "15 Flower Pots", "8 Aerial Fireworks"],
};

const budgets = [
  { id: "b1", label: "₹500 – ₹1,000", value: 1000 },
  { id: "b2", label: "₹1,000 – ₹2,000", value: 2000 },
  { id: "b3", label: "₹2,000 – ₹5,000", value: 5000 },
  { id: "b4", label: "₹5,000+", value: 9000 },
];

const styles = [
  { id: "family", label: "Family" },
  { id: "kids", label: "Kids" },
  { id: "premium", label: "Premium" },
  { id: "grand", label: "Grand" },
] as const;

type StyleId = (typeof styles)[number]["id"];

const styleRecipes: Record<StyleId, { item: string; unit: number; qty: number }[]> = {
  family: [
    { item: "Sparklers", unit: 8, qty: 12 },
    { item: "Flower Pots", unit: 40, qty: 4 },
    { item: "Rockets", unit: 25, qty: 6 },
    { item: "Ground Chakkars", unit: 20, qty: 6 },
  ],
  kids: [
    { item: "Sparklers", unit: 8, qty: 20 },
    { item: "Ground Chakkars", unit: 20, qty: 8 },
    { item: "Flower Pots", unit: 40, qty: 3 },
  ],
  premium: [
    { item: "Golden Glow Sparklers", unit: 18, qty: 12 },
    { item: "Grand Fountains", unit: 180, qty: 2 },
    { item: "Aerial Shots", unit: 90, qty: 4 },
    { item: "Rockets", unit: 25, qty: 8 },
  ],
  grand: [
    { item: "Aerial Cakes", unit: 480, qty: 2 },
    { item: "Grand Fountains", unit: 180, qty: 3 },
    { item: "Rockets", unit: 25, qty: 15 },
    { item: "Sparklers", unit: 8, qty: 25 },
  ],
};

function CombosPage() {
  const { addToCart } = useShop();
  const combos = products.filter((p) => comboIds.includes(p.id));

  const [budget, setBudget] = useState<string | null>(null);
  const [style, setStyle] = useState<StyleId | null>(null);

  const box = useMemo(() => {
    if (!budget || !style) return null;
    const cap = budgets.find((b) => b.id === budget)!.value;
    const recipe = styleRecipes[style];
    const base = recipe.reduce((s, r) => s + r.unit * r.qty, 0);
    const factor = Math.max(0.6, Math.min(2.4, (cap * 0.72) / base));
    const items = recipe.map((r) => ({
      label: `${Math.max(1, Math.round(r.qty * factor))} ${r.item}`,
      total: Math.round(r.unit * Math.max(1, Math.round(r.qty * factor))),
    }));
    return { items, total: items.reduce((s, i) => s + i.total, 0) };
  }, [budget, style]);

  return (
    <div className="animate-rise">
      <section className="relative overflow-hidden border-b border-champagne/60 bg-gradient-champagne py-12">
        <FireworkBackground />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            title="Celebration Combos"
            subtitle="Everything you need for a grand celebration"
          />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {combos.map((combo) => (
            <article
              key={combo.id}
              className="card-lift flex flex-col overflow-hidden rounded-2xl border border-champagne/70 bg-card shadow-soft"
            >
              <div className="aspect-4/3 overflow-hidden bg-cream">
                <img
                  src={combo.image}
                  alt={combo.name}
                  loading="lazy"
                  width={800}
                  height={800}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <h3 className="font-serif text-xl font-bold text-brown">{combo.name}</h3>
                <Rating value={combo.rating} count={combo.reviewCount} />
                <ul className="space-y-1.5 text-sm text-brown-muted">
                  {comboContents[combo.id].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 shrink-0 text-gold" /> {item}
                    </li>
                  ))}
                </ul>
                <PriceDisplay
                  price={combo.price}
                  originalPrice={combo.originalPrice}
                  discount={combo.discount}
                />
                <button
                  type="button"
                  onClick={() => addToCart(combo.id)}
                  className="shimmer-btn mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-gold px-5 py-2.5 text-sm font-semibold text-brown"
                >
                  <ShoppingBag className="h-4 w-4" /> Add to Cart
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Builder */}
        <section className="mt-16 rounded-3xl border border-champagne/70 bg-gradient-champagne p-6 shadow-soft md:p-10">
          <SectionHeading
            title="Build Your Own Combo"
            subtitle="Customize your perfect celebration box"
            align="left"
          />

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-7">
              <Step n={1} title="Choose Budget">
                <div className="flex flex-wrap gap-2">
                  {budgets.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBudget(b.id)}
                      className={cn(
                        "rounded-xl border px-4 py-3 text-sm font-medium transition",
                        budget === b.id
                          ? "border-gold bg-gradient-gold text-brown shadow-soft"
                          : "border-champagne bg-ivory text-brown-muted hover:border-gold/50",
                      )}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </Step>

              <Step n={2} title="Choose Category">
                <div className="flex flex-wrap gap-2">
                  {styles.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setStyle(s.id)}
                      className={cn(
                        "rounded-xl border px-5 py-3 text-sm font-medium transition",
                        style === s.id
                          ? "border-gold bg-gradient-gold text-brown shadow-soft"
                          : "border-champagne bg-ivory text-brown-muted hover:border-gold/50",
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </Step>

              <Step n={3} title="Get Your Box">
                <p className="text-sm text-brown-muted">
                  {box
                    ? "Your box is ready — review it and add it to your cart."
                    : "Pick a budget and a category to generate your box."}
                </p>
              </Step>
            </div>

            <aside className="rounded-2xl border border-champagne bg-card p-6 shadow-soft">
              <h3 className="font-serif text-lg font-bold text-brown">Your Celebration Box</h3>
              {box ? (
                <>
                  <ul className="mt-4 space-y-2 text-sm text-brown">
                    {box.items.map((i) => (
                      <li key={i.label} className="flex items-center justify-between gap-2">
                        <span className="flex min-w-0 items-center gap-2">
                          <Check className="h-3.5 w-3.5 shrink-0 text-gold" />
                          <span className="truncate">{i.label}</span>
                        </span>
                        <span className="shrink-0 text-brown-muted">{formatPrice(i.total)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex items-center justify-between border-t border-champagne pt-4">
                    <span className="text-sm font-semibold text-brown">Total</span>
                    <span className="text-xl font-semibold text-gold-deep">
                      {formatPrice(box.total)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(style === "grand" ? "grand-combo" : style === "premium" ? "premium-combo" : style === "kids" ? "kids-safe-combo" : "family-combo");
                      toast.success("Custom box added — closest matching combo in your cart");
                    }}
                    className="shimmer-btn mt-5 w-full rounded-full bg-gradient-gold py-3 text-sm font-semibold text-brown"
                  >
                    Add to Cart
                  </button>
                </>
              ) : (
                <p className="mt-4 text-sm text-brown-muted">
                  Nothing selected yet. Choose a budget and category and we'll build a balanced box
                  for you.
                </p>
              )}
            </aside>
          </div>
        </section>
      </div>
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-gold text-xs font-bold text-brown">
          {n}
        </span>
        <h3 className="font-serif text-lg font-semibold text-brown">{title}</h3>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}
