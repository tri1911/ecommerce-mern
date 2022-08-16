import { Schema, Model, model, Types } from "mongoose";

// Document definition
export interface Wishlist {
  user: Types.ObjectId;
  items: Types.Array<Types.ObjectId>;
}

// Models and schemas
type WishlistModelType = Model<Wishlist>;
const wishlistSchema = new Schema<Wishlist, WishlistModelType>({
  user: {
    index: true,
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  items: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

// schema configurations
wishlistSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    delete returnedObject.__v;
  },
});

export default model<Wishlist, WishlistModelType>("Wishlist", wishlistSchema);
