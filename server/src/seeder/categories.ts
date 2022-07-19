import { Types } from "mongoose";
import CategoryModel from "../models/category.model";

const clothesChildren = [
  "New Arrivals",
  "Hoodies & Sweatshirts",
  "Pants",
  "Jackets & Vests",
  "Tops & T-Shirts",
  "Tracksuits",
  "Loungewear",
  "Matching Sets",
  "Shorts",
  "Jerseys",
  "Tights",
  "Swimwear",
].map((name) => ({ name }));

const shoesChildren = [
  "New Arrivals",
  "Running Shoes",
  "Slides & Sandals",
  "Soccer Cleats & Shoes",
  "Basketball Shoes",
  "Workout Shoes",
  "Golf Shoes",
  "Hiking & Outdoor Shoes",
  "Tennis Shoes",
  "Skateboarding Shoes",
].map((name) => ({ name }));

const accessoriesChildren = [
  "Bags & Backpacks",
  "Hats",
  "Socks",
  "Balls",
  "Water",
  "Soccer Gloves",
].map((name) => ({ name }));

export type SeedCategory = {
  name: string;
  children?: SeedCategory[];
};

const categories: SeedCategory[] = [
  {
    name: "Men",
    children: [
      {
        name: "Shoes",
        children: shoesChildren,
      },
      {
        name: "Clothes",
        children: clothesChildren,
      },
      {
        name: "Accessories",
        children: accessoriesChildren,
      },
    ],
  },
  {
    name: "Women",
    children: [
      {
        name: "Shoes",
        children: shoesChildren,
      },
      {
        name: "Clothes",
        children: clothesChildren,
      },
      {
        name: "Accessories",
        children: accessoriesChildren,
      },
    ],
  },
];

const insertSingleCategory = async (
  { name, children }: SeedCategory,
  parentId?: Types.ObjectId
) => {
  const savedCategory = await CategoryModel.create({ name, parentId });
  if (children) {
    await Promise.all(
      children.map((category) =>
        insertSingleCategory(category, savedCategory._id)
      )
    );
  }
};

export const insertAllCategories = () => {
  return Promise.all(
    categories.map((category) => insertSingleCategory(category))
  );
};
