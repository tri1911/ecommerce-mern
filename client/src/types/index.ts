export const SIZES = ["xs", "s", "m", "l", "xl"] as const;
export const COLORS = {
  red: "#fc3d57",
  white: "#fff",
  black: "#000",
} as const;

export type Size = typeof SIZES[number];
export type Color = keyof typeof COLORS;

export type CompareFn = (a: Product, b: Product) => number;

export const SORT_OPTIONS: {
  [key: string]: { name: string; compareFn: CompareFn };
} = {
  default: {
    name: "Default sorting",
    compareFn: (a, b) => a.name.localeCompare(b.name),
  },
  priceAsc: { name: "Price low-high", compareFn: (a, b) => a.price - b.price },
  priceDesc: { name: "Price high-low", compareFn: (a, b) => b.price - a.price },
  newest: {
    name: "Latest product",
    compareFn: (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt),
  },
};

export interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  size: Size;
  color: Color;
  price: number;
  rating: number;
  reviews: number;
  createdAt: string;
}

export interface Category {
  slug: string;
  name: string;
  image: string;
  quantity: number;
}

export interface Brand {
  slug: string;
  name: string;
  quantity: number;
}

export type RequestStatus = {
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
};
