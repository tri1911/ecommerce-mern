export const SIZES = ["xs", "s", "m", "l", "xl"] as const;
export type Size = typeof SIZES[number];

export const COLORS = {
  red: "#fc3d57",
  white: "#fff",
  black: "#000",
} as const;
export type Color = keyof typeof COLORS;

export interface Brand {
  slug: string;
  name: string;
  quantity: number;
}

export interface Category {
  slug: string;
  name: string;
  image: string;
  quantity: number;
  icon?: string;
}
