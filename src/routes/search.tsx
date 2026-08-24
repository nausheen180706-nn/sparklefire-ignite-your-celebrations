import { createFileRoute } from "@tanstack/react-router";
import { searchProducts } from "@/data/products";
import { ProductGrid } from "@/components/ProductGrid";
import { FireworkBackground } from "@/components/FireworkBackground";
import { SectionHeading } from "@/components/SectionHeading";
import { Search } from "lucide-react";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>): { q?: string | undefined } => ({
    q: typeof search["q"] === "string" ? search["q"] : undefined,
  }),
  head: ({ search }) => {
    const s = search as { q?: string };
    return {
      meta: [
        { title: `Search results for "${s.q ?? ""}" — SparkleFire` },
        {
          name: "description",
          content: "Search products across our full range of premium crackers & fireworks.",
        },
      ],
    };
  },
  component: SearchPage,
});

function SearchPage() {
  const { q = "" } = Route.useSearch();
  const results = searchProducts(q);

  return (
    <div className="animate-rise pb-16">
      <section className="relative overflow-hidden border-b border-champagne/60 bg-gradient-champagne py-12">
        <FireworkBackground />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            title="Search Results"
            subtitle={`Showing results for "${q}"`}
          />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        {results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 rounded-full bg-cream p-5 text-gold">
              <Search className="h-10 w-10" />
            </div>
            <h2 className="font-serif text-xl font-bold text-brown">No results found</h2>
            <p className="mt-2 text-sm text-brown-muted max-w-sm">
              We couldn't find anything matching your search query. Try searching with different keywords like "rockets", "sparklers", or "combos".
            </p>
          </div>
        ) : (
          <ProductGrid products={results} columns={4} />
        )}
      </div>
    </div>
  );
}
