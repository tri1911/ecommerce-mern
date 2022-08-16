import axios from "axios";
import { generateConfig } from "utils/generate-auth-config.util";

const baseUrl = "http://localhost:3001/api/users";

export interface Address {
  _id: string;
  fullName: string;
  phone: string;
  country: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
}

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  addresses: Address[];
  shippingAddress?: string;
  billingAddress?: string;
  birthday?: string;
  gender?: Gender;
  avatar?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

const getUserById = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}) => {
  const {
    data: { user },
  } = await axios.get<{ user: User }>(
    `${baseUrl}/${userId}`,
    generateConfig(token)
  );
  return user;
};

const updateUserById = async ({
  userId,
  token,
  payload,
}: {
  userId: string;
  token: string;
  payload: Partial<User>;
}) => {
  const {
    data: { updatedUser },
  } = await axios.put<{ updatedUser: User }>(
    `${baseUrl}/${userId}`,
    payload,
    generateConfig(token)
  );
  return updatedUser;
};

export interface UpdatePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

const updatePassword = async ({
  userId,
  token,
  payload,
}: {
  userId: string;
  token: string;
  payload: UpdatePasswordPayload;
}) => {
  const {
    data: { updatedUser },
  } = await axios.put<{ updatedUser: User }>(
    `${baseUrl}/${userId}/password`,
    payload,
    generateConfig(token)
  );
  return updatedUser;
};

/**
 * Address
 */

const addNewAddress = async ({
  userId,
  token,
  newAddress,
  isDefault,
}: {
  userId: string;
  token: string;
  newAddress: Omit<Address, "_id">;
  isDefault?: boolean;
}) => {
  const {
    data: { updatedUser },
  } = await axios.post<{ updatedUser: User }>(
    `${baseUrl}/${userId}/addresses`,
    { newAddress, isDefault },
    generateConfig(token)
  );
  return updatedUser;
};

const updateAddress = async ({
  userId,
  token,
  addressId,
  addressUpdate,
  isDefault,
}: {
  userId: string;
  token: string;
  addressId: string;
  addressUpdate: Partial<Address>;
  isDefault?: boolean;
}) => {
  const {
    data: { updatedUser },
  } = await axios.put<{ updatedUser: User }>(
    `${baseUrl}/${userId}/addresses/${addressId}`,
    { addressUpdate, isDefault },
    generateConfig(token)
  );
  return updatedUser;
};

const removeAddress = async ({
  userId,
  token,
  addressId,
}: {
  userId: string;
  token: string;
  addressId: string;
}) => {
  const {
    data: { updatedUser },
  } = await axios.delete<{ updatedUser: User }>(
    `${baseUrl}/${userId}/addresses/${addressId}`,
    generateConfig(token)
  );
  return updatedUser;
};

/**
 * Wishlist
 */

export interface WishlistItem {
  _id: string;
  title: string;
  image: string;
  price: number;
  countInStock: number;
}

interface Wishlist {
  _id: string;
  user: string;
  items: WishlistItem[];
}

const addWishlistItem = async ({
  userId,
  token,
  productId,
}: {
  userId: string;
  token: string;
  productId: string;
}) => {
  const {
    data: { updatedWishlist },
  } = await axios.post<{ updatedWishlist: Wishlist }>(
    `${baseUrl}/${userId}/wishlist`,
    { productId },
    generateConfig(token)
  );
  return updatedWishlist.items;
};

const removeWishlistItem = async ({
  userId,
  token,
  productId,
}: {
  userId: string;
  token: string;
  productId: string;
}) => {
  const {
    data: { updatedWishlist },
  } = await axios.delete<{ updatedWishlist: Wishlist }>(
    `${baseUrl}/${userId}/wishlist/${productId}`,
    generateConfig(token)
  );
  return updatedWishlist.items;
};

const getUserWishlist = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}) => {
  const {
    data: { wishlist },
  } = await axios.get<{ wishlist: Wishlist }>(
    `${baseUrl}/${userId}/wishlist`,
    generateConfig(token)
  );
  return wishlist.items;
};

const userServices = {
  getUserById,
  updateUserById,
  updatePassword,
  addNewAddress,
  updateAddress,
  removeAddress,
  addWishlistItem,
  removeWishlistItem,
  getUserWishlist,
};

export default userServices;
