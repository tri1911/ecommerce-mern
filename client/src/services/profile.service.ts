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

const profileService = { getProfileInfo, updateProfileInfo };

export default profileService;
