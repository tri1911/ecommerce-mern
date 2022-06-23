export interface Product {
  _id: string;
  name: string;
  image: string;
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
