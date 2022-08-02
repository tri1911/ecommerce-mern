import { Types } from "mongoose";
import AddressModel from "@models/address.model";
import { Address } from "@schemas/address.schema";

const getAllAddresses = async (userId: Types.ObjectId | string) => {
  const addresses = await AddressModel.find({ user: userId });
  return addresses;
};

const getAddressById = async (addressId: Types.ObjectId | string) => {
  const address = await AddressModel.findById(addressId);
  return address;
};

const createNewAddress = async (newAddress: Address) => {
  const createdAddress = await AddressModel.create(newAddress);
  return createdAddress;
};

const updateAddress = async (
  addressId: Types.ObjectId | string,
  addressUpdate: Partial<Omit<Address, "user">>
) => {
  const updatedAddress = await AddressModel.findByIdAndUpdate(
    addressId,
    addressUpdate,
    {
      new: true,
    }
  );
  return updatedAddress;
};

const deleteAddress = async (addressId: Types.ObjectId | string) => {
  await AddressModel.findByIdAndDelete(addressId);
};

export default {
  getAllAddresses,
  getAddressById,
  createNewAddress,
  updateAddress,
  deleteAddress,
};
