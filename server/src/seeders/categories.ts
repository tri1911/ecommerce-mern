import { Types } from "mongoose";
import CategoryModel from "@models/category.model";

export type SeedCategory = {
  name: string;
  children?: SeedCategory[];
};

const toCategorySeedArray = (names: string[]) => {
  return names.map((name) => ({ name }));
};

const categories: SeedCategory[] = [
  {
    name: "Men",
    children: [
      {
        name: "Shirts",
        children: toCategorySeedArray([
          "Long Sleeve",
          "Casual Shirts",
          "Dress Shirts",
          "Denim Shirts",
          "Short Sleeve",
        ]),
      },
      {
        name: "Shorts",
        children: toCategorySeedArray([
          "Linen",
          "Sweatshorts",
          "Jean Shorts",
          "Chino Shorts",
          "Cargo Shorts",
        ]),
      },
      {
        name: "Hoodies & Sweatshirts",
        children: toCategorySeedArray([
          "Hoodies",
          "Sweatshirts",
          "Denim Jackets",
          "Biker Jackets",
          "Windbreakers",
        ]),
      },
      {
        name: "Suits & Blazers",
        children: toCategorySeedArray([
          "Suit Vests",
          "Blazers",
          "Suits",
          "Dress Pants",
          "Puffer Jackets",
        ]),
      },
      {
        name: "Jackets & Coats",
        children: toCategorySeedArray([
          "Gilets",
          "Linen",
          "Outdoor",
          "Jackets",
          "Coats",
        ]),
      },
      {
        name: "Jeans",
        children: toCategorySeedArray([
          "Joggers",
          "Skinny",
          "Slim",
          "Regular Fit",
          "Relaxed Fit",
        ]),
      },
      {
        name: "Accessories",
        children: toCategorySeedArray([
          "Face Masks",
          "Ties, Bow tie & Handkerchiefs",
          "Belts & Suspenders",
          "Bags",
          "Sunglasses",
        ]),
      },
      {
        name: "Shoes",
        children: toCategorySeedArray([
          "Slippers",
          "Flip Flops",
          "Sneakers",
          "Sandals & Espadrilles",
          "Boots",
        ]),
      },
    ],
  },
  {
    name: "Women",
    children: [
      {
        name: "Dresses",
        children: toCategorySeedArray([
          "Sleeveless Dresses",
          "Puff Sleeve Dresses",
          "Halter Neck Dresses",
          "Wedding Guest",
          "Slip Dresses",
        ]),
      },
      {
        name: "Tops",
        children: toCategorySeedArray([
          "Collared Tops",
          "Turtlenecks",
          "Halter Tops",
          "Cut Out Tops",
          "Bandeau",
        ]),
      },
      {
        name: "Basics",
        children: toCategorySeedArray([
          "Tops",
          "Cardigans & Sweaters",
          "Dresses & Skirts",
          "Pants & Leggings",
          "Denim shirts",
        ]),
      },
      {
        name: "Shirts & Blouses",
        children: toCategorySeedArray([
          "Linen Shirts",
          "Shirts",
          "Blouses",
          "Tunics",
          "Off Shoulder Shirts & Blouses",
        ]),
      },
      {
        name: "Pants",
        children: toCategorySeedArray([
          "Linen Pants",
          "Leather",
          "Paperbag Waist Pants",
          "High Waist Pants",
          "Cargo Pants",
        ]),
      },
      {
        name: "Jeans",
        children: toCategorySeedArray([
          "Baggy",
          "Boyfriend Jeans",
          "Wide Leg Jeans",
          "Skinny",
          "Shaping Jeans",
        ]),
      },
      {
        name: "Shorts",
        children: toCategorySeedArray([
          "Biker Shorts",
          "Bermudas",
          "Denim Shorts",
          "High Waisted Shorts",
        ]),
      },
      {
        name: "Overalls & Jumpsuits",
        children: toCategorySeedArray([
          "Overalls",
          "Long Jumpsuits",
          "Rompers & Playsuits",
          "Puff Sleeve",
          "Vests",
        ]),
      },
      {
        name: "Skirts",
        children: toCategorySeedArray([
          "Leather Skirts",
          "Pleated Skirts",
          "Short Skirts",
          "Midi Skirts",
          "Maxi Skirts",
        ]),
      },
      {
        name: "Shoes",
        children: toCategorySeedArray([
          "Wellington Boots",
          "Pumps",
          "Heels",
          "Ballerinas",
          "Espadrilles",
        ]),
      },
      {
        name: "Accessories",
        children: toCategorySeedArray([
          "Face Masks",
          "Bags",
          "Belts",
          "Jewellery",
          "Hair Accessories",
        ]),
      },
    ],
  },
  {
    name: "Kids",
    children: [
      {
        name: "Clothing",
        children: toCategorySeedArray([
          "Tops & T-shirts",
          "Pants & Jeans",
          "Sets & Outfits",
          "Sweaters & Sweatshirts",
          "Dresses",
        ]),
      },
      {
        name: "Outerwear",
        children: toCategorySeedArray([
          "Jackets",
          "Coats",
          "Vests",
          "Snowsuits",
          "Sleepwear",
        ]),
      },
      {
        name: "Activewear",
        children: toCategorySeedArray([
          "Accessories",
          "Tops",
          "Jewelry",
          "Ties & Bow Ties",
          "Sunglasses",
        ]),
      },
      {
        name: "Accessories",
        children: toCategorySeedArray([
          "Hats",
          "Scarves & Gloves",
          "Bags",
          "Belts & Suspenders",
          "Hair Accessories",
        ]),
      },
      {
        name: "Shoes",
        children: toCategorySeedArray([
          "Sneakers",
          "Ballet Flats",
          "Boots",
          "Rain Boots",
          "Sandals & Flip Flops",
        ]),
      },
      { name: "Costumes" },
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
