import { Schema, model, InferSchemaType } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    sku: { type: String, required: true, unique: true },
    description: String,
    images: [String],
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    brand: { type: Schema.Types.ObjectId, ref: "Brand" },
    price: { type: Number, default: 0 },
    availability: {
      type: String,
      enum: ["In Stock", "Out Of Stock"],
      default: "Out Of Stock",
    },
    sizes: [String],
    colors: [String],
    material: String,
    weight: String,
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
