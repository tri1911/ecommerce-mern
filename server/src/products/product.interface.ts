export interface BaseProduct {
  name: string;
  description: string;
  image: string;
  price: number;
}

export interface Product extends BaseProduct {
  id: string;
}
