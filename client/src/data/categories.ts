import { faker } from "@faker-js/faker";
import { Category } from "../types";

export const categories: Category[] = [
  {
    slug: "bedroom",
    name: "Bedroom",
    image: "images/category/category-1.jpg",
    quantity: Number(faker.random.numeric(2)),
    icon: "bed",
  },
  {
    slug: "sofa",
    name: "Sofa",
    image: "images/category/category-5.jpg",
    quantity: Number(faker.random.numeric(2)),
    icon: "sofa",
  },
  {
    slug: "office",
    name: "Office",
    image: "images/category/category-3.jpg",
    quantity: Number(faker.random.numeric(2)),
    icon: "office",
  },
  {
    slug: "outdoor",
    name: "Outdoor",
    image: "images/category/category-4.jpg",
    quantity: Number(faker.random.numeric(2)),
    icon: "outdoor-cafe",
  },
  {
    slug: "mattress",
    name: "Mattress",
    image: "images/category/category-2.jpg",
    quantity: Number(faker.random.numeric(2)),
    icon: "terrace",
  },
  {
    slug: "dinning",
    name: "Dinning",
    image: "images/category/category-6.jpg",
    quantity: Number(faker.random.numeric(2)),
    icon: "restaurant",
  },
];
