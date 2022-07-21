import bcrypt from "bcrypt";
import userModel, { Role, User } from "@models/user.model";

const seedUsers: User[] = [
  {
    email: "admin@email.com",
    firstName: "Admin",
    lastName: "User",
    phone: "778-775-2891",
    password: bcrypt.hashSync("123456", 10),
    role: Role.Admin,
  },
  {
    email: "elliotho@email.com",
    firstName: "Elliot",
    lastName: "Ho",
    phone: "(+1) 778-234-5678",
    password: bcrypt.hashSync("123456", 10),
    role: Role.Customer,
  },
  {
    email: "tripham@email.com",
    firstName: "Tri",
    lastName: "Pham",
    phone: "(+1) 778-987-6543",
    password: bcrypt.hashSync("123456", 10),
    role: Role.Customer,
  },
];

export const insertAllUsers = async () => {
  return await userModel.insertMany(seedUsers);
};
