import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone, Sparkles, Twitter, Youtube } from "lucide-react";
import { categories } from "@/data/products";
import { FireworkBackground } from "@/components/FireworkBackground";

const quickLinks = [
  { to: "/shop", label: "Shop All" },
  { to: "/combos", label: "Combos" },
  { to: "/offers", label: "Offers" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
] as const;

const supportLinks = [
  { to: "/track-order", label: "Track Order" },
  { to: "/account", label: "My Account" },
  { to: "/wishlist", label: "Wishlist" },
  { to: "/cart", label: "Cart" },
  { to: "/checkout", label: "Checkout" },
] as const;

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-champagne bg-cream">
      <FireworkBackground />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-gold" />
            <span className="font-serif text-xl font-bold text-brown">SparkleFire</span>
          </div>
          <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-brown-muted">
            Light Up Every Celebration
          </p>
          <p className="mt-4 text-sm leading-relaxed text-brown-muted">
            Premium crackers and fireworks, safety-tested and family-approved, delivered across
            India for every festival and milestone.
          </p>
          <div className="mt-5 flex gap-2">
            {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="grid h-9 w-9 place-items-center rounded-full border border-champagne bg-card text-brown transition hover:bg-gradient-gold"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <FooterCol title="Quick Links">
          {quickLinks.map((l) => (
            <FooterLink key={l.to} to={l.to} label={l.label} />
          ))}
        </FooterCol>

        <FooterCol title="Customer Support">
          {supportLinks.map((l) => (
            <FooterLink key={l.to} to={l.to} label={l.label} />
          ))}
        </FooterCol>

        <div className="space-y-6">
          <FooterCol title="Categories">
            {categories.slice(0, 4).map((c) => (
              <li key={c.slug}>
                <Link
                  to="/shop"
                  search={{ category: c.slug }}
                  className="text-sm text-brown-muted transition-colors hover:text-gold-deep"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </FooterCol>
          <div>
            <h4 className="font-serif text-base font-semibold text-brown">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm text-brown-muted">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold" /> +91 98765 43210
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gold" /> support@sparklefire.com
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> 123 Celebration Street,
                Chennai, Tamil Nadu 600001
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="relative border-t border-champagne/70 px-4 py-5 text-center text-xs text-brown-muted lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span>
          © {new Date().getFullYear()} SparkleFire. All rights reserved. Fireworks are sold in
          compliance with local safety regulations.
        </span>
        <button
          onClick={() => {
            localStorage.removeItem("sparklefire_intro_seen");
            window.location.reload();
          }}
          className="text-gold-deep hover:underline cursor-pointer font-medium"
        >
          Replay Cinematic Intro
        </button>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-serif text-base font-semibold text-brown">{title}</h4>
      <ul className="mt-3 space-y-2">{children}</ul>
    </div>
  );
}

function FooterLink({ to, label }: { to: string; label: string }) {
  return (
    <li>
      <Link to={to} className="text-sm text-brown-muted transition-colors hover:text-gold-deep">
        {label}
      </Link>
    </li>
  );
}
