import axios from "axios";

const baseUrl = "http://localhost:3001/api/products";

export interface Product {
  _id: string;
  sku: string;
  title: string;
  description: string;
  image: string;
  additionalImages: string[];
  countInStock: number;
  price: number;
  brand: string;
  category: string;
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
  const response = await axios.get<Product>(`${baseUrl}/${id}`);
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

/**
 * Product Reviews
 */

export interface ProductReview {
  _id: string;
  productRating: number;
  desc: string;
  createdAt: string;
  user: { name: string; avatar?: string };
}

export interface AggregatedProductReviews {
  reviews: ProductReview[];
  ratings: Array<{ _id: number; count: number }>;
}

const getProductReviews = async (productId: string) => {
  const {
    data: { data },
  } = await axios.get<{ data: AggregatedProductReviews }>(
    `${baseUrl}/${productId}/reviews`
  );
  return data;
};

const productServices = {
  getProductById,
  getNewProducts,
  getRecommendedProducts,
  getTopRatedProducts,
  getProductReviews,
};

export default productServices;
