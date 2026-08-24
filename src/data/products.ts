import rockets from "@/assets/cat-rockets.jpg";
import sparklers from "@/assets/cat-sparklers.jpg";
import flowerpots from "@/assets/cat-flowerpots.jpg";
import aerial from "@/assets/cat-aerial.jpg";
import chakkars from "@/assets/cat-chakkars.jpg";
import combos from "@/assets/cat-combos.jpg";

export type CategorySlug =
  | "rockets"
  | "sparklers"
  | "flower-pots"
  | "aerial-fireworks"
  | "ground-chakkars"
  | "combo-packs";

export interface Product {
  id: string;
  name: string;
  category: CategorySlug;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  image: string;
  stock: number;
  tags: string[];
  specifications: Record<string, string>;
}

export const categoryImages: Record<CategorySlug, string> = {
  rockets,
  sparklers,
  "flower-pots": flowerpots,
  "aerial-fireworks": aerial,
  "ground-chakkars": chakkars,
  "combo-packs": combos,
};

export const categories: {
  slug: CategorySlug;
  name: string;
  tagline: string;
  image: string;
}[] = [
  { slug: "rockets", name: "Rockets", tagline: "High-Flying Sparks", image: rockets },
  { slug: "sparklers", name: "Sparklers", tagline: "Sparkling Joy", image: sparklers },
  { slug: "flower-pots", name: "Flower Pots", tagline: "Colorful Fountains", image: flowerpots },
  {
    slug: "aerial-fireworks",
    name: "Aerial Fireworks",
    tagline: "Sky Full of Lights",
    image: aerial,
  },
  {
    slug: "ground-chakkars",
    name: "Ground Chakkars",
    tagline: "Spinning Wonders",
    image: chakkars,
  },
  { slug: "combo-packs", name: "Combo Packs", tagline: "Complete Celebration", image: combos },
];

export const categoryName = (slug: CategorySlug) =>
  categories.find((c) => c.slug === slug)?.name ?? slug;

const build = (
  id: string,
  name: string,
  category: CategorySlug,
  price: number,
  originalPrice: number,
  rating: number,
  reviewCount: number,
  stock: number,
  description: string,
  tags: string[],
  specifications: Record<string, string>,
): Product => ({
  id,
  name,
  category,
  description,
  price,
  originalPrice,
  discount: Math.round(((originalPrice - price) / originalPrice) * 100),
  rating,
  reviewCount,
  image: categoryImages[category],
  stock,
  tags,
  specifications,
});

export const products: Product[] = [
  build(
    "sky-rocket",
    "Sky Rocket",
    "rockets",
    199,
    249,
    4.8,
    412,
    48,
    "A classic high-flying rocket that climbs fast and opens into a wide golden crown. Ideal for opening your Diwali evening with a bright, clean burst.",
    ["bestseller", "popular"],
    { "Pack Size": "10 pieces", Height: "35 m", Duration: "6 sec", Effect: "Golden crown burst" },
  ),
  build(
    "whistling-rocket",
    "Whistling Rocket",
    "rockets",
    259,
    329,
    4.6,
    236,
    32,
    "Rises with a long whistle before bursting into silver stars. A crowd favourite with children and rooftop celebrations.",
    ["popular"],
    { "Pack Size": "10 pieces", Height: "30 m", Duration: "5 sec", Effect: "Whistle + silver stars" },
  ),
  build(
    "royal-rocket-bomb",
    "Royal Rocket Bomb",
    "rockets",
    449,
    599,
    4.7,
    189,
    21,
    "Heavier payload rocket for a deep report and a broad golden umbrella of sparks over the skyline.",
    ["premium"],
    { "Pack Size": "5 pieces", Height: "45 m", Duration: "7 sec", Effect: "Loud report + umbrella" },
  ),
  build(
    "colour-rocket-pack",
    "Colour Rocket Pack",
    "rockets",
    699,
    949,
    4.5,
    141,
    0,
    "Assorted rockets that break into red, green and blue peonies for a multi-colour finale.",
    ["new"],
    { "Pack Size": "20 pieces", Height: "35 m", Duration: "6 sec", Effect: "Multi-colour peony" },
  ),
  build(
    "sparkling-sparklers",
    "Sparkling Sparklers",
    "sparklers",
    199,
    249,
    4.8,
    980,
    120,
    "Smooth, low-smoke sparklers with a soft golden glow — safe in small hands and perfect for family photos.",
    ["bestseller", "kids"],
    { "Pack Size": "50 sticks", Length: "10 inch", Duration: "45 sec", Effect: "Golden glitter" },
  ),
  build(
    "electric-sparklers",
    "Electric Sparklers",
    "sparklers",
    299,
    379,
    4.7,
    612,
    86,
    "Crisp white electric sparks with a brilliant crackle finish, a favourite for wedding entries.",
    ["popular"],
    { "Pack Size": "50 sticks", Length: "12 inch", Duration: "55 sec", Effect: "White crackle" },
  ),
  build(
    "colour-sparklers",
    "Colour Sparklers",
    "sparklers",
    349,
    449,
    4.6,
    398,
    64,
    "Sparklers that shift from green to red mid-burn for a playful colour change.",
    ["kids"],
    { "Pack Size": "40 sticks", Length: "12 inch", Duration: "50 sec", Effect: "Colour changing" },
  ),
  build(
    "golden-glow-sparklers",
    "Golden Glow Sparklers",
    "sparklers",
    499,
    649,
    4.9,
    221,
    40,
    "Extra-long premium sparklers with a warm champagne glow and almost no residue.",
    ["premium", "new"],
    { "Pack Size": "30 sticks", Length: "18 inch", Duration: "90 sec", Effect: "Champagne glow" },
  ),
  build(
    "flower-pots",
    "Flower Pots",
    "flower-pots",
    299,
    349,
    4.6,
    534,
    72,
    "Steady ground fountain that blooms into a two-metre golden flower. A must-have for the courtyard.",
    ["bestseller"],
    { "Pack Size": "10 pieces", Height: "2 m", Duration: "35 sec", Effect: "Golden fountain" },
  ),
  build(
    "golden-rain",
    "Golden Rain",
    "flower-pots",
    399,
    499,
    4.7,
    721,
    58,
    "Our signature fountain — a long, dense shower of golden rain that lights up the whole terrace.",
    ["bestseller", "popular"],
    { "Pack Size": "5 pieces", Height: "3 m", Duration: "50 sec", Effect: "Dense golden rain" },
  ),
  build(
    "colour-koti",
    "Colour Koti",
    "flower-pots",
    459,
    579,
    4.4,
    167,
    35,
    "A colour-shifting fountain that layers green, pink and gold in slow waves.",
    [],
    { "Pack Size": "10 pieces", Height: "2.5 m", Duration: "40 sec", Effect: "Colour waves" },
  ),
  build(
    "grand-fountain",
    "Grand Fountain",
    "flower-pots",
    899,
    1199,
    4.8,
    203,
    18,
    "Tall professional-grade fountain with a crackling gold crown finish — our biggest ground effect.",
    ["premium"],
    { "Pack Size": "3 pieces", Height: "4 m", Duration: "70 sec", Effect: "Crown + crackle" },
  ),
  build(
    "mega-aerial",
    "Mega Aerial",
    "aerial-fireworks",
    1499,
    1799,
    4.9,
    342,
    16,
    "Thirty-shot aerial cake with a sequenced golden-to-silver finale. The centrepiece of any celebration.",
    ["bestseller", "premium"],
    { Shots: "30", Height: "25 m", Duration: "45 sec", Effect: "Sequenced finale" },
  ),
  build(
    "thunder-bomb",
    "Thunder Bomb",
    "aerial-fireworks",
    249,
    299,
    4.5,
    488,
    90,
    "Sharp single-shot report for the traditional loud moment of the evening.",
    ["popular"],
    { "Pack Size": "10 pieces", Height: "10 m", Duration: "2 sec", Effect: "Loud report" },
  ),
  build(
    "sky-shower-60",
    "Sky Shower 60",
    "aerial-fireworks",
    2499,
    3299,
    4.8,
    128,
    9,
    "Sixty-shot professional aerial repeater with rolling colour changes and a wide spread.",
    ["premium", "new"],
    { Shots: "60", Height: "30 m", Duration: "80 sec", Effect: "Rolling colour" },
  ),
  build(
    "aerial-shot-pack",
    "Aerial Shot Pack",
    "aerial-fireworks",
    999,
    1349,
    4.6,
    176,
    0,
    "Assorted single aerial shots so you can pace the show exactly the way you like.",
    [],
    { "Pack Size": "12 shots", Height: "20 m", Duration: "3 sec each", Effect: "Assorted bursts" },
  ),
  build(
    "ground-chakkar",
    "Ground Chakkar",
    "ground-chakkars",
    179,
    229,
    4.5,
    602,
    140,
    "The spinning classic — a fast golden wheel of sparks that stays low and safe.",
    ["bestseller", "kids"],
    { "Pack Size": "10 pieces", Spin: "Fast", Duration: "25 sec", Effect: "Golden wheel" },
  ),
  build(
    "disco-wheel",
    "Disco Wheel",
    "ground-chakkars",
    329,
    429,
    4.6,
    247,
    52,
    "Multi-colour chakkar with a strobing centre that pulses like a disco light.",
    ["popular"],
    { "Pack Size": "10 pieces", Spin: "Medium", Duration: "35 sec", Effect: "Strobe colour" },
  ),
  build(
    "jumbo-chakkar",
    "Jumbo Chakkar",
    "ground-chakkars",
    549,
    699,
    4.7,
    154,
    26,
    "Oversized chakkar with a wide sparkle radius, best for open compounds.",
    ["premium"],
    { "Pack Size": "5 pieces", Spin: "Slow", Duration: "50 sec", Effect: "Wide sparkle" },
  ),
  build(
    "twin-spin-chakkar",
    "Twin Spin Chakkar",
    "ground-chakkars",
    399,
    519,
    4.3,
    98,
    44,
    "Two stacked wheels spinning in opposite directions for a hypnotic double ring.",
    ["new"],
    { "Pack Size": "8 pieces", Spin: "Dual", Duration: "40 sec", Effect: "Double ring" },
  ),
  build(
    "family-combo",
    "Family Combo",
    "combo-packs",
    999,
    1399,
    4.8,
    864,
    60,
    "Ten curated favourites — sparklers, flower pots, rockets and chakkars — balanced for a full family evening.",
    ["bestseller", "family"],
    { Items: "10+", Age: "Family", "Box Size": "Medium", Includes: "Sparklers, pots, rockets" },
  ),
  build(
    "premium-combo",
    "Premium Combo",
    "combo-packs",
    1799,
    2399,
    4.9,
    511,
    38,
    "Fifteen premium items with our long-burn sparklers and colour fountains in a gift-ready gold box.",
    ["premium", "popular"],
    { Items: "15+", Age: "Family", "Box Size": "Large", Includes: "Premium assortment" },
  ),
  build(
    "grand-combo",
    "Grand Combo",
    "combo-packs",
    3599,
    4799,
    4.9,
    289,
    14,
    "Twenty-five items including aerial cakes for a complete, professionally sequenced celebration.",
    ["premium", "grand"],
    { Items: "25+", Age: "Adults + family", "Box Size": "XL", Includes: "Aerials, fountains, more" },
  ),
  build(
    "kids-safe-combo",
    "Kids Safe Combo",
    "combo-packs",
    699,
    899,
    4.7,
    433,
    76,
    "Low-noise, low-smoke items chosen specifically for young children and small balconies.",
    ["kids", "new"],
    { Items: "8+", Age: "Kids", "Box Size": "Small", Includes: "Sparklers, chakkars, pots" },
  ),
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const bestSellers = products.filter((p) => p.tags.includes("bestseller")).slice(0, 4);

export const searchProducts = (query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      categoryName(p.category).toLowerCase().includes(q) ||
      p.tags.some((t) => t.includes(q)),
  );
};

export const formatPrice = (value: number) => `₹${value.toLocaleString("en-IN")}`;
