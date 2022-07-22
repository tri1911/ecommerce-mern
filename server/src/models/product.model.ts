import { Product } from "@schemas/product.schema";
import { Schema, Model, model } from "mongoose";

const productSchema = new Schema<Product, Model<Product>>(
  {
    sku: {
      type: String,
      required: true,
      unique: true,
      minLength: 1,
      maxLength: 50,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 150,
    },
    description: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 5000,
    },
    image: { type: String, required: true },
    additionalImages: [String],
    countInStock: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    gender: { type: String, required: true },
    brand: { type: String, required: true },
    sport: { type: String, required: true },
    productType: { type: String, required: true },
    category: { type: String, required: true, lowercase: true },
    sizes: [String],
    colors: [String],
    material: String,
    weight: String,
    ratings: {
      count: { type: Number, required: true, default: 0 },
      average: { type: Number, required: true, default: 0 },
    },
  },
  { timestamps: true }
);

productSchema.set("toJSON", {
  transform(_document, returnedObject) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default model("Product", productSchema);
