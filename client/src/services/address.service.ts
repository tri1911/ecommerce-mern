import axios from "axios";
import { Address } from "../types";
import { generateConfig } from "../utils/generate-auth-config.util";

const BASE_URL = "http://localhost:3001/api/addresses";

const fetchAllAddresses = async (token: string) => {
  const { data } = await axios.get<{ addresses: Address[] }>(
    BASE_URL,
    generateConfig(token)
  );
  return data.addresses;
};

const createNewAddress = async (
  token: string,
  newAddress: Omit<Address, "id">
) => {
  const { data } = await axios.post<{ savedAddress: Address }>(
    BASE_URL,
    newAddress,
    generateConfig(token)
  );
  return data.savedAddress;
};

const updateAddress = async (
  token: string,
  { id, ...addressData }: Partial<Address>
) => {
  const { data } = await axios.put<{ updatedAddress: Address }>(
    `${BASE_URL}/${id}`,
    addressData,
    generateConfig(token)
  );
  return data.updatedAddress;
};

const deleteAddress = async (token: string, id: string) => {
  const { data } = await axios.delete<{ addressId: string }>(
    `${BASE_URL}/${id}`,
    generateConfig(token)
  );
  return data.addressId;
};

const addressService = {
  fetchAllAddresses,
  createNewAddress,
  updateAddress,
  deleteAddress,
};

export default addressService;
