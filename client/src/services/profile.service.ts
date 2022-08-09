import axios from "axios";
import { generateConfig } from "utils/generate-auth-config.util";

const baseUrl = "http://localhost:3001/api/users";

export interface UserProfile {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthday?: string;
  gender?: Gender;
  avatar?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

const getProfileInfo = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}) => {
  const {
    data: { user },
  } = await axios.get<{ user: UserProfile }>(
    `${baseUrl}/${userId}`,
    generateConfig(token)
  );
  return user;
};

const updateProfileInfo = async ({
  userId,
  token,
  payload,
}: {
  userId: string;
  token: string;
  payload: Partial<UserProfile>;
}) => {
  const {
    data: { updatedUser },
  } = await axios.put<{ updatedUser: UserProfile }>(
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
  } = await axios.put<{ updatedUser: UserProfile }>(
    `${baseUrl}/${userId}/password`,
    payload,
    generateConfig(token)
  );
  return updatedUser;
};

const profileServices = { getProfileInfo, updateProfileInfo, updatePassword };

export default profileServices;
