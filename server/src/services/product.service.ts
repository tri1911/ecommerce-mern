import ProductModel from "@models/product.model";
import { Product } from "@schemas/product.schema";
import { FilterQuery } from "mongoose";

const createNewProduct = async (newProduct: Product) => {
  const createdProduct = await ProductModel.create(newProduct);
  return createdProduct;
};

const getSingleProduct = async (id: string) => {
  const foundProduct = await ProductModel.findById(id, {
    reservations: 0,
    createdAt: 0,
    updatedAt: 0,
    __v: 0,
  })
    .populate<{ category: { name: string } }>("category", "-_id name")
    .populate<{ brand: { name: string } }>("brand", "-_id name")
    .lean();
  // flatten the populated fields (category & brand)
  return (
    foundProduct && {
      ...foundProduct,
      category: foundProduct.category.name,
      brand: foundProduct.brand.name,
    }
  );
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

export interface ProductsFilter {
  brand?: { $in: string[] };
  category?: { $in: string[] };
  sizes?: { $in: string[] };
  colors?: { $in: string[] };
  price?: { $gte?: number; $lte?: number };
}

interface ProductsAggregationResult {
  products: Array<
    Omit<Product, "category" | "brand" | "reservations"> & {
      category: string;
      brand: string;
    }
  >;
  metadata: Array<{
    total: number;
    pageSize: number;
    currentPage: number;
  }>;
  categories: Array<{
    // _id is actually category name
    _id: string;
    count: number;
  }>;
  brands: Array<{
    // _id is actually brand name
    _id: string;
    count: number;
  }>;
  sizes: Array<{ _id: string }>;
  colors: Array<{ _id: string }>;
  price: Array<{ priceRangeMin: number; priceRangeMax: number }>;
}

// fetch a list of products by advanced filters, sorting & pagination criteria
const getProducts = async ({
  primaryFilter = {},
  secondaryFilter = {},
  currentPage = 1,
  pageSize = 12,
  sortQuery = { createdAt: -1 },
  getFacets = true,
}: {
  primaryFilter?: FilterQuery<unknown>;
  secondaryFilter?: ProductsFilter;
  currentPage?: number;
  pageSize?: number;
  sortQuery?: Record<string, 1 | -1>;
  getFacets?: boolean;
}) => {
  if (getFacets) {
    const resultAsArray =
      await ProductModel.aggregate<ProductsAggregationResult>([
        { $match: primaryFilter },
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            // only care the `name` property
            pipeline: [{ $project: { _id: 0, name: 1 } }],
            as: "category",
          },
        },
        {
          $lookup: {
            from: "brands",
            localField: "brand",
            foreignField: "_id",
            // only care the `name` property
            pipeline: [{ $project: { _id: 0, name: 1 } }],
            as: "brand",
          },
        },
        {
          $set: {
            brand: { $arrayElemAt: ["$brand.name", 0] },
            category: { $arrayElemAt: ["$category.name", 0] },
          },
        },
        {
          // or use https://mongoosejs.com/docs/api/aggregate.html#aggregate_Aggregate-facet
          $facet: {
            // list of result products
            products: [
              { $match: secondaryFilter },
              { $sort: sortQuery },
              { $skip: pageSize * (currentPage - 1) },
              { $limit: pageSize },
              {
                $project: {
                  createdAt: 0,
                  updatedAt: 0,
                  reservations: 0,
                  __v: 0,
                },
              },
            ],
            // aggregate the metadata for the result docs
            metadata: [
              { $match: secondaryFilter },
              // count the number of result documents, and assign to the newly created field named `total`
              { $count: "total" },
              // embed `page length` and `current page` fields into the resulted `metadata` property as well
              {
                $addFields: {
                  // pages: { $ceil: { $divide: ["$total", pageSize] } },
                  pageSize,
                  currentPage,
                },
              },
            ],
            // aggregate filter facets including categories, brands, sizes, colors, and price range
            categories: [{ $sortByCount: "$category" }],
            brands: [{ $sortByCount: "$brand" }],
            sizes: [{ $unwind: "$sizes" }, { $group: { _id: "$sizes" } }],
            colors: [{ $unwind: "$colors" }, { $group: { _id: "$colors" } }],
            price: [
              {
                $group: {
                  _id: null,
                  priceRangeMin: { $min: "$price" },
                  priceRangeMax: { $max: "$price" },
                },
              },
              { $project: { _id: 0 } },
            ],
          },
        },
      ]);

    return resultAsArray[0];
  } else {
    const products = await ProductModel.find(primaryFilter, {
      createdAt: 0,
      updatedAt: 0,
      reservations: 0,
      __v: 0,
    })
      .sort(sortQuery)
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize)
      .populate<{ category: { name: string } }>("category", "-_id name")
      .populate<{ brand: { name: string } }>("brand", "-_id name")
      .lean();
    // flatten the populated fields (category & brand)
    return products.map((product) => ({
      ...product,
      category: product.category.name,
      brand: product.brand.name,
    }));
  }
};

export default {
  createNewProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getProducts,
};
