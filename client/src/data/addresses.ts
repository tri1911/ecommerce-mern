import { faker } from "@faker-js/faker";
import { Address } from "../types";

export const addresses: Address[] = [];

export function createRandomAddress(): Address {
  return {
    id: faker.database.mongodbObjectId(),
    phone: faker.phone.number(),
    fullName: faker.name.firstName() + " " + faker.name.lastName(),
    country: faker.address.country(),
    province: faker.address.state(),
    city: faker.address.county(),
    address: faker.address.streetAddress(),
    postalCode: faker.address.zipCode("######"),
    isDefault: true,
  };
}

Array.from({ length: 4 }).forEach(() => {
  addresses.push(createRandomAddress());
});
