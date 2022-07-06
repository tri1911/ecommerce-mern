import { model, Model, Schema, Types } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

export interface UserMethods {
  matchPassword(password: string): Promise<boolean>;
}

type UserModelType = Model<IUser, Record<string, never>, UserMethods>;

const userSchema = new Schema<IUser, UserModelType, UserMethods>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

userSchema.methods.matchPassword = async function (this: IUser, password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    console.log("Password is not modified! So, don't need to do hashing");
  } else {
    console.log(`Hashing the password...`);
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const UserModel = model<IUser, UserModelType>("User", userSchema);

export default UserModel;
