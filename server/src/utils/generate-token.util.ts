import jwt from "jsonwebtoken";
import { ApplicationError } from "./custom-errors.util";

const generateToken = (id: string): string => {
  if (!process.env.JWT_SECRET) {
    throw new ApplicationError("jwt secret is missing", 500);
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export default generateToken;
