import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import bannerImage from "@/assets/banner-celebration-box.jpg";
import { categories } from "@/data/products";
import { CategoryCard } from "@/components/cards";
import { SectionHeading } from "@/components/SectionHeading";
import { FireworkBackground } from "@/components/FireworkBackground";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Firework Categories — SparkleFire" },
      {
        name: "description",
        content:
          "Explore SparkleFire categories: rockets, sparklers, flower pots, aerial fireworks, ground chakkars and combo packs.",
      },
      { property: "og:title", content: "Firework Categories — SparkleFire" },
      {
        property: "og:description",
        content: "Choose from our wide range of premium fireworks for every celebration.",
      },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="animate-rise">
      <section className="relative overflow-hidden border-b border-champagne/60 bg-gradient-champagne py-12">
        <FireworkBackground />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            title="Categories"
            subtitle="Choose from our wide range of fireworks"
          />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <CategoryCard key={c.slug} {...c} />
          ))}
        </div>

        <div className="relative mt-12 overflow-hidden rounded-3xl bg-gradient-deep shadow-gold">
          <img
            src={bannerImage}
            alt="Golden fireworks and premium gift boxes"
            loading="lazy"
            width={1600}
            height={600}
            className="absolute inset-0 h-full w-full object-cover opacity-55"
          />
          <div className="relative flex flex-col items-center gap-4 p-10 text-center md:p-16">
            <h2 className="font-serif text-3xl font-bold text-ivory md:text-4xl">
              Discover Our Premium Collections
            </h2>
            <p className="max-w-xl text-sm text-ivory/80">
              Curated gift boxes and grand combos, packed for a complete celebration.
            </p>
            <Link
              to="/combos"
              className="shimmer-btn inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3 text-sm font-semibold text-brown"
            >
              View Combos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
