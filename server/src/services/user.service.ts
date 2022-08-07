import { Types } from "mongoose";
import { HttpException } from "@utils/custom-errors.util";
import generateToken from "@utils/generate-token.util";
import { User, UserCredential, NewUserData } from "@schemas/user.schema";
import UserModel from "@models/user.model";

const userLogin = async ({ email, password }: UserCredential) => {
  const user = await UserModel.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const { _id, email, firstName, lastName, role } = user;
    const token = generateToken({ sub: _id.toString() });
    return { _id, email, firstName, lastName, role, token };
  } else {
    throw new HttpException("Email or password is incorrect", 400);
  }
};

const userSignUp = async (newUser: NewUserData) => {
  const existingUser = await UserModel.findOne({ email: newUser.email });

  if (existingUser) {
    throw new HttpException("Email already exists", 409);
  } else {
    const { _id, email, firstName, lastName, role } = await UserModel.create(
      newUser
    );
    const token = generateToken({ sub: _id.toString() });
    return { _id, email, firstName, lastName, role, token };
  }
};

const getUserById = async (userId: Types.ObjectId | string) => {
  const user = await UserModel.findById(userId, {
    password: 0,
    federatedCredentials: 0,
  });
  return user;
};

const updateUserById = async (
  userId: Types.ObjectId | string,
  userUpdate: Partial<Omit<User, "role" | "password">>
) => {
  const updatedUser = await UserModel.findByIdAndUpdate(userId, userUpdate, {
    new: true,
  }).select({ password: 0 });
  return updatedUser;
};

const updateUserPassword = async ({
  userId,
  currentPassword,
  newPassword,
}: {
  userId: Types.ObjectId | string;
  currentPassword: string;
  newPassword: string;
}) => {
  const user = await UserModel.findById(userId);

  if (user && (await user.matchPassword(currentPassword))) {
    user.password = newPassword;
    const updatedUser = await user.save();
    return updatedUser;
  } else {
    const msg = user
      ? "The current password does not match"
      : "Cannot found the user";
    const code = user ? 401 : 404;
    throw new HttpException(msg, code);
  }
};

const getAllUsers = async () => {
  const users = await UserModel.find({});
  return users;
};

export default {
  userLogin,
  userSignUp,
  getUserById,
  updateUserById,
  updateUserPassword,
  getAllUsers,
};
