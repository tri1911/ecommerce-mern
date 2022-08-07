import asyncHandler from "express-async-handler";
import generateToken from "@utils/generate-token.util";
import userSchemas, { userInRequestSchema } from "@schemas/user.schema";
import userServices from "@services/user.service";

const userLogin = asyncHandler(async (req, res) => {
  const { body: userCredential } = userSchemas.userLogin.parse(req);
  const authenticatedUser = await userServices.userLogin(userCredential);
  res.status(200).json({ authenticatedUser });
});

const userSignUp = asyncHandler(async (req, res) => {
  const { body: userData } = userSchemas.userSignUp.parse(req);
  const createdUser = await userServices.userSignUp(userData);
  res.status(201).json({ createdUser });
});

const googleCallbackHandler = asyncHandler((req, res) => {
  const { _id, email, firstName, lastName, role } = userInRequestSchema.parse(
    req.user
  );
  res.status(200).json({
    user: {
      _id,
      email,
      firstName,
      lastName,
      role,
      token: generateToken({ sub: _id.toString() }),
    },
  });
});

const facebookCallbackHandler = asyncHandler((req, res) => {
  const { _id, email, firstName, lastName, role } = userInRequestSchema.parse(
    req.user
  );
  res.status(200).json({
    user: {
      _id,
      email,
      firstName,
      lastName,
      role,
      token: generateToken({ sub: _id.toString() }),
    },
  });
});

export default {
  userLogin,
  userSignUp,
  googleCallbackHandler,
  facebookCallbackHandler,
};
