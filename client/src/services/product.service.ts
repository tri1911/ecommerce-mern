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
  const response = await axios.get<Product>(`${baseUrl}/${id}`);
  return response.data;
};

const productServices = { getProductById };

export default productServices;
