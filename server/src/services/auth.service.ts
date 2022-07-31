import UserModel from "@models/user.model";
import { UserRegistration } from "@schemas/auth.schema";
import { HttpException } from "@utils/custom-errors.util";
import generateToken from "@utils/generate-token.util";

const userLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await UserModel.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const { _id, email, firstName, lastName, role } = user;
    const token = generateToken(_id.toString());
    return { _id, email, name: `${firstName} ${lastName}`, role, token };
  } else {
    throw new HttpException("Invalid email or password", 401);
  }
};

const userSignUp = async (newUser: UserRegistration) => {
  const existingUser = await UserModel.findOne({ email: newUser.email });

  if (existingUser) {
    throw new HttpException("Email already exists", 409);
  } else {
    const { _id, email, firstName, lastName, role } = await UserModel.create(
      newUser
    );
    const token = generateToken(_id.toString());
    return { _id, email, name: `${firstName} ${lastName}`, role, token };
  }
};

export default { userLogin, userSignUp };
