/**
 * Required External Modules and Interfaces
 */

import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import UserModel from "../models/user.model";
import {
  userLoginSchema,
  userRegistrationSchema,
} from "../schemas/user.schema";
import { HttpException } from "../utils/custom-errors.util";
import generateToken from "../utils/generate-token.util";

/**
 * Controller Definition
 */

// @desc authenticate user & get token
// @route POST /api/auth/login
// @access Public
export const authenticateUser = asyncHandler(
  async (request: Request, response: Response) => {
    const { body } = userLoginSchema.parse(request);
    const { email, password } = body;

    const user = await UserModel.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const { _id, name, email, isAdmin } = user;
      const token = generateToken(_id.toString());
      response.json({ _id, name, email, isAdmin, token });
    } else {
      throw new HttpException("Invalid email or password", 401);
    }
  }
);

// @desc Register for new user
// @route POST /api/auth/register
// @access Public
export const registerUser = asyncHandler(
  async (request: Request, response: Response) => {
    const { body: userData } = userRegistrationSchema.parse(request);

    const existingUser = await UserModel.findOne({ email: userData.email });

    if (existingUser) {
      throw new HttpException("Email already exists", 409);
    } else {
      const { _id, name, email, isAdmin } = await UserModel.create(userData);
      const token = generateToken(_id.toString());
      response.status(201).json({ _id, name, email, isAdmin, token });
    }
  }
);
