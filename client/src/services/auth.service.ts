import axios from "axios";
import { AuthInfo } from "../types";

const BASE_URL = "http://localhost:3001/api/auth/";
export const USER_AUTH_KEY = "loggedInUser";

export interface UserCredential {
  email: string;
  password: string;
}

const login = async (credential: UserCredential): Promise<AuthInfo> => {
  const { data } = await axios.post<AuthInfo>(BASE_URL + "login", credential);
  localStorage.setItem(USER_AUTH_KEY, JSON.stringify(data));
  return data;
};

export interface UserRegistrationInfo {
  name: string;
  email: string;
  password: string;
}

const register = async (newUser: UserRegistrationInfo): Promise<AuthInfo> => {
  const { data } = await axios.post<AuthInfo>(BASE_URL + "register", newUser);
  localStorage.setItem(USER_AUTH_KEY, JSON.stringify(data));
  return data;
};

const logout = () => {
  localStorage.removeItem(USER_AUTH_KEY);
};

const authService = { login, register, logout };

export default authService;
