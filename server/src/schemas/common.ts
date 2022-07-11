import { z } from "zod";
import { Types } from "mongoose";

export const userInRequestSchema = z.object(
  { _id: z.instanceof(Types.ObjectId) },
  { required_error: "User is required" }
);
