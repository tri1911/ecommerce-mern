import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import TextInput from "../../components/Form/TextInput";
import CheckBox from "../../components/Form/CheckBox";
import Password from "../../components/Form/Password";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { register } from "../../slices/auth.slice";

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
}

export default function RegisterForm() {
  const dispatch = useAppDispatch();

  const { status } = useAppSelector((state) => state.auth.registerStatus);

  const isRegistering = status === "loading";

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Please enter your first name"),
    lastName: Yup.string().required("Please enter your last name"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
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

  return (
    <Formik<RegisterFormValues>
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        acceptedTerms: false,
      }}
      validationSchema={validationSchema}
      onSubmit={({ firstName, lastName, email, phone, password }) => {
        dispatch(register({ firstName, lastName, email, phone, password }));
      }}
    >
      <Form>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <TextInput
              label="First Name"
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              required
            />
            <TextInput
              label="Last Name"
              type="text"
              name="lastName"
              placeholder="Enter your first name"
              required
            />
          </div>
          <TextInput
            type="email"
            label="Email Address"
            name="email"
            placeholder="Enter your email"
            required
          />
          <TextInput
            label="Phone Number"
            type="text"
            name="phone"
            placeholder="Enter your phone number"
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
            <Link to="#" className="text-primary hover:underline">
              terms &amp; conditions
            </Link>
          </CheckBox>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="default-btn py-2 w-full flex justify-center disabled:cursor-not-allowed disabled:bg-primary/80 disabled:text-white"
            disabled={isRegistering}
          >
            {isRegistering ? (
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
