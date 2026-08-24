import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeIndianRupee,
  Headphones,
  Heart,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import heroImage from "@/assets/hero-fireworks.jpg";
import bannerImage from "@/assets/banner-celebration-box.jpg";
import { bestSellers, categories } from "@/data/products";
import { FireworkBackground } from "@/components/FireworkBackground";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductGrid } from "@/components/ProductGrid";
import { CategoryCircle, TestimonialCard, TrustCard } from "@/components/cards";
import { Newsletter } from "@/components/Newsletter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SparkleFire — Premium Crackers & Fireworks Online" },
      {
        name: "description",
        content:
          "Shop premium rockets, sparklers, flower pots and combo packs. Safe, certified fireworks delivered across India for every celebration.",
      },
      { property: "og:title", content: "SparkleFire — Premium Crackers & Fireworks Online" },
      {
        property: "og:description",
        content: "Celebrate with brighter sparks — premium fireworks for every Indian festival.",
      },
    ],
  }),
  component: Home,
});

const trust = [
  { icon: ShieldCheck, title: "Safe & Certified", subtitle: "Quality Products" },
  { icon: Truck, title: "Fast Delivery", subtitle: "Across Locations" },
  { icon: BadgeIndianRupee, title: "Best Prices", subtitle: "Great Value" },
  { icon: Headphones, title: "Customer Support", subtitle: "Always Here" },
];

const why = [
  { icon: ShieldCheck, title: "Certified Products", subtitle: "100% Safe & Reliable" },
  { icon: Sparkles, title: "Wide Range", subtitle: "Rockets, Sparklers & More" },
  { icon: PackageCheck, title: "On-Time Delivery", subtitle: "Fast & Secure" },
  { icon: Heart, title: "Happy Customers", subtitle: "Thousands of Smiles" },
];

function Home() {
  return (
    <div className="animate-rise">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-champagne/60 bg-gradient-champagne">
        <FireworkBackground dense />
        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 md:py-20 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-ivory/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep">
              <Sparkles className="h-3.5 w-3.5" /> Festive Collection 2026
            </span>
            <h1 className="mt-5 font-serif text-4xl font-bold leading-[1.05] text-brown sm:text-5xl lg:text-6xl">
              Celebrate
              <br />
              With Brighter
              <br />
              Sparks
            </h1>
            <p className="mt-5 max-w-md text-base text-brown-muted">
              Premium Crackers & Fireworks for Every Celebration
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="shimmer-btn inline-flex items-center gap-2 rounded-full bg-gradient-gold px-7 py-3 text-sm font-semibold text-brown shadow-gold"
              >
                Shop Now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/combos"
                className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-ivory px-7 py-3 text-sm font-semibold text-brown transition hover:bg-cream"
              >
                View Combos
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-champagne bg-ivory shadow-gold">
              <img
                src={heroImage}
                alt="Premium SparkleFire firework boxes arranged with golden sparkles"
                width={1408}
                height={1008}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-10 lg:px-8">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {trust.map((t) => (
              <TrustCard key={t.title} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* Shop by category */}
      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            title="Shop by Category"
            subtitle="Find the perfect crackers for your celebration"
          />
          <div className="mt-10 grid grid-cols-3 gap-6 md:grid-cols-6">
            {categories.map((c) => (
              <CategoryCircle key={c.slug} slug={c.slug} name={c.name} image={c.image} />
            ))}
          </div>
        </div>
      </section>

      {/* Best sellers */}
      <section className="bg-cream/60 section-pad">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading title="Best Sellers" align="left" />
            <Link
              to="/shop"
              className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-gold-deep hover:underline"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8">
            <ProductGrid products={bestSellers} />
          </div>
        </div>
      </section>

      {/* Celebration box banner */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-deep shadow-gold">
          <img
            src={bannerImage}
            alt="Golden gift boxes with fireworks"
            loading="lazy"
            width={1600}
            height={600}
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />
          <div className="relative max-w-lg p-8 md:p-14">
            <h2 className="font-serif text-3xl font-bold text-ivory md:text-4xl">
              Build Your Celebration Box
            </h2>
            <p className="mt-3 text-sm text-ivory/80">
              Choose from our curated combos for a brighter celebration.
            </p>
            <Link
              to="/combos"
              className="shimmer-btn mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3 text-sm font-semibold text-brown"
            >
              Explore Combos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading title="Why Choose Us" align="left" />
          <div className="mt-8 grid gap-5 lg:grid-cols-[2fr_1fr]">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {why.map((w) => (
                <div
                  key={w.title}
                  className="card-lift rounded-2xl border border-champagne/70 bg-card p-5 text-center shadow-soft"
                >
                  <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-cream text-gold-deep">
                    <w.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3 text-sm font-semibold text-brown">{w.title}</h3>
                  <p className="mt-1 text-xs text-brown-muted">{w.subtitle}</p>
                </div>
              ))}
            </div>
            <TestimonialCard
              quote="Amazing quality and fast delivery. Our Diwali was extra special this year."
              name="Priya Sharma"
              city="Chennai"
            />
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
