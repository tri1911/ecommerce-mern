import { Types } from "mongoose";
import CategoryModel from "../models/category.model";

export type SeedCategory = { name: string; children?: SeedCategory[] };

const seedCategories: SeedCategory[] = [
  {
    name: "Men",
    children: [
      {
        name: "Shoes",
        children: [
          { name: "Running Shoes" },
          { name: "Sandals + Slides" },
          { name: "Basketball Shoes" },
          { name: "Workout Shoes" },
        ],
      },
      {
        name: "Clothes",
        children: [
          { name: "Hoodies & Sweatshirts" },
          { name: "Pants" },
          { name: "Jackets & Vests" },
          { name: "Tops & T-Shirts" },
          { name: "Tracksuits" },
        ],
      },
    ],
  },
  {
    name: "Women",
    children: [
      {
        name: "Shoes",
        children: [
          { name: "Running Shoes" },
          { name: "Sandals + Slides" },
          { name: "Basketball Shoes" },
          { name: "Workout Shoes" },
        ],
      },
      {
        name: "Clothes",
        children: [
          { name: "Hoodies & Sweatshirts" },
          { name: "Pants" },
          { name: "Jackets & Vests" },
          { name: "Tops & T-Shirts" },
          { name: "Tracksuits" },
        ],
      },
    ],
  },
];

const insertSingleCategory = async (
  { name, children }: SeedCategory,
  parent?: Types.ObjectId,
  path?: string
) => {
  const savedCategory = await CategoryModel.create({ name, parent, path });
  const pathForChildren = `${path ?? ""}/${name}`;
  if (children) {
    await Promise.all(
      children.map(
        async (category) =>
          await insertSingleCategory(
            category,
            savedCategory._id,
            pathForChildren
          )
      )
    );
  }
};

export const insertAllCategories = async () => {
  return await Promise.all(
    seedCategories.map(async (category) => await insertSingleCategory(category))
  );
};
