import axios from "axios";

const baseUrl = "http://localhost:3001/api/categories";

export interface Category {
  name: string;
  path?: string;
  children: Category[];
}

const fetchAllCategories = async () => {
  const { data } = await axios.get<{ categories: Category[] }>(baseUrl);
  return data.categories;
};

const categoryService = { fetchAllCategories };

export default categoryService;
