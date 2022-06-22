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
}
