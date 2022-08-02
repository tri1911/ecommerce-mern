import asyncHandler from "express-async-handler";
import authServices from "@services/auth.service";
import userSchema from "@schemas/user.schema";

const userLogin = asyncHandler(async (request, response) => {
  const {
    body: { email, password },
  } = userSchema.userLogin.parse(request);

  const authenticatedUser = await authServices.userLogin({ email, password });

  response.status(200).json({ authenticatedUser });
});

const userSignUp = asyncHandler(async (request, response) => {
  const { body: userData } = userSchema.userSignUp.parse(request);
  const createdUser = await authServices.userSignUp(userData);
  response.status(201).json({ createdUser });
});

export default { userLogin, userSignUp };
