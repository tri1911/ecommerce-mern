import axios from "axios";
import { generateConfig } from "../utils/generate-auth-config.util";

const baseUrl = "http://localhost:3001/api/carts";

export interface CartItem {
  _id: string;
  productId: string;
  title: string;
  image: string;
  price: number;
  countInStock: number;
  quantity: number;
}

export interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
}

const getCart = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}) => {
  const { data } = await axios.get<{ cart: Cart }>(
    `${baseUrl}/${userId}`,
    generateConfig(token)
  );
  return data.cart;
};

const addCartItem = async (
  currentUser: { userId: string; token: string },
  payload: { productId: string; quantity: number }
) => {
  const { data } = await axios.post<{ updatedCart: Cart }>(
    `${baseUrl}/${currentUser.userId}/items`,
    payload,
    generateConfig(currentUser.token)
  );
  return data.updatedCart;
};

const updateItemQuantity = async (
  currentUser: { userId: string; token: string },
  payload: { productId: string; quantity: number }
) => {
  const { data } = await axios.put<{ updatedCart: Cart }>(
    `${baseUrl}/${currentUser.userId}/items`,
    payload,
    generateConfig(currentUser.token)
  );
  return data.updatedCart;
};

const removeCartItem = async (
  currentUser: { userId: string; token: string },
  productId: string
) => {
  const { data } = await axios.delete<{ updatedCart: Cart }>(
    `${baseUrl}/${currentUser.userId}/items/${productId}`,
    generateConfig(currentUser.token)
  );
  return data.updatedCart;
};

const emptyCart = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}) => {
  const { data } = await axios.delete<{ updatedCart: Cart }>(
    `${baseUrl}/${userId}/empty-card`,
    generateConfig(token)
  );
  return data.updatedCart;
};

const cartServices = {
  getCart,
  addCartItem,
  updateItemQuantity,
  removeCartItem,
  emptyCart,
};

export default cartServices;
