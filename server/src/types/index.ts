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
