import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { categories, products, type CategorySlug } from "@/data/products";
import { ProductGrid } from "@/components/ProductGrid";
import { FireworkBackground } from "@/components/FireworkBackground";
import { SectionHeading } from "@/components/SectionHeading";

type Sort = "popular" | "newest" | "price-asc" | "price-desc" | "rating";

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): { category?: string } => ({
    category: typeof search.category === "string" ? search.category : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop All Fireworks & Crackers — SparkleFire" },
      {
        name: "description",
        content:
          "Browse 24+ premium crackers: rockets, sparklers, flower pots, aerial fireworks, chakkars and combo packs with filters and sorting.",
      },
      { property: "og:title", content: "Shop All Fireworks & Crackers — SparkleFire" },
      {
        property: "og:description",
        content: "Filter by category, price, rating and availability across our full range.",
      },
    ],
  }),
  component: Shop,
});

const MAX_PRICE = 20000;

function Shop() {
  const { category } = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });

  const [selected, setSelected] = useState<CategorySlug[]>(
    category && categories.some((c) => c.slug === category) ? [category as CategorySlug] : [],
  );
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [availability, setAvailability] = useState<"in" | "out" | null>(null);
  const [sort, setSort] = useState<Sort>("popular");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleCategory = (slug: CategorySlug) => {
    const next = selected.includes(slug)
      ? selected.filter((s) => s !== slug)
      : [...selected, slug];
    setSelected(next);
    navigate({ search: { category: next.length === 1 ? next[0] : undefined }, replace: true });
  };

  const clearFilters = () => {
    setSelected([]);
    setMaxPrice(MAX_PRICE);
    setMinRating(null);
    setAvailability(null);
    navigate({ search: {}, replace: true });
  };

  const filtered = useMemo(() => {
    const list = products.filter((p) => {
      if (selected.length && !selected.includes(p.category)) return false;
      if (p.price > maxPrice) return false;
      if (minRating !== null && p.rating < minRating) return false;
      if (availability === "in" && p.stock === 0) return false;
      if (availability === "out" && p.stock > 0) return false;
      return true;
    });
    const sorted = [...list];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        sorted.sort(
          (a, b) => Number(b.tags.includes("new")) - Number(a.tags.includes("new")),
        );
        break;
      default:
        sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return sorted;
  }, [selected, maxPrice, minRating, availability, sort]);

  const filters = (
    <div className="space-y-7 rounded-2xl border border-champagne/70 bg-card p-5 shadow-soft">
      <h2 className="font-serif text-lg font-bold text-brown">Filters</h2>

      <FilterGroup title="Categories">
        {categories.map((c) => (
          <label key={c.slug} className="flex cursor-pointer items-center gap-2 text-sm text-brown">
            <input
              type="checkbox"
              checked={selected.includes(c.slug)}
              onChange={() => toggleCategory(c.slug)}
              className="h-4 w-4 accent-[var(--gold)]"
            />
            {c.name}
          </label>
        ))}
      </FilterGroup>

      <FilterGroup title="Price Range">
        <input
          type="range"
          min={0}
          max={MAX_PRICE}
          step={100}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[var(--gold)]"
        />
        <p className="text-xs text-brown-muted">₹0 — ₹{maxPrice.toLocaleString("en-IN")}</p>
      </FilterGroup>

      <FilterGroup title="Rating">
        {[5, 4, 3].map((r) => (
          <label key={r} className="flex cursor-pointer items-center gap-2 text-sm text-brown">
            <input
              type="radio"
              name="rating"
              checked={minRating === r}
              onChange={() => setMinRating(r)}
              className="h-4 w-4 accent-[var(--gold)]"
            />
            {r === 5 ? "5 stars" : `${r}+ stars`}
          </label>
        ))}
      </FilterGroup>

      <FilterGroup title="Availability">
        {(["in", "out"] as const).map((a) => (
          <label key={a} className="flex cursor-pointer items-center gap-2 text-sm text-brown">
            <input
              type="checkbox"
              checked={availability === a}
              onChange={() => setAvailability(availability === a ? null : a)}
              className="h-4 w-4 accent-[var(--gold)]"
            />
            {a === "in" ? "In Stock" : "Out of Stock"}
          </label>
        ))}
      </FilterGroup>

      <button
        type="button"
        onClick={clearFilters}
        className="w-full rounded-full bg-gradient-gold py-2.5 text-sm font-semibold text-brown"
      >
        Clear Filters
      </button>
    </div>
  );

  return (
    <div className="animate-rise">
      <section className="relative overflow-hidden border-b border-champagne/60 bg-gradient-champagne py-12">
        <FireworkBackground />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            title="Shop All Products"
            subtitle="Explore our wide range of premium crackers & fireworks"
          />
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:px-8">
        <aside className="hidden lg:block">
          <div className="sticky top-24">{filters}</div>
        </aside>

        <div>
          <div className="mb-5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:justify-between">
            <p className="min-w-0 truncate text-sm font-medium text-brown">
              {filtered.length} Products
            </p>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => setFiltersOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-champagne bg-card px-4 py-2 text-sm font-medium text-brown lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </button>
              <label className="flex items-center gap-2 text-sm text-brown-muted">
                <span className="hidden sm:inline">Sort by:</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                  className="rounded-full border border-champagne bg-card px-3 py-2 text-sm text-brown outline-none focus:border-gold"
                >
                  <option value="popular">Popular</option>
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price Low to High</option>
                  <option value="price-desc">Price High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </label>
            </div>
          </div>

          <ProductGrid products={filtered} columns={3} />
        </div>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-60 lg:hidden">
          <div
            className="absolute inset-0 bg-brown/40"
            onClick={() => setFiltersOpen(false)}
            aria-hidden
          />
          <div className="absolute inset-y-0 left-0 w-[86%] max-w-sm overflow-y-auto bg-ivory p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-serif text-lg font-bold text-brown">Filters</span>
              <button
                type="button"
                aria-label="Close filters"
                onClick={() => setFiltersOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full border border-champagne"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {filters}
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-2.5 text-sm font-semibold uppercase tracking-wide text-brown">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
