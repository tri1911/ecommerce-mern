import { model, Schema, InferSchemaType } from "mongoose";

const addressSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    country: { type: String, required: true },
    province: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    postalCode: { type: String, required: true },
    isDefault: { type: Boolean, required: true },
  },
  { timestamps: true }
);

addressSchema.set("toJSON", {
  transform(_document, returnedObject) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export type Address = InferSchemaType<typeof addressSchema>;

export default model("Address", addressSchema);
