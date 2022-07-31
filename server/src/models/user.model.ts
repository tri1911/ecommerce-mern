import { model, Schema, Model } from "mongoose";
import bcrypt from "bcrypt";
import { User } from "@schemas/user.schema";

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export enum Role {
  Admin = "admin",
  Customer = "customer",
}

interface UserMethods {
  matchPassword(password: string): Promise<boolean>;
}

type UserModel = Model<User, unknown, UserMethods>;

const userSchema = new Schema<User, UserModel, UserMethods>(
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
      async matchPassword(this: User, password: string) {
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

userSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

export default model<User, UserModel>("User", userSchema);
