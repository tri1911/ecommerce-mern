import axios from "axios";

const baseUrl = "http://localhost:3001/api/categories";

export interface Category {
  _id: string;
  name: string;
  parentId?: string;
  path?: string;
  children: Category[];
}

const fetchCategoriesTree = async (maxDepth?: number) => {
  const queryParam = maxDepth ? `?maxDepth=${maxDepth}` : "";
  const { data } = await axios.get<{ data: Category[] }>(baseUrl + queryParam);
  return data.data;
};

/*
export interface Product {
  id: string;
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
  createdAt: string;
  updatedAt: string;
}
*/

// NOTE: types definition duplication with the one in server

export interface Product {
  _id: string;
  title: string;
  image: string;
  countInStock: number;
  price: number;
  brand: string;
  category: { _id: string; name: string };
  sizes: string[];
  colors: string[];
  ratings: { count: number; average: number };
}

export interface MetaData {
  total: number;
  pageSize: number;
  currentPage: number;
}

export interface Category {
  _id: string;
  name: string;
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

export interface FetchResult {
  products: Product[];
  metadata: MetaData[];
  categories: Category[];
  brands: Brand[];
  sizes: Size[];
  colors: Color[];
}

export interface ProductsFilter {
  brand?: string[];
  sizes?: string[];
  colors?: string[];
  minPrice?: number;
  maxPrice?: number;
}

const fetchProductsByCategory = async ({
  categoryId,
  currentPage,
  pageSize,
}: {
  categoryId: string;
  currentPage?: number;
  pageSize?: number;
  filter?: ProductsFilter;
  sort?: string[];
}) => {
  // convert to param queries with format: ?brand[in][]=<brandName>&sort=-createdAt,price

  let queryParams = "";

  if (currentPage) {
    queryParams += (queryParams && "&") + `currentPage=${currentPage}`;
  }

  if (pageSize) {
    queryParams += (queryParams && "&") + `pageSize=${pageSize}`;
  }

  const {
    data: { result },
  } = await axios.get<{ result: FetchResult }>(
    `${baseUrl}/${categoryId}/products` + (queryParams ? `?${queryParams}` : "")
  );
  return result;
};

const categoryService = { fetchCategoriesTree, fetchProductsByCategory };

export default categoryService;
