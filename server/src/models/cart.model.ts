import { Schema, InferSchemaType, model } from "mongoose";

const cartItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  title: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: {
    type: Number,
    required: true,
    min: [1, "item quantity has to be at least 1"],
  },
});

const cartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

cartSchema.index({ userId: 1 });
cartSchema.index({ "items.productId": 1 });

cartSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    delete returnedObject.__v;
  },
});

export type Cart = InferSchemaType<typeof cartSchema>;

export default model("Cart", cartSchema);
