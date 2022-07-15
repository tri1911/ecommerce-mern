import { model, Schema, InferSchemaType } from "mongoose";

const brandSchema = new Schema({
  name: { type: String, trim: true, required: true, unique: true },
});

brandSchema.set("toJSON", {
  transform(_document, returnedObject) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export type Brand = InferSchemaType<typeof brandSchema>;

export default model("Brand", brandSchema);
