import { Schema, Types, model, Model } from "mongoose";
import { Color, Size } from "../types";

// Sub-Document definition
export interface Review {
  title: string;
  rating: number;
  comment: string;
  user: Types.ObjectId;
}

// Document definition
export interface Product {
  sku: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  size: Size;
  color: Color;
  price: number;
  inStockQty: number;
  rating: number;
  numReviews: number;
  // Use `Types.ObjectId` in document interface...
  user?: Types.ObjectId;
  reviews?: Review[];
}

// TMethodsAndOverrides
type ProductDocumentProps = {
  reviews: Types.DocumentArray<Review>;
};

type ProductModelType = Model<Product, unknown, ProductDocumentProps>;

const reviewSchema = new Schema<Review>({
  title: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const productSchema = new Schema<Product, ProductModelType>({
  sku: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  size: { type: String, enum: ["xs", "s", "m", "l", "xl"] },
  color: { type: String, enum: ["red", "white", "black"] },
  price: { type: Number, required: true, default: 0 },
  inStockQty: { type: Number, required: true, default: 0 },
  rating: { type: Number, required: true, default: 0 },
  numReviews: { type: Number, required: true, default: 0 },
  // Use `Schema.Types.ObjectId` in the schema definition.
  user: { type: Schema.Types.ObjectId, ref: "User" },
  reviews: [reviewSchema],
});

const ProductModel = model<Product, ProductModelType>("Product", productSchema);

export default ProductModel;
