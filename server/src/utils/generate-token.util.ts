import jwt from "jsonwebtoken";
import config from "config";
import { JwtAuthPayload } from "@schemas/user.schema";

// standard claims https://datatracker.ietf.org/doc/html/rfc7519#section-4.1
const generateToken = (payload: JwtAuthPayload): string => {
  if (config.has("jwt.secret")) {
    const secret = config.get<string>("jwt.secret");
    const expiresIn = config.get<string | undefined>("jwt.expiresIn");
    return jwt.sign(payload, secret, { expiresIn });
  } else {
    throw new Error("jwt secret is missing");
  }
};

export default generateToken;
