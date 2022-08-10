import { Types } from "mongoose";
import { HttpException } from "@utils/custom-errors.util";
import generateToken from "@utils/generate-token.util";
import {
  User,
  Address,
  UserCredential,
  NewUserData,
} from "@schemas/user.schema";
import UserModel from "@models/user.model";

const userLogin = async ({ email, password }: UserCredential) => {
  const user = await UserModel.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const { _id, email, firstName, lastName, role } = user;
    return {
      _id,
      email,
      name: `${firstName} ${lastName}`,
      role,
      token: generateToken({ sub: _id.toString() }),
    };
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
    return {
      _id,
      email,
      name: `${firstName} ${lastName}`,
      role,
      token: generateToken({ sub: _id.toString() }),
    };
  }
};

const getUserById = async (userId: Types.ObjectId | string) => {
  const user = await UserModel.findById(userId, {
    password: 0,
    federatedCredentials: 0,
    role: 0,
  });
  return user;
};

const updateUserById = async (
  userId: Types.ObjectId | string,
  payload: Partial<Omit<User, "role" | "password" | "federatedCredentials">>
) => {
  const updatedUser = await UserModel.findByIdAndUpdate(userId, payload, {
    new: true,
  }).select({ password: 0, federatedCredentials: 0, role: 0 });
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

const addNewAddress = async ({
  userId,
  newAddress,
  isDefault,
}: {
  userId: Types.ObjectId | string;
  newAddress: Omit<Address, "_id">;
  isDefault?: boolean;
}) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new HttpException("user is not found");
  }
  const newId = new Types.ObjectId();
  user.addresses.push({ _id: newId, ...newAddress });
  if (isDefault) {
    user.shippingAddress = newId;
  }
  const updatedUser = await user.save();
  return updatedUser;
};

const updateAddress = async ({
  userId,
  addressId,
  addressUpdate,
  isDefault,
}: {
  userId: string;
  addressId: string;
  addressUpdate: Partial<Address>;
  isDefault?: boolean;
}) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new HttpException("user is not found");
  }
  const address = user.addresses.id(addressId);
  if (!address) {
    throw new HttpException("address does not exist");
  }
  Object.assign(address, addressUpdate);
  if (isDefault) {
    user.shippingAddress = address._id;
  } else if (
    user.shippingAddress &&
    addressId === user.shippingAddress.toString()
  ) {
    // update this address is not default shipping address
    user.shippingAddress = undefined;
  }
  const updatedUser = await user.save();
  return updatedUser;
};

const removeAddress = async ({
  userId,
  addressId,
}: {
  userId: string;
  addressId: string;
}) => {
  const updatedUser = await UserModel.findOneAndUpdate(
    { _id: userId, "addresses._id": addressId },
    { $pull: { addresses: { _id: addressId } } },
    { new: true }
  );
  return updatedUser;
};

export default {
  userLogin,
  userSignUp,
  getUserById,
  updateUserById,
  updateUserPassword,
  getAllUsers,
  addNewAddress,
  updateAddress,
  removeAddress,
};
