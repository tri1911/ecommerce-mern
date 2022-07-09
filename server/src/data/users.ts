import { IUser } from "../models/user.model";
import bcrypt from "bcrypt";

const users: IUser[] = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Elliot Ho",
    email: "elliotho@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Tri Ho",
    email: "triho@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
