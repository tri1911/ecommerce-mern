import type {
  SearchParamKeys,
  ProductsQueries,
} from "services/category.service";

// helper function to convert `ProductsFilter` object into a searchParams string
// e.g. convert { brand: "Adidas", "Nike"], minPrice: 100 } into brand[in][]=Adidas&brand[in][]=Nike&minPrice[gte]=100

type Ops = "[in][]" | "[gte]" | "[lte]" | "";

const operators: { [key in SearchParamKeys]: Ops } = {
  brand: "[in][]",
  sizes: "[in][]",
  colors: "[in][]",
  minPrice: "[gte]",
  maxPrice: "[lte]",
  page: "",
  limit: "",
  sort: "",
} as const;

const generateSearchParams = (queries: ProductsQueries) =>
  Object.entries(queries)
    .reduce((prev, [key, value]) => {
      const newKey = key.concat(operators[key as SearchParamKeys]);
      if (Array.isArray(value) && value.length > 0) {
        prev = prev.concat(value.map((v) => `${newKey}=${v}`));
      } else if (!Array.isArray(value) && value !== null) {
        prev = prev.concat(`${newKey}=${value}`);
      }
      return prev;
    }, Array<string>())
    .join("&");

export default generateSearchParams;
