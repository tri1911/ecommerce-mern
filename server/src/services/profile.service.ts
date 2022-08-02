import { Types } from "mongoose";
import { HttpException } from "@utils/custom-errors.util";
import { User } from "@schemas/user.schema";
import UserModel from "@models/user.model";

const getUserProfile = async (userId: Types.ObjectId | string) => {
  const user = await UserModel.findById(userId);
  return user;
};

const updateUserProfile = async (
  userId: Types.ObjectId | string,
  profileUpdate: Partial<Omit<User, "role" | "password">>
) => {
  // verify the email first since email should be unique
  if (profileUpdate.email) {
    const existingUser = await UserModel.findOne({
      email: profileUpdate.email,
    });
    if (existingUser && existingUser._id !== userId) {
      // NOTE: should throw http-related error here?
      throw new HttpException(
        `email ${profileUpdate.email} already exists, please use another one`,
        409
      );
    }
  }

  const updatedUser = await UserModel.findByIdAndUpdate(userId, profileUpdate, {
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

  if (!user) {
    throw new HttpException(
      `User profile with id '${userId}' is not found`,
      404
    );
  }

  const isPasswordMatched = await user.matchPassword(currentPassword);

  if (isPasswordMatched) {
    user.password = newPassword;
    await user.save();
  } else {
    throw new HttpException("The current password does not match", 401);
  }
};

export default { getUserProfile, updateUserProfile, updateUserPassword };
