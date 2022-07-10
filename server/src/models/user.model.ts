import { model, Schema, InferSchemaType } from "mongoose";
import bcrypt from "bcrypt";

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export enum Role {
  Admin = "admin",
  Customer = "customer",
}

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthday: Date,
    gender: {
      type: String,
      enum: Object.values(Gender),
    },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.Customer,
    },
  },
  {
    methods: {
      async matchPassword(password: string) {
        return await bcrypt.compare(password, this.password);
      },
    },
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

export type User = InferSchemaType<typeof userSchema>;

export default model("User", userSchema);
