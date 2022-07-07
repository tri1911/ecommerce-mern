import jwt from "jsonwebtoken";
import config from "./config.util";

const generateToken = (id: string): string => {
  const secret = config.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is missing");
  }
  return jwt.sign({ id }, secret, { expiresIn: "30d" });
};

export default generateToken;
