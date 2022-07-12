import axios from "axios";
import { UserProfile } from "../types";

const BASE_URL = "http://localhost:3001/api/profile/";

const getProfileInfo = async (token: string) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const { data } = await axios.get<{ user: UserProfile }>(BASE_URL, config);
  return data.user;
};

const updateProfileInfo = async (token: string, profileUpdate: UserProfile) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const { data } = await axios.put<{ updatedUser: UserProfile }>(
    BASE_URL,
    profileUpdate,
    config
  );
  return data.updatedUser;
};

export interface UpdatePasswordInfo {
  currentPassword: string;
  newPassword: string;
}

const updatePassword = async (
  token: string,
  passwordInfo: UpdatePasswordInfo
) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const { data } = await axios.put<{ message: string }>(
    `${BASE_URL}/password`,
    passwordInfo,
    config
  );
  return data.message;
};

const profileService = { getProfileInfo, updateProfileInfo, updatePassword };

export default profileService;
