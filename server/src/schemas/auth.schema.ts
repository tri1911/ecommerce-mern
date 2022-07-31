import { z } from "zod";

const userLogin = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Must be 6 or more characters long" }),
  }),
});

const userSignUp = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required" }).email({
      message: "Invalid email address",
    }),
    firstName: z.string({ required_error: "First Name is required" }),
    lastName: z.string({ required_error: "Last Name is required" }),
    phone: z.string({ required_error: "Phone Number is required" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Must be 6 or more characters long" }),
  }),
});

export type UserRegistration = z.infer<typeof userSignUp>["body"];

export default { userLogin, userSignUp };
