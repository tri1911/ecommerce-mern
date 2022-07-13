import axios from "axios";
import { UserProfile } from "../types";
import { generateConfig } from "../utils/generate-auth-config.util";

const BASE_URL = "http://localhost:3001/api/profile/";

const getProfileInfo = async (token: string) => {
  const { data } = await axios.get<{ user: UserProfile }>(
    BASE_URL,
    generateConfig(token)
  );
  return data.user;
};

const updateProfileInfo = async (
  token: string,
  profileUpdate: Partial<UserProfile>
) => {
  const { data } = await axios.put<{ updatedUser: UserProfile }>(
    BASE_URL,
    profileUpdate,
    generateConfig(token)
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
  const { data } = await axios.put<{ message: string }>(
    `${BASE_URL}/password`,
    passwordInfo,
    generateConfig(token)
  );
  return data.message;
};

const profileService = { getProfileInfo, updateProfileInfo, updatePassword };

export default profileService;
