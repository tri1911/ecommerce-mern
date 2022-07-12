import { Link } from "react-router-dom";
import TextInput from "../Form/TextInput";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CheckBox from "../Form/CheckBox";
import Password from "../Form/Password";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { login } from "../../slices/auth.slice";

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginForm() {
  const dispatch = useAppDispatch();

  const { status } = useAppSelector((state) => state.auth.loginStatus);

  const isSigningIn = status === "loading";

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Must be at least 6 characters")
      .required("Password is required"),
    rememberMe: Yup.boolean(),
  });

  return (
    <Formik<LoginFormValues>
      initialValues={{ email: "", password: "", rememberMe: false }}
      validationSchema={validationSchema}
      onSubmit={({ email, password }) => {
        dispatch(login({ email, password }));
      }}
    >
      <Form>
        <div className="space-y-4">
          <TextInput
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your Email Address"
            required
          />
          <Password
            label="Password"
            name="password"
            placeholder="Enter your Password"
            required
          />
          <div className="flex items-center justify-between mt-6">
            <CheckBox name="rememberMe">Remember Me</CheckBox>
            <Link to="/forgot-password" className="text-primary">
              Forgot Password?
            </Link>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="default-btn py-2 w-full flex justify-center disabled:cursor-not-allowed disabled:bg-primary/80 disabled:text-white"
              disabled={isSigningIn}
            >
              {isSigningIn ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </div>
      </Form>
    </Formik>
  );
}
