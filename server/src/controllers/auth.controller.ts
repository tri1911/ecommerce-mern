import asyncHandler from "express-async-handler";
import UserModel from "../models/user.model";
import {
  userLoginRequestSchema,
  userRegistrationRequestSchema,
} from "../schemas/auth.schema";
import { HttpException } from "../utils/custom-errors.util";
import generateToken from "../utils/generate-token.util";

// @desc authenticate user & get token
// @route POST /api/auth/login
// @access Public
export const authenticateUser = asyncHandler(async (request, response) => {
  const {
    body: { email, password },
  } = userLoginRequestSchema.parse(request);

  const foundUser = await UserModel.findOne({ email });

  if (foundUser && (await foundUser.matchPassword(password))) {
    const { _id, email, firstName, lastName, role } = foundUser;
    const token = generateToken(_id.toString());
    response
      .status(200)
      .json({ _id, email, name: `${firstName} ${lastName}`, role, token });
  } else {
    throw new HttpException("Invalid email or password", 401);
  }
});

// @desc Register new user
// @route POST /api/auth/register
// @access Public
export const registerUser = asyncHandler(async (request, response) => {
  const { body: userData } = userRegistrationRequestSchema.parse(request);

  const existingUser = await UserModel.findOne({ email: userData.email });

  if (existingUser) {
    throw new HttpException("Email already exists", 409);
  } else {
    const { _id, email, firstName, lastName, role } = await UserModel.create(
      userData
    );
    const token = generateToken(_id.toString());
    response
      .status(201)
      .json({ _id, email, name: `${firstName} ${lastName}`, role, token });
  }
});
