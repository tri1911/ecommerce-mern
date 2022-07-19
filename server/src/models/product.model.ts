import { Schema, model, InferSchemaType } from "mongoose";

const productSchema = new Schema(
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
    image: String,
    additionalImages: [String],
    countInStock: { type: Number, default: 0 },
    price: { type: String, required: true },
    category: { index: 0, type: Schema.Types.ObjectId, ref: "Category" },
    brand: { type: Schema.Types.ObjectId, ref: "Brand" },
    sizes: [String],
    colors: [String],
    material: String,
    weight: Number,
    ratings: new Schema({
      count: Number,
      average: Number,
    }),
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

export type Product = InferSchemaType<typeof productSchema>;

export default model("Product", productSchema);
