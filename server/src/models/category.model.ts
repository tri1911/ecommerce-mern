import { model, Schema, InferSchemaType } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, trim: true, required: true, unique: true },
    icon: { type: String },
    image: { type: String },
    path: { type: String },
  },
  {
    timestamps: true,
  }
);

categorySchema.set("toJSON", {
  transform(_document, returnedObject) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export type Category = InferSchemaType<typeof categorySchema>;

export default model("Category", categorySchema);
