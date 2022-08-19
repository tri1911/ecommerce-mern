import axios from "axios";
import generateSearchParams from "utils/generate-search-params";

const baseUrl = "http://localhost:3001/api/categories";

export interface Category {
  _id: string;
  name: string;
  children?: Category[];
  ancestors?: Category[];
}

const fetchCategoriesTree = async (maxDepth?: number) => {
  const queryParam = maxDepth ? `?maxDepth=${maxDepth}` : "";
  const { data } = await axios.get<{ data: Category[] }>(baseUrl + queryParam);
  return data.data;
};

const fetchSingleCategory = async (id: string) => {
  const { data } = await axios.get<{
    category: Category;
  }>(`${baseUrl}/${id}`);
  return data.category;
};

// NOTE: types definition duplicates with the one in server
export interface Product {
  _id: string;
  title: string;
  image: string;
  price: number;
  ratings: { count: number; average: number };
}

export interface MetaData {
  total: number;
  pageSize: number;
  currentPage: number;
}

export interface Category {
  _id: string;
  count: number;
}

export interface Brand {
  _id: string;
  count: number;
}

export interface Size {
  _id: string;
}

export interface Color {
  _id: string;
}

export interface Price {
  priceRangeMin: number;
  priceRangeMax: number;
}

export interface FetchResult {
  products: Product[];
  metadata: MetaData[];
  categories: Category[];
  brands: Brand[];
  sizes: Size[];
  colors: Color[];
  price: Price[];
}

export type SearchParamKeys =
  | "category"
  | "brand"
  | "sizes"
  | "colors"
  | "minPrice"
  | "maxPrice"
  | "page"
  | "limit"
  | "sort";
export type SearchParamValues = string[] | string | null | number;
export type ProductsQueries = { [key in SearchParamKeys]: SearchParamValues };

const fetchProductsByCategory = async (
  categoryId: string,
  queries: ProductsQueries
) => {
  const searchParams = generateSearchParams(queries);
  const {
    data: { result },
  } = await axios.get<{ result: FetchResult }>(
    `${baseUrl}/${categoryId}/products?${searchParams}`
  );
  return result;
};

const categoryService = {
  fetchCategoriesTree,
  fetchSingleCategory,
  fetchProductsByCategory,
};

export default categoryService;
