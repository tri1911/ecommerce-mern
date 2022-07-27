import { model, Schema, InferSchemaType } from "mongoose";

const brandSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    maxLength: 70,
  },
  description: String,
});

export type IBrand = InferSchemaType<typeof brandSchema>;

export default model("Brand", brandSchema);
