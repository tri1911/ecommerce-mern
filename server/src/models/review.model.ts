import { Schema, model, InferSchemaType } from "mongoose";

const reviewSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    rating: { type: Number, required: true, min: 0, max: 5 },
    desc: { type: String, required: true },
  },
  { timestamps: true }
);

reviewSchema.index({ product: 1 });
reviewSchema.index({ user: 1 });
reviewSchema.index({ product: 1, user: 1 });

reviewSchema.set("toJSON", {
  transform(_document, returnedObject) {
    delete returnedObject.__v;
  },
});

export type Review = InferSchemaType<typeof reviewSchema>;

export default model("Review", reviewSchema);
