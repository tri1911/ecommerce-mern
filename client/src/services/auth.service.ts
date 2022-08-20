import axios from "axios";

const baseUrl = "/api/auth";
export const USER_AUTH_KEY = "loggedInUser";

export enum Role {
  Admin = "admin",
  Customer = "customer",
  Merchant = "merchant",
}

export interface AuthInfo {
  _id: string;
  email: string;
  name: string;
  role: Role;
  token: string;
}

export interface UserCredential {
  email: string;
  password: string;
}

const login = async (credential: UserCredential): Promise<AuthInfo> => {
  const {
    data: { user },
  } = await axios.post<{ user: AuthInfo }>(`${baseUrl}/local`, credential);
  localStorage.setItem(USER_AUTH_KEY, JSON.stringify(user));
  return user;
};

const loginWithOAuth = async (provider: "google" | "facebook") => {
  const {
    data: { user },
  } = await axios.get<{ user: AuthInfo }>(`${baseUrl}/${provider}`);
  localStorage.setItem(USER_AUTH_KEY, JSON.stringify(user));
  return user;
};

export interface UserPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
}

const register = async (newUser: UserPayload): Promise<AuthInfo> => {
  const {
    data: { createdUser },
  } = await axios.post<{ createdUser: AuthInfo }>(
    `${baseUrl}/register`,
    newUser
  );
  localStorage.setItem(USER_AUTH_KEY, JSON.stringify(createdUser));
  return createdUser;
};

const logout = () => {
  localStorage.removeItem(USER_AUTH_KEY);
};

const authServices = { login, loginWithOAuth, register, logout };

export default authServices;
