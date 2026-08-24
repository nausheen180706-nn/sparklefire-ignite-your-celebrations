import { Link } from "@tanstack/react-router";
import { Home, Search, ShoppingBag, ShoppingCart, User } from "lucide-react";
import { useShop } from "@/lib/store";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/shop", label: "Shop", icon: ShoppingBag },
  { to: "/search", label: "Search", icon: Search },
  { to: "/cart", label: "Cart", icon: ShoppingCart },
  { to: "/account", label: "Account", icon: User },
] as const;

export function MobileTabBar() {
  const { cartCount } = useShop();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-champagne bg-ivory/97 shadow-soft backdrop-blur sm:hidden">
      <ul className="grid grid-cols-5">
        {items.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-gold-deep" }}
              className="relative flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium text-brown-muted"
            >
              <item.icon className="h-5 w-5" />
              {item.label}
              {item.to === "/cart" && cartCount > 0 && (
                <span className="absolute right-4 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-brown px-1 text-[9px] font-bold text-ivory">
                  {cartCount}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
