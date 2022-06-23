import { faker } from "@faker-js/faker";
import { Brand } from "../types";

export const brands: Brand[] = [];

export function createRandomBrand(): Brand {
  const brand = faker.company.companyName();
  return {
    slug: brand.toLowerCase(),
    name: brand,
    quantity: Number(faker.random.numeric(2)),
  };
}

Array.from({ length: 5 }).forEach(() => {
  brands.push(createRandomBrand());
});
