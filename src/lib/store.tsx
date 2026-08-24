import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { products, type Product } from "@/data/products";

export interface CartLine {
  id: string;
  qty: number;
}

interface ShopState {
  cart: CartLine[];
  wishlist: string[];
  cartCount: number;
  cartItems: { product: Product; qty: number }[];
  subtotal: number;
  addToCart: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  removeFromWishlist: (id: string) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ShopContext = createContext<ShopState | null>(null);

const CART_KEY = "sparklefire.cart";
const WISH_KEY = "sparklefire.wishlist";
const THEME_KEY = "sparklefire.theme";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCart(read<CartLine[]>(CART_KEY, []));
    setWishlist(read<string[]>(WISH_KEY, []));
    
    const savedTheme = read<"light" | "dark" | null>(THEME_KEY, null);
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      }
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
    
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => {
      const next = t === "light" ? "dark" : "light";
      window.localStorage.setItem(THEME_KEY, JSON.stringify(next));
      if (next === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  }, []);

  const addToCart = useCallback((id: string, qty = 1) => {
    const product = products.find((p) => p.id === id);
    setCart((prev) => {
      const existing = prev.find((l) => l.id === id);
      if (existing) return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { id, qty }];
    });
    toast.success(`${product?.name ?? "Item"} added to cart`);
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
    );
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((l) => l.id !== id));
    toast("Removed from cart");
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) => {
      if (prev.includes(id)) {
        toast("Removed from wishlist");
        return prev.filter((w) => w !== id);
      }
      toast.success("Saved to wishlist");
      return [...prev, id];
    });
  }, []);

  const removeFromWishlist = useCallback((id: string) => {
    setWishlist((prev) => prev.filter((w) => w !== id));
    toast("Removed from wishlist");
  }, []);

  const cartItems = useMemo(
    () =>
      cart
        .map((line) => {
          const product = products.find((p) => p.id === line.id);
          return product ? { product, qty: line.qty } : null;
        })
        .filter((v): v is { product: Product; qty: number } => v !== null),
    [cart],
  );

  const value: ShopState = {
    cart,
    wishlist,
    cartCount: cart.reduce((n, l) => n + l.qty, 0),
    cartItems,
    subtotal: cartItems.reduce((s, i) => s + i.product.price * i.qty, 0),
    addToCart,
    setQty,
    removeFromCart,
    clearCart,
    toggleWishlist,
    isWishlisted: (id: string) => wishlist.includes(id),
    removeFromWishlist,
    theme,
    toggleTheme,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}
