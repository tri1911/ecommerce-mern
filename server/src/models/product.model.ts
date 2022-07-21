import { Schema, Types, Model, model } from "mongoose";

export interface IProduct {
  _id: Types.ObjectId;
  sku: string;
  title: string;
  description: string;
  image: string;
  additionalImages: string[];
  countInStock: number;
  price: string;
  category?: Types.ObjectId;
  brand?: Types.ObjectId;
  sizes: string[]; // or Types.Array<string>?
  colors: string[];
  material?: string;
  weight?: number;
  ratings: {
    count: number;
    average: number;
  };
  createdAt: number;
  updatedAt: number;
}

const productSchema = new Schema<IProduct, Model<IProduct>>(
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
    price: { type: String, required: true },
    category: { index: 0, type: Schema.Types.ObjectId, ref: "Category" },
    brand: { type: Schema.Types.ObjectId, ref: "Brand" },
    sizes: [String],
    colors: [String],
    material: String,
    weight: Number,
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
