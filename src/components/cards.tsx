import { Link } from "@tanstack/react-router";
import { ArrowRight, Quote } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { CategorySlug } from "@/data/products";

export function TrustCard({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="card-lift flex items-center gap-3 rounded-xl border border-champagne/70 bg-card px-4 py-3.5 shadow-soft">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cream text-gold-deep">
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-brown">{title}</span>
        <span className="block truncate text-xs text-brown-muted">{subtitle}</span>
      </span>
    </div>
  );
}

export function CategoryCircle({
  slug,
  name,
  image,
}: {
  slug: CategorySlug;
  name: string;
  image: string;
}) {
  return (
    <Link
      to="/shop"
      search={{ category: slug }}
      className="group flex flex-col items-center gap-3"
    >
      <span className="relative grid h-24 w-24 place-items-center overflow-hidden rounded-full border border-champagne bg-cream shadow-soft transition-all duration-300 group-hover:shadow-gold md:h-28 md:w-28">
        <img
          src={image}
          alt={name}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </span>
      <span className="text-center text-sm font-semibold text-brown transition-colors group-hover:text-gold-deep">
        {name}
      </span>
    </Link>
  );
}

export function CategoryCard({
  slug,
  name,
  tagline,
  image,
}: {
  slug: CategorySlug;
  name: string;
  tagline: string;
  image: string;
}) {
  return (
    <Link
      to="/shop"
      search={{ category: slug }}
      className="group card-lift block overflow-hidden rounded-2xl border border-champagne/70 bg-card shadow-soft"
    >
      <span className="block aspect-4/3 overflow-hidden bg-cream">
        <img
          src={image}
          alt={name}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </span>
      <span className="block p-4 text-center">
        <span className="block font-serif text-lg font-bold text-brown">{name}</span>
        <span className="mt-0.5 block text-xs text-brown-muted">{tagline}</span>
        <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-gradient-gold px-4 py-1.5 text-xs font-semibold text-brown">
          Explore <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </span>
    </Link>
  );
}

export function TestimonialCard({
  quote,
  name,
  city,
}: {
  quote: string;
  name: string;
  city: string;
}) {
  return (
    <figure className="flex h-full flex-col justify-between rounded-2xl border border-champagne/70 bg-gradient-champagne p-6 shadow-soft">
      <Quote className="h-6 w-6 text-gold" />
      <blockquote className="mt-3 font-serif text-lg leading-snug text-brown">"{quote}"</blockquote>
      <figcaption className="mt-4 text-sm font-semibold text-brown">
        {name}
        <span className="block text-xs font-normal text-brown-muted">{city}</span>
      </figcaption>
    </figure>
  );
}
