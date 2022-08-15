import axios from "axios";
import { Product } from "./category.service";

const baseUrl = "http://localhost:3001/api/products";

export interface ProductDetails {
  _id: string;
  sku: string;
  title: string;
  description: string;
  image: string;
  additionalImages: string[];
  countInStock: number;
  price: number;
  brand: { name: string };
  category: { name: string };
  sizes: string[];
  colors: string[];
  material?: string;
  weight?: string;
  ratings: {
    count: number;
    average: number;
  };
}

const getProductById = async (id: string) => {
  const response = await axios.get<ProductDetails>(`${baseUrl}/${id}`);
  return response.data;
};

const getNewProducts = async (limit?: number) => {
  const {
    data: { products },
  } = await axios.get<{ products: Product[] }>(
    `${baseUrl}/new` + (limit ? `?limit=${limit}` : undefined)
  );
  return products;
};

const getRecommendedProducts = async (limit?: number) => {
  const {
    data: { products },
  } = await axios.get<{ products: Product[] }>(
    `${baseUrl}/recommendation` + (limit ? `?limit=${limit}` : undefined)
  );
  return products;
};

const getTopRatedProducts = async (limit?: number) => {
  const {
    data: { products },
  } = await axios.get<{ products: Product[] }>(
    `${baseUrl}/top-rated` + (limit ? `?limit=${limit}` : undefined)
  );
  return products;
};

const productServices = {
  getProductById,
  getNewProducts,
  getRecommendedProducts,
  getTopRatedProducts,
};

export default productServices;
