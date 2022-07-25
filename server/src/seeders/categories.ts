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
          "Flannel Shirts",
          "Linen Shirts",
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
          "Casual shorts",
        ]),
      },
      {
        name: "Hoodies & Sweatshirts",
        children: toCategorySeedArray(["Hoodies", "Sweatshirts"]),
      },
      {
        name: "Suits & Blazers",
        children: toCategorySeedArray([
          "Suit Vests",
          "Blazers",
          "Suits",
          "Dress Pants",
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
          "Bomber Jackets",
          "Parkas",
          "Denim Jackets",
          "Biker Jackets",
          "Windbreakers",
          "Puffer Jackets",
          "Overshirts",
          "Trench Coats",
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
          "Straight",
          "Tapered",
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
          "Jewelry",
          "Sports Accessories",
          "Other",
          "Hats & caps",
          "Gloves",
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
          "Dress Shoes",
          "Loafers",
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
          "Knit dresses",
          "Long Sleeve Dresses",
          "Linen Dresses",
          "T-Shirt Dresses",
          "Denim Dresses",
          "Short Dresses",
          "Midi Dresses",
          "Maxi Dresses",
          "Bodycon Dresses",
          "Party Dresses",
          "Bridesmaid",
          "Cocktail Dresses",
          "Evening Dresses",
          "Lace Dresses",
          "Shirt Dresses",
          "Sequin Dresses",
          "Wrap Dresses",
          "Skater",
          "Sweater Dresses",
          "Kaftan Dresses",
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
          "Puff Sleeve",
          "Vests",
          "Short Sleeve",
          "Long Sleeves",
          "Crop Tops",
          "Bodysuits",
          "T-shirts",
          "Graphic Tees & Printed T-Shirts",
        ]),
      },
      {
        name: "Basics",
        children: toCategorySeedArray([
          "Tops",
          "Cardigans & Sweaters",
          "Dresses & Skirts",
          "Pants & Leggings",
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
          "Denim shirts",
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
          "Leggings",
          "Joggers & Sweatpants",
          "Flared Pants",
          "Chinos & Slacks",
          "Culottes",
          "Dress Pants",
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
          "Straight Jeans",
          "Bootcut",
          "Flare",
          "Loose Jeans",
          "Mom Jeans",
          "Shorts",
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
          "Pencil Skirts",
          "Denim Skirts",
          "High Waisted Skirts",
          "Skater skirts",
          "Wrap Skirts",
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
          "Sandals",
          "Heels",
          "Mules",
          "Sneakers",
          "Boots",
          "Loafers",
          "Slip-on",
          "Flip Flops",
          "Slippers",
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
          "Sunglasses",
          "Mobile Accessories",
          "Gloves",
          "Scarves",
          "Hats",
          "Wallets & Card Holders",
          "Sarongs & Ponchos",
          "Dog clothes",
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
          "Jumpsuits & Rompers",
          "Skirts",
          "Shorts",
          "Swimwear",
          "Blazers & Suits",
          "Sleepwear",
          "Underwear",
          "Socks & Tights",
        ]),
      },
      {
        name: "Outerwear",
        children: toCategorySeedArray([
          "Jackets",
          "Coats",
          "Vests",
          "Snowsuits",
        ]),
      },
      {
        name: "Activewear",
        children: toCategorySeedArray(["Accessories", "Tops"]),
      },
      {
        name: "Accessories",
        children: toCategorySeedArray([
          "Hats",
          "Scarves & Gloves",
          "Bags",
          "Belts & Suspenders",
          "Hair Accessories",
          "Jewelry",
          "Ties & Bow Ties",
          "Sunglasses",
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
          "Slippers",
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
