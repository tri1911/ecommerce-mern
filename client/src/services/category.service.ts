import axios from "axios";

const baseUrl = "http://localhost:3001/api/categories";

export interface Category {
  _id: string;
  name: string;
  children?: Category[];
  ancestors?: Category[];
}
// interface Category {
//   _id: string;
//   name: string;
// }

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

export interface ProductsFilter {
  brand: string[];
  sizes: string[];
  colors: string[];
  minPrice: string | null;
  maxPrice: string | null;
}

const fetchProductsByCategory = async ({
  categoryId,
  filter,
  currentPage,
  pageSize,
  sort,
}: {
  categoryId: string;
  filter?: ProductsFilter;
  currentPage?: number;
  pageSize?: number;
  sort?: string;
}) => {
  // convert to param queries with format: ?brand[in][]=<brandName>&sort=-createdAt,price
  let queryParams = "";

  // TODO: refactor filter generator

  if (filter) {
    const { brand, sizes, colors, minPrice, maxPrice } = filter;
    queryParams +=
      (queryParams && "&") +
      brand.map((name) => `brand[in][]=${name}`).join("&");
    queryParams +=
      (queryParams && "&") +
      sizes.map((size) => `sizes[in][]=${size}`).join("&");
    queryParams +=
      (queryParams && "&") +
      colors.map((color) => `colors[in][]=${color}`).join("&");

    if (minPrice) {
      queryParams += (queryParams && "&") + `price[gte]=${minPrice}`;
    }

    if (maxPrice) {
      queryParams += (queryParams && "&") + `price[lte]=${maxPrice}`;
    }
  }

  if (currentPage) {
    queryParams += (queryParams && "&") + `currentPage=${currentPage}`;
  }

  if (pageSize) {
    queryParams += (queryParams && "&") + `pageSize=${pageSize}`;
  }

  if (sort) {
    queryParams += (queryParams && "&") + `sort=${sort}`;
  }

  const {
    data: { result },
  } = await axios.get<{ result: FetchResult }>(
    `${baseUrl}/${categoryId}/products` + (queryParams ? `?${queryParams}` : "")
  );
  return result;
};

const categoryService = {
  fetchCategoriesTree,
  fetchSingleCategory,
  fetchProductsByCategory,
};

export default categoryService;
