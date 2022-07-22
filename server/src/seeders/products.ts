import { faker } from "@faker-js/faker";
import ProductModel from "@models/product.model";
import { Product } from "@schemas/product.schema";

type ProductSeed = Omit<Product, "_id" | "createdAt" | "updatedAt">;

const categories = ["shoes", "clothing", "accessories"] as const;
// type ProductCategory = typeof categories[number];

const genders = ["men", "women", "unisex", "kids"] as const;
// type ProductGender = typeof genders[number];

const sports = [
  { name: "Yoga", value: "yoga" },
  { name: "Winter", value: "winter" },
  { name: "Weightlifting", value: "weightlifting" },
  { name: "Volleyball", value: "volleyball" },
  { name: "Training", value: "training" },
  { name: "Trail Running", value: "trail_running" },
  { name: "Tennis", value: "tennis" },
  { name: "Swimming", value: "swimming" },
  { name: "Soccer", value: "soccer" },
  { name: "Snowboarding", value: "snowboarding" },
  { name: "Skateboarding", value: "skateboarding" },
  { name: "Running", value: "running" },
  { name: "Mountain Biking", value: "mountain_biking" },
  { name: "Lifestyle", value: "lifestyle" },
  { name: "Hockey", value: "hockey" },
  { name: "Hiking", value: "hiking" },
  { name: "Golf", value: "golf" },
  { name: "Cycling", value: "cycling" },
  { name: "Climbing", value: "climbing" },
  { name: "Basketball", value: "basketball" },
];

const productTypes = [
  { name: "Onesies", value: "onesie" },
  { name: "Soccer Cleats", value: "football_boots" },
  { name: "Underwear", value: "underwear" },
  { name: "Track Tops", value: "track_tops" },
  { name: "Tracksuits", value: "tracksuits" },
  { name: "Tights", value: "tights" },
  { name: "Swimwear", value: "swimwear" },
  { name: "Sweatshirts &amp; Track Tops", value: "sweatshirts_track_tops" },
  { name: "Sweatshirts", value: "sweatshirts" },
  { name: "Sports Bras", value: "sports_bras" },
  { name: "Socks", value: "socks" },
  { name: "Slides", value: "slides" },
  { name: "Skirts", value: "skirts" },
  { name: "Shorts", value: "shorts" },
  { name: "Shoe Cleaners", value: "shoe_cleaners" },
  { name: "Shirts", value: "shirts" },
  { name: "Shinguards", value: "shinguards" },
  { name: "Scarves", value: "scarves" },
  { name: "Sandals", value: "sandals" },
  { name: "Pump", value: "pump" },
  { name: "Platform", value: "platform" },
  { name: "Pants", value: "pants" },
  { name: "Long Sleeve Shirts", value: "long_sleeve_shirts" },
  { name: "Jumpsuits &amp; Bodysuits", value: "jumpsuits_bodysuits" },
  { name: "Jerseys", value: "jerseys" },
  { name: "Jackets", value: "jackets" },
  { name: "Hoodies", value: "hoodies" },
  { name: "Hijab", value: "hijab" },
  { name: "High Tops", value: "high_tops" },
  { name: "Headwear", value: "headwear" },
  { name: "Hats", value: "hats" },
  { name: "Gloves", value: "gloves" },
  { name: "Flip Flops", value: "flip_flops" },
  { name: "Dresses", value: "dresses" },
  { name: "Cribs", value: "cribs" },
  { name: "Boots", value: "boots" },
  { name: "Belts", value: "belts" },
  { name: "Balls", value: "balls" },
  { name: "Bags", value: "bags" },
  { name: "Athletic &amp; Sneakers", value: "athletic_sneakers" },
  { name: "Arm Sleeves &amp; Armbands", value: "arm_sleeves_armbands" },
];

const brands = [
  { name: "adidas by Stella McCartney", value: "adidas_by_stella_mccartney" },
  { name: "Essentials", value: "essentials" },
  { name: "Five Ten", value: "five_ten" },
  { name: "Originals", value: "originals" },
  { name: "Performance", value: "performance" },
  { name: "Sport Inspired", value: "sport_inspired" },
  { name: "Sportswear", value: "sportswear" },
  { name: "TERREX", value: "terrex" },
];

const images = [
  "https://assets.adidas.com/images/w_766,h_766,f_auto,q_auto,fl_lossy,c_fill,g_auto/73bea1074a4040c0abbcae370134bb28_9366/ultraboost-5-dna-running-lifestyle-shoes.jpg",
  "https://assets.adidas.com/images/w_766,h_766,f_auto,q_auto,fl_lossy,c_fill,g_auto/5d2e6117286c48c296a7ad6d013ff7c0_9366/adidas-4dfwd-x-parley-shoes.jpg",
  "https://assets.adidas.com/images/w_766,h_766,f_auto,q_auto,fl_lossy,c_fill,g_auto/7ec4e820dfcb4661be98ac8401255d22_9366/stan-smith-primegreen-special-edition-spikeless-golf-shoes.jpg",
  "https://assets.adidas.com/images/w_766,h_766,f_auto,q_auto,fl_lossy,c_fill,g_auto/747124fbed2e4d1da898adf000a445f7_9366/ozweego-shoes.jpg",
  "https://assets.adidas.com/images/w_766,h_766,f_auto,q_auto,fl_lossy,c_fill,g_auto/e60dfae191384273a408ad7400e670fb_9366/stan-smith-boba-fett-shoes.jpg",
  "https://assets.adidas.com/images/w_766,h_766,f_auto,q_auto,fl_lossy,c_fill,g_auto/dd570e1feae0414b98e3ae2901193687_9366/manchester-united-22-23-home-jersey.jpg",
  "https://assets.adidas.com/images/w_766,h_766,f_auto,q_auto,fl_lossy,c_fill,g_auto/d82cf6364d6d4d908a3fae0c015313ad_9366/ultraboost-5.0-dna-shoes.jpg",
];

export function createRandomProduct(): ProductSeed {
  return {
    sku: faker.datatype.uuid().substring(0, 8),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    image: images[faker.datatype.number(images.length - 1)],
    additionalImages: [],
    countInStock: faker.datatype.number(100),
    price: parseInt(faker.commerce.price()),
    gender: genders[faker.datatype.number(genders.length - 1)],
    brand: brands[faker.datatype.number(brands.length - 1)].name,
    sport: sports[faker.datatype.number(sports.length - 1)].name,
    productType:
      productTypes[faker.datatype.number(productTypes.length - 1)].name,
    category: categories[faker.datatype.number(categories.length - 1)],
    sizes: ["xs", "s", "m", "l", "xl"],
    colors: ["black", "red", "white"],
    material: faker.commerce.productMaterial(),
    weight: `${faker.datatype.float({
      min: 10,
      max: 100,
      precision: 0.001,
    })} kg`,
    ratings: {
      count: faker.datatype.number(100),
      average: faker.datatype.float({ min: 0, max: 5, precision: 0.1 }),
    },
  };
}

const createRandomProducts = () => {
  const products: ProductSeed[] = [];

  Array.from({ length: 100 }).forEach(() => {
    products.push(createRandomProduct());
  });

  return products;
};

export const insertAllProducts = async () => {
  const products = createRandomProducts();
  return ProductModel.insertMany(products);
};
