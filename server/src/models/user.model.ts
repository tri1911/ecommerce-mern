import bcrypt from "bcrypt";
import { model, Schema, Model, Types } from "mongoose";
import { User, Address } from "@schemas/user.schema";

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export enum Role {
  Admin = "admin",
  Customer = "customer",
  Merchant = "merchant",
}

const addressSchema = new Schema<Address>({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  country: { type: String, required: true },
  province: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  postalCode: { type: String, required: true },
});

// TMethodsAndOverrides
interface UserDocumentProps {
  addresses: Types.DocumentArray<Address>;
  matchPassword(password: string): Promise<boolean>;
}

type UserModelType = Model<User, unknown, UserDocumentProps>;

const userSchema = new Schema<User, UserModelType>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthday: Date,
    gender: {
      type: String,
      enum: Object.values(Gender),
    },
    phone: String,
    addresses: [addressSchema],
    shippingAddress: {
      type: Schema.Types.ObjectId,
    },
    billingAddress: {
      type: Schema.Types.ObjectId,
    },
    password: String,
    federatedCredentials: [
      {
        _id: false,
        provider: String,
        subject: String,
      },
    ],
    avatar: String,
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.Customer,
    },
  },
  {
    methods: {
      async matchPassword(this: User, password: string) {
        return this.password && (await bcrypt.compare(password, this.password));
      },
    },
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password") && this.password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

export default model<User, UserModelType>("User", userSchema);
