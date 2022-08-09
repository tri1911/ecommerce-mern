import BrandModel, { Brand } from "@models/brand.model";

const createNewBrand = async (newBrand: Brand) => {
  const createdBrand = await BrandModel.create(newBrand);
  return createdBrand;
};

const getSingleBrand = async (id: string) => {
  const foundBrand = await BrandModel.findById(id);
  return foundBrand;
};

const getAllBrands = async () => {
  const brands = await BrandModel.find({});
  return brands;
};

const updateBrand = async (id: string, payload: Partial<Brand>) => {
  const updatedBrand = await BrandModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updatedBrand;
};

const deleteBrand = async (id: string) => {
  await BrandModel.findByIdAndDelete(id);
};

export default {
  createNewBrand,
  getSingleBrand,
  getAllBrands,
  updateBrand,
  deleteBrand,
};
