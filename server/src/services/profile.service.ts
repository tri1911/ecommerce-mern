import { Types } from "mongoose";
import { HttpException } from "@utils/custom-errors.util";
import { User } from "@schemas/user.schema";
import UserModel from "@models/user.model";

const getUserProfile = async (userId: Types.ObjectId | string) => {
  const user = await UserModel.findById(userId);

  if (user) {
    return user;
  } else {
    throw new HttpException(
      `User profile with id '${userId}' is not found`,
      404
    );
  }
};

// TODO: check whether the new email does exist
const updateUserProfile = async ({
  userId,
  profileUpdate,
}: {
  userId: Types.ObjectId | string;
  profileUpdate: Partial<Omit<User, "password">>;
}) => {
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
