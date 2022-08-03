import jwt from "jsonwebtoken";
import config from "config";

const generateToken = (id: string): string => {
  if (config.has("jwt.secret")) {
    const secret = config.get<string>("jwt.secret");
    const expiresIn = config.get<string | undefined>("jwt.expiresIn");

    return jwt.sign({ id }, secret, {
      expiresIn,
    });
  } else {
    throw new Error("jwt secret is missing");
  }
};

export default generateToken;
