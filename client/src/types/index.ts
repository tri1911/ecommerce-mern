import { SIZES } from "../components/Filters/SizeFilter";

export interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  size: Size;
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

export type Size = typeof SIZES[number];
