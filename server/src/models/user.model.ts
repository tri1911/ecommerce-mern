import { model, Model, Schema } from "mongoose";
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

export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  birthday?: Date;
  gender?: Gender;
  phone: string;
  password: string;
  role: Role;
}

interface UserMethods {
  matchPassword(password: string): Promise<boolean>;
}

type UserModelType = Model<IUser, unknown, UserMethods>;

const userSchema = new Schema<IUser, UserModelType, UserMethods>(
  {
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthday: { type: Date },
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
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (this: IUser, password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const UserModel = model<IUser, UserModelType>("User", userSchema);

export default UserModel;
