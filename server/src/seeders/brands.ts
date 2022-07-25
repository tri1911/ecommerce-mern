import BrandModel from "@models/brand.model";

const brands = [
  "Adidas by Stella McCartney",
  "Essentials",
  "Five Ten",
  "Originals",
  "Performance",
  "Sport Inspired",
  "Sportswear",
  "TERREX",
].map((name) => ({ name }));

export const insertAllBrands = () => {
  return BrandModel.insertMany(brands);
};
