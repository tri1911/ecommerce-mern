import ProductModel from "@models/product.model";
import { Product } from "@schemas/product.schema";

const createNewProduct = async (newProduct: Product) => {
  const createdProduct = await ProductModel.create(newProduct);
  return createdProduct;
};

const getSingleProduct = async (id: string) => {
  const foundProduct = await ProductModel.findById(id, { reservations: 0 })
    .populate("brand", "-_id name")
    .populate("category", "-_id name");
  return foundProduct;
};

const updateProduct = async (id: string, data: Partial<Product>) => {
  const updatedProduct = await ProductModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return updatedProduct;
};

const deleteProduct = async (id: string) => {
  await ProductModel.findByIdAndDelete(id);
};

const getNewProducts = async ({ limit = 10 }: { limit?: number }) => {
  const products = await ProductModel.find(
    {},
    { title: 1, image: 1, price: 1, ratings: 1 }
  )
    .sort("-createdAt")
    .limit(limit);
  return products;
};

/*
const getAllProducts = async ({
  filter,
  pagination: { length, page },
  sortQuery,
}: {
  filter: ProductsFilter;
  pagination: ProductsPagination;
  sortQuery?: string;
}) => {
  const pageSize = length || 12;
  const pageIndex = page || 1;

  const total = await ProductModel.countDocuments(filter);
  const pages = Math.ceil(total / pageSize);
  const products = await ProductModel.find(filter)
    .sort(sortQuery ?? "-createdAt")
    .limit(pageSize)
    .skip(pageSize * (pageIndex - 1));

  return {
    page: pageIndex,
    pages,
    total,
    products,
  };
};
*/

export default {
  createNewProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getNewProducts,
};
