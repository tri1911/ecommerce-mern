import axios from "axios";
import { Product } from "../types";

const baseUrl = "http://localhost:3001/api/products";

interface ProductFilter {
  page?: string;
}

interface FetchProductsResponse {
  products: Product[];
  page: number;
  pages: number;
}

const getProducts = async ({ page }: ProductFilter) => {
  const response = await axios.get<FetchProductsResponse>(
    `${baseUrl}${page ? `?page=${page}` : ""}`
  );
  return response.data;
};

const productService = { getProducts };

export default productService;
