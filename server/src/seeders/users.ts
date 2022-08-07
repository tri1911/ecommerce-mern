import bcrypt from "bcrypt";
import userModel, { Role } from "@models/user.model";
import { User } from "@schemas/user.schema";

const seedUsers: Omit<User, "_id">[] = [
  {
    email: "admin@email.com",
    firstName: "Admin",
    lastName: "User",
    phone: "778-775-2891",
    password: bcrypt.hashSync("123456", 10),
    federatedCredentials: [],
    role: Role.Admin,
  },
  {
    email: "elliotho@email.com",
    firstName: "Elliot",
    lastName: "Ho",
    phone: "(+1) 778-234-5678",
    password: bcrypt.hashSync("123456", 10),
    federatedCredentials: [],
    role: Role.Customer,
  },
  {
    email: "triho@email.com",
    firstName: "Tri",
    lastName: "Ho",
    phone: "(+1) 778-987-6543",
    password: bcrypt.hashSync("123456", 10),
    federatedCredentials: [],
    role: Role.Customer,
  },
];

export const insertAllUsers = async () => {
  return await userModel.insertMany(seedUsers);
};
