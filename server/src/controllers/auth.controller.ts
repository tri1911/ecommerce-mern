import asyncHandler from "express-async-handler";
import authServices from "@services/auth.service";
import userSchema, { userInRequestSchema } from "@schemas/user.schema";
import generateToken from "@utils/generate-token.util";

const userLogin = asyncHandler(async (req, res) => {
  const {
    body: { email, password },
  } = userSchema.userLogin.parse(req);

  const authenticatedUser = await authServices.userLogin({ email, password });

  res.status(200).json({ authenticatedUser });
});

const userSignUp = asyncHandler(async (req, res) => {
  const { body: userData } = userSchema.userSignUp.parse(req);

  const createdUser = await authServices.userSignUp(userData);

  res.status(201).json({ createdUser });
});

const googleCallbackHandler = asyncHandler((req, res) => {
  const { _id: userId } = userInRequestSchema.parse(req.user);
  const token = generateToken({ sub: userId.toString() });

  res.status(200).json({ token });
});

const facebookCallbackHandler = asyncHandler((req, res) => {
  const { _id: userId } = userInRequestSchema.parse(req.user);
  const token = generateToken({ sub: userId.toString() });

  res.status(200).json({ token });
});

export default {
  userLogin,
  userSignUp,
  googleCallbackHandler,
  facebookCallbackHandler,
};
