import ProductModel, { IProduct } from "@models/product.model";

const createNewProduct = async (
  newProduct: Omit<IProduct, "_id" | "createdAt" | "updatedAt">
) => {
  const createdProduct = await ProductModel.create(newProduct);
  return createdProduct;
};

const getAllProducts = async () => {
  const products = await ProductModel.find({});
  return products;
};

const getSingleProduct = async (id: string) => {
  const foundProduct = await ProductModel.findById(id);
  return foundProduct;
};

const updateProduct = async (id: string, data: Partial<IProduct>) => {
  const updatedProduct = await ProductModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return updatedProduct;
};

export default {
  createNewProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
};

/*
export const getProductsByCategory = asyncHandler(async (request, response) => {
  const {
    query: { page },
    params: { categoryId },
  } = getProductsByCategoryRequestSchema.parse(request);

  let filter = {};

  if (categoryId) {
    const categoryIds = await categoryModel.getAllChildren(categoryId);
    // include the root id as well
    categoryIds.push(new Types.ObjectId(categoryId));
    filter = { category: { $in: categoryIds } };
  }

  const pageSize = 12;
  const currentPage = page ? parseInt(page, 10) : 1;

  const total = await ProductModel.countDocuments(filter);
  const pages = Math.ceil(total / pageSize);
  const products = await ProductModel.find(filter, { title: 1, category: 1 })
    .limit(pageSize)
    .skip(pageSize * (currentPage - 1))
    .populate("category", "name");

  response.status(200).json({
    page: currentPage,
    pages,
    total,
    products,
  });
});
*/
