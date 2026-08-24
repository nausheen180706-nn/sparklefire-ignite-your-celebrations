import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Menu, Search, ShoppingCart, Sparkles, User, X } from "lucide-react";
import { useShop } from "@/lib/store";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/combos", label: "Combos" },
  { to: "/offers", label: "Offers" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const { cartCount, wishlist } = useShop();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearchOpen(false);
    setMenuOpen(false);
    navigate({ to: "/search", search: { q: query.trim() } });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-champagne/80 bg-ivory/95 shadow-soft backdrop-blur">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <Sparkles className="h-6 w-6 shrink-0 text-gold" />
          <span className="min-w-0">
            <span className="block truncate font-serif text-xl font-bold leading-none text-brown">
              SparkleFire
            </span>
            <span className="block truncate text-[10px] uppercase tracking-[0.16em] text-brown-muted">
              Light Up Every Celebration
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-gold-deep after:scale-x-100" }}
              className="relative py-1 text-sm font-medium text-brown transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:scale-x-0 after:bg-gradient-gold after:transition-transform hover:text-gold-deep hover:after:scale-x-100"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            aria-label="Search"
            onClick={() => setSearchOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full text-brown transition hover:bg-cream hover:text-gold-deep"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="relative hidden h-10 w-10 place-items-center rounded-full text-brown transition hover:bg-cream hover:text-gold-deep sm:grid"
          >
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && <Badge count={wishlist.length} />}
          </Link>
          <Link
            to="/account"
            aria-label="Account"
            className="hidden h-10 w-10 place-items-center rounded-full text-brown transition hover:bg-cream hover:text-gold-deep sm:grid"
          >
            <User className="h-5 w-5" />
          </Link>
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative grid h-10 w-10 place-items-center rounded-full bg-gradient-gold text-brown shadow-soft transition hover:opacity-90"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && <Badge count={cartCount} />}
          </Link>
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-champagne text-brown transition hover:bg-cream lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-champagne/70 bg-card/95">
          <form onSubmit={submitSearch} className="mx-auto flex max-w-7xl gap-2 px-4 py-3 lg:px-8">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search rockets, sparklers, combos…"
              maxLength={80}
              className="min-w-0 flex-1 rounded-full border border-champagne bg-ivory px-4 py-2.5 text-sm outline-none placeholder:text-brown-muted focus:border-gold"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-gradient-gold px-5 py-2.5 text-sm font-semibold text-brown"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {menuOpen && (
        <nav className="border-t border-champagne/70 bg-card px-4 py-3 lg:hidden">
          <ul className="flex flex-col">
            {[...links, { to: "/wishlist", label: "Wishlist" }, { to: "/account", label: "Account" }].map(
              (l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={() => setMenuOpen(false)}
                    activeOptions={{ exact: l.to === "/" }}
                    activeProps={{ className: "text-gold-deep" }}
                    className={cn(
                      "block border-b border-champagne/50 py-3 text-sm font-medium text-brown last:border-0",
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}

function Badge({ count }: { count: number }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-brown px-1 text-[10px] font-bold text-ivory">
      {count}
    </span>
  );
}
