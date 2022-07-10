import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import TextInput from "../Form/TextInput";
import CheckBox from "../Form/CheckBox";
import Password from "../Form/Password";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { register } from "../../slices/auth.slice";

interface RegisterFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
}

export default function RegisterForm() {
  const registrationStatus = useAppSelector((state) => state.auth.status);
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Please enter your full name"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Password must match"
    ),
    acceptedTerms: Yup.boolean()
      .required("Required")
      .oneOf([true], "You must accept the terms and conditions."),
  });

  const isLoading = registrationStatus === "loading";

  return (
    <Formik<RegisterFormValues>
      initialValues={{
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        acceptedTerms: false,
      }}
      validationSchema={validationSchema}
      onSubmit={({ fullName: name, email, password }) => {
        dispatch(register({ name, email, password }));
      }}
    >
      <Form>
        <div className="space-y-4">
          <TextInput
            label="Full Name"
            type="text"
            name="fullName"
            placeholder="John Doe"
            required
          />
          <TextInput
            type="email"
            label="Email Address"
            name="email"
            placeholder="Enter your email"
            required
          />
          <Password
            label="Password"
            name="password"
            placeholder="At least 6 characters"
            required
          />
          <Password
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm your Password"
            required
          />
        </div>
        <div className="mt-6">
          <CheckBox name="acceptedTerms">
            I have read and agree to the &nbsp;
            <Link to="#" className="text-primary">
              terms &amp; conditions
            </Link>
          </CheckBox>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="default-btn py-2 w-full flex justify-center disabled:cursor-not-allowed disabled:bg-primary/80 disabled:text-white"
            disabled={isLoading}
          >
            {isLoading ? (
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
              "Create Account"
            )}
          </button>
        </div>
      </Form>
    </Formik>
  );
}
