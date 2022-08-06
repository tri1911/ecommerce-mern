import { Schema, model, InferSchemaType } from "mongoose";

const cartStates = ["active", "pending", "completed"] as const;

export type CartState = typeof cartStates[number];

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Product",
      index: true,
    },
    status: {
      type: String,
      enum: cartStates,
      default: "active",
    },
    items: [
      new Schema(
        {
          productId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Product",
            index: true,
          },
          quantity: { type: Number, required: true },
          title: { type: String, required: true },
          image: { type: String, required: true },
          price: { type: Number, required: true },
        },
        { _id: false }
      ),
    ],
  },
  { timestamps: true }
);

cartSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    delete returnedObject.__v;
  },
});

export type Cart = InferSchemaType<typeof cartSchema>;

export default model("Cart", cartSchema);
