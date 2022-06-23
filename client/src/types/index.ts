export const SIZES = ["xs", "s", "m", "l", "xl"] as const;
export const COLORS = {
  red: "#fc3d57",
  white: "#fff",
  black: "#000",
} as const;

export type Size = typeof SIZES[number];
export type Color = keyof typeof COLORS;

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
