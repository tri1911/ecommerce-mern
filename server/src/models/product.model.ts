import { Product } from "@schemas/product.schema";
import { Schema, model, Model } from "mongoose";

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
    reservations: [
      {
        userId: { type: Schema.Types.ObjectId, required: true },
        quantity: { type: Number, required: true },
        modifiedAt: { type: Date, required: true, default: new Date() },
      },
    ],
    price: { type: Number, required: true, default: 0 },
    brand: { type: Schema.Types.ObjectId, required: true, ref: "Brand" },
    category: { type: Schema.Types.ObjectId, required: true, ref: "Category" },
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
    // returnedObject.id = returnedObject._id.toString();
    // delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.reservations;
  },
});

export default model<Product, Model<Product>>("Product", productSchema);
