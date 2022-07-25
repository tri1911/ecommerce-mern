import BrandModel, { IBrand } from "@models/brand.model";

const createNewBrand = async (newBrand: IBrand) => {
  const createdBrand = await BrandModel.create(newBrand);
  return createdBrand;
};

const getSingleBrand = async (id: string) => {
  const foundBrand = await BrandModel.findById(id);
  return foundBrand;
};

const updateBrand = async (id: string, data: Partial<IBrand>) => {
  const updatedBrand = await BrandModel.findByIdAndUpdate(id, data, {
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
  updateBrand,
  deleteBrand,
};
